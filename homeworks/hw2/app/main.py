from flask import Flask, request, jsonify, send_from_directory, redirect
import json
import service
import os

app = Flask(__name__)
WEATHER_API = "https://api.tomorrow.io/v4/weather/forecast"

with open('./static/states.json') as f:
    STATE_ABBREVIATIONS = json.load(f)


@app.route("/")
@app.route("/index")
def root():
    return send_from_directory("static", "index.html")


@app.route("/<path:path>")
def static_files(path):
    if os.path.exists("static/" + path):
        return send_from_directory("static", path)
    elif os.path.exists("static/" + path + ".html"):
        return send_from_directory("static", path + ".html")
    elif os.path.exists("static/" + path + ".js"):
        return send_from_directory("static", path + ".js")
    else:
        return redirect("/")


@app.route("/query", methods=["GET"])
def query():
    street = request.args.get("street")
    city = request.args.get("city")
    state = request.args.get("state")
    return jsonify({"success": True, "data": request.args})


@app.route("/state_list", methods=["GET"])
def state_list_controller():
    return jsonify({"success": True, "data": STATE_ABBREVIATIONS})


@app.route("/weather", methods=["GET"])
def weather_controller():
    latitude = request.args.get("latitude")
    longitude = request.args.get("longitude")
    return service.get_weather(latitude, longitude)


@app.route("/geocoding", methods=["GET"])
def geocoding_controller():
    address = request.args.get("address")
    return service.get_geocode_info(address)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)

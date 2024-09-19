from flask import Flask, request, jsonify
import json
import service

app = Flask(__name__)
WEATHER_API = "https://api.tomorrow.io/v4/weather/forecast"

with open('./static/states.json') as f:
    STATE_ABBREVIATIONS = json.load(f)

@app.route("/")
def root():
    return """
    <html>
        <head>
            <script type="text/javascript">
                let countdown = 3;
                setInterval(function() {
                    if (countdown > 0) {
                        document.getElementById('countdown').innerText = countdown;
                        countdown--;
                    } else {
                        window.location.href = "/static/index.html";
                    }
                }, 1000);
            </script>
        </head>
        <body>
            <p>This is the backend server. You will be redirected to the frontend homepage in <span id="countdown">3</span> seconds.</p>
        </body>
    </html>
    """

# @app.route("/")
# def root():
    
#     return jsonify(
#         {
#             "success": True,
#             "data": {"text": "this is a sample text"},
#             "apis": [
#                 "GET /weather?latitude={latitude}&longitude={longitude}",
#                 "GET /address?address={address}",
#             ],
#         }
#     )

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
    return service.get_address_coordinates(address)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
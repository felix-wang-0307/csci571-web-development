from flask import Flask, request
import json
import service

app = Flask(__name__)
WEATHER_API = "https://api.tomorrow.io/v4/weather/forecast"

STATE_ABBREVIATIONS = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "District of Columbia": "DC",
    "American Samoa": "AS",
    "Guam": "GU",
}


@app.route("/")
def root():
    return json.dumps(
        {
            "success": True,
            "data": {"text": "this is a sample text"},
            "apis": [
                "GET /weather?latitude={latitude}&longitude={longitude}",
                "GET /address?address={address}",
            ],
        }
    )


@app.route("/query", methods=["GET"])
def query():
    street = request.args.get("street")
    city = request.args.get("city")
    state = request.args.get("state")
    return json.dumps({"success": True, "data": request.args})

@app.route("/state_list", methods=["GET"])
def state_list_controller():
    return json.dumps({"success": True, "data": STATE_ABBREVIATIONS})

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

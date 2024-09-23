import json
import requests
from dotenv import load_dotenv
import os

load_dotenv()

WEATHER_API = "https://api.tomorrow.io/v4/weather/forecast"
GOOGLE_MAPS_API = "https://maps.googleapis.com/maps/api/geocode/json"


def get_weather(latitude, longitude):
	"""
	Get weather data from Tomorrow.io API.
	API Docs: https://www.tomorrow.io/weather-api/docs/
	"""
	if latitude is None or longitude is None:
		return (
			json.dumps({"success": False, "error": "Missing latitude or longitude"}),
			400,
		)

	response = requests.get(
		WEATHER_API,
		params={
			"location": f"{latitude},{longitude}",
			"apikey": os.getenv("TOMORROW_API_KEY"),
		},
	)

	if response.status_code != 200:
		return (
			json.dumps({"success": False, "error": "Failed to fetch weather data"}),
			500,
		)

	return json.dumps({"success": True, "data": response.json()})


def get_geocode_info(address):
	response = requests.get(
		GOOGLE_MAPS_API,
		params={"address": address, "key": os.getenv("GOOGLE_MAPS_API_KEY")},
		headers={"Accept-language": "en"},
	)

	if response.status_code != 200:
		return (
			json.dumps({"success": False, "error": "Failed to fetch address info"}),
			500,
		)

	data = response.json().get("results")[0]
	coordinates = data.get("geometry").get("location")
	formatted_address = data.get("formatted_address")
	return json.dumps({"success": True, "data": {
		"coordinates": coordinates,
		"formatted_address": formatted_address
	}})


if __name__ == "__main__":
	print(get_weather(34.0522, -118.2437))
	print(get_geocode_info("University of Southern California"))

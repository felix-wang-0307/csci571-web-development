from flask import Flask
from google.cloud import datastore
import json

app = Flask(__name__)
datastore_client = datastore.Client()

@app.route("/")
def root():
    return json.dumps({"success": True, "data": {"a": 2}})

@app.route("/api/v1/data")
def get_data():
    return json.dumps({"success": True, "data": {"a": 2}})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)

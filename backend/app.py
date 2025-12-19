from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)

# ЯВНО разрешаем CORS для API
CORS(
    app,
    resources={r"/api/*": {"origins": "*"}},
    supports_credentials=False
)

AVOCAVO_URL = "https://app.avocavo.app/api/v2/nutrition/ingredient"
API_KEY = os.getenv("AVOCAVO_API_KEY")


@app.route("/api/nutrition", methods=["POST", "OPTIONS"])
def nutrition_proxy():
    if request.method == "OPTIONS":
        # Flask-CORS сам добавит заголовки
        return "", 204

    data = request.get_json()
    if not data or "ingredient" not in data:
        return jsonify({"error": "Missing ingredient"}), 400

    headers = {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.post(AVOCAVO_URL, json=data, headers=headers)

    return jsonify(response.json()), response.status_code


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

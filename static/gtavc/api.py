from flask import Flask, request, send_file, abort,jsonify
from flask_cors import CORS
import os,json
import requests
from urllib.parse import urlparse
from time import sleep
from datetime import datetime, timezone
app = Flask(__name__)
origins  = "*"
CORS(app, origins=origins, supports_credentials=True)

MAX_RETRIES = 3
TIMEOUT = 10
SAVE_DIR = os.path.join("assets")

os.makedirs(SAVE_DIR, exist_ok=True)

ALLOWED_DOMAIN = "cdn.dos.zone" 

@app.route("/analytics", methods=["POST"])
def analytics():
    payload = request.get_json(silent=True)
    if payload is None:
        return jsonify({"error": "invalid json"}), 400

    record = {
        "data": payload,
        "ip_address": request.headers.get("X-Forwarded-For", request.remote_addr),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

    with open("analytics.jsonl", "a") as f:
        f.write(json.dumps(record) + "\n")

    return jsonify({"status": "ok"}), 200

    
@app.route("/fetch", methods=["GET"])
def fetch_file():
    url = request.args.get("url")
    if not url:
        return abort(400, description="Missing url parameter")

    url = url.replace("\\", "/")
    parsed_url = urlparse(url)

    if parsed_url.netloc.lower() != ALLOWED_DOMAIN:
        return abort(403, description="Access denied: URL domain not allowed")

    filename = os.path.basename(parsed_url.path)
    if not filename:
        return abort(400, description="Cannot determine filename from URL")

    save_path = os.path.join(SAVE_DIR, filename)
    save_path = os.path.join(SAVE_DIR, filename)

    if not os.path.exists(save_path):
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                with requests.get(url, stream=True, timeout=TIMEOUT) as response:
                    response.raise_for_status()
                    with open(save_path, "wb") as f:
                        for chunk in response.iter_content(chunk_size=8192):
                            if chunk:
                                f.write(chunk)
                break
            except requests.RequestException as e:
                if attempt < MAX_RETRIES:
                    sleep(2 ** attempt)
                else:
                    return abort(500, description=f"Failed after {MAX_RETRIES} attempts: {str(e)}")

    try:
        response = send_file(save_path, as_attachment=True)
        response.headers.add("Access-Control-Allow-Origin", origins)
        return response
    except Exception as e:
        return abort(500, description=f"Error serving file: {str(e)}")


if __name__ == "__main__":
    app.run(port=8000,debug=True)

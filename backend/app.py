from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from flask_cors import CORS
import os
import requests

app = Flask(__name__)
CORS(app)

# Load environment variables
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
BASE_URL = "https://www.googleapis.com/youtube/v3"


@app.route("/api/transcript", methods=["GET"])
def get_transcript():
    video_id = request.args.get("videoId")
    language = request.args.get(
        "lang", "en"
    )  # Default to English if no language is specified

    if not video_id:
        return jsonify({"error": "videoId parameter is required"}), 400

    try:
        # Retrieve the transcript in the specified language
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=[language])
        return jsonify(transcript)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/youtube/search", methods=["GET"])
def youtube_search():
    query = request.args.get("query")
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    url = f"{BASE_URL}/search"
    params = {
        "part": "snippet",
        "q": query,
        "type": "video",
        "key": YOUTUBE_API_KEY,
        "maxResults": 7,  # Adjust this number as needed (up to 50)
    }

    response = requests.get(url, params=params)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return (
            jsonify({"error": "Failed to fetch data from YouTube"}),
            response.status_code,
        )


@app.route("/api/youtube/captions/<videoId>", methods=["GET"])
def get_captions(videoId):
    # Placeholder function since YouTube Data API does not provide captions directly
    # You may need to replace this with an actual method to fetch captions if available
    placeholder_captions = "This is a placeholder caption text for the video."
    return jsonify({"captions": placeholder_captions})


if __name__ == "__main__":
    app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

def detect_fallacies(text):
    fallacies = []
    if re.search(r"\b(appeal to authority)\b", text, re.IGNORECASE):
        fallacies.append("Appeal to Authority")
    if re.search(r"\b(ad hominem)\b", text, re.IGNORECASE):
        fallacies.append("Ad Hominem")
    if re.search(r"\b(straw man)\b", text, re.IGNORECASE):
        fallacies.append("Straw Man")
    if re.search(r"\b(begging the question)\b", text, re.IGNORECASE):
        fallacies.append("Begging the Question")
    if not fallacies:
        fallacies.append("No fallacies detected")
    return fallacies

@app.route('/detect_fallacies', methods=['POST'])
def detect_fallacies_route():
    try:
        data = request.get_json()
        text = data.get('text', "")
        fallacies = detect_fallacies(text)
        return jsonify({'fallacies': fallacies})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)

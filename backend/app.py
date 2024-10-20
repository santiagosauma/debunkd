from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from improvement import generate_recommendations
from scripts.getCustomWordCloud import generate_wordcloud
from scripts import getKeyWords
from scripts import getTranscript

app = Flask(__name__)
CORS(app)

statements_data = [
    {
        "statement": "Vaccines cause autism.",
        "isAccepted": False,
        "links": [
            {"url": "https://www.cdc.gov", "title": "CDC: Vaccine Information"},
            {"url": "https://www.who.int", "title": "WHO: Immunization Facts"},
            {"url": "https://www.nih.gov", "title": "NIH: Vaccine Safety Studies"},
            {"url": "https://www.healthline.com", "title": "Debunking Vaccine Myths"},
            {"url": "https://sciencebasedmedicine.org", "title": "No Evidence Linking Vaccines to Autism"}
        ],
        "reasoning": (
            "Multiple studies and public health organizations have confirmed there is no link "
            "between vaccines and autism. Spreading this misinformation can lead to reduced "
            "immunization rates, increasing the risk of preventable disease outbreaks."
        )
    },
    {
        "statement": "Washing hands prevents the spread of diseases.",
        "isAccepted": True,
        "links": [
            {"url": "https://www.who.int", "title": "WHO: Hand Hygiene Facts"},
            {"url": "https://www.cdc.gov", "title": "CDC: Clean Hands Save Lives"},
            {"url": "https://www.nih.gov", "title": "NIH: Handwashing Research"},
            {"url": "https://www.healthline.com", "title": "Benefits of Hand Hygiene"},
            {"url": "https://www.mayoclinic.org", "title": "Mayo Clinic: Handwashing Guide"}
        ],
        "reasoning": (
            "Scientific evidence confirms that washing hands with soap and water can significantly "
            "reduce the spread of infectious diseases. It is a simple yet highly effective public health measure."
        )
    },
    {
        "statement": "5G technology spreads COVID-19.",
        "isAccepted": False,
        "links": [
            {"url": "https://www.bbc.com", "title": "5G and COVID-19 Misinformation"},
            {"url": "https://www.who.int", "title": "WHO: COVID-19 Facts"},
            {"url": "https://www.cdc.gov", "title": "CDC: Virus Transmission Overview"},
            {"url": "https://www.nature.com", "title": "Scientific Research on 5G Safety"},
            {"url": "https://www.wired.com", "title": "The 5G-COVID-19 Conspiracy Debunked"}
        ],
        "reasoning": (
            "There is no scientific evidence linking 5G networks to the spread of COVID-19. "
            "Believing in this falsehood has led to dangerous behavior, including the destruction of infrastructure and public health risks."
        )
    }
]

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

@app.route('/generate_wordcloud', methods=['POST'])
def generate_wordcloud_route():
    try:
        data = request.get_json()
        text = data.get('text', "")

        # Generate the word cloud and save to React public folder
        image_path = generate_wordcloud(text)

        # Return the relative path to the image for the frontend
        return jsonify({'image_path': '/images/wordcloud.png'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/getKeyWords', methods=['POST'])
def get_keywords_route():
    try:
        data = request.get_json()
        text = data.get('text', "")
        keywords = getKeyWords.getKeyWords(text)
        return jsonify({'fallacies': keywords})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/howToImprove', methods=['POST'])
def how_to_improve_route():
    try:
        data = request.get_json()
        text = data.get('text', "")
        howToImprove = generate_recommendations(text)
        return jsonify({'howToImprove': howToImprove})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/convertToText', methods=['POST'])
def convert_to_text():
    try:
        data = request.get_json()
        text = data.get('text', "")
        transcript = getTranscript.getTrans(text)
        howToImprove = generate_recommendations(transcript)
        return jsonify({'convertToText': howToImprove})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/dangerousStatements', methods=['POST'])
def dangerous_statements_route():
    try:
        data = request.get_json()
        text = data.get('text', "")
        dangerousStatements = statements_data
        return jsonify({'dangerousStatements': dangerousStatements})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)

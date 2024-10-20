import json
import re
import os
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

def load_recommendations():
    script_dir = os.path.dirname(__file__)
    file_path = os.path.join(script_dir, 'recommendations.json')
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def retrieve_recommendations(discourse):
    recommendations = load_recommendations()
    retrieved = []
    keywords = {
        "clarity": ["clear", "comprehensible", "understand", "clarity", "simple"],
        "pauses": ["pauses", "stop", "emphasis", "silence", "halt"],
        "eye_contact": ["gaze", "eye contact", "eyes", "visual attention"],
        "introduction": ["beginning", "start", "commence", "story", "anecdote", "introduction"],
        "statistics": ["data", "statistics", "numbers", "figures", "digits"],
        "intonation": ["tone", "intonation", "voice", "volume"],
        "body_language": ["gestures", "posture", "body", "body language", "movements"],
        "argumentation": ["argument", "reason", "evidence", "conclusion", "premise"]
    }
    for key, words in keywords.items():
        for word in words:
            if re.search(r'\b' + re.escape(word) + r'\b', discourse.lower()):
                recommendation = recommendations.get(key)
                if recommendation:
                    retrieved.append(recommendation)
    return retrieved

def generate_recommendations(discourse):
    recommendations = retrieve_recommendations(discourse)
    if recommendations:
        recommendations_context = " ".join(recommendations)
    else:
        recommendations_context = "No specific recommendations were found."

    example_prompt = (
        "Here are examples of what constitutes a speech and what does not:\n\n"
        "**Speech Example:**\n"
        "'Ladies and Gentlemen, today I want to discuss the critical importance of transitioning to renewable energy sources...'\n\n"
        "**Non-Speech Example:**\n"
        "'Hi, how are you today? I'm planning to go to the grocery store later to buy some vegetables and fruits. Do you need anything?'\n\n"
    )

    prompt_with_recommendations = (
        f"{example_prompt}\n"
        f"Analyze the following text and determine if it is a speech. "
        f"If it is a speech, provide suggestions for improvement based on the following recommendations: {recommendations_context}. "
        f"Text: {discourse}"
    )

    google_api_key = os.getenv("GOOGLE_API_KEY")
    if not google_api_key:
        return "Google API key is not set. Please set the GOOGLE_API_KEY environment variable."

    model = ChatGoogleGenerativeAI(api_key=google_api_key, model="gemini-1.5-flash")
    message = HumanMessage(content=prompt_with_recommendations)
    response = model.invoke([message]).content

    return response

if __name__ == "__main__":
    load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
    
    user_speech = input("Enter the text of the speech to receive recommendations:\n")
    result = generate_recommendations(user_speech)
    print("\nSuggested Improvements for the Speech:\n")
    print(result)

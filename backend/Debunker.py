import os
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI

def generate_debunk_response(text):
    google_api_key = os.getenv("GOOGLE_API_KEY")
    if not google_api_key:
        return "Google API key is not set. Please set the GOOGLE_API_KEY environment variable."
    
    model = ChatGoogleGenerativeAI(api_key=google_api_key, model="gemini-1.5-flash")

    prompt = (
        f"Analyze the following text and find any false or dangerous statements.\n\n"
        f"Text: {text}\n\n"
        f"For each dangerous statement, provide the following:\n"
        f"1. The statement itself.\n"
        f"2. Whether it is accepted or refuted (True or False).\n"
        f"3. An explanation of why the statement is dangerous.\n"
    )
    
    message = HumanMessage(content=prompt)
    response = model.invoke([message]).content
    
    return parse_debunk_response(response)

def parse_debunk_response(response):
    statements = response.split("\n\n")
    
    statements_data = []
    for statement_block in statements:
        if "Statement:" in statement_block and "Explanation:" in statement_block:
            statement_lines = statement_block.split("\n")
            statement = statement_lines[0].replace("Statement: ", "").strip()
            is_accepted = "True" in statement_block
            explanation = statement_lines[1].replace("Explanation: ", "").strip()
            
            statements_data.append({
                "statement": statement,
                "isAccepted": is_accepted,
                "links": [],
                "reasoning": explanation
            })
    
    return statements_data

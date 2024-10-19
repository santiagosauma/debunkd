import requests
from bs4 import BeautifulSoup

final_text = ""
long_paragraphs = []

def get_post_text(url):
    global final_text
    global long_paragraphs
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        paragraphs = soup.find_all('p')
        for paragraph in paragraphs:
            text = paragraph.get_text()
            if len(text) > 100:
                long_paragraphs.append(text)
        final_text = " ".join(long_paragraphs)
    else:
        print("Error: Unable to fetch data from the provided URL.")

def getTheText(url):
    global final_text
    get_post_text(url)
    return final_text[300:min(5000, len(final_text) - 1)]

if __name__ == "__main__":
    extracted = getTheText("https://es.wikipedia.org/wiki/Donald_Trump")
    print(extracted)
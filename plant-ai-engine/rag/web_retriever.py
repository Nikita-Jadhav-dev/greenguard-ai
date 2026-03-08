import requests
from bs4 import BeautifulSoup

def fetch_internet_data(query):

    url = f"https://www.google.com/search?q={query}+plant+disease+treatment"

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers)

    soup = BeautifulSoup(response.text, "html.parser")

    paragraphs = soup.find_all("p")

    text = ""

    for p in paragraphs[:10]:
        text += p.text + " "

    return text
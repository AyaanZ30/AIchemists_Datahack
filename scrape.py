from bs4 import BeautifulSoup
import requests

def fetch_content(topic):
    url = f'https://en.wikipedia.org/wiki/{topic}'
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        paragraphs = soup.find_all('p')
        content = [para.get_text() for para in paragraphs if len(para.get_text()) > 75]
        return content 
    except requests.exceptions.RequestException as e:
        print(f'Error : {e}')
        return []


topic = input('Enter topic : ').strip("\\/")
print(fetch_content(topic))
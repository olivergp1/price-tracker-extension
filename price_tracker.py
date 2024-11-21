import requests
from bs4 import BeautifulSoup
import time

BASE_URL = "https://www.carandclassic.com/search?listing_type_ex=advert&sort=latest&source=modal-sort"

def fetch_adverts(url):
    # Set headers to mimic a real browser
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    }

    # Fetch the page with headers
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"Failed to fetch page: {url} (Status code: {response.status_code})")
        return None
    
    # Parse the HTML
    soup = BeautifulSoup(response.text, 'html.parser')
    advert_containers = soup.find_all("article", class_="relative flex")
    
    adverts = []
    for advert in advert_containers:
        # Extract advert details
        link_tag = advert.find("a", href=True)
        if "/car/" not in link_tag['href']:
            continue  # Skip non-car adverts
        
        title = advert.find("h2").get_text(strip=True)
        price = advert.find("h3", class_="text-base font-bold normal-case tracking-normal").get_text(strip=True)
        link = link_tag['href']
        
        adverts.append({
            "title": title,
            "price": price,
            "link": link
        })
    
    return adverts

def process_pages():
    page_url = BASE_URL
    page_number = 1
    
    while True:
        print(f"Processing page {page_number}...")
        adverts = fetch_adverts(page_url)
        if not adverts:
            print("No adverts found. Stopping.")
            break
        
        # Log the adverts (in real use, you would save or compare them here)
        for advert in adverts:
            print(f"{advert['title']} - {advert['price']} - {advert['link']}")
        
        # Simulate pagination (update this to find the "next page" link)
        time.sleep(10)  # Delay to avoid being flagged as a bot
        page_number += 1

if __name__ == "__main__":
    process_pages()

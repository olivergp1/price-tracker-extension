import requests
from bs4 import BeautifulSoup
import time
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
print("Initializing Firebase...")
try:
    cred = credentials.Certificate("firebase_credentials.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("Firebase initialized successfully!")
except Exception as e:
    print(f"Error initializing Firebase: {e}")
    exit(1)

# Base URL for scraping
BASE_URL = "https://www.carandclassic.com/search?listing_type_ex=advert&page={}&sort=latest&source=modal-sort"

# Maximum number of pages to process
MAX_PAGES = 250

def fetch_adverts(url):
    print(f"Fetching adverts from URL: {url}")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    }

    try:
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            print(f"Failed to fetch page: {url} (Status code: {response.status_code})")
            return None, False, False
    except Exception as e:
        print(f"Error fetching URL {url}: {e}")
        return None, False, True

    soup = BeautifulSoup(response.text, 'html.parser')
    page_text = soup.get_text().lower()

    if "0 listings" in page_text:
        print(f"No more listings found at {url}. Stopping.")
        return None, True, False
    if "our technical team has been informed" in page_text:
        print(f"Website error detected at {url}. Stopping.")
        return None, True, True

    advert_containers = soup.find_all("article", class_="relative flex")
    print(f"Found {len(advert_containers)} advert containers on page {url}.")

    adverts = []
    for advert in advert_containers:
        try:
            link_tag = advert.find("a", href=True)
            if "/car/" not in link_tag['href']:
                continue
            title = advert.find("h2").get_text(strip=True)
            price = advert.find("h3", class_="text-base font-bold normal-case tracking-normal").get_text(strip=True)
            link = link_tag['href']
            id = link.replace("/", "_") + "_" + str(hash(link))
            adverts.append({
                "link": link,
                "id": id,
                "title": title,
                "current_price": price
            })
        except Exception as e:
            print(f"Error parsing advert container: {e}")

    print(f"Extracted {len(adverts)} adverts from page {url}.")
    return adverts, False, False

def save_to_firestore(adverts):
    for advert in adverts:
        try:
            print(f"Attempting to save document: {advert['id']} ({advert['link']})")
            doc_ref = db.collection("adverts").document(advert['id'])

            doc_ref.set({
                "link": advert["link"],
                "title": advert["title"],
                "current_price": advert["current_price"],
                "advertised_date": datetime.now().strftime("%Y-%m-%d"),
                "price_history": [
                    {
                        "date": datetime.now().strftime("%Y-%m-%d"),
                        "price": advert["current_price"]
                    }
                ]
            })
            print(f"Successfully saved document: {advert['id']}")
        except Exception as e:
            print(f"Error saving document {advert['id']} ({advert['link']}): {e}")

def process_pages():
    print("Starting to process pages...")
    page_number = 1
    stop = False
    error_detected = False

    while not stop:
        page_url = BASE_URL.format(page_number)
        print(f"Processing page {page_number}: {page_url}")
        adverts, stop, error_detected = fetch_adverts(page_url)

        if adverts:
            print(f"Fetched {len(adverts)} adverts from page {page_number}. Sending to Firestore...")
            save_to_firestore(adverts)
        else:
            print(f"No adverts found on page {page_number}.")

        if page_number >= MAX_PAGES:
            print(f"Reached the maximum page limit ({MAX_PAGES}). Stopping.")
            stop = True

        page_number += 1
        time.sleep(10)

    if error_detected:
        print("Stopped due to a website error.")
    else:
        print("Finished processing all pages.")

if __name__ == "__main__":
    print("Script started...")
    try:
        process_pages()
    except Exception as e:
        print(f"Unexpected error occurred: {e}")

import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from datetime import datetime, timedelta
import time

# Set up Selenium with ChromeDriver
options = Options()
options.add_argument("--headless")  # Run Chrome in headless mode
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()), options=options
)

# List of movie URLs to scrape
movies = [
    {"title": "Inception", "url": "https://letterboxd.com/film/inception/"},
    {"title": "Get Out", "url": "https://letterboxd.com/film/get-out-2017/"},
    {"title": "Joker", "url": "https://letterboxd.com/film/joker-2019/"},
    {"title": "Barbie", "url": "https://letterboxd.com/film/barbie/"},
]

# List to store scraped data
movie_data = []


# Function to scrape data for a single movie
def scrape_movie(movie, release_date):
    driver.get(movie["url"])
    time.sleep(3)  # Wait for the page to load

    # Initialize dictionary to hold movie details
    movie_details = {
        "title": movie["title"],
        "director": None,
        "average_rating": None,
        "top_reviewer": None,
        "top_review_rating": None,
        "top_review_text": None,
        "release_date": release_date.strftime("%Y-%m-%d"),  # Format date as a string
    }

    try:
        # Scrape the director's name
        movie_details["director"] = driver.find_element(
            By.CSS_SELECTOR, "a[href*='/director/']"
        ).text
    except Exception as e:
        print(f"Error scraping director for {movie['title']}: {e}")

    try:
        # Scrape the average rating
        movie_details["average_rating"] = float(
            driver.find_element(By.CSS_SELECTOR, ".average-rating").text
        )
    except Exception as e:
        print(f"Error scraping average rating for {movie['title']}: {e}")

    try:
        # Scroll down to load reviews
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)  # Wait for reviews to load

        # Find the top review element
        top_review_element = driver.find_element(
            By.CSS_SELECTOR, "#popular-reviews .film-detail"
        )

        # Extract the reviewer's name
        movie_details["top_reviewer"] = top_review_element.find_element(
            By.CSS_SELECTOR, ".name"
        ).text

        # Extract the review rating and convert it to a float
        review_rating_raw = top_review_element.find_element(
            By.CSS_SELECTOR, ".rating"
        ).text
        if "½" in review_rating_raw:
            movie_details["top_review_rating"] = (
                float(review_rating_raw.count("★")) + 0.5
            )
        else:
            movie_details["top_review_rating"] = float(review_rating_raw.count("★"))

        # Extract the review text
        movie_details["top_review_text"] = top_review_element.find_element(
            By.CSS_SELECTOR, ".body-text"
        ).text

    except Exception as e:
        print(f"Error scraping top review for {movie['title']}: {e}")

    # Add movie details to the list
    movie_data.append(movie_details)


# Calculate today's date
start_date = datetime.now().date()

# Scrape data for each movie in the list with an incremented date
for index, movie in enumerate(movies):
    release_date = start_date + timedelta(days=index)  # Increment date for each movie
    scrape_movie(movie, release_date)

# Save the data to a CSV file
df = pd.DataFrame(movie_data)
df.to_csv("movies_data.csv", index=False)

# Close the browser
driver.quit()

print("Scraping completed. Data saved to movies_data.csv.")

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

# page to scrape
page = 3

# csv for page
csv_file = f"popular_films_{page}.csv"

# Read the CSV file into a DataFrame
movies_df = pd.read_csv(csv_file)
# Convert the DataFrame into a list of dictionaries
movies = movies_df.to_dict(orient="records")

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
        "genre_1": None,
        "genre_2": None,
        "actors": None,
        "movie_release": None,  # Actual release year of the movie
        "average_rating": None,
        "top_reviewer": None,
        "top_review_rating": 0,  # Default rating to 0 in case it's missing
        "top_review_text": None,
        "poster_url": None,
        "release_date": release_date.strftime("%Y-%m-%d"),  # Incremented release date
    }

    try:
        # Scrape the director's name
        movie_details["director"] = driver.find_element(
            By.CSS_SELECTOR, "a[href*='/director/']"
        ).text
    except Exception as e:
        print(f"Error scraping director for {movie['title']}: {e}")

    try:
        # Scrape the actual movie release year
        release_year_element = driver.find_element(By.CSS_SELECTOR, ".releaseyear a")
        release_year_text = release_year_element.text.strip()
        movie_details["movie_release"] = int(release_year_text)
    except Exception as e:
        print(f"Error scraping release year for {movie['title']}: {e}")

    try:
        # Scrape the poster URL
        movie_details["poster_url"] = driver.find_element(
            By.CSS_SELECTOR, ".film-poster img"
        ).get_attribute("src")
    except Exception as e:
        print(f"Error scraping poster URL for {movie['title']}: {e}")

    try:
        # Scrape the first actor's name
        movie_details["actors"] = driver.find_element(
            By.CSS_SELECTOR, "a[href*='/actor/']"
        ).text
    except Exception as e:
        print(f"Error scraping actors for {movie['title']}: {e}")

    try:
        genres_tab_link = driver.find_element(By.CSS_SELECTOR, "a[data-id='genres']")
        driver.execute_script("arguments[0].scrollIntoView(true);", genres_tab_link)
        time.sleep(1)  # Allow the browser to scroll
        genres_tab_link.click()
        time.sleep(2)  # Wait for content to load
    except Exception as e:
        print(f"Error clicking on genres tab for {movie['title']}: {e}")

    try:
        # Click on the "Genres" tab
        genres_tab_link = driver.find_element(By.CSS_SELECTOR, "a[data-id='genres']")
        genres_tab_link.click()
        time.sleep(2)  # Wait for the content to load after clicking

        # Locate the genres section within the tab
        genres_tab_content = driver.find_element(
            By.CSS_SELECTOR, "#tab-genres .text-sluglist p"
        )

        # Find all <a> elements within the genres section
        genre_links = genres_tab_content.find_elements(By.CSS_SELECTOR, "a.text-slug")

        # Extract the text content of each <a> element
        genres = [link.text for link in genre_links]

        # Assign the first two genres to `genre_1` and `genre_2`
        movie_details["genre_1"] = genres[0] if len(genres) > 0 else None
        movie_details["genre_2"] = genres[1] if len(genres) > 1 else None

    except Exception as e:
        print(f"Error scraping genres for {movie['title']}: {e}")

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

        # get all 3 top reviews
        top_review_elements = driver.find_elements(
            By.CSS_SELECTOR, "#popular-reviews .film-detail-content"
        )

        # loop through all top reviews
        for top_review_element in top_review_elements:
            try:
                if top_review_element.find_element(
                    By.CSS_SELECTOR, ".contains-spoilers"
                ):
                    continue
            except Exception:
                pass

            # Create a new dictionary for each review
            review_details = {
                "title": movie["title"],
                "director": movie_details["director"],
                "genre_1": movie_details["genre_1"],
                "genre_2": movie_details["genre_2"],
                "actors": movie_details["actors"],
                "movie_release": movie_details["movie_release"],
                "average_rating": movie_details["average_rating"],
                "top_reviewer": None,
                "top_review_rating": 0,  # Default rating to 0 in case it's missing
                "top_review_text": None,
                "poster_url": movie_details["poster_url"],
                "release_date": movie_details["release_date"],
            }

            # Extract the reviewer's name
            review_details["top_reviewer"] = top_review_element.find_element(
                By.CSS_SELECTOR, ".name"
            ).text

            # Try to extract the review rating
            try:
                review_rating_raw = top_review_element.find_element(
                    By.CSS_SELECTOR, ".rating"
                ).text
                if "½" in review_rating_raw:
                    review_details["top_review_rating"] = (
                        float(review_rating_raw.count("★")) + 0.5
                    )
                else:
                    review_details["top_review_rating"] = float(
                        review_rating_raw.count("★")
                    )
            except Exception:
                review_details["top_review_rating"] = 0

            # Extract the review text
            review_details["top_review_text"] = top_review_element.find_element(
                By.CSS_SELECTOR, ".body-text"
            ).text

            # Skip review if it contains movie name
            if movie["title"].lower() in review_details["top_review_text"].lower():
                continue

            # Skip review if it is too long
            if len(review_details["top_review_text"]) > 500:
                continue

            # Append the new dictionary to the list
            movie_data.append(review_details)

    except Exception as e:
        print(f"Error scraping top review for {movie['title']}: {e}")


# Calculate today's date
start_date = datetime.now().date()

# Scrape data for each movie in the list with an incremented date
for index, movie in enumerate(movies):
    release_date = start_date + timedelta(days=index)  # Increment date for each movie
    scrape_movie(movie, release_date)

# Save the data to a CSV file for that page
df = pd.DataFrame(movie_data)
df.to_csv(f"movies_data_{page}.csv", index=False)

# Close the browser
driver.quit()

# Print a message to indicate that the script has finished
print(f"Data has been scraped and saved to movies_data_{page}.csv.")

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up the WebDriver (Chrome) with headless mode
options = Options()
options.add_argument("--headless")  # Run in headless mode
options.add_argument("--disable-web-security")
options.add_argument("--ignore-certificate-errors")
options.add_argument("--allow-running-insecure-content")

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()), options=options
)

# Define the Letterboxd movie URL (change this URL to the movie you want to scrape)
movie_url = "https://letterboxd.com/film/inception/"
driver.get(movie_url)

# Scrape the movie name
try:
    movie_name = driver.find_element(By.CSS_SELECTOR, "h1.headline-1").text
except Exception as e:
    movie_name = "N/A"
    print(f"Error scraping movie name: {e}")

# Scrape the director's name
try:
    director = driver.find_element(By.CSS_SELECTOR, "a[href*='/director/']").text
except Exception as e:
    director = "N/A"
    print(f"Error scraping director's name: {e}")

# Scrape the average rating
try:
    average_rating = driver.find_element(By.CSS_SELECTOR, ".average-rating").text
except Exception as e:
    average_rating = "N/A"
    print(f"Error scraping average rating: {e}")

# Scrape the top popular review
try:
    # Scroll down to load the reviews section
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait for the popular reviews section to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.CSS_SELECTOR, "#popular-reviews .film-detail")
        )
    )

    # Find the top review element
    top_review_element = driver.find_element(
        By.CSS_SELECTOR, "#popular-reviews .film-detail"
    )

    # Extract the reviewer's name
    reviewer_name = top_review_element.find_element(By.CSS_SELECTOR, ".name").text

    # Extract the review rating and convert it to a float
    review_rating_raw = top_review_element.find_element(By.CSS_SELECTOR, ".rating").text
    if "½" in review_rating_raw:
        review_rating = float(review_rating_raw.count("★")) + 0.5
    else:
        review_rating = float(review_rating_raw.count("★"))

    # Extract the review text
    review_text = top_review_element.find_element(By.CSS_SELECTOR, ".body-text").text

except Exception as e:
    reviewer_name = "N/A"
    review_rating = "N/A"
    review_text = "N/A"
    print(f"Error scraping top review: {e}")

# Output the results
print(f"Movie Name: {movie_name}")
print(f"Director: {director}")
print(f"Average Rating: {average_rating}")
print(f"Top Reviewer: {reviewer_name}")
print(f"Top Review Rating: {review_rating}")
print(f"Top Review Text: {review_text}")

# Close the browser
driver.quit()

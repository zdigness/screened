import os
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up Selenium with ChromeDriver
options = Options()
options.add_argument("--headless")  # Run Chrome in headless mode
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()), options=options
)

# Open the Letterboxd popular films page
url = "https://letterboxd.com/films/popular/page/3/"
driver.get(url)

# Wait for the page to load
wait = WebDriverWait(driver, 10)

try:
    posters = driver.find_elements(By.CLASS_NAME, "poster-container")

    films = []

    for poster in posters:
        # Get the movie title and URL
        title = poster.find_element(By.CLASS_NAME, "film-poster").get_attribute(
            "data-film-name"
        )
        url = poster.find_element(By.CLASS_NAME, "film-poster").get_attribute(
            "data-film-link"
        )

        url = f"https://letterboxd.com{url}"

        # Append the movie details to the list
        films.append({"title": title, "url": url})

    # Convert new films to a DataFrame
    new_data = pd.DataFrame(films)

    # Path to the CSV file
    csv_file = "server/config/init/popular_films.csv"

    if os.path.exists(csv_file):
        # If the file exists, read the existing data
        existing_data = pd.read_csv(csv_file)

        # Combine new data with existing data
        combined_data = pd.concat([existing_data, new_data]).drop_duplicates(
            subset=["title"], keep="last"
        )
    else:
        # If the file does not exist, use the new data as the dataset
        combined_data = new_data

    # Save the updated data back to the file
    combined_data.to_csv(csv_file, index=False)

    print(f"Data has been appended to {csv_file}.")

finally:
    # Close the browser
    driver.quit()

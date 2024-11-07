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
url = "https://letterboxd.com/films/popular/"
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

    # export to csv
    with open("popular_films.csv", "w") as f:
        f.write("title,url\n")
        for film in films:
            f.write(f"{film['title']},{film['url']}\n")

finally:
    # Close the browser
    driver.quit()

import pandas as pd
import random
from datetime import datetime, timedelta

# Input and output file paths
input_file = "10pages.csv"
output_file = "movie_data.csv"

# Load the input CSV
movies_df = pd.read_csv(input_file)

# Start with tomorrow's date
start_date = datetime.now().date() + timedelta(days=1)

# Create a list of dates to assign, incrementing by 1 day
date_list = [(start_date + timedelta(days=i)) for i in range(len(movies_df))]

# Shuffle the DataFrame rows randomly
randomized_rows = movies_df.sample(
    frac=1, random_state=random.randint(0, 1000)
).reset_index(drop=True)

# Assign the shuffled dates to the randomized rows
randomized_rows["release_date"] = date_list

# Save the updated DataFrame to a new CSV file
randomized_rows.to_csv(output_file, index=False)

print(f"Randomized movies with unique dates have been saved to {output_file}")

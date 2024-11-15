import pandas as pd


def randomize_csv_and_swap_dates(input_csv_path, output_csv_path):
    """
    Randomize the rows of a CSV file and shuffle the last column (dates) among rows.

    Args:
        input_csv_path (str): Path to the input CSV file.
        output_csv_path (str): Path to the output CSV file.
    """
    try:
        # Read the CSV into a DataFrame
        df = pd.read_csv(input_csv_path)

        # Ensure there are at least two rows to swap
        if len(df) < 2:
            print("Not enough rows to randomize and swap dates.")
            return

        # Shuffle the rows randomly
        randomized_df = df.sample(frac=1, random_state=None).reset_index(drop=True)

        # Extract the last column (assumed to be `release_date`)
        last_column = randomized_df.columns[-1]

        # Shuffle the `release_date` column separately
        shuffled_dates = (
            randomized_df[last_column]
            .sample(frac=1, random_state=None)
            .reset_index(drop=True)
        )

        # Replace the `release_date` column in the randomized DataFrame with the shuffled dates
        randomized_df[last_column] = shuffled_dates

        # Save the randomized DataFrame with swapped dates to a new CSV file
        randomized_df.to_csv(output_csv_path, index=False)

        print(f"Randomized CSV with swapped dates saved to {output_csv_path}")
    except Exception as e:
        print(f"Error randomizing CSV and swapping dates: {e}")


if __name__ == "__main__":
    # Define the input and output CSV file paths
    input_csv = "server/config/init/movies_data.csv"
    output_csv = input_csv  # Overwrite the input file with the randomized data

    # Randomize the CSV and swap the dates
    randomize_csv_and_swap_dates(input_csv, output_csv)

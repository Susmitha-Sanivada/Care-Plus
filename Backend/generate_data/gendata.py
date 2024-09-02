import json
import random
from faker import Faker

# Initialize Faker for generating fake data
fake = Faker()

# Function to generate JSON data for tests
def generate_test_data():
    # Load test data from a file
    with open('test_data.json') as f:
        test_data = json.load(f)
    return test_data

# Generate records
def generate_records(num_records, num_months):
    records = []

    test_data = generate_test_data()

    for _ in range(num_records * num_months):
        # Generate basic details
        name = fake.name()
        mobile = fake.random_number(digits=10, fix_len=True)  # Generate numeric-only mobile number
        email = fake.email()
        gender = random.choice(['Male', 'Female'])
        registered_date = fake.date_time_between(start_date="-3y", end_date="now").isoformat()

        # Randomly select 2-3 unique tests
        num_tests = random.randint(2, 3)
        selected_tests = random.sample(test_data, num_tests)

        # Convert test data to match the schema format
        tests = [{
            "TestName": test['TestName'],
            "Cost": test['Cost'],
            "Duration": test['Duration'],
        } for test in selected_tests]

        # Generate other fields with default values
        report_status = True  # Set default to True
        payment_status = True  # Set default to True
        collection_status = True  # Set default to True

        # Calculate total amount and max duration for selected tests
        total_amount = sum(test['Cost'] for test in selected_tests)
        max_duration = max(test['Duration'] for test in selected_tests)

        # Construct record
        record = {
            "Name": name,
            "Mobile": str(mobile),  # Ensure mobile is a string
            "Email": email,
            "Gender": gender,
            "Registered_Date": registered_date,
            "Tests": tests,
            "Amount": total_amount,
            "Duration": max_duration,
            "Report_Status": report_status,
            "Payment_Status": payment_status,
            "Collection_Status": collection_status
        }

        records.append(record)

    return records

# Example usage
num_records_per_month = 100
num_months = 3
records = generate_records(num_records_per_month, num_months)

# Output JSON data
with open('records_data.json', 'w') as f:
    json.dump(records, f, indent=4)

print(f"Generated {num_records_per_month * num_months} records.")

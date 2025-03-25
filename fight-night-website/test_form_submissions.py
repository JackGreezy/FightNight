import requests
import json
import time
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# API URL - change this to your actual API URL when deployed
API_URL = "http://localhost:5000"

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["white_collar_fight_night"]

def test_email_signup():
    print("\n=== Testing Email Signup ===")
    
    # Generate a unique email to avoid duplicate errors
    test_email = f"test_{int(time.time())}@example.com"
    
    # Prepare data
    data = {
        "email": test_email
    }
    
    # Send request to API
    try:
        response = requests.post(f"{API_URL}/api/email-signup", json=data)
        result = response.json()
        
        print(f"API Response: {result}")
        
        if result.get("success"):
            # Verify data was saved to MongoDB
            saved_email = db.email_list.find_one({"email": test_email})
            
            if saved_email:
                print(f"✅ SUCCESS: Email saved to database with ID: {saved_email['_id']}")
                
                # Clean up - delete the test email
                db.email_list.delete_one({"_id": saved_email['_id']})
                print("Test email deleted from database")
            else:
                print("❌ ERROR: Email not found in database")
        else:
            print(f"❌ ERROR: API request failed: {result.get('message')}")
    except Exception as e:
        print(f"❌ ERROR: Exception occurred: {e}")

def test_fighter_application():
    print("\n=== Testing Fighter Application ===")
    
    # Generate a unique email to avoid duplicate errors
    test_email = f"fighter_{int(time.time())}@example.com"
    
    # Prepare data
    data = {
        "firstName": "Test",
        "lastName": "Fighter",
        "email": test_email,
        "phone": "1234567890",
        "jobCompany": "Test Company",
        "weight": "180",
        "height": "72",
        "experience": "0",
        "why": "Testing the application form",
        "charity": "Test Charity"
    }
    
    # Send request to API
    try:
        response = requests.post(f"{API_URL}/api/fighter-application", json=data)
        result = response.json()
        
        print(f"API Response: {result}")
        
        if result.get("success"):
            # Verify data was saved to MongoDB
            saved_application = db.fighter_applications.find_one({"email": test_email})
            
            if saved_application:
                print(f"✅ SUCCESS: Fighter application saved to database with ID: {saved_application['_id']}")
                
                # Clean up - delete the test application
                db.fighter_applications.delete_one({"_id": saved_application['_id']})
                print("Test fighter application deleted from database")
            else:
                print("❌ ERROR: Fighter application not found in database")
        else:
            print(f"❌ ERROR: API request failed: {result.get('message')}")
    except Exception as e:
        print(f"❌ ERROR: Exception occurred: {e}")

def test_fighter_nomination():
    print("\n=== Testing Fighter Nomination ===")
    
    # Generate unique emails to avoid duplicate errors
    nominator_email = f"nominator_{int(time.time())}@example.com"
    nominee_email = f"nominee_{int(time.time())}@example.com"
    
    # Prepare data
    data = {
        "yourName": "Test Nominator",
        "yourEmail": nominator_email,
        "nomineeName": "Test Nominee",
        "nomineeEmail": nominee_email,
        "nomineePhone": "9876543210",
        "reason": "Testing the nomination form"
    }
    
    # Send request to API
    try:
        response = requests.post(f"{API_URL}/api/fighter-nomination", json=data)
        result = response.json()
        
        print(f"API Response: {result}")
        
        if result.get("success"):
            # Verify data was saved to MongoDB
            saved_nomination = db.fighter_nominations.find_one({"yourEmail": nominator_email})
            
            if saved_nomination:
                print(f"✅ SUCCESS: Fighter nomination saved to database with ID: {saved_nomination['_id']}")
                
                # Clean up - delete the test nomination
                db.fighter_nominations.delete_one({"_id": saved_nomination['_id']})
                print("Test fighter nomination deleted from database")
            else:
                print("❌ ERROR: Fighter nomination not found in database")
        else:
            print(f"❌ ERROR: API request failed: {result.get('message')}")
    except Exception as e:
        print(f"❌ ERROR: Exception occurred: {e}")

def verify_frontend_api_url():
    print("\n=== Verifying Frontend API URL Configuration ===")
    
    # Check if the NEXT_PUBLIC_API_URL environment variable is set
    api_url = os.getenv("NEXT_PUBLIC_API_URL")
    
    if api_url:
        print(f"✅ NEXT_PUBLIC_API_URL is set to: {api_url}")
    else:
        print("❌ NEXT_PUBLIC_API_URL environment variable is not set")
        print("Please set this variable to ensure your frontend can connect to your API")

if __name__ == "__main__":
    print("Starting form submission tests...")
    
    # First verify the API is running
    try:
        response = requests.get(f"{API_URL}/api/admin/email-list")
        if response.status_code == 200:
            print("✅ API is running and accessible")
        else:
            print(f"❌ API returned status code {response.status_code}")
            print("Please make sure your Flask API is running")
            exit(1)
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the API")
        print("Please make sure your Flask API is running at", API_URL)
        exit(1)
    
    # Run tests
    test_email_signup()
    test_fighter_application()
    test_fighter_nomination()
    verify_frontend_api_url()
    
    print("\nAll tests completed!")


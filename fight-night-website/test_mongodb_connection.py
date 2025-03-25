from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def test_connection():
    # Get MongoDB URI from environment variables
    mongo_uri = os.getenv("MONGO_URI")
    
    if not mongo_uri:
        print("Error: MONGO_URI environment variable not set")
        return False
    
    try:
        # Connect to MongoDB
        client = MongoClient(mongo_uri)
        
        # Test the connection by listing database names
        db_names = client.list_database_names()
        print(f"Successfully connected to MongoDB Atlas!")
        print(f"Available databases: {db_names}")
        
        # Access our database
        db = client["white_collar_fight_night"]
        
        # List collections
        collections = db.list_collection_names()
        print(f"Collections in white_collar_fight_night database: {collections}")
        
        # Insert a test document
        test_collection = db["test"]
        test_doc = {"name": "Test Document", "purpose": "Connection Test"}
        result = test_collection.insert_one(test_doc)
        
        print(f"Inserted test document with ID: {result.inserted_id}")
        
        # Clean up - delete the test document
        test_collection.delete_one({"_id": result.inserted_id})
        print("Test document deleted")
        
        return True
    except Exception as e:
        print(f"Error connecting to MongoDB Atlas: {e}")
        return False

if __name__ == "__main__":
    test_connection()


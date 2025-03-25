#!/usr/bin/env python3
"""
Check if the Flask API is running and accessible
"""

import socket
import requests
import sys
import os
import time
import subprocess

def check_port_in_use(port):
    """Check if a port is in use"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def check_api_health(url):
    """Check if the API health endpoint is accessible"""
    try:
        response = requests.get(f"{url}/api/health", timeout=5)
        if response.status_code == 200:
            print(f"✅ API is running at {url}")
            return True
        else:
            print(f"❌ API returned status code {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print(f"❌ Cannot connect to API at {url}")
        return False
    except Exception as e:
        print(f"❌ Error checking API: {e}")
        return False

def start_flask_api():
    """Attempt to start the Flask API if it's not running"""
    print("Attempting to start Flask API...")
    
    # Check if app.py exists
    if not os.path.exists("app.py"):
        print("❌ app.py not found in current directory")
        return False
    
    try:
        # Start Flask API in a new process
        process = subprocess.Popen(
            ["python", "app.py"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Wait a bit for the server to start
        print("Waiting for Flask API to start...")
        time.sleep(3)
        
        # Check if process is still running
        if process.poll() is None:
            print("✅ Flask API started successfully")
            return True
        else:
            stdout, stderr = process.communicate()
            print(f"❌ Flask API failed to start")
            print(f"Error: {stderr}")
            return False
    except Exception as e:
        print(f"❌ Error starting Flask API: {e}")
        return False

def main():
    """Main function"""
    port = 5000
    api_url = "http://localhost:5000"
    
    print("Checking if Flask API is running...")
    
    # Check if port is in use
    if check_port_in_use(port):
        print(f"✅ Port {port} is in use")
        # Check if it's our API
        if check_api_health(api_url):
            print("✅ Flask API is running and healthy")
        else:
            print(f"❌ Port {port} is in use but API health check failed")
            print(f"   Something else might be using port {port}")
    else:
        print(f"❌ Port {port} is not in use")
        print("   Flask API is not running")
        
        # Try to start the API
        if start_flask_api():
            # Check again after starting
            if check_api_health(api_url):
                print("✅ Flask API is now running and healthy")
            else:
                print("❌ Flask API started but health check failed")
        else:
            print("❌ Could not start Flask API")
    
    print("\nTroubleshooting tips:")
    print("1. Make sure your Flask API is running with 'python app.py'")
    print("2. Check that CORS is properly configured in your Flask app")
    print("3. Verify your frontend is using the correct API URL (http://localhost:5000)")
    print("4. Check the Flask server logs for any errors")

if __name__ == "__main__":
    main()


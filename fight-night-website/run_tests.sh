#!/bin/bash

# Make sure the API is running
if ! curl -s http://localhost:5000/api/admin/email-list > /dev/null; then
  echo "Starting API server..."
  python app.py &
  API_PID=$!
  # Give the API time to start
  sleep 2
  echo "API server started with PID: $API_PID"
else
  echo "API server is already running"
  API_PID=""
fi

# Run the tests
echo "Running form submission tests..."
python test_form_submissions.py

# If we started the API, stop it
if [ -n "$API_PID" ]; then
  echo "Stopping API server (PID: $API_PID)..."
  kill $API_PID
fi

echo "Tests completed!"


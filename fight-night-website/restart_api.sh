#!/bin/bash

# Kill any existing Flask processes
echo "Stopping any running Flask processes..."
pkill -f "python app.py" || echo "No Flask processes found"

# Start the Flask API
echo "Starting Flask API..."
python app.py &

echo "Flask API restarted. Check for any errors in the output."


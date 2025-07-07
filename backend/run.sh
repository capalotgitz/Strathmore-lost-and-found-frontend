#!/bin/bash

# Strathmore Lost & Found Backend Startup Script

echo "Starting Strathmore Lost & Found Backend..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Create uploads directory
mkdir -p uploads

# Set environment variables
export FLASK_APP=app.py
export FLASK_ENV=development

# Initialize database
echo "Initializing database..."
python -c "from app import app, db; app.app_context().push(); db.create_all(); print('Database initialized!')"

# Start the Flask application
echo "Starting Flask server on http://localhost:5000"
python app.py

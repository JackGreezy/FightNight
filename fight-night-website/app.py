from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re
import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Allow all origins for now to debug
CORS(app, origins="*", supports_credentials=True, allow_headers=["Content-Type", "Authorization", "Accept"])

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["white_collar_fight_night"]
fighter_applications = db["fighter_applications"]
fighter_nominations = db["fighter_nominations"]
email_list = db["email_list"]

# Email configuration
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER", "your-email@gmail.com")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your-app-password")
FROM_EMAIL = os.getenv("FROM_EMAIL", "info@texasfightcollective.com")

# Validation functions
def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_phone(phone):
    """Validate phone number (10 digits)"""
    # Remove any non-digit characters
    digits_only = re.sub(r'\D', '', phone)
    return len(digits_only) == 10

def send_email(to_email, subject, html_content):
    """Send an email using SMTP"""
    try:
        msg = MIMEMultipart()
        msg['From'] = FROM_EMAIL
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MIMEText(html_content, 'html'))
        
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify API is running"""
    return jsonify({
        "status": "ok",
        "message": "API is running",
        "timestamp": datetime.datetime.utcnow().isoformat()
    })

# Root endpoint for Vercel
@app.route('/', methods=['GET'])
def root():
    """Root endpoint for Vercel deployment"""
    return jsonify({
        "status": "ok",
        "message": "White Collar Fight Night API is running",
        "endpoints": [
            "/api/health",
            "/api/fighter-application",
            "/api/fighter-nomination",
            "/api/email-signup"
        ]
    })

# Add this simple test endpoint to your app.py
@app.route('/test', methods=['GET'])
def test():
    """Simple test endpoint"""
    return jsonify({
        "message": "Test endpoint working",
        "cors": "If you can see this, CORS is configured correctly"
    })

# API Routes
@app.route('/api/fighter-application', methods=['POST'])
def submit_fighter_application():
    data = request.json
    
    # Validate required fields
    required_fields = ['firstName', 'lastName', 'email', 'phone', 'jobCompany', 
                      'weight', 'height', 'experience', 'why']
    
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"success": False, "message": f"Missing required field: {field}"}), 400
    
    # Validate email and phone
    if not validate_email(data['email']):
        return jsonify({"success": False, "message": "Invalid email format"}), 400
    
    if not validate_phone(data['phone']):
        return jsonify({"success": False, "message": "Phone number must be 10 digits"}), 400
    
    # Add timestamp
    data['created_at'] = datetime.datetime.utcnow()
    
    # Insert into database
    result = fighter_applications.insert_one(data)
    
    # Send confirmation email
    html_content = f"""
    <html>
    <body>
        <h2>Thank You for Your Fighter Application!</h2>
        <p>Dear {data['firstName']} {data['lastName']},</p>
        <p>We've received your application to participate in the White Collar Fight Night. 
        Our team will review your information and get back to you soon with next steps.</p>
        
        <h3>Your Application Details:</h3>
        <ul>
            <li><strong>Name:</strong> {data['firstName']} {data['lastName']}</li>
            <li><strong>Email:</strong> {data['email']}</li>
            <li><strong>Phone:</strong> {data['phone']}</li>
            <li><strong>Job/Company:</strong> {data['jobCompany']}</li>
            <li><strong>Weight:</strong> {data['weight']} lbs</li>
            <li><strong>Height:</strong> {data['height']} inches</li>
        </ul>
        
        <p>If you have any questions, please don't hesitate to contact us at info@texasfightcollective.com.</p>
        
        <p>Best regards,<br>
        The Texas Fight Collective Team</p>
    </body>
    </html>
    """
    
    email_sent = send_email(data['email'], "Your White Collar Fight Night Application", html_content)
    
    return jsonify({
        "success": True, 
        "message": "Fighter application submitted successfully",
        "id": str(result.inserted_id),
        "email_sent": email_sent
    })

@app.route('/api/fighter-nomination', methods=['POST'])
def submit_fighter_nomination():
    data = request.json
    
    # Validate required fields
    required_fields = ['yourName', 'yourEmail', 'nomineeName', 'nomineeEmail', 'reason']
    
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"success": False, "message": f"Missing required field: {field}"}), 400
    
    # Validate emails
    if not validate_email(data['yourEmail']):
        return jsonify({"success": False, "message": "Invalid nominator email format"}), 400
    
    if not validate_email(data['nomineeEmail']):
        return jsonify({"success": False, "message": "Invalid nominee email format"}), 400
    
    # Add timestamp
    data['created_at'] = datetime.datetime.utcnow()
    
    # Insert into database
    result = fighter_nominations.insert_one(data)
    
    # Send confirmation email to nominator
    nominator_html = f"""
    <html>
    <body>
        <h2>Thank You for Your Fighter Nomination!</h2>
        <p>Dear {data['yourName']},</p>
        <p>We've received your nomination of {data['nomineeName']} for the White Collar Fight Night. 
        Our team will review the nomination and reach out to them soon.</p>
        
        <p>Thank you for helping us find great participants for our event!</p>
        
        <p>Best regards,<br>
        The Texas Fight Collective Team</p>
    </body>
    </html>
    """
    
    nominator_email_sent = send_email(data['yourEmail'], "Your White Collar Fight Night Nomination", nominator_html)
    
    # Send notification email to nominee
    nominee_html = f"""
    <html>
    <body>
        <h2>You've Been Nominated for White Collar Fight Night!</h2>
        <p>Dear {data['nomineeName']},</p>
        <p>Good news! {data['yourName']} has nominated you to participate in Austin's White Collar Fight Night boxing event.</p>
        
        <p>White Collar Fight Night brings together professionals from various industries to step into the ring
        for charity. Our events showcase the determination and courage of everyday people who train for months
        to compete in a safe, regulated boxing environment.</p>
        
        <p>If you're interested in participating, please visit our website at texasfightcollective.com to learn more and submit an application.</p>
        
        <p>Best regards,<br>
        The Texas Fight Collective Team</p>
    </body>
    </html>
    """
    
    nominee_email_sent = send_email(data['nomineeEmail'], "You've Been Nominated for White Collar Fight Night", nominee_html)
    
    return jsonify({
        "success": True, 
        "message": "Fighter nomination submitted successfully",
        "id": str(result.inserted_id),
        "nominator_email_sent": nominator_email_sent,
        "nominee_email_sent": nominee_email_sent
    })

@app.route('/api/email-signup', methods=['POST'])
def submit_email_signup():
    data = request.json
    
    # Validate email
    if 'email' not in data or not data['email']:
        return jsonify({"success": False, "message": "Email is required"}), 400
    
    if not validate_email(data['email']):
        return jsonify({"success": False, "message": "Invalid email format"}), 400
    
    # Check if email already exists
    existing_email = email_list.find_one({"email": data['email']})
    if existing_email:
        return jsonify({"success": False, "message": "Email already registered"}), 400
    
    # Add timestamp
    data['created_at'] = datetime.datetime.utcnow()
    
    # Insert into database
    result = email_list.insert_one(data)
    
    # Send confirmation email
    html_content = f"""
    <html>
    <body>
        <h2>Welcome to the White Collar Fight Night Mailing List!</h2>
        <p>Thank you for signing up to receive updates about White Collar Fight Night events in Austin, Texas.</p>
        
        <p>We'll keep you informed about:</p>
        <ul>
            <li>Upcoming event dates and venues</li>
            <li>Ticket availability</li>
            <li>Fighter announcements</li>
            <li>Special promotions</li>
        </ul>
        
        <p>Stay tuned for exciting news coming your way soon!</p>
        
        <p>Best regards,<br>
        The Texas Fight Collective Team</p>
        
        <p style="font-size: 12px; color: #666;">
            If you didn't sign up for this mailing list, please disregard this email.<br>
            To unsubscribe, please reply with "UNSUBSCRIBE" in the subject line.
        </p>
    </body>
    </html>
    """
    
    email_sent = send_email(data['email'], "Welcome to the White Collar Fight Night Mailing List", html_content)
    
    return jsonify({
        "success": True, 
        "message": "Email signup successful",
        "id": str(result.inserted_id),
        "email_sent": email_sent
    })

# Admin routes (protected in production)
@app.route('/api/admin/fighter-applications', methods=['GET'])
def get_fighter_applications():
    # In production, add authentication here
    applications = list(fighter_applications.find().sort("created_at", -1))
    
    # Convert ObjectId to string for JSON serialization
    for app in applications:
        app['_id'] = str(app['_id'])
    
    return jsonify(applications)

@app.route('/api/admin/fighter-nominations', methods=['GET'])
def get_fighter_nominations():
    # In production, add authentication here
    nominations = list(fighter_nominations.find().sort("created_at", -1))
    
    # Convert ObjectId to string for JSON serialization
    for nom in nominations:
        nom['_id'] = str(nom['_id'])
    
    return jsonify(nominations)

@app.route('/api/admin/email-list', methods=['GET'])
def get_email_list():
    # In production, add authentication here
    emails = list(email_list.find().sort("created_at", -1))
    
    # Convert ObjectId to string for JSON serialization
    for email in emails:
        email['_id'] = str(email['_id'])
    
    return jsonify(emails)

# For Vercel serverless deployment
if __name__ == '__main__':
    # Only run the development server when running locally
    app.run(debug=True, host='0.0.0.0', port=int(os.getenv("PORT", 5000)))
else:
    # For Vercel serverless deployment
    # The app variable is used by Vercel
    pass


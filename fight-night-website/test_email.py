import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Email configuration
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER", "your-email@gmail.com")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your-app-password")
FROM_EMAIL = os.getenv("FROM_EMAIL", "info@texasfightcollective.com")

def send_test_email():
    """Send a test email to verify configuration"""
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = FROM_EMAIL
        msg['To'] = EMAIL_USER  # Send test email to yourself
        msg['Subject'] = "Test Email from White Collar Fight Night"
        
        # Create HTML content
        html_content = """
        <html>
        <body>
            <h2>Test Email from White Collar Fight Night</h2>
            <p>This is a test email to verify that your email configuration is working correctly.</p>
            <p>If you're receiving this email, it means your setup is successful!</p>
            <p>Email details:</p>
            <ul>
                <li><strong>SMTP Server:</strong> {host}</li>
                <li><strong>Port:</strong> {port}</li>
                <li><strong>Username:</strong> {user}</li>
            </ul>
        </body>
        </html>
        """.format(host=EMAIL_HOST, port=EMAIL_PORT, user=EMAIL_USER)
        
        # Attach HTML content
        msg.attach(MIMEText(html_content, 'html'))
        
        # Connect to SMTP server and send email
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)
        
        print("✅ Test email sent successfully to", EMAIL_USER)
        return True
    except Exception as e:
        print(f"❌ Error sending test email: {e}")
        return False

if __name__ == "__main__":
    print("Testing email configuration...")
    send_test_email()


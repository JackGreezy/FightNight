# Setting Up Gmail for Sending Emails

To use your Gmail account to send confirmation emails, you'll need to set up an "App Password" since Gmail doesn't allow direct password authentication for security reasons.

## Step 1: Enable 2-Step Verification

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select "Security" from the left navigation panel
3. Under "Signing in to Google," select "2-Step Verification"
4. Follow the steps to turn on 2-Step Verification

## Step 2: Create an App Password

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select "Security" from the left navigation panel
3. Under "Signing in to Google," select "App passwords" (you might need to sign in again)
4. At the bottom, select "Select app" and choose "Mail"
5. Select "Select device" and choose "Other (Custom name)"
6. Enter "White Collar Fight Night" and click "Generate"
7. Google will display a 16-character app password
8. Copy this password

## Step 3: Update Your .env File

Update your `.env` file with your Gmail credentials:


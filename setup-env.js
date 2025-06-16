/**
 * Environment Variables Setup Script
 * 
 * This script creates a .env file with required environment variables
 * for the Airline Ticket System application.
 */
const fs = require('fs');
const path = require('path');

// Configuration template
const envTemplate = `# Google reCAPTCHA keys (used only for login/signup)
# Get your reCAPTCHA keys at: https://www.google.com/recaptcha/admin
REACT_APP_RECAPTCHA_SITE_KEY=6LcZWTgpAAAAAJXAhjmJ0K-Bo7U8T8_Xzc0DpMNV
REACT_APP_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Firebase configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyDMMoaT4aFM9G3arkaSOS8IuGpstKg97MI
REACT_APP_FIREBASE_AUTH_DOMAIN=airline-6d032.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=airline-6d032
REACT_APP_FIREBASE_STORAGE_BUCKET=airline-6d032.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=415315390499
REACT_APP_FIREBASE_APP_ID=1:415315390499:web:91d22276f38e1201fa8196

# EmailJS configuration
REACT_APP_EMAILJS_SERVICE_ID=service_nwf2evu
REACT_APP_EMAILJS_TEMPLATE_ID=template_qkty6u6
REACT_APP_EMAILJS_USER_ID=3nBHC0QdAiwXTywAX

# Encryption key
REACT_APP_ENCRYPTION_KEY=your-secure-encryption-key
`;

// Path to the .env file
const envFilePath = path.join(__dirname, '.env');

// Check if .env file already exists
if (fs.existsSync(envFilePath)) {
  console.log('\x1b[33m%s\x1b[0m', 'Warning: .env file already exists!');
  console.log('If you continue, the existing file will be backed up and replaced.');
  console.log('Press Ctrl+C to cancel or any key to continue...');
  
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.once('data', () => {
    process.stdin.setRawMode(false);
    // Create backup of existing file
    const backupPath = path.join(__dirname, `.env.backup-${Date.now()}`);
    fs.copyFileSync(envFilePath, backupPath);
    console.log('\x1b[32m%s\x1b[0m', `Backup created at: ${backupPath}`);
    
    // Write new .env file
    writeEnvFile();
  });
} else {
  writeEnvFile();
}

function writeEnvFile() {
  // Write .env file
  fs.writeFileSync(envFilePath, envTemplate);
  console.log('\x1b[32m%s\x1b[0m', '.env file created successfully!');
  console.log('\x1b[36m%s\x1b[0m', 'IMPORTANT: Update the .env file with your actual API keys and secrets before running the application.');
  console.log('\x1b[36m%s\x1b[0m', 'Note: reCAPTCHA is only used for login and account creation in this application.');
  console.log('\nYou can now run the application using:');
  console.log('\x1b[37m%s\x1b[0m', 'npm start');
  process.exit(0);
} 
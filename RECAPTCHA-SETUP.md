# reCAPTCHA Integration Guide

This guide explains how to set up and use Google reCAPTCHA in the Airline Ticket System application.

## What is reCAPTCHA?

Google reCAPTCHA is a free service that protects your website from spam and abuse. It uses advanced risk analysis techniques to tell humans and bots apart, helping to keep your forms secure.

## Implementation Scope

In this application, reCAPTCHA is intentionally implemented **only for login and account creation** to:
- Protect user accounts from automated attacks
- Prevent brute force login attempts
- Secure the account creation process

This focused implementation provides security where it matters most while maintaining a streamlined user experience throughout the rest of the application.

## Setup Instructions

### 1. Get reCAPTCHA API Keys

1. Go to the [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Sign in with your Google account
3. Create a new site registration:
   - Enter a label (e.g., "Airline Ticket System")
   - Choose reCAPTCHA v2 ("I'm not a robot" Checkbox)
   - Add your domain(s) (e.g., localhost for development, your production domain)
   - Accept the terms of service
   - Submit the form

4. You will receive two keys:
   - **Site Key**: Used in the frontend code
   - **Secret Key**: Used for backend verification

### 2. Configure Environment Variables

1. Create or edit the `.env` file in the root of your project:

```
REACT_APP_RECAPTCHA_SITE_KEY=your_site_key_here
REACT_APP_RECAPTCHA_SECRET_KEY=your_secret_key_here
```

Alternatively, run the setup script to create your environment file:

```
node setup-env.js
```

### 3. Implementation Details

The reCAPTCHA is implemented in the following component:

- **Login.js**: Protects the login/signup form

### 4. Test Mode

For development and testing purposes, the application includes a test mode which allows bypassing the reCAPTCHA verification:

```javascript
// For testing, enable this to bypass reCAPTCHA
const testMode = true; // Set to false in production
```

This should be set to `false` in production to enforce reCAPTCHA verification.

### 5. Using Google's Test Keys

For development, you can use Google's test keys that always pass validation:

```javascript
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // Google's test key
```

**Important:** These keys are meant for testing only. Replace them with your actual reCAPTCHA keys before deploying to production.

## Customization

### Styling

The reCAPTCHA container is styled in the Login.css file. You can modify the styling as needed.

### Mobile Responsiveness

For mobile devices, we use a scale transformation to ensure the reCAPTCHA fits properly:

```css
@media (max-width: 768px) {
    .recaptcha-container {
        transform: scale(0.85);
        transform-origin: left center;
    }
}
```

## Troubleshooting

- If you see "ERROR for site owner: Invalid site key", you need to register a valid site key or use Google's test key during development
- If reCAPTCHA doesn't appear, check if your site key is correct in the code
- If verification fails, check browser console for errors
- For local development, make sure "localhost" is in your allowed domains list when registering your reCAPTCHA keys
- If you're testing on a mobile device, ensure your domain is properly configured

## Security Considerations

- Never expose your secret key in client-side code
- Always validate reCAPTCHA responses on the server side for production applications
- Replace Google's test keys with your actual reCAPTCHA keys before deploying to production
- Disable test mode in production by setting `testMode = false`
- Consider implementing additional security measures for sensitive operations 
# Supabase Authentication Setup Guide

## Problem
The authentication system is not working because it's not properly connected to a Supabase project. When you sign up or log in, nothing happens because the application doesn't have valid Supabase credentials.

## Solution
Follow these steps to set up Supabase authentication properly:

### Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up for an account
2. Create a new project:
   - Click "New Project"
   - Give your project a name (e.g., "ss-learn")
   - Set a secure database password
   - Choose a region closest to your users
   - Click "Create new project"

### Step 2: Get Your API Keys

1. Once your project is created, go to the project dashboard
2. In the left sidebar, click on "Project Settings" (the gear icon)
3. Click on "API" in the settings menu
4. You'll see your API credentials:
   - **Project URL**: Copy this value
   - **anon/public** key: Copy this value

### Step 3: Configure Your Environment Variables

1. Create a file named `.env.local` in the root of your project with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

2. Replace `your_project_url` and `your_anon_key` with the values you copied in Step 2

### Step 4: Configure Authentication Settings in Supabase

1. In your Supabase dashboard, go to "Authentication" in the left sidebar
2. Click on "Providers"
3. Make sure "Email" is enabled
4. Under "Email Templates", you can customize the confirmation email that users will receive
5. Under "URL Configuration":
   - Set "Site URL" to `http://localhost:3000` (for development) or your production URL
   - Add `http://localhost:3000/auth/callback` to the "Redirect URLs"

### Step 5: Restart Your Development Server

After setting up the environment variables, restart your development server:

```
npm run dev
```

## Troubleshooting

If you're still experiencing issues:

1. **Check the browser console**: Open your browser's developer tools (F12) and look for any error messages in the console
2. **Verify environment variables**: Make sure your `.env.local` file is in the root directory and contains the correct values
3. **Check Supabase logs**: In your Supabase dashboard, go to "Database" > "Logs" to see if there are any authentication errors
4. **Confirm email confirmation settings**: If you're using email confirmation, make sure your email provider is properly configured in Supabase

## Testing Authentication

After completing the setup:

1. Try signing up with a new account
2. Check your email for a confirmation link (if email confirmation is enabled)
3. Try logging in with the account you created
4. Verify that the user appears in your Supabase dashboard under "Authentication" > "Users"

## Additional Configuration (Optional)

### Enable Social Login (Google)

1. In your Supabase dashboard, go to "Authentication" > "Providers"
2. Click on "Google"
3. Toggle it to "Enabled"
4. Follow the instructions to set up Google OAuth credentials
5. Add the Client ID and Secret
6. Save changes

### Customize Email Templates

1. In your Supabase dashboard, go to "Authentication" > "Email Templates"
2. Customize the templates for:
   - Confirmation
   - Invitation
   - Magic Link
   - Reset Password
3. Save changes

# Supabase Authentication Setup Guide

## Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up for an account if you don't have one.
2. Create a new project from your dashboard.
3. Give your project a name and set a secure database password.
4. Choose a region closest to your users.
5. Wait for your project to be created (this might take a few minutes).

## Step 2: Configure Authentication

1. In your Supabase project dashboard, go to **Authentication** > **Settings**.
2. Under **Email Auth**, make sure it's enabled.
3. Configure your site URL (this should be your production URL, or http://localhost:3000 for development).
4. If you want to enable "Sign in with Google" or other providers, configure them in the **Auth Providers** section.

## Step 3: Get Your API Keys

1. In your Supabase project dashboard, go to **Project Settings** > **API**.
2. You'll find your **Project URL** and **anon/public** key.
3. Copy these values as you'll need them for your environment variables.

## Step 4: Set Up Environment Variables

Create a file named `.env.local` in the root of your project with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Replace `your_project_url` and `your_anon_key` with the values from Step 3.

## Step 5: Restart Your Development Server

After setting up the environment variables, restart your development server for the changes to take effect.

```
npm run dev
```

## Troubleshooting

If you encounter any issues:

1. Make sure your environment variables are correctly set in `.env.local`.
2. Check that you've restarted your development server after setting up the environment variables.
3. Verify that your Supabase project is correctly configured for authentication.
4. Check the browser console for any error messages related to Supabase.

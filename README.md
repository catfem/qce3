<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Question Bank

This is a web application that allows users to upload documents and automatically generate question banks using AI. It uses Google's Gemini API for question generation, Supabase for the database and authentication, and is designed to be deployed on Cloudflare Pages.

## Features

-   **AI-Powered Question Generation:** Upload your documents (.pdf, .docx, .txt) and let the AI generate questions and answers for you.
-   **Personal Question Bank:** Store your generated questions in a personal, secure question bank.
-   **Community-Driven Learning:** Share your questions with the community and access a public bank of questions.
-   **Secure Authentication:** Sign in with your Google account to keep your question bank private.
-   **Guest Mode:** Try out the application's features without creating an account.

## Tech Stack

-   **Frontend:** React, Vite, TypeScript
-   **Backend:** Supabase (Database, Auth)
-   **AI:** Google Gemini
-   **Deployment:** Cloudflare Pages

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   A Supabase account
-   A Google Cloud project with the Gemini API enabled
-   A Cloudflare account

### Supabase Setup

1.  **Create a new Supabase project:** Go to the [Supabase Dashboard](https://supabase.com/dashboard/projects) and create a new project.
2.  **Get your project credentials:** In your Supabase project, go to `Settings` > `API` and get your `Project URL` and `anon` key.
3.  **Run the SQL schema:** Go to the `SQL Editor` in your Supabase project and run the schema from `supabase/migrations/0001_initial_schema.sql`. This will create the necessary tables and functions.
4.  **Enable Google Auth:** Go to `Authentication` > `Providers` and enable the Google provider. You will need a `Google Client ID` and `Client Secret`. You can get these from the [Google Cloud Console](https://console.cloud.google.com/).

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-question-bank.git
    cd ai-question-bank
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:** Create a `.env` file in the root of the project and add the following variables:
    ```
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    VITE_GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Deployment to Cloudflare Pages

1.  **Push your code to a GitHub repository.**
2.  **Create a new Cloudflare Pages project:** Go to your Cloudflare dashboard, select `Workers & Pages`, and create a new project.
3.  **Connect your GitHub repository:** Select the repository you just created.
4.  **Configure the build settings:**
    -   **Build command:** `npm run build`
    -   **Build output directory:** `dist`
5.  **Add environment variables:** In the project settings, add the `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_GEMINI_API_KEY` environment variables.
6.  **Deploy:** Cloudflare will automatically build and deploy your application.

## License

This project is licensed under the MIT License.

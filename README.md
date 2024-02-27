# AI Chatbot Application

This application allows users to interact with an AI-based chatbot in real-time.

## Features

- User-friendly chat interface supporting real-time messages.
- Message input field with send button and keyboard shortcuts (e.g., Enter to send).
- Display of incoming messages from the chatbot and outgoing messages from the user in an organized manner.

## Technical Stack

- Next.js
- Tailwind CSS for styling
- State Management: React Query for managing server state, including chat state and history
- AI Integration: Use an AI service provider's API for the chatbot functionality

## Installation Guide

Follow these steps to set up and run the AI Chatbot application locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed on your machine.
- OpenAI GPT-3.5 Turbo API key.

### Steps

1. ```bash
   git clone https://github.com/aman172214/chat_bot.git
   cd chat_bot
   npm install
   ```
5. Create a .env.local file in the root directory.
6. Add your OpenAI GPT-3.5 Turbo API key to the file.
   
   NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
8. npm run dev
   
   Open your browser and go to http://localhost:3000 to start interacting with the AI chatbot.
   

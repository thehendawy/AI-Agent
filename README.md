# Email Summarizer Agent

An Angular + Express project that uses the OpenAI Agents SDK for TypeScript to summarize long emails into short, professional bullet points.

## Project Idea

Users paste a long email or message into the Angular app. The backend sends that text to an AI agent named **Email Summarizer Agent**, and the agent returns a concise bullet point summary.

## Tech Stack

- Angular
- TypeScript
- Node.js
- Express
- OpenAI Agents SDK: `@openai/agents`
- Zod for structured agent output

## How The AI Agent Works

The backend defines one agent in `server/src/agents/emailSummarizerAgent.ts`.

The agent:

- Reads the email text from the API request
- Extracts important details, requests, dates, deadlines, and next steps
- Ignores filler text, greetings, signatures, and repeated background
- Returns a structured response shaped like:

```json
{
  "summary": [
    "Bullet point 1",
    "Bullet point 2",
    "Bullet point 3"
  ]
}
```

## Project Structure

```text
.
├── server/
│   ├── src/
│   │   ├── agents/
│   │   │   └── emailSummarizerAgent.ts
│   │   ├── routes/
│   │   │   └── summarizeRoutes.ts
│   │   └── index.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── src/
│   └── app/
│       ├── components/
│       │   └── email-summarizer/
│       └── services/
│           └── email-summary.service.ts
├── proxy.conf.json
└── package.json
```

## Install Dependencies

Install Angular dependencies:

```bash
npm install
```

On Windows PowerShell, if script execution blocks `npm`, use `npm.cmd` instead.

Install backend dependencies:

```bash
cd server
npm install
```

## Add Your OpenAI API Key

Copy the example environment file inside the `server` folder:

```bash
cd server
copy .env.example .env
```

Then ask the supervisor to add their own OpenAI API key in `server/.env`:

```env
OPENAI_API_KEY=your_key_here
PORT=3000
OPENAI_MODEL=gpt-4.1-mini
```

Do not hardcode API keys in the source code.

## Run The Backend

From the project root:

```bash
npm run server:dev
```

The API runs at:

```text
http://localhost:3000
```

## Run The Angular Frontend

Open another terminal from the project root:

```bash
npm start
```

The Angular app runs at:

```text
http://localhost:4200
```

Angular uses `proxy.conf.json` to send `/api` requests to the Express backend.

## API Endpoint

### POST `/api/summarize`

Request body:

```json
{
  "email": "long email text here"
}
```

Response:

```json
{
  "summary": [
    "The client approved the revised homepage direction.",
    "The first clickable prototype is due by Friday afternoon.",
    "Legal approval is still needed for the testimonial section."
  ]
}
```

## Example Email Input

```text
Hi team,

I wanted to share an update after today's client call. Northstar Retail approved the revised homepage direction and wants the first clickable prototype by Friday afternoon. They were happy with the cleaner product comparison section, but asked us to simplify the pricing copy and remove the technical language from the checkout notes.

Maya will send the final brand images tomorrow morning. Ahmed will update the component copy once the images arrive. Please keep the current analytics tags in place because the marketing team needs them for the campaign report next week.

The only blocker is legal approval for the testimonial section. I will follow up with Priya today and share the answer in Slack. If legal does not approve it by Thursday noon, we should hide that section for the prototype.

Thanks,
Sarah
```

## Build Checks

Build the frontend:

```bash
npm run build
```

Build the backend:

```bash
npm run server:build
```

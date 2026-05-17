import { Router } from 'express';
import { summarizeEmail } from '../agents/emailSummarizerAgent.js';

export const summarizeRoutes = Router();

const missingApiKeyMessage =
  'OpenAI API key is missing. Please add OPENAI_API_KEY in server/.env';

summarizeRoutes.post('/summarize', async (req, res) => {
  const email = req.body?.email;

  if (typeof email !== 'string' || email.trim().length === 0) {
    return res.status(400).json({
      error: 'Please provide a non-empty email field.',
    });
  }

  if (!process.env.OPENAI_API_KEY?.trim()) {
    return res.status(500).json({
      error: missingApiKeyMessage,
    });
  }

  try {
    const summary = await summarizeEmail(email.trim());
    return res.json({ summary });
  } catch (error) {
    console.error('Summarization failed:', error);

    return res.status(500).json({
      error: 'Unable to summarize the email right now.',
    });
  }
});

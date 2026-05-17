import 'dotenv/config';
import { Agent, run } from '@openai/agents';
import { z } from 'zod';

const SummaryOutput = z.object({
  summary: z
    .array(z.string())
    .min(1)
    .max(5)
    .describe('A short professional bullet point summary of the email.'),
});

type SummaryOutput = z.infer<typeof SummaryOutput>;

export const emailSummarizerAgent = new Agent({
  name: 'Email Summarizer Agent',
  model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
  outputType: SummaryOutput,
  instructions: `
You summarize long emails and messages for busy professionals.

Rules:
- Extract the most important facts, requests, decisions, dates, deadlines, and next steps.
- Return 3 to 5 concise bullet points when possible.
- Keep the tone professional and easy to read.
- Ignore greetings, repeated filler, signatures, and unnecessary background.
- Do not invent missing details.
`,
});

export async function summarizeEmail(email: string): Promise<string[]> {
  const result = await run(
    emailSummarizerAgent,
    `Summarize this email:\n\n${email}`,
    { maxTurns: 3 },
  );

  const output = result.finalOutput as SummaryOutput | undefined;

  if (!output?.summary?.length) {
    throw new Error('The agent did not return a summary.');
  }

  return output.summary;
}

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { summarizeRoutes } from './routes/summarizeRoutes.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', summarizeRoutes);

app.listen(port, () => {
  console.log(`Email Summarizer API is running on http://localhost:${port}`);
});

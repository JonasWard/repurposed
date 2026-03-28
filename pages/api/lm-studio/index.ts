import type { NextApiRequest, NextApiResponse } from 'next';

const LM_STUDIO_BASE_URL = process.env.LM_STUDIO_BASE_URL ?? 'http://127.0.0.1:1234';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const endpoint = `${LM_STUDIO_BASE_URL.replace(/\/$/, '')}/v1/chat/completions`;

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch {
    res.status(502).json({ error: 'Could not reach LM Studio' });
  }
}

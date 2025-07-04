import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

const settingsPath = path.join(process.cwd(), 'api', 'settings.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(settingsPath, 'utf-8');
      res.status(200).json(JSON.parse(data));
    } catch (err) {
      res.status(500).json({ error: 'Failed to load settings.' });
    }
  } else if (req.method === 'POST') {
    try {
      await fs.writeFile(settingsPath, JSON.stringify(req.body, null, 2));
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save settings.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 
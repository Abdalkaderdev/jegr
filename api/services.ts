import { VercelRequest, VercelResponse } from '@vercel/node';
import { promises as fs } from 'fs';
import path from 'path';

const dataFile = path.join(__dirname, 'services.json');

async function readData() {
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeData(data: any) {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  let services = await readData();

  if (req.method === 'GET') {
    return res.status(200).json(services);
  }

  if (req.method === 'POST') {
    const { name, description, imageUrl } = req.body;
    const newService = { id: Date.now(), name, description, imageUrl };
    services.unshift(newService);
    await writeData(services);
    return res.status(201).json(newService);
  }

  if (req.method === 'PUT') {
    const { id, name, description, imageUrl } = req.body;
    services = services.map((s: any) => s.id === id ? { ...s, name, description, imageUrl } : s);
    await writeData(services);
    return res.status(200).json({ id, name, description, imageUrl });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    services = services.filter((s: any) => s.id !== id);
    await writeData(services);
    return res.status(204).end();
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 
import { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const result = await sql('SELECT * FROM projects ORDER BY created_at DESC');
    return res.status(200).json(result);
  }

  if (req.method === 'POST') {
    const { name, description, images = [], category = '', location = '', duration = '' } = req.body;
    const result = await sql(
      'INSERT INTO projects (name, description, images, category, location, duration) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, images, category, location, duration]
    );
    return res.status(201).json(result[0]);
  }

  if (req.method === 'PUT') {
    const { id, name, description, images = [], category = '', location = '', duration = '' } = req.body;
    const result = await sql(
      'UPDATE projects SET name=$1, description=$2, images=$3, category=$4, location=$5, duration=$6 WHERE id=$7 RETURNING *',
      [name, description, images, category, location, duration, id]
    );
    return res.status(200).json(result[0]);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    await sql('DELETE FROM projects WHERE id=$1', [id]);
    return res.status(204).end();
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 
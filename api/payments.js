import fs from 'fs';
import path from 'path';

// Demo payments read from data/demo.json
export default async function handler(req, res) {
  const dataPath = path.join(process.cwd(), 'data', 'demo.json');
  if (!fs.existsSync(dataPath)) return res.status(500).json({ error: 'Demo data not found' });
  const data = JSON.parse(fs.readFileSync(dataPath));
  // return payments array
  return res.status(200).json(data.payments);
}

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { message } = req.body;
  const dataPath = path.join(process.cwd(), 'data', 'demo.json');
  const data = JSON.parse(fs.readFileSync(dataPath));
  const id = data.messages.length ? data.messages[data.messages.length-1].id + 1 : 1;
  const newMsg = { id, payment_id: data.payments[0]?.id || 1, sender_id: 1, message, timestamp: new Date().toISOString() };
  data.messages.push(newMsg);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  return res.status(200).json({ message: 'Message saved (demo)' });
}

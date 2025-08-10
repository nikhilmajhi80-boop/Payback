import React, { useState, useEffect } from 'react';

export default function App() {
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/payments')
      .then(res => res.json())
      .then(data => setPayments(data))
      .catch(console.error);
  }, []);

  const sendMessage = async () => {
    await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    setMessage('');
    alert('Message sent (demo)');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '32px auto', padding: '1rem' }}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Payment Portal</h1>
        <small>Demo build</small>
      </header>

      <section style={{background:'#fff', padding:12, borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
        <h2>Payments</h2>
        <ul>
          {payments.map((p) => (
            <li key={p.id} style={{padding:'6px 0', borderBottom:'1px solid #f1f5f9'}}>
              <strong>{p.date}</strong> — {p.location} — {p.work} — ₹{p.total}
            </li>
          ))}
        </ul>
      </section>

      <section style={{marginTop:16}}>
        <h3>Send a message</h3>
        <div style={{display:'flex', gap:8}}>
          <input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type a message" style={{flex:1,padding:8}} />
          <button onClick={sendMessage} style={{padding:'8px 12px', background:'#0ea5a4', color:'#fff', border:0}}>Send</button>
        </div>
      </section>
    </div>
  );
}

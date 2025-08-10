import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setError('');
      if (currentUser) {
        fetch('/api/payments')
          .then((res) => res.json())
          .then((data) => setPayments(data))
          .catch(console.error);
      } else {
        setPayments([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const signup = async () => {
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const sendMessage = async () => {
    if (!message) return alert('Please enter a message');
    await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    setMessage('');
    alert('Message sent (demo)');
  };

  if (!user) {
    return (
      <div
        style={{
          maxWidth: 400,
          margin: '3rem auto',
          padding: '1rem',
          background: '#fff',
          borderRadius: 8,
        }}
      >
        <h2>Login / Sign Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <button onClick={login} style={{ marginRight: 8, padding: '8px 12px' }}>
          Login
        </button>
        <button onClick={signup} style={{ padding: '8px 12px' }}>
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '32px auto', padding: '1rem' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Payment Portal</h1>
        <button
          onClick={logout}
          style={{
            padding: '6px 10px',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
          }}
        >
          Logout
        </button>
      </header>

      <section
        style={{
          background: '#fff',
          padding: 12,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginTop: 24,
        }}
      >
        <h2>Payments</h2>
        <ul>
          {payments.map((p) => (
            <li
              key={p.id}
              style={{ padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}
            >
              <strong>{p.date}</strong> — {p.location} — {p.work} — ₹{p.total}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Send a message</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            style={{ flex: 1, padding: 8 }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: '8px 12px',
              background: '#0ea5a4',
              color: '#fff',
              border: 0,
            }}
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
}

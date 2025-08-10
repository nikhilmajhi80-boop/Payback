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
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setError('');
      if (currentUser) {
        // Fetch payments only if logged in
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
      <div style={{ maxWidth: 400, margin: '3rem auto', padding: '1rem', background: '#fff', borderRadius: 8 }}>
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
        <button onClick={login} style={{ marginR
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

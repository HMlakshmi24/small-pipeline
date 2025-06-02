// components/LoginModal.jsx
import React, { useState } from 'react';

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    if (user === 'User' && pass === '1234') {
      onLoginSuccess();
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', width: '300px' }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginBottom: '1rem' }}>Login Please !!</h3>
        <input type="text" placeholder="Username" value={user} onChange={e => setUser(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
        <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
        <button onClick={handleLogin} style={{ width: '100%', padding: '0.5rem', backgroundColor: '#00b4d8', color: 'white', border: 'none' }}>Login</button>
        <button onClick={onClose} style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#ccc', border: 'none' }}>Cancel</button>
      </div>
    </div>
  );
};

export default LoginModal;

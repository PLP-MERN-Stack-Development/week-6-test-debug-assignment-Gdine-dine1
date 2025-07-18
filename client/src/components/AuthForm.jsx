import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout } from '../store/slices/authSlice';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const { token, status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login({ email: form.email, password: form.password }));
    } else {
      dispatch(register(form));
    }
  };

  if (token) {
    return (
      <div>
        <p>Logged in! Token: {token.slice(0, 10)}...</p>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        {!isLogin && (
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            type="text"
            style={{ flex: 1 }}
          />
        )}
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          type="email"
          style={{ flex: 1 }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ flex: 1 }}
        />
        <button type="submit" disabled={status === 'loading'} style={{ whiteSpace: 'nowrap' }}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button type="button" onClick={() => setIsLogin((v) => !v)} style={{ marginBottom: 8 }}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
      {status === 'failed' && (
        <p style={{ color: 'red', margin: 0 }}>
          {isLogin ? 'Login failed' : 'Registration failed'}
          {error && error !== 'Rejected' && `: ${error}`}
        </p>
      )}
    </div>
  );
} 
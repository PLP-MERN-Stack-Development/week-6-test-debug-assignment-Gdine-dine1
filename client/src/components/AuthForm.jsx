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
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button onClick={() => setIsLogin((v) => !v)}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
      {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
} 
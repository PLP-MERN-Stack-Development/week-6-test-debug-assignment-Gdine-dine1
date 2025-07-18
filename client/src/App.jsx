import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Button from './components/Button';
import { useCounter } from './hooks/useCounter';
import AuthForm from './components/AuthForm';
import './index.css';

function CounterDemo() {
  const { value, increment, decrement, incrementByAmount } = useCounter();
  return (
    <div>
      <h2>Counter: {value}</h2>
      <div className="counter-controls">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
        <Button onClick={() => incrementByAmount(5)}>Increment by 5</Button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <h1>Welcome to the MERN Testing App</h1>
        <div className="auth-form">
          <AuthForm />
        </div>
        <CounterDemo />
        <Button onClick={() => { throw new Error('Test error'); }}>Throw Error</Button>
      </ErrorBoundary>
    </div>
  );
}

export default App; 
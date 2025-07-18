import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../store/slices/counterSlice';

export function useCounter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return {
    value,
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    incrementByAmount: (amt) => dispatch(incrementByAmount(amt)),
  };
} 
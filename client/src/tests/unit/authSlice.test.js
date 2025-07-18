import authReducer, { logout } from '../../store/slices/authSlice';

describe('auth reducer', () => {
  const initialState = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle logout', () => {
    const state = { ...initialState, token: 'abc', user: { name: 'Test' } };
    expect(authReducer(state, logout())).toEqual({ ...initialState });
  });
}); 
import api, { setAuthToken } from './apiService';

describe('Api Service', () => {
  test('Verify Api Base URL', () => {
    expect(api.defaults.baseURL).toBe('http://localhost:5000/api-v1');
  });
  test('Set Auth Token', () => {
    const token = 'myToken';
    setAuthToken(token);
    expect(api.defaults.headers.common['Authorization']).toMatch(/myToken/);
  });
  test('Remove Auth Token', () => {
    const token = 'myToken';
    setAuthToken(token);
    expect(api.defaults.headers.common['Authorization']).toMatch(/myToken/);
    setAuthToken(null);
    expect(api.defaults.headers.common['Authorization']).toBeUndefined();
  });
});

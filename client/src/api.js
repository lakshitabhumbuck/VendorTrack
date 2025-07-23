const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
} 
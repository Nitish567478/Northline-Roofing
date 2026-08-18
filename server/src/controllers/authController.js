import jwt from 'jsonwebtoken';

export function login(req, res) {
  const { username, password } = req.body;

  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'roofing2026!';

  if (username !== adminUser || password !== adminPass) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username, role: 'owner' },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '8h' },
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000,
  });

  return res.json({ message: 'Login successful', username });
}

export function logout(req, res) {
  res.clearCookie('token');
  return res.json({ message: 'Logged out' });
}

export function getSession(req, res) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    return res.json({ authenticated: true, username: payload.username });
  } catch {
    return res.status(401).json({ error: 'Not authenticated' });
  }
}

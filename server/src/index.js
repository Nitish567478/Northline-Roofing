import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {
  createEstimate,
  getLeads,
  getPublicConfig,
  updateConfig,
  updateLeadStatus,
  deleteLead,
} from './controllers/configController.js';
import { getSession, login, logout } from './controllers/authController.js';
import { requireOwnerAuth } from './middleware/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://northline-roofing-psi.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || (process.env.CLIENT_URL && origin === process.env.CLIENT_URL)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/config', getPublicConfig);
app.post('/api/estimate', createEstimate);

app.post('/api/auth/login', login);
app.post('/api/auth/logout', logout);
app.get('/api/auth/session', getSession);

app.put('/api/admin/config', requireOwnerAuth, updateConfig);
app.get('/api/admin/leads', requireOwnerAuth, getLeads);

app.patch('/api/admin/leads/:id', requireOwnerAuth, updateLeadStatus);
app.delete('/api/admin/leads/:id', requireOwnerAuth, deleteLead);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
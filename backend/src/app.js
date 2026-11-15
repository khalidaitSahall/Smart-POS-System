const express = require('express');
const cors = require('cors');
const path = require('path');
const productsRouter = require('./routes/products');
const { pool } = require('./config/database');

const app = express();
app.disable('x-powered-by');
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'degraded', database: 'disconnected' });
  }
});
app.use('/api/products', productsRouter);

if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.resolve(__dirname, '../../frontend/dist');
  app.use(express.static(frontendDist));
  app.get('*', (_req, res) => res.sendFile(path.join(frontendDist, 'index.html')));
}

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: 'حدث خطأ داخلي في الخادم' });
});

module.exports = app;

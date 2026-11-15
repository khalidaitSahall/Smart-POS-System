const express = require('express');
const { pool } = require('../config/database');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, barcode, name, sell_price, stock_quantity
       FROM products WHERE is_active = TRUE ORDER BY name LIMIT 500`,
    );
    res.json({ products: rows });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

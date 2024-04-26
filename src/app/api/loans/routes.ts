import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../db";

const express = require('express');
const router = express.Router();

// Endpoint pour récupérer l'historique des emprunts
router.get('/', async (req: NextRequest , res:any) => {
  try {
    const history = await pool.query('SELECT * FROM loans');
    res.json(history.rows);
  } catch (error) {
    console.error('Error fetching loan history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint pour récupérer les emprunts en cours
router.get('/current', async (req: NextRequest, res: any) => {
    try {
      const currentLoans = await pool.query('SELECT * FROM loans WHERE status = $1', ['en cours']);
      res.json({ current: currentLoans.rows });
    } catch (error) {
      console.error('Error fetching current loans:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;

import { NextResponse, NextRequest } from 'next/server';
import pool from '../../../../db';


export default async function handler(req:any, res:any) {
  if (req.method === 'GET') {
    try {
      // Récupération de l'historique des emprunts
      if (req.query.type === 'history') {
        const history = await pool.query('SELECT * FROM loans');
        return res.status(200).json(history.rows);
      }
      
      // Récupération des emprunts en cours
      if (req.query.type === 'current') {
        const currentLoans = await pool.query('SELECT * FROM loans WHERE status = $1', ['en cours']);
        return res.status(200).json(currentLoans.rows);
      }

      return res.status(400).json({ message: 'Invalid loan type specified' });
    } catch (error) {
      console.error('Error fetching loans:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

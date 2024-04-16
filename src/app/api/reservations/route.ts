import { NextResponse, NextRequest } from 'next/server';
import pool from '../../../../db';

export const GET = async (req: NextRequest) => {
    try {
      const client = await pool.connect();
      try {
        const result = await client.query('SELECT * FROM reservations');
        const reservations = result.rows;
        console.log("Fetched users:", reservations);
        return NextResponse.json(reservations, { status: 200 });
      } finally {
        await client.release();
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
    }
};
  
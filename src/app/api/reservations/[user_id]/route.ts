import { NextResponse, NextRequest } from 'next/server';
import pool from '../../../../../db';


export async function GET(req: NextRequest, context: any) {
    const user_id = context.params.user_id;
    try {
        const client = await pool.connect();
        try {
            if (user_id === undefined) {
                return NextResponse.json({ message: "Missing 'user_id' parameter" }, { status: 400 });
            }
            const result = await client.query('SELECT * FROM reservations WHERE id_reservation = $1', [user_id]);
            const reservations = result.rows;
            if (!reservations[0]) {
                return NextResponse.json({ message: "No reservations found!" }, { status: 404 });
            }
            return NextResponse.json(reservations, { status: 200 });
        } finally {
            await client.release();
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: any) {
    const user_id = context.params.user_id;
    try {
      const client = await pool.connect();
      try {
        if (user_id === undefined) {
          return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
        }
        const result = await client.query('DELETE FROM reservations WHERE id_reservation = $1', [user_id]);
        if (result.rowCount === 0) {
          return NextResponse.json({ message: "resevation not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "reservation deleted" }, { status: 200 });
      } finally {
        await client.release();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return NextResponse.json({ status: 500 });
    }
  };
  
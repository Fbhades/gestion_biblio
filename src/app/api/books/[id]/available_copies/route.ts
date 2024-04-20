import { NextResponse, NextRequest } from 'next/server';
import pool from '../../../../../../db';


export async function GET(req: NextRequest, context: any) {
    const id = context.params.id;
    try {
        const client = await pool.connect();
        try {
            if (id === undefined) {
                return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
            }
            const result = await client.query('SELECT * FROM books WHERE id_book = $1', [id]);
            const book = result.rows[0];
            if (!book) {
                return NextResponse.json({ message: "Book not found" }, { status: 404 });
            }
            const result2 = await client.query(`SELECT count(*) available_copies FROM book_copies WHERE book_id = $1 and status='available';`, [id]);
            const available_copies = result2.rows[0];

            return NextResponse.json(available_copies, { status: 200 });
        } finally {
            await client.release();
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ status: 500 });
    }
};
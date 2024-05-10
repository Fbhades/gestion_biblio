import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../db";

export const GET = async (req: NextRequest) => {
    try {
        const client = await pool.connect();
        try {
            const notexpired: boolean = req.nextUrl.searchParams.get('notexpired')?.toLowerCase() === 'true';
            // Add more parameters here...

            let query = 'SELECT * FROM announcements WHERE 1=1';
            // Start parameter index from 1



            if (notexpired) {
                query += ` AND expiry_date > current_date`;

            }

            // Add more parameter checks here...

            const result = await client.query(query);
            const announcements = result.rows;
            if (announcements.length === 0) {
                return NextResponse.json({ message: "No announcements found !" }, { status: 404 });
            }
            return NextResponse.json(announcements, { status: 200 });
        } catch (error) {
            console.error('Error fetching data:', error);
            return NextResponse.json({ status: 500 });
        }
        finally {
            await client.release();
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ status: 500 });
    }
};

export async function POST(req: NextRequest) {
    try {
        const client = await pool.connect();
        try {

            const body = await req.json();
            const { admin_id, message, expiry_date } = body;

            // Input validation
            if (!admin_id || !message || !expiry_date) {
                return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
            }

            const result = await client.query('INSERT INTO announcements (admin_id, message,expiry_date) VALUES($1,$2,$3) ;', [admin_id, message, expiry_date]);
            const announce = result.rows[0];


            return NextResponse.json({ message: "announce added", announce }, { status: 201 });
        }
        catch (error) {
            console.error('Error fetching data:', error);
            return NextResponse.json({ error, message: "Internal server error" }, { status: 500 });
        } finally {
            await client.release();
        }
    } catch (error) {
        console.error('Error adding announce:', error);
        return NextResponse.json({ message: "Error adding announce" }, { status: 422 });
    }
};

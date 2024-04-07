import pool from "../../../../../../db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, context: any) {
    const id = context.params.id;
    try {
        const client = await pool.connect();
        try {
            if (id === undefined) {
                return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
            }
            const result = await client.query('SELECT * FROM sous_category WHERE parent_cat = $1', [id]);
            const categories = result.rows;
            if (!categories) {
                return NextResponse.json({ message: "Sub-Categories not found" }, { status: 404 });
            }
            return NextResponse.json(categories, { status: 200 });
        } catch (error) {
            console.error('Error fetching data:', error);
            return NextResponse.json({ status: 500 });
        } finally {
            await client.release();
        }
    } catch (e) {
        console.error('Error fetching data:', e);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}
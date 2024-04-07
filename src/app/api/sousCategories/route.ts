import pool from "../../../../db";
import { NextRequest, NextResponse } from "next/server";

//Get all categories
export async function GET(req: NextRequest) {
    try {
        const client = await pool.connect();
        try {
            const { rows } = await client.query("SELECT * FROM sous_category");
            return NextResponse.json(rows, { status: 200 });
        } catch (e) {
            console.error('Error fetching data:', e);
            return NextResponse.json("Internal Server Error", { status: 500 });
        }
        finally {
            await client.release();
        }
    } catch (e) {
        console.error('Error fetching data:', e);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}

//Add a category
export async function POST(req: NextRequest) {
    try {
        const client = await pool.connect();
        try {
            const body = await req.json();
            const { label, parent_cat } = body;
            if (!label || !parent_cat) {
                return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
            }
            await client.query('INSERT INTO sous_category (label,parent_cat) VALUES($1,$2);', [label, parent_cat]);
            return NextResponse.json({ message: "Sub-Category added" }, { status: 201 });
        } catch (e) {
            console.error('Error fetching data:', e);
            return NextResponse.json("Internal Server Error", { status: 500 });
        } finally {
            await client.release();
        }
    } catch (e) {
        console.error('Error fetching data:', e);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}
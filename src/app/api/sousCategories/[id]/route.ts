import pool from "../../../../../db";
import { NextResponse, NextRequest } from "next/server";

//Get Category by id
export async function GET(req: NextRequest, context: any) {
    const id = context.params.id;
    try {
        const client = await pool.connect();
        try {
            if (id === undefined) {
                return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
            }
            const result = await client.query('SELECT * FROM sous_category WHERE id_sous_cat = $1', [id]);
            const category = result.rows[0];
            if (!category) {
                return NextResponse.json({ message: "Sub-Category not found" }, { status: 404 });
            }
            return NextResponse.json(category, { status: 200 });
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

//Update a category by id
export async function PUT(req: NextRequest, context: any) {
    const id = context.params.id;
    try {
        const client = await pool.connect();
        try {
            if (id === undefined) {
                return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
            }
            const body = await req.json();
            const { label, parent_cat } = body;
            if (!label || !parent_cat) {
                return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
            }
            const result = await client.query('UPDATE sous_category SET label = $1, parent_cat= $3 WHERE id_sous_cat = $2', [label, id, parent_cat]);
            if (result.rowCount === 0) {
                return NextResponse.json({ message: "SUB-Category not found" }, { status: 404 });
            }
            return NextResponse.json({ message: "Sub-Category updated" }, { status: 200 });
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

//Delete a category by id
export async function DELETE(req: NextRequest, context: any) {
    const id = context.params.id;
    try {
        const client = await pool.connect();
        try {
            if (id === undefined) {
                return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
            }
            const result = await client.query('DELETE FROM sous_category WHERE id_sous_cat = $1', [id]);
            if (result.rowCount === 0) {
                return NextResponse.json({ message: "Sub-Category not found" }, { status: 404 });
            }
            return NextResponse.json({ message: "Sub-Category deleted" }, { status: 200 });
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
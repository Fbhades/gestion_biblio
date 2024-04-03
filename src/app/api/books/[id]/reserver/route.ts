import { NextResponse, NextRequest } from "next/server";
import pool from "../../../../../../db";


export async function POST(req: NextRequest, context: any) {
    try {
        const id_book = context.params.id;

        const client = await pool.connect();
        try {

            const body = await req.json();
            const { id_user } = body;

            // Input validation
            if (!id_book || !id_user) {
                return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
            }
            const user = await client.query("Select * from users where id_user =$1; ", [id_user]);
            if (!user.rows[0]) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }
            if (user.rows[0].role != "student") {
                return NextResponse.json({ message: "Only students are allowed to Loan books!" }, { status: 404 });
            }

            const isBookExist = await client.query("Select * from books where id_book =$1; ", [id_book]);
            if (!isBookExist.rows[0]) {
                return NextResponse.json({ message: "Book not found" }, { status: 404 });
            }


            const availableCopy = await client.query("Select * from book_copies where book_id =$1 and status = 'available' limit 1; ", [id_book]);
            if (!availableCopy.rows[0]) {
                return NextResponse.json({ message: "No copy available for reservation !" }, { status: 404 });
            }
            const isAlreadyReserved = await client.query("select count(*) from reservations where user_id = $1 and copy_id in (select id_copy from book_copies where book_id =$2);", [id_user, id_book]);
            if (isAlreadyReserved.rows[0].count > 0) {
                return NextResponse.json({ message: "Book copy already Reserved!" }, { status: 200 });
            }
            await client.query("update book_copies set status = 'loaned' where id_copy = $1;", [availableCopy.rows[0].id_copy]);
            await client.query("insert into reservations(user_id,copy_id,reservation_date) values($1,$2,current_timestamp);", [id_user, availableCopy.rows[0].id_copy])
            return NextResponse.json({ message: "Book Reserved Successfuly" }, { status: 201 });
        }
        catch (error) {
            console.error('Error fetching data:', error);
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        } finally {
            await client.release();
        }
    } catch (error) {
        console.error('Error adding book:', error);
        return NextResponse.json({ message: "Error adding book" }, { status: 422 });
    }
};

"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../Ui/Navbar";
import Loading from "@/components/loading";
import { useUser } from "@clerk/nextjs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { reviews } from "@/app/Interface";

interface Book {
    label: string;
    author: string;
    image: string;
    description: string;
}

export default function PageDetails() {
    const { book_id } = useParams();
    const [book, setBook] = useState(undefined as Book | undefined);
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state
    const { user } = useUser();
    const email = user?.emailAddresses[0].toString();
    const [userID, setUserID] = useState(0);
    const [availableCopies, setAvailableCopies] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    const [pickupDate, setPickupDate] = useState<Date>(new Date());
    const [returnDate, setReturnDate] = useState<Date>(new Date());
    const [submittedReview, setSubmittedReview] = useState<reviews[]>([]);
    const [rating, setRating] = useState(0);
    useEffect(() => {
        if (book_id) {
            fetchBookData();
            setLoading(false);
        }
    }, [book_id]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/auth/${email}`);
            const jsonData = await response.json();
            console.log(jsonData[0]?.role);
            console.log(jsonData);
            setUserID(jsonData[0]?.id_user);
        };
        fetchData();
    }, [email]);
    const fetchDatareviews = async () => {
        const response = await fetch(
            `http://localhost:3000/api/reviews/${book_id}`
        );
        const jsonData = await response.json();
        console.log("reviews data recieved", jsonData);
        setSubmittedReview(jsonData);
        console.log("reviews", submittedReview)
    };
    useEffect(() => {

        fetchDatareviews();
    }, []);

    const fetchBookData = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/books/${book_id}`
            );
            const data = await response.json();
            console.log("Book data fetched:", data);

            const response2 = await fetch(
                `http://localhost:3000/api/books/${book_id}/available_copies`
            );
            const jsonData = await response2.json();
            setAvailableCopies(jsonData.available_copies);
            setBook(data);
        } catch (error) {
            console.error("Error fetching book data:", error);
        }
    };

    const handleReviewChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setReview(event.target.value);
    };

    const submitReview = async () => {
        console.log("Review submitted:", review);
        setReview("");
        setRating(0);
        try {
            const response = await fetch(`http://localhost:3000/api/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userID,
                    book_id: book_id,
                    rating: rating,
                    feedback: review,
                }),
            });
            if (response.ok) {
                alert("Le review est submitted.");
                fetchDatareviews();
            } else {
                const data = await response.json();

                console.error("Error review:", response);
                alert(
                    data.message || "Une erreur s'est produite lors de la publier review."
                );
            }
        } catch (error) {
            console.error("Error reveiwing:", error);
            alert("Une erreur s'est produite lors de publier review");
        }
    };
    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };
    const reserveBook = async () => {
        if (!pickupDate || !returnDate) {
            return;
        }
        if (pickupDate > returnDate) {
            alert(
                "La date de retour doit être ultérieure à la date de prise en charge."
            );
            return;
        }
        const requestData = {
            id_book: book_id,
            id_user: userID,
            pickup_date: pickupDate,
            return_date: returnDate,
        };
        console.log("Request Data:", requestData);

        try {
            // const returnDate = new Date();
            //returnDate.setDate(returnDate.getDate() + 7);
            const response = await fetch(
                `http://localhost:3000/api/books/${book_id}/reserver`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                }
            );
            if (response.ok) {
                alert("Le livre a été réservé avec succès.");
                toggleCalendar();
            } else {
                // Handle the response as needed
                const data = await response.json();

                console.error("Error reserving book:", response);
                alert(
                    data.message ||
                    "Une erreur s'est produite lors de la réservation du livre."
                );
            }
        } catch (error) {
            console.error("Error reserving book:", error);
            // Handle the error as needed
            alert("Une erreur s'est produite lors de la réservation du livre.");
        }
    };

    return (
        <>
            <Navbar />
            {loading ? (
                <Loading />
            ) : (
                <div className="mt-32 px-4 flex justify-start">
                    <div className="w-full md:w-1/3 lg:w-1/5">
                        {book ? (
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
                                <img
                                    src={book.image}
                                    alt={book.label}
                                    className="w-full object-cover"
                                />
                                <div className="p-6">
                                    <h4 className="mt-2 text-lg font-bold text-gray-900">
                                        {book.label}
                                    </h4>
                                    <p className="mt-2 max-w-sm text-gray-700">{book.author}</p>
                                    {/* Add other book details as needed */}
                                </div>
                                <span className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                                    {availableCopies || 0} available
                                </span>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                        <button
                            onClick={() => {
                                if (showCalendar) reserveBook();
                                toggleCalendar();
                            }}
                            className="mt-4 bg-transparent border border-black text-black py-2 px-10 rounded-full hover:bg-black hover:text-white"
                        >
                            Reserver
                        </button>
                        {showCalendar && (
                            <Calendar
                                onChange={(date) => {
                                    if (Array.isArray(date)) {
                                        // Si une plage de dates est sélectionnée, utilisez la première date
                                        setPickupDate(date[0] || new Date());
                                        setReturnDate(date[1] || new Date());
                                    } else {
                                        // Sinon, utilisez simplement la date sélectionnée
                                        setPickupDate(date || new Date());
                                        setReturnDate(date || new Date());
                                    }
                                }}
                                value={[pickupDate, returnDate]}
                                selectRange={true}
                            />
                        )}
                    </div>
                    <div className="md:w-1/3 lg:w-3/5">
                        <h1 className="text-3xl font-bold text-gray-900 px-4 mt-8">
                            {book ? book.label : ""}
                        </h1>
                        <h1 className="text-xl text-gray-700 px-4 mt-2">
                            {book ? book.author : ""}
                        </h1>
                        <p className="text-md ml-8 mt-9">{book ? book.description : ""}</p>
                        <div className="w-full mt-0 mr-5 ml-5">

                            <textarea
                                value={review}
                                onChange={handleReviewChange}
                                placeholder="Ecrire votre avis..."
                                className="w-full h-64 p-4 border rounded mt-4"
                            ></textarea>
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <button
                                        key={i}
                                        aria-label={`Rate ${i + 1}`}
                                        onClick={() => setRating(i + 1)}
                                        className={`w-10 h-10 flex items-center justify-center border rounded-full mr-1 ${rating > i ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        <span className="text-xl leading-none">{i + 1}</span>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={submitReview}
                                className="mt-4 bg-transparent border border-black text-black py-2 px-10 rounded-full hover:bg-black hover:text-white"
                            >
                                Publier
                            </button>
                        </div>
                        <div className="mt-8 px-4">
                            <h2 className="text-xl font-bold text-gray-900">les avis:</h2>
                            {submittedReview ? (
                                <div className="p-8">
                                    {Array.isArray(submittedReview) &&
                                        submittedReview.map((review) => (
                                            <div
                                                className="bg-white shadow-md p-4 rounded-lg mb-4"
                                                key={review.id_review}
                                            >
                                                <h2 className="text-xl font-semibold mb-2">
                                                    {review.name}
                                                </h2>
                                                <p className="text-gray-700">{review.feedback}</p>
                                                <div className="flex items-center mb-2">
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`text-lg ${i < review.rating
                                                                ? "text-yellow-400"
                                                                : "text-gray-300"
                                                                }`}
                                                        >
                                                            &#9733;
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

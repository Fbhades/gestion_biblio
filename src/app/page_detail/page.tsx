// PageDetail.js
"use client";
import React, { useState } from "react";
import Navbar from "../Ui/Navbar";

export default function Page_detail(props) {
    props = props.searchParams;
    const [review, setReview] = useState(""); // State to store the review text

    const handleReviewChange = (event) => {
        setReview(event.target.value); // Update the review state when the user types
    };

    const submitReview = () => {
        // Add your logic to submit the review
        console.log("Review submitted:", review);
        // Clear the review input after submission
        setReview("");
    };

    return (
        <>
            <Navbar />
            <div className=" mt-32 px-4 flex justify-start">
                <div className="w-full md:w-1/3 lg:w-1/5 ">
                    {props ? (
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                //src="https://www.dramaticpublishing.com/media/catalog/product/cache/1/image/300x436/9df78eab33525d08d6e5fb8d27136e95/t/o/to_kill_a_mockingbird_cover-t34.jpg"
                                alt={props.label}
                                className="h-64 w-full object-cover"
                            />  
                            <div className="p-6">
                                <h4 className="mt-2 text-lg font-bold text-gray-900">
                                    {props.label}
                                </h4>
                                <p className="mt-2 max-w-sm text-gray-700">{props.author}</p>
                                {/* Add other book details as needed */}
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    {/* Reserve button */}
                    <button className="mt-4 bg-transparent border border-black text-black py-2 px-10 rounded-full hover:bg-black hover:text-white">
                        Reserver
                    </button>
                </div>
                <div className=" md:w-1/3 lg:w-3/5">
                    <h1 className="text-3xl font-bold text-gray-900 px-4 mt-8">{props.label}</h1> 
                    <h1 className="text-xl  text-gray-700 px-4 mt-2">{props.author}</h1>
                    <p className="text-md  ml-8 mt-9">{props.description}</p> 
                    <div className="w-full mt-0 mr-5 ml-5">
                    <textarea
                        value={review}
                        onChange={handleReviewChange}
                        placeholder="Ecrire votre avis..."
                        className="w-full h-64 p-4 border rounded mt-4" // Added mt-4 class
                    ></textarea>
                    <button
                        onClick={submitReview}
                        className="mt-4 bg-transparent border border-black text-black py-2 px-10 rounded-full hover:bg-black hover:text-white"
                    >
                        Publier
                    </button>
            </div>
                </div>
                {/* Review section with margin */}

            </div>
          
        </>
    );
}

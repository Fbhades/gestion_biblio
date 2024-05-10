"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Announcement } from "@/app/Interface";
import Navbar from "../Ui/Navbar";

const Page = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/announcement?notexpired=true"
                );
                setAnnouncements(response.data);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };

        fetchAnnouncements();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", { day: "2-digit", month: "numeric", year: "numeric" as const });
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto flex flex-col mt-32 justify-center items-center w-full">
                <h1 className="text-3xl font-bold mb-4 text-center">Announcements</h1>
                {announcements.map((announcement) => (
                    <div
                        key={announcement.id_announcement}
                        className="my-4 p-4 border rounded-lg shadow-md text-center w-3/4"
                    >
                        <p className="text-gray-700 mb-2 whitespace-pre-line text-lg">
                            {announcement.message.replace(/\n/g, "\n")}
                        </p>
                        <p className="text-gray-500">
                            Publish Date: {formatDate(announcement.publish_date)}
                        </p>
                        <p className="text-gray-500">
                            Expiry Date: {formatDate(announcement.expiry_date)}
                        </p>
                        <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full mt-2">
                            Badge
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Page;
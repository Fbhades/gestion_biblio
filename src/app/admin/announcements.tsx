import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { Block } from 'notiflix/build/notiflix-block-aio';
import { Notify } from 'notiflix';

export default function Announcements() {
    const [message, setMessage] = useState('');
    const [expiry_date, setExpiryDate] = useState('');
    const [announcements, setAnnouncements] = useState([]);
    const user = useUser();
    const [admin_id, setAdminId] = useState(0);
    const email = user?.user?.emailAddresses[0].toString();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/auth/${email}`);
            const jsonData = await response.json();
            setAdminId(jsonData[0].id_user);
        };
        fetchData();
    }, [email]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const response = await fetch('http://localhost:3000/api/announcement');
            const jsonData = await response.json();
            setAnnouncements(jsonData);
        };
        fetchAnnouncements();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Check if input fields are empty
        if (!message || !expiry_date) {
            Notify.failure('Message and expiry date are required');
            // console.error('Message and expiry date are required');
            return;
        }
        // Get tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Convert expiry_date to Date object
        const expiryDateObj = new Date(expiry_date);

        // Check if expiry_date is earlier than tomorrow
        if (expiryDateObj < tomorrow) {
            Notify.failure('Expiry date cannot be earlier than tomorrow');
            // console.error('Expiry date cannot be earlier than tomorrow');
            return;
        }

        const announcement = {
            message,
            expiry_date,
            admin_id
        };

        try {
            Block.circle('.create', 'Submiting...', { backgroundColor: 'rgba(0,0,0,0.6)', svgColor: '#fff', messageColor: '#fff' });

            const response = await fetch('http://localhost:3000/api/announcement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(announcement)
            });

            if (response.ok) {
                Notify.success('Announcement submitted successfully');
                // console.log('Announcement submitted successfully');
                // Clear the form
                setMessage('');
                setExpiryDate('');
                Block.remove('.create');
            } else {
                Notify.failure('Error submitting announcement');
                // console.error('Error submitting announcement');
            }
        } catch (error) {
            console.error('Error submitting announcement', error);
        }
    };

    return (
        <div className="container">
            <div className="flex justify-center">
                <div className="w-full">
                    <div className="w-full flex justify-center">
                        <div className="bg-white shadow p-4 mt-4 rounded-md create w-1/2 ">
                            <h1 className="text-center text-2xl font-bold mb-4 mt-2">Create announcement :</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 ">
                                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">Message</label>
                                    <textarea
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        id="message"
                                        rows={3}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="expiry_date" className="block text-sm font-medium leading-6 text-gray-900">Expiry Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                        id="expiry_date"
                                        value={expiry_date}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                        min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // Disable earlier dates
                                    />
                                </div>
                                <button type="submit" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="bg-white shadow p-4 mt-4 rounded-md w-full">
                        <h1 className="text-center text-2xl font-bold mb-4 mt-2">Announcements List :</h1>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="sticky top-0 bg-gray-100 border-b border-gray-200 px-4 py-2">Message</th>
                                    <th className="sticky top-0 bg-gray-100 border-b border-gray-200 px-4 py-2">Expiry Date</th>
                                    <th className="sticky top-0 bg-gray-100 border-b border-gray-200 px-4 py-2">Admin ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {announcements.map((announcement: any) => (
                                    <tr key={announcement.id}>
                                        <td className="border-b border-gray-200 px-4 py-2" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '40vw' }}>{announcement.message}</td>
                                        <td className="border-b border-gray-200 px-4 py-2">{new Date(announcement.expiry_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                                        <td className="border-b border-gray-200 px-4 py-2">{announcement.admin_id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

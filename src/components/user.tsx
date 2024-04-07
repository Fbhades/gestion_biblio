"use client";
import { useUser } from "@clerk/clerk-react";
export const handleCreateUser = async () => {
  try {
    const { isLoaded, isSignedIn, user } = useUser();
    const email = user?.emailAddresses[0].toString();
    const first_name = user?.firstName;
    const last_name = user?.lastName;

    const response = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, first_name, last_name }),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const data = await response.json();
    console.log('User created:', data);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

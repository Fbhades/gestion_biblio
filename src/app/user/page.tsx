// pages/profile.tsx

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export default function Profile() {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState('');

  useEffect(() => {
    if (user) {
      setName(`${user.firstName} ${user.lastName}`);
      setEmail(user.emailAddresses[0]?.toString() || '');
      setPhoneNumber(user.phoneNumbers[0]?.toString() || '');
      setProfilePicture(user.profileImageUrl);
    }
  }, [user]);

  const handleNameChange = (event: any) => {
    setNewName(event.target.value);
  };

  const handleEmailChange = (event:any) => {
    setNewEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event: any) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleProfilePictureChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewProfilePicture(reader.result as string);
    };
  };

  const handlePasswordChange = async (newPassword: string) => {
    try {
      // Appel à API to UPDATE User
      const response = await fetch('http://localhost:3000/api/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      alert('Mot de passe mis à jour avec succès !');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Une erreur s\'est produite lors de la mise à jour du mot de passe');
    }
  };

  const handleSave = async () => {
    try {
      // Appel à API to SAVE the updates of user
      const response = await fetch('http://localhost:3000/api/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, email: newEmail, phoneNumber: newPhoneNumber }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setName(newName);
      setEmail(newEmail);
      setPhoneNumber(newPhoneNumber);
      setProfilePicture(newProfilePicture);
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Une erreur s\'est produite lors de la mise à jour du profil');
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      try {
        // Appel à API to DELETE user
        const response = await fetch('http://localhost:3000/api/delete-account', {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete account');
        }

        alert('Compte supprimé avec succès !');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Une erreur s\'est produite lors de la suppression du compte');
      }
    }
  };

  return (
    <div>
      <h1>Profil utilisateur</h1>
      <div>
        <label>Nom:</label>
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={newEmail}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <label>Numéro de téléphone:</label>
        <input
          type="text"
          value={newPhoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div>
        <label>Photo de profil:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
      </div>
      <button onClick={handleSave}>Enregistrer</button>
      <button onClick={handleDeleteAccount}>Supprimer le compte</button>
      <div>
        <h2>Informations actuelles:</h2>
        <p>Nom: {name}</p>
        <p>Email: {email}</p>
        <p>Numéro de téléphone: {phoneNumber}</p>
        <p>Photo de profil: <img src={profilePicture} alt="Profile" /></p>
      </div>
    </div>
  );
}

"use client";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import { FaSearch } from 'react-icons/fa';
import { UserButton } from "@clerk/clerk-react";
import Navbar from "./Ui/Navbar";
import { handleCreateUser } from "@/components/user";


export default function Home() {
  //
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const handleCreateUser = async () => {
    try {
       const { isLoaded, isSignedIn, user } = useUser();
      const email = user?.emailAddresses[0].toString();
      const firstname = user?.firstName?.toString();
      const lastname  = user?.lastName?.toString();
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, firstname,lastname }),
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
  if (userId) { handleCreateUser() }
  return (
    <div>
      <Navbar />

      <div className="pt-0">
        {/* acceuil Section */}
        <section id="accueil" style={{
          // backgroundImage: "url('https://www.travelandleisure.com/thmb/iq3jvCzmNJY8KnsfCrj76xoQbu0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/johns-hopkins-university-george-peabody-library-COLLEGELIB0417-e09f301ad9ce42fbb924f269469d59a8.jpg?fbclid=IwAR2FFv7WJNMlCXxEYCVHBcYYMBFl77sltUAdf9MNu1fCJVJh3L1BxdtKhQc')"
          backgroundImage: "url('bg-image.jpg')"
          , backgroundSize: "cover", backgroundPosition: "center", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <h1 className="text-5xl text-white font-bold mb-8">A place to learn, grow, and explore</h1>
        </section>

        {/* À propos Section */}
        <section id="a-propos" className="bg-gray-200  py-60 mb-8 "> {/* Increased padding-y */}
          <div className="max-w-screen-full mx-auto text-center">
            <h1 className="text-3xl font-bold text-black  mb-4">À propos</h1>
            <p className="text-lg text-gray-800 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus vitae magna luctus blandit. Nullam pulvinar dui sed interdum sagittis.</p>
          </div>
        </section>

        {/* Nos services Section */}
        <section id="nos-services" className="bg-gray-200  py-60 mb-8 ">
          <div className="max-w-screen-full mx-auto text-center">
            <h1 className="text-3xl font-bold text-black  mb-4">Nos services</h1>
            <div className="flex justify-center space-x-8">
              {/* Service Box 1 */}
              <div className="bg-white  rounded-lg shadow-lg p-6 flex-1">
                <h2 className="text-xl font-bold text-gray-800  mb-4">Nos Evènements</h2>
                <p className="text-gray-600 ">Nos eveènements seront bientot affichés</p>
              </div>
              {/* Service Box 2 */}
              <div className="bg-white  rounded-lg shadow-lg p-6 flex-1">
                <h2 className="text-xl font-bold text-gray-800  mb-4">Réeservation Espace</h2>
                <p className="text-gray-600 ">Réservez un espace our une expérience exceptionnelle</p>
              </div>
              {/* Service Box 3 */}
              <div className="bg-white  rounded-lg shadow-lg p-6 flex-1">
                <h2 className="text-xl font-bold text-gray-800  mb-4">Emprunt livre</h2>
                <p className="text-gray-600 ">Veuillez nous rejoindre et empruntez des livre inconditionnellement</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nouveautés Section */}
        <section id="nouveautes" className="bg-gray-200  py-60 mb-8">
          <div className="max-w-screen-full mx-auto text-center">
            <h1 className="text-3xl font-bold text-black  mb-4">Nouveautés</h1>
            <p className="text-lg text-gray-800 ">Nos nouveautés seront affichés ici</p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gray-200  py-60 mb-8">
          <div className="max-w-screen-full mx-auto text-center">
            <h1 className="text-3xl font-bold text-black  mb-4">Contactez-nous</h1>
            <form className="max-w-lg mx-auto">
              <div className="mb-4">
                <input type="text" placeholder="Nom" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
              </div>
              <div className="mb-4">
                <input type="text" placeholder="Prénom" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
              </div>
              <div className="mb-4">
                <input type="text" placeholder="Adresse" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
              </div>
              <div className="mb-4">
                <input type="text" placeholder="Classe" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
              </div>
              <div className="mb-4">
                <textarea placeholder="Message" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300" rows={4}></textarea>
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Envoyer
              </button>
            </form>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between px-4">
            <div className="flex items-center mb-4 lg:mb-0">
              {/* <img src="/iset_logo.png" alt="ISET Logo" className="h-12 mr-2" /> */}
              <div>
                <h3 className="font-semibold">ISET RADES</h3>
                <p>Telephone: +216 71417952</p>
              </div>
            </div>
            <div className="flex items-center mb-4 lg:mb-0">
              <p>Suivez-nous sur:</p>
              <a href="https://www.facebook.com/isetrades2018" target="_blank" rel="noopener noreferrer" className="ml-2">
                <img src="https://static.vecteezy.com/system/resources/previews/023/741/223/non_2x/facebook-logo-icon-social-media-icon-free-png.png" alt="Facebook Icon" className="h-6" />
              </a>
            </div>
            <div className="flex items-center mb-4 lg:mb-0">
              <form>
                <label htmlFor="email" className="sr-only text-white">Joignez-vous à notre liste d envoi </label>
                <input type="email" id="email" name="email" placeholder="Votre adresse email" className="px-4 py-2 border border-gray-600 rounded-l-md focus:outline-none focus:border-blue-500" />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md">S inscrire</button>
              </form>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};


"use client";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import { FaSearch } from 'react-icons/fa'; 
import { UserButton } from "@clerk/clerk-react";



export default function Home() {
  //
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const handleCreateUser = async () => {
    try {
      const { isLoaded, isSignedIn, user } = useUser();
      console.log(user);
      const email =user?.emailAddresses[0].toString();
      const name = user?.fullName?.toString();
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email , name}),
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
  if(userId){handleCreateUser()}
    return (
      <div>
        <nav className="bg-blue-200 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 h-24"> {/* Increased height */}
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <div className="flex items-center space-x-20 rtl:space-x-reverse">
              <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">ISET RADES</span>
              </a>
              <ul className="flex flex-row items-center space-x-10">
                <li>
                  <a href="#accueil" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Accueil</a> {/* Black text color, deep blue hover color */}
                </li>
                <li>
                  <a href="#a-propos" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">À propos</a> {/* Black text color, deep blue hover color */}
                </li>
                <li>
                  <a href="#nos-services" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Nos services</a> {/* Black text color, deep blue hover color */}
                </li>
                <li>
                  <a href="/books" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">books</a> {/* Black text color, deep blue hover color */}
                </li>
                <li>
                  <a href="#nouveautes" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Nouveautés</a> {/* Black text color, deep blue hover color */}
                </li>
                <li>
                  <a href="#contact" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Contact</a> {/* Black text color, deep blue hover color */}
                </li>
              </ul>
            </div>
            <div className="relative h-full mt-2"> 
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 pointer-events-none" /> {/* Search icon */}
              <input type="text" placeholder="Search..." className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 h-full bg-white dark:bg-gray-800" />
            </div>
            <UserButton />
          </div>
        </nav>
  
        <div className="pt-24">
          {/* acceuil Section */}
          <section id="accueil" style={{ backgroundImage: "url('https://www.travelandleisure.com/thmb/iq3jvCzmNJY8KnsfCrj76xoQbu0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/johns-hopkins-university-george-peabody-library-COLLEGELIB0417-e09f301ad9ce42fbb924f269469d59a8.jpg?fbclid=IwAR2FFv7WJNMlCXxEYCVHBcYYMBFl77sltUAdf9MNu1fCJVJh3L1BxdtKhQc')"
          , backgroundSize: "cover", backgroundPosition: "center", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h1 className="text-5xl text-white font-bold mb-8">A place to learn, grow, and explore</h1>
          </section>
  
          {/* À propos Section */}
          <section id="a-propos" className="bg-gray-200 dark:bg-gray-700 py-60 mb-8"> {/* Increased padding-y */}
            <div className="max-w-screen-full mx-auto text-center">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-4">À propos</h1>
              <p className="text-lg text-gray-800 dark:text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus vitae magna luctus blandit. Nullam pulvinar dui sed interdum sagittis.</p>
            </div>
          </section>
  
          {/* Nos services Section */}
          <section id="nos-services" className="bg-gray-200 dark:bg-gray-700 py-60 mb-8">
            <div className="max-w-screen-full mx-auto text-center">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Nos services</h1>
              <div className="flex justify-center space-x-8">
                {/* Service Box 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Nos Evènements</h2>
                  <p className="text-gray-600 dark:text-gray-300">Nos eveènements seront bientot affichés</p>
                </div>
                {/* Service Box 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Réeservation Espace</h2>
                  <p className="text-gray-600 dark:text-gray-300">Réservez un espace our une expérience exceptionnelle</p>
                </div>
                {/* Service Box 3 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Emprunt livre</h2>
                  <p className="text-gray-600 dark:text-gray-300">Veuillez nous rejoindre et empruntez des livre inconditionnellement</p>
                </div>
              </div>
            </div>
          </section>
  
          {/* Nouveautés Section */}
          <section id="nouveautes" className="bg-gray-200 dark:bg-gray-700 py-60 mb-8"> 
            <div className="max-w-screen-full mx-auto text-center">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Nouveautés</h1>
              <p className="text-lg text-gray-800 dark:text-gray-300">Nos nouveautés seront affichés ici</p>
            </div>
          </section>
  
          {/* Contact Section */}
          <section id="contact" className="bg-gray-200 dark:bg-gray-700 py-60 mb-8">
            <div className="max-w-screen-full mx-auto text-center">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Contactez-nous</h1>
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
              <a href="https://www.facebook.com/groups/2521897081396" target="_blank" rel="noopener noreferrer" className="ml-2">
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


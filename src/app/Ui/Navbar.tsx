import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserButton, useAuth } from "@clerk/nextjs";

interface NavbarProps {
    searchTerm: string; 
    setSearchTerm : (value: string) => void;
  }
  
export default function Navbar({ searchTerm, setSearchTerm  }: NavbarProps) {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    return (
      <nav className="bg-blue-200 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 h-24"> {/* Increased height */}
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-20 rtl:space-x-reverse">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">ISET RADES</span>
            </a>
            <ul className="flex flex-row items-center space-x-10">
              <li>
                <a href="/" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Accueil</a> {/* Black text color, deep blue hover color */}
              </li>
              <li>
                <a href="/" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">À propos</a> {/* Black text color, deep blue hover color */}
              </li>
              <li>
                <a href="/" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Nos services</a> {/* Black text color, deep blue hover color */}
              </li>
              <li>
                <a href="/books" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Livres</a> {/* Black text color, deep blue hover color */}
              </li>
              <li>
                <a href="/" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Nouveautés</a> {/* Black text color, deep blue hover color */}
              </li>
              <li>
                <a href="/" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Contact</a> {/* Black text color, deep blue hover color */}
              </li>
            </ul>
          </div>
          <div className="relative h-full mt-2"> 
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 pointer-events-none" /> {/* Search icon */}
            <input type="text" 
            placeholder="Search..." 
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 h-full bg-white dark:bg-gray-800" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            { userId ? <UserButton/> : <a href='/sign-in' className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Sign In</a> }
          </div>
        </div>
      </nav>
    );
  }
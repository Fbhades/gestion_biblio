import { UserButton, useAuth } from "@clerk/nextjs";


export default function Navbar() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  return (
    <nav className="bg-blue-400 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 h-13"> {/* Increased height */}
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-20 rtl:space-x-reverse">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">ISET RADES</span>
          </a>
          <ul className="flex flex-row items-center space-x-10">
            <li>
              <a href="/" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Accueil</a> {/* Black text color, deep blue hover color */}
            </li>
            <li>
              <a href="/#a-propos" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">À propos</a> {/* Black text color, deep blue hover color */}
            </li>
            <li>
              <a href="/#nos-services" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Nos services</a> {/* Black text color, deep blue hover color */}
            </li>
            <li>
              <a href="/books" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Livres</a> {/* Black text color, deep blue hover color */}
            </li>
            <li>
              <a href="/#nouveautes" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Nouveautés</a> {/* Black text color, deep blue hover color */}
            </li>
            <li>
              <a href="/#contact" className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Contact</a> {/* Black text color, deep blue hover color */}
            </li>
          </ul>
        </div>

        <div>
          {userId ? <UserButton /> : <a href='/sign-in' className="text-black hover:text-blue-800 dark:text-white dark:hover:text-blue-500">Sign In</a>}
        </div>
      </div>
    </nav>
  );
}
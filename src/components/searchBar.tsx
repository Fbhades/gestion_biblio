import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="relative h-full my-2">
      <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 pointer-events-none w-5 h-5" /> {/* Search icon */}
      <input type="text"
        placeholder="Search..."
        className=" pl-10 pr-3 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 h-full bg-white dark:bg-gray-800"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
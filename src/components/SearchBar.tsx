import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  isMobile?: boolean;
}

export const SearchBar = ({ isMobile }: SearchBarProps) => {
  return (
    <div className={`relative ${isMobile ? 'w-full' : 'w-full max-w-3xl'}`}>
      <div className="relative flex items-center">
        <div className="absolute left-4 flex items-center">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search by city, zip, or address..."
          className="w-full pl-12 pr-4 h-12 rounded-full bg-gray-50 border-gray-200 focus:border-primary hover:bg-gray-100 transition-colors"
        />
        <button
          className="absolute right-4 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}; 
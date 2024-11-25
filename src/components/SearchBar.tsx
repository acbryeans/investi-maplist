import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  isMobile?: boolean;
}

export const SearchBar = ({ isMobile }: SearchBarProps) => {
  return (
    <div className={`relative ${isMobile ? 'w-full' : 'w-[400px]'}`}>
      <div className="relative flex items-center">
        <div className="absolute left-3 flex items-center">
          <MapPin className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search by city, zip, or address..."
          className="w-full pl-10 pr-12 h-11 bg-white border-gray-200 focus:border-primary"
        />
        <button
          className="absolute right-3 p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Search"
        >
          <Search className="h-4 w-4 text-gray-400" />
        </button>
      </div>
      
      {/* Suggestions dropdown - hidden by default */}
      <div className="hidden absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
        <div className="p-2">
          <div className="text-xs font-medium text-gray-500 mb-2">Recent Searches</div>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md flex items-center gap-2">
              <MapPin className="h-3 w-3 text-gray-400" />
              Austin, TX
            </button>
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md flex items-center gap-2">
              <MapPin className="h-3 w-3 text-gray-400" />
              78701, Austin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 
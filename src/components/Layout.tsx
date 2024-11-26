import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { ViewToggle } from "@/components/ViewToggle";

interface LayoutProps {
  children: React.ReactNode;
  view: "map" | "list";
  onViewChange: (view: "map" | "list") => void;
  isMobile?: boolean;
}

export const Layout = ({ children, view, onViewChange, isMobile }: LayoutProps) => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <header className="bg-white border-b z-10 h-14 flex-shrink-0">
        <div className="flex items-center h-full px-4 max-w-[2560px] mx-auto w-full">
          <h1 className="text-2xl font-bold text-primary">Picket</h1>
          <div className="flex-1 px-4">
            <SearchBar isMobile={isMobile} />
          </div>
          <ViewToggle view={view} onViewChange={onViewChange} isMobile={isMobile} />
        </div>
      </header>
      
      <FilterBar />
      
      <main className="flex-1 flex min-h-0 w-full">
        {children}
      </main>
    </div>
  );
};
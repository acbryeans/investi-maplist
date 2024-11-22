import { useState } from "react";
import { PropertyList } from "@/components/PropertyList";
import { Button } from "@/components/ui/button";
import { MapIcon, ListIcon } from "lucide-react";

const MOCK_PROPERTIES = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    price: 750000,
    address: "123 Investment Ave, Austin, TX 78701",
    beds: 4,
    baths: 3,
    sqft: 2500,
    capRate: 5.8,
    cashOnCash: 8.2,
    tags: ["High Growth Market", "Value-Buy"],
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    price: 550000,
    address: "456 Cashflow St, Austin, TX 78702",
    beds: 3,
    baths: 2,
    sqft: 1800,
    capRate: 7.2,
    cashOnCash: 9.5,
    tags: ["Cashflow", "Below Market"],
  },
];

const Index = () => {
  const [view, setView] = useState<"map" | "list">("map");

  const handlePropertyClick = (id: string) => {
    console.log("Property clicked:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Investment Properties</h1>
          <div className="flex gap-2">
            <Button
              variant={view === "map" ? "default" : "outline"}
              onClick={() => setView("map")}
              className="gap-2"
            >
              <MapIcon size={16} />
              Map
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              onClick={() => setView("list")}
              className="gap-2"
            >
              <ListIcon size={16} />
              List
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {view === "map" ? (
          <div className="flex gap-8">
            <div className="w-[600px]">
              <PropertyList 
                properties={MOCK_PROPERTIES} 
                onPropertyClick={handlePropertyClick}
              />
            </div>
            <div className="flex-1 bg-gray-200 rounded-lg min-h-[calc(100vh-10rem)]">
              <div className="h-full flex items-center justify-center text-gray-500">
                Map View (Coming Soon)
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <PropertyList 
              properties={MOCK_PROPERTIES} 
              onPropertyClick={handlePropertyClick}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
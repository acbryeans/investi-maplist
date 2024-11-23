import { useState, useEffect } from "react";
import { ViewToggle } from "@/components/ViewToggle";
import { PropertyList } from "@/components/PropertyList";
import { PropertyModal } from "@/components/PropertyModal";
import { MapView } from "@/components/MapView";
import { FilterPanel } from "@/components/FilterPanel";
import { Property } from "@/types/property";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const MOCK_PROPERTIES: Property[] = [
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
    rentEstimate: 4200,
    repairsEstimate: 15000,
    financing: {
      downPayment: 150000,
      interestRate: 6.5,
      monthlyPayment: 3800,
    },
    yearlyAppreciation: 8.5,
    comps: [
      {
        address: "125 Investment Ave",
        price: 765000,
        sqft: 2450,
        soldDate: "2024-01-15",
      },
      {
        address: "121 Investment Ave",
        price: 742000,
        sqft: 2550,
        soldDate: "2024-01-02",
      },
      {
        address: "127 Investment Ave",
        price: 758000,
        sqft: 2480,
        soldDate: "2023-12-28",
      },
    ],
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
    tags: ["High Cap Rate", "Below Market"],
    rentEstimate: 3000,
    repairsEstimate: 5000,
    financing: {
      downPayment: 110000,
      interestRate: 6,
      monthlyPayment: 2500,
    },
    yearlyAppreciation: 5,
    comps: [],
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    price: 890000,
    address: "789 Equity Ln, Austin, TX 78703",
    beds: 5,
    baths: 4,
    sqft: 3200,
    capRate: 4.9,
    cashOnCash: 7.1,
    tags: ["Luxury", "Appreciation"],
    rentEstimate: 6000,
    repairsEstimate: 20000,
    financing: {
      downPayment: 178000,
      interestRate: 6.5,
      monthlyPayment: 5300,
    },
    yearlyAppreciation: 6,
    comps: [],
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126",
    price: 420000,
    address: "321 ROI Rd, Austin, TX 78704",
    beds: 2,
    baths: 2,
    sqft: 1200,
    capRate: 8.1,
    cashOnCash: 11.2,
    tags: ["High Yield", "Starter"],
    rentEstimate: 2800,
    repairsEstimate: 3000,
    financing: {
      downPayment: 84000,
      interestRate: 6.5,
      monthlyPayment: 2000,
    },
    yearlyAppreciation: 7,
    comps: [],
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    price: 675000,
    address: "567 Portfolio Pl, Austin, TX 78705",
    beds: 4,
    baths: 3,
    sqft: 2800,
    capRate: 6.3,
    cashOnCash: 8.9,
    tags: ["Family Friendly", "Good Schools"],
    rentEstimate: 3900,
    repairsEstimate: 10000,
    financing: {
      downPayment: 135000,
      interestRate: 6.5,
      monthlyPayment: 3600,
    },
    yearlyAppreciation: 6.5,
    comps: [],
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    price: 495000,
    address: "890 Dividend Dr, Austin, TX 78706",
    beds: 3,
    baths: 2,
    sqft: 1600,
    capRate: 7.5,
    cashOnCash: 10.1,
    tags: ["Up and Coming", "High Demand"],
    rentEstimate: 3200,
    repairsEstimate: 4000,
    financing: {
      downPayment: 99000,
      interestRate: 6.5,
      monthlyPayment: 2700,
    },
    yearlyAppreciation: 9,
    comps: [],
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 925000,
    address: "432 Wealth Way, Austin, TX 78707",
    beds: 5,
    baths: 4,
    sqft: 3500,
    capRate: 5.2,
    cashOnCash: 7.8,
    tags: ["Premium Location", "Pool"],
    rentEstimate: 6500,
    repairsEstimate: 25000,
    financing: {
      downPayment: 185000,
      interestRate: 6.5,
      monthlyPayment: 5600,
    },
    yearlyAppreciation: 6,
    comps: [],
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    price: 380000,
    address: "765 Income Ave, Austin, TX 78708",
    beds: 2,
    baths: 1,
    sqft: 1000,
    capRate: 8.7,
    cashOnCash: 12.3,
    tags: ["High Cap Rate", "Rental Demand"],
    rentEstimate: 2000,
    repairsEstimate: 2000,
    financing: {
      downPayment: 76000,
      interestRate: 6.5,
      monthlyPayment: 1600,
    },
    yearlyAppreciation: 7.5,
    comps: [],
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    price: 720000,
    address: "543 Asset St, Austin, TX 78709",
    beds: 4,
    baths: 3,
    sqft: 2600,
    capRate: 6.1,
    cashOnCash: 8.5,
    tags: ["Modern", "Energy Efficient"],
    rentEstimate: 3900,
    repairsEstimate: 12000,
    financing: {
      downPayment: 144000,
      interestRate: 6.5,
      monthlyPayment: 3500,
    },
    yearlyAppreciation: 6,
    comps: [],
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    price: 850000,
    address: "234 Profit Pkwy, Austin, TX 78710",
    beds: 5,
    baths: 4,
    sqft: 3100,
    capRate: 5.5,
    cashOnCash: 7.9,
    tags: ["Gated Community", "Investment Ready"],
    rentEstimate: 5000,
    repairsEstimate: 15000,
    financing: {
      downPayment: 170000,
      interestRate: 6.5,
      monthlyPayment: 4800,
    },
    yearlyAppreciation: 5.5,
    comps: [],
  },
];

const Index = () => {
  const [view, setView] = useState<"map" | "list">("map");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-primary">Find Your Next Investment</h1>
          <ViewToggle view={view} onViewChange={setView} isMobile={isMobile} />
        </div>
      </header>

      <main className="pt-[4.5rem]">
        {view === "map" ? (
          <div className="relative h-[calc(100vh-4.5rem)]">
            <div className={`${isMobile ? 'w-full h-full' : 'flex gap-8 container mx-auto px-4 py-8'}`}>
              <div className={`${isMobile ? 'hidden' : 'w-[600px]'}`}>
                <PropertyList 
                  properties={MOCK_PROPERTIES} 
                  onPropertyClick={setSelectedProperty}
                  view={view}
                />
              </div>
              <div className={`${isMobile ? 'w-full h-full' : 'flex-1'}`}>
                <MapView isMobile={isMobile} />
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow p-4">
              <PropertyList 
                properties={MOCK_PROPERTIES} 
                onPropertyClick={setSelectedProperty}
                view={view}
                isMobile={isMobile}
              />
            </div>
          </div>
        )}
      </main>

      <FilterPanel 
        onFilterChange={(filters) => {
          console.log(filters);
        }}
        isMobile={isMobile}
      />

      <PropertyModal 
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Index;

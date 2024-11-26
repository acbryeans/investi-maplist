import { useState } from "react";
import { PropertyList } from "@/components/PropertyList";
import { PropertyModal } from "@/components/PropertyModal";
import { MapView } from "@/components/MapView";
import { StrategyPanel } from "@/components/StrategyPanel";
import { Property } from "@/types/property";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Layout } from "@/components/Layout";

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
    tags: ["High Growth Market"],
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
    lat: 30.2729,
    lng: -97.7444,
    marketMetrics: {
      appreciationForecast: {
        fiveYear: 42,
        annual: 8.4
      },
      marketMomentum: 8.5,
      volatility: 'Low'
    },
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
    tags: ["High Cap Rate"],
    rentEstimate: 3000,
    repairsEstimate: 5000,
    financing: {
      downPayment: 110000,
      interestRate: 6,
      monthlyPayment: 2500,
    },
    yearlyAppreciation: 5,
    comps: [
      {
        address: "458 Cashflow St",
        price: 545000,
        sqft: 1750,
        soldDate: "2024-01-10",
      },
      {
        address: "460 Cashflow St",
        price: 552000,
        sqft: 1820,
        soldDate: "2024-01-05",
      },
      {
        address: "454 Cashflow St",
        price: 548000,
        sqft: 1780,
        soldDate: "2023-12-28",
      },
    ],
    lat: 30.2845,
    lng: -97.7392,
    marketMetrics: {
      appreciationForecast: {
        fiveYear: 42,
        annual: 8.4
      },
      marketMomentum: 8.5,
      volatility: 'Low'
    },
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
    tags: ["Fix and Flip"],
    rentEstimate: 6000,
    repairsEstimate: 20000,
    financing: {
      downPayment: 178000,
      interestRate: 6.5,
      monthlyPayment: 5300,
    },
    yearlyAppreciation: 6,
    comps: [
      {
        address: "790 Equity Ln",
        price: 895000,
        sqft: 3250,
        soldDate: "2024-01-20",
      },
      {
        address: "785 Equity Ln",
        price: 870000,
        sqft: 3150,
        soldDate: "2024-01-15",
      },
      {
        address: "792 Equity Ln",
        price: 880000,
        sqft: 3300,
        soldDate: "2024-01-10",
      },
    ],
    lat: 30.2651,
    lng: -97.7489,
    marketMetrics: {
      appreciationForecast: {
        fiveYear: 42,
        annual: 8.4
      },
      marketMomentum: 8.5,
      volatility: 'Low'
    },
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
    tags: ["Value-Buy"],
    rentEstimate: 2800,
    repairsEstimate: 3000,
    financing: {
      downPayment: 84000,
      interestRate: 6.5,
      monthlyPayment: 2000,
    },
    yearlyAppreciation: 7,
    comps: [
      {
        address: "320 ROI Rd",
        price: 430000,
        sqft: 1250,
        soldDate: "2024-01-05",
      },
      {
        address: "315 ROI Rd",
        price: 415000,
        sqft: 1150,
        soldDate: "2024-01-02",
      },
      {
        address: "330 ROI Rd",
        price: 420000,
        sqft: 1200,
        soldDate: "2023-12-28",
      },
    ],
    lat: 30.2798,
    lng: -97.7512,
    marketMetrics: {
      appreciationForecast: {
        fiveYear: 42,
        annual: 8.4
      },
      marketMomentum: 8.5,
      volatility: 'Low'
    },
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
    tags: ["High Cap Rate"],
    rentEstimate: 3900,
    repairsEstimate: 10000,
    financing: {
      downPayment: 135000,
      interestRate: 6.5,
      monthlyPayment: 3600,
    },
    yearlyAppreciation: 6.5,
    comps: [
      {
        address: "570 Portfolio Pl",
        price: 680000,
        sqft: 2850,
        soldDate: "2024-01-15",
      },
      {
        address: "550 Portfolio Pl",
        price: 670000,
        sqft: 2780,
        soldDate: "2024-01-10",
      },
      {
        address: "580 Portfolio Pl",
        price: 675000,
        sqft: 2820,
        soldDate: "2024-01-08",
      },
    ],
    lat: 30.2705,
    lng: -97.7378,
    marketMetrics: {
      appreciationForecast: {
        fiveYear: 42,
        annual: 8.4
      },
      marketMomentum: 8.5,
      volatility: 'Low'
    },
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
    tags: ["High Growth Market"],
    rentEstimate: 3200,
    repairsEstimate: 4000,
    financing: {
      downPayment: 99000,
      interestRate: 6.5,
      monthlyPayment: 2700,
    },
    yearlyAppreciation: 9,
    comps: [
      {
        address: "895 Dividend Dr",
        price: 490000,
        sqft: 1550,
        soldDate: "2024-01-12",
      },
      {
        address: "880 Dividend Dr",
        price: 500000,
        sqft: 1620,
        soldDate: "2024-01-05",
      },
      {
        address: "885 Dividend Dr",
        price: 495000,
        sqft: 1580,
        soldDate: "2024-01-02",
      },
    ],
    lat: 30.2892,
    lng: -97.7456,
    marketMetrics: {
      appreciationForecast: {
        fiveYear: 42,
        annual: 8.4
      },
      marketMomentum: 8.5,
      volatility: 'Low'
    },
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
    tags: ["Value-Buy"],
    rentEstimate: 6500,
    repairsEstimate: 25000,
    financing: {
      downPayment: 185000,
      interestRate: 6.5,
      monthlyPayment: 5600,
    },
    yearlyAppreciation: 6,
    comps: [
      {
        address: "430 Wealth Way",
        price: 920000,
        sqft: 3400,
        soldDate: "2024-01-25",
      },
      {
        address: "445 Wealth Way",
        price: 930000,
        sqft: 3550,
        soldDate: "2024-01-20",
      },
      {
        address: "440 Wealth Way",
        price: 910000,
        sqft: 3300,
        soldDate: "2024-01-15",
      },
    ],
    lat: 30.2763,
    lng: -97.7298,
    marketMetrics: {
      appreciationForecast: {
        fiveYear: 42,
        annual: 8.4
      },
      marketMomentum: 8.5,
      volatility: 'Low'
    },
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
    tags: ["High Cap Rate"],
    rentEstimate: 2000,
    repairsEstimate: 2000,
    financing: {
      downPayment: 76000,
      interestRate: 6.5,
      monthlyPayment: 1600,
    },
    yearlyAppreciation: 7.5,
    comps: [
      {
        address: "770 Income Ave",
        price: 385000,
        sqft: 1020,
        soldDate: "2024-01-10",
      },
      {
        address: "780 Income Ave",
        price: 375000,
        sqft: 980,
        soldDate: "2024-01-05",
      },
      {
        address: "750 Income Ave",
        price: 370000,
        sqft: 1000,
        soldDate: "2023-12-28",
      },
    ],
    lat: 30.2671,
    lng: -97.7401,
    marketMetrics: {
      appreciationForecast: {
        fiveYear: 42,
        annual: 8.4
      },
      marketMomentum: 8.5,
      volatility: 'Low'
    },
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
    tags: ["High Growth Market"],
    rentEstimate: 3900,
    repairsEstimate: 12000,
    financing: {
      downPayment: 144000,
      interestRate: 6.5,
      monthlyPayment: 3500,
    },
    yearlyAppreciation: 6,
    comps: [
      {
        address: "540 Asset St",
        price: 730000,
        sqft: 2650,
        soldDate: "2024-01-15",
      },
      {
        address: "550 Asset St",
        price: 715000,
        sqft: 2580,
        soldDate: "2024-01-10",
      },
      {
        address: "535 Asset St",
        price: 718000,
        sqft: 2620,
        soldDate: "2024-01-05",
      },
    ],
    lat: 30.2819,
    lng: -97.7534,
    marketMetrics: {
      appreciationForecast: {
        fiveYear: 42,
        annual: 8.4
      },
      marketMomentum: 8.5,
      volatility: 'Low'
    },
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
    tags: ["Value-Buy"],
    rentEstimate: 5000,
    repairsEstimate: 15000,
    financing: {
      downPayment: 170000,
      interestRate: 6.5,
      monthlyPayment: 4800,
    },
    yearlyAppreciation: 5.5,
    comps: [
      {
        address: "230 Profit Pkwy",
        price: 855000,
        sqft: 3120,
        soldDate: "2024-01-20",
      },
      {
        address: "235 Profit Pkwy",
        price: 845000,
        sqft: 3080,
        soldDate: "2024-01-15",
      },
      {
        address: "240 Profit Pkwy",
        price: 842000,
        sqft: 3060,
        soldDate: "2024-01-10",
      },
    ],
    lat: 30.2734,
    lng: -97.7289,
    marketMetrics: {
      appreciationForecast: {
        fiveYear: 42,
        annual: 8.4
      },
      marketMomentum: 8.5,
      volatility: 'Low'
    },
  },
];

const Index = () => {
  const [view, setView] = useState<"map" | "list">("map");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  return (
    <Layout view={view} onViewChange={setView} isMobile={isMobile}>
      {view === "map" ? (
        <div className="flex h-full w-full">
          <div className={`${isMobile ? 'hidden' : 'w-[600px] min-w-[600px] border-r'}`}>
            <PropertyList 
              properties={MOCK_PROPERTIES} 
              onPropertyClick={setSelectedProperty}
              view={view}
            />
          </div>
          <div className="flex-1 min-w-0">
            <MapView
              isMobile={isMobile}
              properties={MOCK_PROPERTIES}
              onPropertyClick={handlePropertyClick}
            />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[2560px] mx-auto px-4">
          <PropertyList 
            properties={MOCK_PROPERTIES} 
            onPropertyClick={setSelectedProperty}
            view={view}
            isMobile={isMobile}
          />
        </div>
      )}

      <StrategyPanel 
        onFilterChange={(filters) => {
          console.log(filters);
        }}
        isMobile={isMobile}
      />

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isMobile={isMobile}
        />
      )}
    </Layout>
  );
};

export default Index;

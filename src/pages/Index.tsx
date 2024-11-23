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
    id: "p1", // Downtown
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    price: 750000,
    address: "401 West 2nd Street, Austin, TX 78701",
    beds: 4,
    baths: 3,
    sqft: 2500,
    capRate: 5.8,
    cashOnCash: 8.2,
    tags: ["High Growth Market", "Luxury"],
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
        address: "360 Nueces St",
        price: 765000,
        sqft: 2450,
        soldDate: "2024-01-15",
      },
      {
        address: "555 East 5th St",
        price: 742000,
        sqft: 2550,
        soldDate: "2024-01-02",
      },
      {
        address: "800 W 5th St",
        price: 758000,
        sqft: 2480,
        soldDate: "2023-12-28",
      },
    ]
  },
  {
    id: "p2", // Hyde Park
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    price: 550000,
    address: "4516 Avenue F, Austin, TX 78751",
    beds: 3,
    baths: 2,
    sqft: 1800,
    capRate: 7.2,
    cashOnCash: 9.5,
    tags: ["Historic", "High Cap Rate"],
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
        address: "4510 Avenue G",
        price: 545000,
        sqft: 1750,
        soldDate: "2024-01-10",
      },
      {
        address: "4201 Speedway",
        price: 552000,
        sqft: 1820,
        soldDate: "2024-01-05",
      },
      {
        address: "4505 Duval St",
        price: 548000,
        sqft: 1780,
        soldDate: "2023-12-28",
      },
    ]
  },
  {
    id: "p3", // South Congress
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    price: 890000,
    address: "1500 South Congress Ave, Austin, TX 78704",
    beds: 5,
    baths: 4,
    sqft: 3200,
    capRate: 4.9,
    cashOnCash: 7.1,
    tags: ["Premium Location", "High Growth Market"],
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
        address: "1601 S Congress Ave",
        price: 895000,
        sqft: 3250,
        soldDate: "2024-01-20",
      },
      {
        address: "1420 S Congress Ave",
        price: 870000,
        sqft: 3150,
        soldDate: "2024-01-15",
      },
      {
        address: "1700 S Congress Ave",
        price: 880000,
        sqft: 3300,
        soldDate: "2024-01-10",
      },
    ]
  },
  {
    id: "p4", // Clarksville
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126",
    price: 920000,
    address: "1600 Waterston Ave, Austin, TX 78703",
    beds: 4,
    baths: 3,
    sqft: 2800,
    capRate: 4.5,
    cashOnCash: 6.8,
    tags: ["Historic", "Premium Location"],
    rentEstimate: 5500,
    repairsEstimate: 25000,
    financing: {
      downPayment: 184000,
      interestRate: 6.5,
      monthlyPayment: 4800,
    },
    yearlyAppreciation: 7,
    comps: [
      {
        address: "1610 Waterston Ave",
        price: 925000,
        sqft: 2850,
        soldDate: "2024-01-05",
      },
      {
        address: "1615 West 10th St",
        price: 915000,
        sqft: 2750,
        soldDate: "2024-01-02",
      },
      {
        address: "1605 Palma Plaza",
        price: 930000,
        sqft: 2900,
        soldDate: "2023-12-28",
      },
    ]
  },
  {
    id: "p5", // Mueller
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    price: 675000,
    address: "4600 Mueller Blvd, Austin, TX 78723",
    beds: 4,
    baths: 3,
    sqft: 2200,
    capRate: 6.3,
    cashOnCash: 8.9,
    tags: ["Modern", "Energy Efficient"],
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
        address: "4620 Mueller Blvd",
        price: 680000,
        sqft: 2250,
        soldDate: "2024-01-15",
      },
      {
        address: "4550 Mueller Blvd",
        price: 670000,
        sqft: 2180,
        soldDate: "2024-01-10",
      },
      {
        address: "4580 Mueller Blvd",
        price: 675000,
        sqft: 2220,
        soldDate: "2024-01-08",
      },
    ]
  },
  {
    id: "p6", // Zilker
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    price: 795000,
    address: "1900 Barton Springs Rd, Austin, TX 78704",
    beds: 3,
    baths: 2,
    sqft: 1900,
    capRate: 5.5,
    cashOnCash: 7.8,
    tags: ["Prime Location", "Park View"],
    rentEstimate: 4200,
    repairsEstimate: 15000,
    financing: {
      downPayment: 159000,
      interestRate: 6.5,
      monthlyPayment: 4100,
    },
    yearlyAppreciation: 7.5,
    comps: [
      {
        address: "1910 Barton Springs Rd",
        price: 790000,
        sqft: 1850,
        soldDate: "2024-01-12",
      },
      {
        address: "1800 Barton Springs Rd",
        price: 800000,
        sqft: 1920,
        soldDate: "2024-01-05",
      },
      {
        address: "2000 Barton Springs Rd",
        price: 795000,
        sqft: 1880,
        soldDate: "2024-01-02",
      },
    ]
  },
  {
    id: "p7", // North Loop
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 525000,
    address: "5300 North Loop Blvd, Austin, TX 78751",
    beds: 3,
    baths: 2,
    sqft: 1600,
    capRate: 6.8,
    cashOnCash: 9.2,
    tags: ["Up and Coming", "High Yield"],
    rentEstimate: 3200,
    repairsEstimate: 8000,
    financing: {
      downPayment: 105000,
      interestRate: 6.5,
      monthlyPayment: 2800,
    },
    yearlyAppreciation: 8,
    comps: [
      {
        address: "5310 North Loop Blvd",
        price: 520000,
        sqft: 1550,
        soldDate: "2024-01-25",
      },
      {
        address: "5320 North Loop Blvd",
        price: 530000,
        sqft: 1650,
        soldDate: "2024-01-20",
      },
      {
        address: "5280 North Loop Blvd",
        price: 522000,
        sqft: 1580,
        soldDate: "2024-01-15",
      },
    ]
  },
  {
    id: "p8", // Barton Hills
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    price: 880000,
    address: "2400 Barton Hills Dr, Austin, TX 78704",
    beds: 4,
    baths: 3,
    sqft: 2600,
    capRate: 5.2,
    cashOnCash: 7.4,
    tags: ["Hill Country Views", "Premium"],
    rentEstimate: 4800,
    repairsEstimate: 20000,
    financing: {
      downPayment: 176000,
      interestRate: 6.5,
      monthlyPayment: 4600,
    },
    yearlyAppreciation: 6.5,
    comps: [
      {
        address: "2410 Barton Hills Dr",
        price: 885000,
        sqft: 2620,
        soldDate: "2024-01-10",
      },
      {
        address: "2380 Barton Hills Dr",
        price: 875000,
        sqft: 2580,
        soldDate: "2024-01-05",
      },
      {
        address: "2420 Barton Hills Dr",
        price: 870000,
        sqft: 2550,
        soldDate: "2023-12-28",
      },
    ]
  },
  {
    id: "p9", // Tarrytown
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    price: 1200000,
    address: "2700 Exposition Blvd, Austin, TX 78703",
    beds: 5,
    baths: 4,
    sqft: 3500,
    capRate: 4.2,
    cashOnCash: 6.5,
    tags: ["Luxury", "Premium Location"],
    rentEstimate: 6500,
    repairsEstimate: 30000,
    financing: {
      downPayment: 240000,
      interestRate: 6.5,
      monthlyPayment: 6200,
    },
    yearlyAppreciation: 5.5,
    comps: [
      {
        address: "2710 Exposition Blvd",
        price: 1210000,
        sqft: 3550,
        soldDate: "2024-01-15",
      },
      {
        address: "2680 Exposition Blvd",
        price: 1195000,
        sqft: 3480,
        soldDate: "2024-01-10",
      },
      {
        address: "2720 Exposition Blvd",
        price: 1205000,
        sqft: 3520,
        soldDate: "2024-01-05",
      },
    ]
  },
  {
    id: "p10", // East Austin
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    price: 620000,
    address: "1800 East 6th Street, Austin, TX 78702",
    beds: 3,
    baths: 2.5,
    sqft: 1800,
    capRate: 6.5,
    cashOnCash: 8.8,
    tags: ["Up and Coming", "High Growth"],
    rentEstimate: 3600,
    repairsEstimate: 12000,
    financing: {
      downPayment: 124000,
      interestRate: 6.5,
      monthlyPayment: 3300,
    },
    yearlyAppreciation: 8.5,
    comps: [
      {
        address: "1810 East 6th Street",
        price: 625000,
        sqft: 1820,
        soldDate: "2024-01-20",
      },
      {
        address: "1780 East 6th Street",
        price: 615000,
        sqft: 1780,
        soldDate: "2024-01-15",
      },
      {
        address: "1820 East 6th Street",
        price: 618000,
        sqft: 1790,
        soldDate: "2024-01-10",
      },
    ]
  }
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
          <MapView properties={MOCK_PROPERTIES} isMobile={isMobile} />
        ) : (
          <PropertyList properties={MOCK_PROPERTIES} onPropertyClick={setSelectedProperty} view={view} isMobile={isMobile} />
        )}
      </main>
    </div>
  );
};

export default Index;


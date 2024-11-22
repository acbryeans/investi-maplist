import { PropertyCard } from "./PropertyCard";

interface Property {
  id: string;
  image: string;
  price: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  capRate: number;
  cashOnCash: number;
  tags: string[];
}

interface PropertyListProps {
  properties: Property[];
  onPropertyClick: (id: string) => void;
}

export const PropertyList = ({ properties, onPropertyClick }: PropertyListProps) => {
  return (
    <div className="space-y-4 p-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onClick={onPropertyClick}
        />
      ))}
    </div>
  );
};
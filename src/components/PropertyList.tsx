import { Property } from "@/types/property";

interface PropertyListProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
  view: "map" | "list";
}

export const PropertyList = ({ properties, onPropertyClick, view }: PropertyListProps) => {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <div className={`space-y-2 ${view === "map" ? "h-[calc(100vh-10rem)] overflow-y-auto" : ""}`}>
      {properties.map((property) => (
        <div
          key={property.id}
          onClick={() => onPropertyClick(property)}
          className="bg-white hover:bg-gray-50 transition-colors cursor-pointer border rounded-lg"
        >
          {view === "map" ? (
            // Card view for map layout - significantly increased height
            <div className="flex h-[calc(25vh-1rem)]">
              <div className="w-64">
                <img 
                  src={property.image} 
                  alt={property.address}
                  className="h-full w-full object-cover rounded-l-lg"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-primary text-3xl">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-xl text-gray-600 truncate mt-3">
                      {property.address}
                    </div>
                    <div className="flex gap-6 mt-6 text-lg text-gray-500">
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-medium text-xl">
                      Cap Rate: {formatPercent(property.capRate)}
                    </div>
                    <div className="text-primary-dark text-xl mt-2">
                      CoC: {formatPercent(property.cashOnCash)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Row view for list layout - keeping original dimensions
            <div className="flex items-center h-16 px-4">
              <div className="w-16 h-12">
                <img 
                  src={property.image} 
                  alt={property.address}
                  className="h-full w-full object-cover rounded"
                />
              </div>
              <div className="flex-1 grid grid-cols-6 gap-4 ml-4">
                <div className="font-semibold text-primary">
                  {formatPrice(property.price)}
                </div>
                <div className="col-span-2 text-sm text-gray-600 truncate">
                  {property.address}
                </div>
                <div className="text-sm">
                  {property.beds}b {property.baths}ba {property.sqft.toLocaleString()}sf
                </div>
                <div className="text-sm text-primary">
                  {formatPercent(property.capRate)} Cap
                </div>
                <div className="text-sm text-primary-dark">
                  {formatPercent(property.cashOnCash)} CoC
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";

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
    <div className={`space-y-4 ${view === "map" ? "h-[calc(100vh-10rem)] overflow-y-auto" : ""}`}>
      {properties.map((property) => (
        <div
          key={property.id}
          onClick={() => onPropertyClick(property)}
          className="bg-white hover:bg-gray-50 transition-colors cursor-pointer border rounded-lg"
        >
          {view === "map" ? (
            <div className="flex h-[calc(25vh-1rem)]">
              <div className="w-64">
                <img 
                  src={property.image} 
                  alt={property.address}
                  className="h-full w-full object-cover rounded-l-lg"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex flex-col h-full">
                  {/* Top section: Price, Address, Details */}
                  <div>
                    <div className="font-semibold text-primary text-3xl mb-2">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-lg text-gray-600 mb-3">
                      {property.address}
                    </div>
                    <div className="flex gap-6 text-base text-gray-500">
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>

                  {/* Middle section: Investment Metrics */}
                  <div className="flex gap-6 mt-4">
                    <div>
                      <div className="text-sm text-gray-500">Cap Rate</div>
                      <div className="text-xl font-semibold text-primary">
                        {formatPercent(property.capRate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Cash on Cash</div>
                      <div className="text-xl font-semibold text-primary">
                        {formatPercent(property.cashOnCash)}
                      </div>
                    </div>
                  </div>

                  {/* Bottom section: Tags */}
                  <div className="flex gap-2 flex-wrap mt-4">
                    {property.tags.map((tag) => (
                      <Badge 
                        key={tag}
                        variant="secondary"
                        className={`text-sm py-1 ${
                          tag === "High Growth Market" ? "bg-blue-100 text-blue-800" :
                          tag === "Value-Buy" ? "bg-green-100 text-green-800" :
                          tag === "Cashflow" ? "bg-purple-100 text-purple-800" :
                          tag === "Fix and Flip" ? "bg-orange-100 text-orange-800" :
                          ""
                        }`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Keep existing list view code
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
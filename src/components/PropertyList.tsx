import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";

interface PropertyListProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
  view: "map" | "list";
  isMobile?: boolean;
}

export const PropertyList = ({ properties, onPropertyClick, view, isMobile }: PropertyListProps) => {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <div className={`space-y-4 ${view === "map" ? "h-[calc(100vh-10rem)] overflow-y-auto" : ""}`}>
      {properties.map((property) => (
        <div
          key={property.id}
          onClick={() => onPropertyClick(property)}
          className="bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer border rounded-lg shadow-sm hover:shadow-md"
        >
          {isMobile ? (
            <div className="flex p-4">
              <div className="w-24 h-24">
                <img 
                  src={property.image} 
                  alt={property.address}
                  className="h-full w-full object-cover rounded"
                />
              </div>
              <div className="flex-1 ml-4">
                <div className="font-semibold text-primary text-lg">
                  {formatPrice(property.price)}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {property.address}
                </div>
                <div className="text-sm text-gray-500">
                  {property.beds}b {property.baths}ba • {property.sqft.toLocaleString()}sf
                </div>
                <div className="text-sm text-primary mt-1">
                  {formatPercent(property.capRate)} Cap
                </div>
              </div>
            </div>
          ) : (
            <div className={`flex ${view === "map" ? "h-[calc(25vh-1rem)]" : "h-[calc(12vh-1rem)]"}`}>
              <div className={`${view === "map" ? "w-64" : "w-48"}`}>
                <img 
                  src={property.image} 
                  alt={property.address}
                  className="h-full w-full object-cover rounded-l-lg"
                />
              </div>
              <div className="flex-1 p-4">
                <div className="flex flex-col h-full">
                  <div className="mb-2">
                    <div className={`font-semibold text-primary ${view === "map" ? "text-2xl" : "text-xl"} mb-1`}>
                      {formatPrice(property.price)}
                    </div>
                    <div className={`text-gray-600 ${view === "map" ? "text-base" : "text-sm"} mb-1`}>
                      {property.address}
                    </div>
                    <div className={`flex gap-4 ${view === "map" ? "text-sm" : "text-xs"} text-gray-500`}>
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>

                  <div className="flex gap-6 mb-2">
                    <div>
                      <div className={`text-gray-500 ${view === "map" ? "text-sm" : "text-xs"}`}>Cap Rate</div>
                      <div className={`font-semibold text-primary ${view === "map" ? "text-lg" : "text-base"}`}>
                        {formatPercent(property.capRate)}
                      </div>
                    </div>
                    <div>
                      <div className={`text-gray-500 ${view === "map" ? "text-sm" : "text-xs"}`}>Cash on Cash</div>
                      <div className={`font-semibold text-primary ${view === "map" ? "text-lg" : "text-base"}`}>
                        {formatPercent(property.cashOnCash)}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1.5 flex-wrap">
                    {property.tags?.map((tag) => (
                      <Badge 
                        key={tag}
                        variant="secondary"
                        className={`${view === "map" ? "text-xs" : "text-[10px]"} py-0.5 px-2 ${
                          tag === "High Growth Market" ? "bg-blue-100 text-blue-800" :
                          tag === "Value-Buy" ? "bg-green-100 text-green-800" :
                          tag === "Cashflow" ? "bg-purple-100 text-purple-800" :
                          tag === "Fix and Flip" ? "bg-orange-100 text-orange-800" :
                          tag === "Long Time on Market" ? "bg-red-100 text-red-800" :
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
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
          className="property-card bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer border rounded-lg"
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
          ) : view === "map" ? (
            <div className="flex h-[calc(25vh-1rem)]">
              <div className="w-64">
                <img 
                  src={property.image} 
                  alt={property.address}
                  className="h-full w-full object-cover rounded-l-lg"
                />
              </div>
              <div className="flex-1 p-4">
                <div className="mb-2">
                  <div className="font-semibold text-primary text-[clamp(16px,1.4vw,28px)] mb-1">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-gray-600 text-[clamp(13px,1.1vw,18px)] mb-1">
                    {property.address}
                  </div>
                  <div className="flex gap-4 text-[clamp(12px,1vw,16px)] text-gray-500">
                    <span>{property.beds} beds</span>
                    <span>{property.baths} baths</span>
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>
                <div className="flex gap-6 mb-2">
                  <div>
                    <div className="text-gray-500 text-[clamp(11px,0.9vw,15px)]">Cap Rate</div>
                    <div className="font-semibold text-primary text-[clamp(14px,1.2vw,20px)]">
                      {formatPercent(property.capRate)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-[clamp(11px,0.9vw,15px)]">Cash on Cash</div>
                    <div className="font-semibold text-primary text-[clamp(14px,1.2vw,20px)]">
                      {formatPercent(property.cashOnCash)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-[clamp(3px,0.4vw,8px)] flex-wrap">
                  {property.tags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="secondary"
                      className={`text-[clamp(10px,0.9vw,14px)] py-[clamp(2px,0.3vw,3px)] px-[clamp(6px,0.5vw,10px)] ${
                        tag === "High Growth Market" ? "bg-blue-100 text-blue-800" :
                        tag === "Value-Buy" ? "bg-green-100 text-green-800" :
                        tag === "High Cap Rate" ? "bg-purple-100 text-purple-800" :
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
          ) : (
            <div className="flex h-32">
              <div className="w-48">
                <img 
                  src={property.image} 
                  alt={property.address}
                  className="h-full w-full object-cover rounded-l-lg"
                />
              </div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-primary text-xl mb-1">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-gray-600 mb-1">
                      {property.address}
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {property.tags.map((tag) => (
                        <Badge 
                          key={tag}
                          variant="secondary"
                          className={`text-xs py-0.5 px-2 ${
                            tag === "High Growth Market" ? "bg-blue-100 text-blue-800" :
                            tag === "Value-Buy" ? "bg-green-100 text-green-800" :
                            tag === "High Cap Rate" ? "bg-purple-100 text-purple-800" :
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
                  <div className="flex items-center gap-8">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <div className="text-sm text-gray-500">Cap Rate</div>
                        <div className="font-semibold text-primary">
                          {formatPercent(property.capRate)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Cash on Cash</div>
                        <div className="font-semibold text-primary">
                          {formatPercent(property.cashOnCash)}
                        </div>
                      </div>
                    </div>
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
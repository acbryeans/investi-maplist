import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: {
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
  };
  onClick: (id: string) => void;
}

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <Card 
      className="property-card flex h-48 animate-fade-in"
      onClick={() => onClick(property.id)}
    >
      <div className="w-1/3">
        <img 
          src={property.image} 
          alt={property.address}
          className="h-full w-full object-cover rounded-l-lg"
        />
      </div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-primary">
            {formatPrice(property.price)}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{property.address}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span>{property.beds} beds</span>
            <span>{property.baths} baths</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex gap-4 mb-3">
            <div>
              <div className="text-xs text-gray-500">Cap Rate</div>
              <div className="font-semibold">{formatPercent(property.capRate)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Cash on Cash</div>
              <div className="font-semibold">{formatPercent(property.cashOnCash)}</div>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {property.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary"
                className="investment-tag"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
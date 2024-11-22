import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  onClick: (id: string) => void;
}

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <Card 
      className="property-card flex h-96 animate-fade-in relative"
      onClick={() => onClick(property.id)}
    >
      <div className="w-1/3">
        <img 
          src={property.image} 
          alt={property.address}
          className="h-full w-full object-cover rounded-l-lg"
        />
      </div>
      <div className="w-2/3 p-6">
        <div>
          <h3 className="text-3xl font-semibold text-primary">
            {formatPrice(property.price)}
          </h3>
          <p className="text-lg text-gray-600 mt-2">{property.address}</p>
          <div className="flex gap-6 mt-4 text-base text-gray-500">
            <span>{property.beds} beds</span>
            <span>{property.baths} baths</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex gap-6 mb-4">
            <div>
              <div className="text-sm text-gray-500">Cap Rate</div>
              <div className="text-xl font-semibold">{formatPercent(property.capRate)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Cash on Cash</div>
              <div className="text-xl font-semibold">{formatPercent(property.cashOnCash)}</div>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {property.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary"
                className={`text-base py-1.5 px-3 ${
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

        <Button 
          className="absolute bottom-4 right-4 gap-2"
          size="sm"
          variant="outline"
        >
          <BarChart2 size={16} />
          Analyze
        </Button>
      </div>
    </Card>
  );
};

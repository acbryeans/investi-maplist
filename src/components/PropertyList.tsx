import React from 'react';
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { BarChart2, TrendingUp } from "lucide-react";

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

  const renderMapViewCard = (property: Property) => (
    <div className="flex h-[180px] md:h-[200px]">
      <div className="w-1/3 relative">
        <img 
          src={property.image} 
          alt={property.address}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-primary">
          {formatPrice(property.price)}
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="h-full grid grid-cols-2 gap-4">
          {/* Left Column - Property Details */}
          <div className="space-y-3">
            <div>
              <div className="text-lg font-medium text-gray-900 mb-2">
                {property.address}
              </div>
              <div className="flex flex-wrap gap-2 md:gap-4 text-sm text-gray-600">
                <span>{property.beds} beds</span>
                <span>{property.baths} baths</span>
                <span>{property.sqft.toLocaleString()} sqft</span>
              </div>
            </div>

            {/* Tags moved under property details */}
            <div className="flex gap-1.5 flex-wrap">
              {property.tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary"
                  className={`text-xs md:text-sm py-0.5 md:py-1 ${
                    tag === "High Growth Market" ? "bg-blue-100 text-blue-800" :
                    tag === "Value-Buy" ? "bg-green-100 text-green-800" :
                    tag === "High Cap Rate" ? "bg-purple-100 text-purple-800" :
                    tag === "Fix and Flip" ? "bg-orange-100 text-orange-800" :
                    ""
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Column - Investment Metrics */}
          <div className="space-y-2">
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
            <div>
              <div className="text-sm text-gray-500">Gross Yield</div>
              <div className="font-semibold text-primary">
                {formatPercent((property.rentEstimate * 12 / property.price) * 100)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderListViewCard = (property: Property) => (
    <div className={`flex ${isMobile ? 'flex-col' : 'h-[220px]'}`}>
      <div className={`${isMobile ? 'w-full h-[200px]' : 'w-1/3 h-full'} relative`}>
        <img 
          src={property.image} 
          alt={property.address}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-primary">
          {formatPrice(property.price)}
        </div>
        <CompareButton property={property} />
      </div>
      <div className={`${isMobile ? 'w-full' : 'flex-1'} p-4`}>
        <div className="space-y-3">
          <div className="text-lg font-medium text-gray-900">
            {property.address}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>{property.beds} beds</span>
            <span>{property.baths} baths</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
          <div className="flex flex-wrap gap-6">
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
            <div>
              <div className="text-sm text-gray-500">Gross Yield</div>
              <div className="font-semibold text-primary">
                {formatPercent((property.rentEstimate * 12 / property.price) * 100)}
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {property.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary"
                className={`text-sm py-1 ${
                  tag === "High Growth Market" ? "bg-blue-100 text-blue-800" :
                  tag === "Value-Buy" ? "bg-green-100 text-green-800" :
                  tag === "High Cap Rate" ? "bg-purple-100 text-purple-800" :
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
  );

  return (
    <div className={`h-full overflow-y-auto ${view === "map" ? "px-2 py-2" : "px-4 py-4"}`}>
      <div className="space-y-4">
        {properties.map((property) => (
          <div
            key={property.id}
            onClick={() => onPropertyClick(property)}
            className="property-card bg-white hover:shadow-lg transition-all duration-200 cursor-pointer rounded-xl overflow-hidden border border-gray-100"
          >
            {view === "map" ? renderMapViewCard(property) : renderListViewCard(property)}
          </div>
        ))}
      </div>
    </div>
  );
};
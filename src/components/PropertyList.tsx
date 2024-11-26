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
    <div className="flex h-[180px]">
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
        <div className="space-y-3">
          <div className="text-lg font-medium text-gray-900">
            {property.address}
          </div>
          <div className="flex gap-4 text-sm text-gray-600">
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
          <div className="flex gap-2">
            {property.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderListViewCard = (property: Property) => (
    <div className="flex h-[220px]">
      <div className="w-[320px] relative">
        <img 
          src={property.image} 
          alt={property.address}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-primary">
          {formatPrice(property.price)}
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="flex flex-col h-full">
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-2">
              {property.address}
            </h3>
            <div className="flex gap-6 text-sm text-gray-600 mb-4">
              <span>{property.beds} beds</span>
              <span>{property.baths} baths</span>
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="bg-primary-light p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <BarChart2 className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary">Cap Rate</span>
              </div>
              <div className="text-xl font-semibold text-primary">
                {formatPercent(property.capRate)}
              </div>
            </div>
            <div className="bg-primary-light p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary">Cash on Cash</span>
              </div>
              <div className="text-xl font-semibold text-primary">
                {formatPercent(property.cashOnCash)}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            {property.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary"
                className="bg-primary-light text-primary hover:bg-primary-light/80"
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
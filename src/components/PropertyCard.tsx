import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart2, TrendingUp, DollarSign, Tool } from "lucide-react";
import type { Property } from "@/types/property";
import { CompareButton } from "@/components/CompareButton";

interface PropertyCardProps {
  property: Property;
  onClick: (id: string) => void;
}

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;
  
  // Calculate monthly cash flow
  const monthlyCashFlow = property.rentEstimate - property.financing.monthlyPayment;
  const annualCashFlow = monthlyCashFlow * 12;
  const totalInvestment = property.financing.downPayment + property.repairsEstimate;

  return (
    <Card 
      className="property-card flex h-[420px] animate-fade-in relative"
      onClick={() => onClick(property.id)}
    >
      <CompareButton property={property} />
      <div className="w-1/3">
        <img 
          src={property.image} 
          alt={property.address}
          className="h-full w-full object-cover rounded-l-lg"
        />
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {formatPrice(property.price/property.sqft)}/sqft
        </div>
      </div>
      <div className="w-2/3 p-6">
        <div>
          <h3 className="text-3xl font-semibold text-primary">
            {formatPrice(property.price)}
          </h3>
          <p className="text-lg text-gray-600 mt-2">{property.address}</p>
          <div className="flex gap-6 mt-4 text-sm text-gray-500">
            <span>{property.beds} beds</span>
            <span>{property.baths} baths</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">Monthly Cash Flow</span>
            </div>
            <div className="text-xl font-semibold text-green-700">
              {formatPrice(monthlyCashFlow)}
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">Cap Rate</span>
            </div>
            <div className="text-xl font-semibold text-blue-700">
              {formatPercent(property.capRate)}
            </div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-purple-700">Cash on Cash</span>
            </div>
            <div className="text-xl font-semibold text-purple-700">
              {formatPercent(property.cashOnCash)}
            </div>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Tool className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-700">Repairs Needed</span>
            </div>
            <div className="text-xl font-semibold text-orange-700">
              {formatPrice(property.repairsEstimate)}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2 flex-wrap">
          {property.tags.map((tag) => (
            <Badge 
              key={tag}
              variant="secondary"
              className={`text-xs py-1 ${
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
    </Card>
  );
}

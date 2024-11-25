import React from 'react';
import { useCompare } from "@/contexts/CompareContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Scale, X, ArrowRight } from "lucide-react";
import { useState } from "react";

export const CompareDrawer = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    }).format(price);

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  const metrics = [
    { label: "Price", getValue: (p) => formatPrice(p.price) },
    { label: "Price/sqft", getValue: (p) => formatPrice(p.price / p.sqft) },
    { label: "Cap Rate", getValue: (p) => formatPercent(p.capRate) },
    { label: "Cash on Cash", getValue: (p) => formatPercent(p.cashOnCash) },
    { label: "Monthly Rent", getValue: (p) => formatPrice(p.rentEstimate) },
    { label: "Cash Flow", getValue: (p) => formatPrice(p.rentEstimate - p.financing.monthlyPayment) },
    { label: "Down Payment", getValue: (p) => formatPrice(p.financing.downPayment) },
    { label: "Repairs Needed", getValue: (p) => formatPrice(p.repairsEstimate) },
    { label: "Yearly Appreciation", getValue: (p) => formatPercent(p.yearlyAppreciation) },
    { label: "Market Momentum", getValue: (p) => p.marketMetrics.marketMomentum.toFixed(1) },
    { label: "5yr Appreciation Forecast", getValue: (p) => formatPercent(p.marketMetrics.appreciationForecast.fiveYear) },
  ];

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="fixed bottom-4 right-4 shadow-lg"
            disabled={compareList.length === 0}
          >
            <Scale className="h-4 w-4 mr-2" />
            Compare ({compareList.length})
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Compare Properties</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearCompare}>
                  Clear All
                </Button>
                <Button variant="purple" size="sm">
                  Generate Report
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {/* Headers */}
                <div className="sticky left-0 bg-white z-10">
                  <div className="h-40 flex items-end pb-4">
                    <h3 className="font-semibold">Property Details</h3>
                  </div>
                </div>
                
                {compareList.map((property) => (
                  <div key={property.id} className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0"
                      onClick={() => removeFromCompare(property.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <img
                      src={property.image}
                      alt={property.address}
                      className="h-40 w-full object-cover rounded-lg"
                    />
                    <p className="mt-2 font-medium">{property.address}</p>
                  </div>
                ))}

                {/* Metrics */}
                {metrics.map((metric) => (
                  <React.Fragment key={metric.label}>
                    <div className="sticky left-0 bg-white z-10 py-4 font-medium">
                      {metric.label}
                    </div>
                    {compareList.map((property) => (
                      <div key={property.id} className="py-4">
                        {metric.getValue(property)}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}; 
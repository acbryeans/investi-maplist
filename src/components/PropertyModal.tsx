import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";
import { BarChart2 } from "lucide-react";

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyModal = ({ property, isOpen, onClose }: PropertyModalProps) => {
  if (!property) return null;

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <img 
              src={property.image} 
              alt={property.address}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-primary mb-2">
              {formatPrice(property.price)}
            </h2>
            <p className="text-lg text-gray-600 mb-4">{property.address}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Beds</div>
                <div className="text-xl font-semibold">{property.beds}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Baths</div>
                <div className="text-xl font-semibold">{property.baths}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Sqft</div>
                <div className="text-xl font-semibold">{property.sqft.toLocaleString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-primary-light rounded-lg">
                <div className="text-sm text-primary-dark">Cap Rate</div>
                <div className="text-2xl font-semibold text-primary">
                  {formatPercent(property.capRate)}
                </div>
              </div>
              <div className="p-4 bg-primary-light rounded-lg">
                <div className="text-sm text-primary-dark">Cash on Cash</div>
                <div className="text-2xl font-semibold text-primary">
                  {formatPercent(property.cashOnCash)}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Investment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Monthly Rent Est.</div>
                    <div className="text-lg font-semibold">{formatPrice(property.rentEstimate)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Repairs Est.</div>
                    <div className="text-lg font-semibold">{formatPrice(property.repairsEstimate)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Monthly Payment</div>
                    <div className="text-lg font-semibold">{formatPrice(property.financing.monthlyPayment)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Yearly Appreciation</div>
                    <div className="text-lg font-semibold">{formatPercent(property.yearlyAppreciation)}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Comparable Properties</h3>
                <div className="space-y-2">
                  {property.comps.map((comp, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{comp.address}</div>
                        <div className="text-sm text-gray-500">
                          {comp.sqft.toLocaleString()} sqft • Sold {new Date(comp.soldDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="font-semibold">{formatPrice(comp.price)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              className="absolute bottom-0 right-0 gap-2"
              size="lg"
            >
              <BarChart2 size={18} />
              Analyze
            </Button>
          </div>
        </div>

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
      </DialogContent>
    </Dialog>
  );
};

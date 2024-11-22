import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/types/property";

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
          <div>
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

            <div className="flex gap-2 flex-wrap">
              {property.tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary"
                  className="text-sm py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";
import { BarChart2, TrendingUp, Activity, LineChart } from "lucide-react";

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const getMarketMomentumColor = (score: number) => {
  if (score >= 8) return "text-green-600";
  if (score >= 6) return "text-green-500";
  if (score >= 4) return "text-yellow-500";
  return "text-red-500";
};

const getAppreciationArrow = (forecast: number) => {
  if (forecast >= 8) return "↑";
  if (forecast >= 4) return "↗";
  if (forecast >= 0) return "→";
  if (forecast >= -4) return "↘";
  return "↓";
};

const getAppreciationText = (forecast: number) => {
  if (forecast >= 8) return "Much better than comparable areas";
  if (forecast >= 4) return "Better than comparable areas";
  if (forecast >= 0) return "Similar to comparable areas";
  if (forecast >= -4) return "Worse than comparable areas";
  return "Much worse than comparable areas";
};

export const PropertyModal = ({ property, isOpen, onClose, isMobile }: PropertyModalProps) => {
  if (!property) return null;

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'w-full h-full max-w-none m-0 rounded-none' : 'max-w-4xl h-[90vh]'} overflow-y-auto`}>
        {isMobile ? (
          <div className="flex flex-col gap-6">
            {/* Image */}
            <img 
              src={property.image} 
              alt={property.address}
              className="w-full h-[300px] object-cover rounded-lg -mt-2 -mx-2"
            />
            
            {/* Right side content first */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {formatPrice(property.price)}
                </h2>
                <p className="text-lg text-gray-600 mb-4">{property.address}</p>
                
                {/* Property details */}
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
                
                {/* Investment metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
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
                  <div className="p-4 bg-primary-light rounded-lg">
                    <div className="text-sm text-primary-dark">Gross Yield</div>
                    <div className="text-2xl font-semibold text-primary">
                      {formatPercent((property.rentEstimate * 12 / property.price) * 100)}
                    </div>
                  </div>
                </div>
                
                {/* Investment Details */}
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
                
                {/* Comps */}
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
            </div>
            
            {/* Left side content last */}
            <div className="space-y-6">
              {/* Market Analysis */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium mb-3">Market Analysis</h4>
                
                <div className="space-y-3">
                  {/* Appreciation Outlook */}
                  <div className="w-full group relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Appreciation Outlook</span>
                      </div>
                      <div className="text-2xl font-semibold text-blue-600">
                        {getAppreciationArrow(property.marketMetrics.appreciationForecast.fiveYear)}
                      </div>
                    </div>
                    <div className="invisible group-hover:visible absolute right-0 mt-1 bg-gray-900 text-white text-xs rounded py-1 px-2">
                      {getAppreciationText(property.marketMetrics.appreciationForecast.fiveYear)}
                    </div>
                  </div>

                  {/* Market Momentum */}
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-gray-600">Market Momentum</span>
                      </div>
                      <div className="text-2xl font-semibold text-purple-600">
                        {getAppreciationArrow(property.marketMetrics.marketMomentum)}
                      </div>
                    </div>
                  </div>

                  {/* Volatility Score */}
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">Market Volatility</span>
                      </div>
                      <div className="text-sm font-semibold text-emerald-600">
                        {property.marketMetrics.volatility}
                      </div>
                    </div>
                    <div className="mt-1.5 flex gap-1">
                      <div className={`h-2 w-1/3 rounded-l-full ${
                        property.marketMetrics.volatility === 'Low' ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}></div>
                      <div className={`h-2 w-1/3 ${
                        property.marketMetrics.volatility === 'Medium' ? 'bg-yellow-500' : 'bg-gray-200'
                      }`}></div>
                      <div className={`h-2 w-1/3 rounded-r-full ${
                        property.marketMetrics.volatility === 'High' ? 'bg-red-500' : 'bg-gray-200'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">Neighborhood Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Walk Score</span>
                      <span className="font-medium">85</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Transit Score</span>
                      <span className="font-medium">78</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">School Rating</span>
                      <span className="font-medium">8/10</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">Price History</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Sold (2020)</span>
                      <span className="font-medium">$680,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">5 Year Appreciation</span>
                      <span className="font-medium text-green-600">+32%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`${isMobile ? 'flex flex-col' : 'grid grid-cols-2'} gap-8`}>
            <div className="space-y-4">
              <img 
                src={property.image} 
                alt={property.address}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              
              <div className="flex gap-2 flex-wrap">
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

              {/* Market Analysis Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium mb-3">Market Analysis</h4>
                
                <div className="space-y-3">
                  {/* Appreciation Outlook */}
                  <div className="w-full group relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Appreciation Outlook</span>
                      </div>
                      <div className="text-2xl font-semibold text-blue-600">
                        {getAppreciationArrow(property.marketMetrics.appreciationForecast.fiveYear)}
                      </div>
                    </div>
                    <div className="invisible group-hover:visible absolute right-0 mt-1 bg-gray-900 text-white text-xs rounded py-1 px-2">
                      {getAppreciationText(property.marketMetrics.appreciationForecast.fiveYear)}
                    </div>
                  </div>

                  {/* Market Momentum */}
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-gray-600">Market Momentum</span>
                      </div>
                      <div className="text-2xl font-semibold text-purple-600">
                        {getAppreciationArrow(property.marketMetrics.marketMomentum)}
                      </div>
                    </div>
                  </div>

                  {/* Volatility Score */}
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">Market Volatility</span>
                      </div>
                      <div className="text-sm font-semibold text-emerald-600">
                        {property.marketMetrics.volatility}
                      </div>
                    </div>
                    <div className="mt-1.5 flex gap-1">
                      <div className={`h-2 w-1/3 rounded-l-full ${
                        property.marketMetrics.volatility === 'Low' ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}></div>
                      <div className={`h-2 w-1/3 ${
                        property.marketMetrics.volatility === 'Medium' ? 'bg-yellow-500' : 'bg-gray-200'
                      }`}></div>
                      <div className={`h-2 w-1/3 rounded-r-full ${
                        property.marketMetrics.volatility === 'High' ? 'bg-red-500' : 'bg-gray-200'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">Neighborhood Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Walk Score</span>
                      <span className="font-medium">85</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Transit Score</span>
                      <span className="font-medium">78</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">School Rating</span>
                      <span className="font-medium">8/10</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-2">Price History</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Sold (2020)</span>
                      <span className="font-medium">$680,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">5 Year Appreciation</span>
                      <span className="font-medium text-green-600">+32%</span>
                    </div>
                  </div>
                </div>
              </div>
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

              <div className="grid grid-cols-3 gap-4 mb-6">
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
                <div className="p-4 bg-primary-light rounded-lg">
                  <div className="text-sm text-primary-dark">Gross Yield</div>
                  <div className="text-2xl font-semibold text-primary">
                    {formatPercent((property.rentEstimate * 12 / property.price) * 100)}
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
            </div>
          </div>
        )}

        <div className="sticky bottom-0 left-0 right-0 mt-8 pb-4 pt-4 bg-white border-t">
          <Button 
            className="w-full gap-2"
            size="lg"
            variant="purple"
          >
            <BarChart2 size={18} />
            Analyze Investment Opportunity
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

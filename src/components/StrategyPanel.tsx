import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import { useState } from "react";

interface StrategyPanelProps {
  onFilterChange?: (filters: any) => void;
  isMobile?: boolean;
}

export const StrategyPanel = ({ onFilterChange, isMobile }: StrategyPanelProps) => {
  const [strategy, setStrategy] = useState<'cashflow' | 'appreciation' | 'custom'>('custom');
  const [investmentType, setInvestmentType] = useState<'cash' | 'downpayment'>('cash');
  const [investableAmount, setInvestableAmount] = useState(50000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [priceRange, setPriceRange] = useState([200000, 800000]);
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className={`${isMobile 
            ? 'fixed bottom-0 left-1/2 -translate-x-1/2 w-[54%] rounded-b-none rounded-t-lg border-b-0 z-50 bg-white shadow-lg px-4 py-1.5 mb-0' 
            : 'fixed right-0 top-1/2 -translate-y-1/2 h-24 w-12 px-2 rounded-l-lg rounded-r-none border-r-0 z-50 bg-white shadow-lg'}`}
        >
          {isMobile ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              <span>Strategy</span>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <ChevronLeft className="h-4 w-4 mb-2" />
              <span className="-rotate-90">Strategy</span>
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent 
        side={isMobile ? "top" : "right"} 
        className={`w-full ${isMobile ? 'h-[80vh]' : 'sm:w-[540px]'} overflow-y-auto`}
      >
        <div className="h-full flex flex-col gap-8 pt-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">Design Your Strategy</h2>
            <div className="space-y-4">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">How much are you looking to invest?</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Button 
                        variant={investmentType === 'cash' ? 'purple' : 'outline'}
                        onClick={() => setInvestmentType('cash')}
                        className="flex-1"
                      >
                        Investable Cash
                      </Button>
                      <Button 
                        variant={investmentType === 'downpayment' ? 'purple' : 'outline'}
                        onClick={() => setInvestmentType('downpayment')}
                        className="flex-1"
                      >
                        Down Payment %
                      </Button>
                    </div>
                    {investmentType === 'cash' ? (
                      <div className="space-y-2">
                        <label className="text-sm">Investable Cash</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                          <input
                            type="number"
                            value={investableAmount}
                            onChange={(e) => setInvestableAmount(Number(e.target.value))}
                            className="w-full px-8 py-2 border rounded-md"
                            placeholder="Enter amount"
                            min="0"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-sm">Down Payment Percentage</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={downPaymentPercent}
                            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter percentage"
                            min="0"
                            max="100"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2">%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange[1])}
                          className="w-full px-8 py-2 border rounded-md"
                          placeholder="Min"
                          min="0"
                        />
                      </div>
                      <span>to</span>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceRangeChange(priceRange[0], Number(e.target.value))}
                          className="w-full px-8 py-2 border rounded-md"
                          placeholder="Max"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}; 
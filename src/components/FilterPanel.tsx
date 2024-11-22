import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

interface FilterPanelProps {
  onFilterChange?: (filters: any) => void;
}

export const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [strategy, setStrategy] = useState<'cashflow' | 'appreciation' | 'custom'>('custom');
  const [investmentType, setInvestmentType] = useState<'cash' | 'downpayment'>('cash');
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="fixed right-0 top-1/2 -translate-y-1/2 h-32 px-2 rounded-l-lg rounded-r-none border-r-0 z-50 bg-white shadow-lg"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          <span className="rotate-90">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <div className="h-full flex flex-col gap-6 pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Investment Strategy</h3>
            <div className="flex gap-2">
              <Button 
                variant={strategy === 'cashflow' ? 'default' : 'outline'}
                onClick={() => setStrategy('cashflow')}
                className="flex-1"
              >
                Cash-Flow
              </Button>
              <Button 
                variant={strategy === 'appreciation' ? 'default' : 'outline'}
                onClick={() => setStrategy('appreciation')}
                className="flex-1"
              >
                Appreciation
              </Button>
              <Button 
                variant={strategy === 'custom' ? 'default' : 'outline'}
                onClick={() => setStrategy('custom')}
                className="flex-1"
              >
                Custom
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Investment Parameters</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button 
                    variant={investmentType === 'cash' ? 'default' : 'outline'}
                    onClick={() => setInvestmentType('cash')}
                    className="flex-1"
                  >
                    Investable Cash
                  </Button>
                  <Button 
                    variant={investmentType === 'downpayment' ? 'default' : 'outline'}
                    onClick={() => setInvestmentType('downpayment')}
                    className="flex-1"
                  >
                    Down Payment %
                  </Button>
                </div>
                {investmentType === 'cash' ? (
                  <div className="space-y-2">
                    <label className="text-sm">Investable Cash: $50,000</label>
                    <Slider defaultValue={[50000]} max={1000000} step={5000} />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm">Down Payment: 25%</label>
                    <Slider defaultValue={[25]} max={100} step={5} />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Property Filters</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm">Price Range</label>
                  <Slider defaultValue={[200000, 800000]} max={2000000} step={10000} />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$200,000</span>
                    <span>$800,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm">Cap Rate (min)</label>
                  <Slider defaultValue={[5]} max={15} step={0.5} />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>5%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm">Cash on Cash (min)</label>
                  <Slider defaultValue={[8]} max={20} step={0.5} />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>8%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm">Gross Yield (min)</label>
                  <Slider defaultValue={[6]} max={15} step={0.5} />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>6%</span>
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
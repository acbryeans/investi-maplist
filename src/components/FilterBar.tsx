import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
}

export const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [investmentType, setInvestmentType] = useState<'cash' | 'downpayment'>('cash');
  const [investmentAmount, setInvestmentAmount] = useState(50000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [priceRange, setPriceRange] = useState<[number, number]>([200000, 800000]);
  const [customAmount, setCustomAmount] = useState('');
  const [customPercent, setCustomPercent] = useState('');

  const handleInvestmentAmountChange = (value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue)) {
      setInvestmentAmount(numValue);
    }
  };

  const handleDownPaymentChange = (value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
      setDownPaymentPercent(numValue);
    }
  };

  const handleCustomAmountChange = (value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue)) {
      setCustomAmount(numValue.toString());
    }
  };

  const handleCustomPercentChange = (value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
      setCustomPercent(numValue.toString());
    }
  };

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-[2560px] mx-auto px-4">
        <div className="flex items-center gap-4 h-14">
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-700">How much do you want to invest?</div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={investmentType === 'cash'}
                  onChange={() => setInvestmentType('cash')}
                  className="text-primary"
                />
                <span className="text-sm">Total Investable Cash</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={investmentType === 'downpayment'}
                  onChange={() => setInvestmentType('downpayment')}
                  className="text-primary"
                />
                <span className="text-sm">Down Payment %</span>
              </label>
            </div>
          </div>

          <Select
            value={investmentType === 'cash' ? investmentAmount.toString() : downPaymentPercent.toString()}
            onValueChange={(value) => {
              if (investmentType === 'cash') {
                setInvestmentAmount(parseInt(value));
                setCustomAmount('');
              } else {
                setDownPaymentPercent(parseInt(value));
                setCustomPercent('');
              }
            }}
          >
            <SelectTrigger className="w-[180px] h-9 bg-white">
              <SelectValue>
                {investmentType === 'cash' ? (
                  <span className="font-medium">${investmentAmount.toLocaleString()}</span>
                ) : (
                  <span className="font-medium">{downPaymentPercent}%</span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white">
              {investmentType === 'cash' ? (
                <>
                  <SelectItem value="50000">$50,000</SelectItem>
                  <SelectItem value="100000">$100,000</SelectItem>
                  <SelectItem value="150000">$150,000</SelectItem>
                  <SelectItem value="200000">$200,000</SelectItem>
                  <SelectItem value="250000">$250,000</SelectItem>
                  <SelectItem value="custom">
                    <Input
                      type="text"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="w-full mt-1"
                    />
                  </SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="20">20%</SelectItem>
                  <SelectItem value="25">25%</SelectItem>
                  <SelectItem value="30">30%</SelectItem>
                  <SelectItem value="35">35%</SelectItem>
                  <SelectItem value="40">40%</SelectItem>
                  <SelectItem value="custom">
                    <Input
                      type="text"
                      placeholder="Custom percentage"
                      value={customPercent}
                      onChange={(e) => handleCustomPercentChange(e.target.value)}
                      className="w-full mt-1"
                      max="100"
                    />
                  </SelectItem>
                </>
              )}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-9">
                Price Range
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-white">
              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                  <Slider
                    value={priceRange}
                    min={0}
                    max={2000000}
                    step={10000}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mt-2"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Select>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[130px] h-9">
              <SelectValue placeholder="Baths" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cashflow">Cash Flow</SelectItem>
              <SelectItem value="appreciation">Appreciation</SelectItem>
              <SelectItem value="value-add">Value Add</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
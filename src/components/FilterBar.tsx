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
  const [customAmount, setCustomAmount] = useState('');
  const [customPercent, setCustomPercent] = useState('');

  const handleCustomAmountChange = (value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue)) {
      setInvestmentAmount(numValue);
      setCustomAmount(value);
    }
  };

  const handleCustomPercentChange = (value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
      setDownPaymentPercent(numValue);
      setCustomPercent(value);
    }
  };

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-[2560px] mx-auto px-4">
        <div className="flex items-center gap-2 h-14">
          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
            <button
              onClick={() => setInvestmentType('cash')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                investmentType === 'cash' 
                  ? 'bg-white shadow-sm text-primary' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cash
            </button>
            <button
              onClick={() => setInvestmentType('downpayment')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                investmentType === 'downpayment' 
                  ? 'bg-white shadow-sm text-primary' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Down Payment
            </button>
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
                Price
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4 p-2">
                <div className="flex gap-2">
                  <Input placeholder="Min" type="number" className="w-full" />
                  <Input placeholder="Max" type="number" className="w-full" />
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
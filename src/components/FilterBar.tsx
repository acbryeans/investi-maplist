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
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-[2560px] mx-auto px-4">
        <div className="flex items-center gap-2 h-14">
          <Select value={investmentType} onValueChange={(value: 'cash' | 'downpayment') => setInvestmentType(value)}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue>
                {investmentType === 'cash' ? (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Investable Cash</span>
                    <span className="font-medium">${investmentAmount.toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Down Payment</span>
                    <span className="font-medium">{downPaymentPercent}%</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">
                <div className="flex flex-col">
                  <span className="font-medium">Investable Cash</span>
                  <span className="text-sm text-gray-500">${investmentAmount.toLocaleString()}</span>
                </div>
              </SelectItem>
              <SelectItem value="downpayment">
                <div className="flex flex-col">
                  <span className="font-medium">Down Payment</span>
                  <span className="text-sm text-gray-500">{downPaymentPercent}%</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-9">
                {investmentType === 'cash' ? 'Adjust Amount' : 'Adjust Percentage'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4 p-2">
                {investmentType === 'cash' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Investment Amount</span>
                      <span>${investmentAmount.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[investmentAmount]}
                      min={10000}
                      max={1000000}
                      step={5000}
                      onValueChange={([value]) => setInvestmentAmount(value)}
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Down Payment Percentage</span>
                      <span>{downPaymentPercent}%</span>
                    </div>
                    <Slider
                      value={[downPaymentPercent]}
                      min={5}
                      max={100}
                      step={5}
                      onValueChange={([value]) => setDownPaymentPercent(value)}
                    />
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

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
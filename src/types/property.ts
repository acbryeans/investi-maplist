export interface Property {
  id: string;
  image: string;
  price: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  capRate: number;
  cashOnCash: number;
  tags: string[];
  rentEstimate: number;
  repairsEstimate: number;
  financing: {
    downPayment: number;
    interestRate: number;
    monthlyPayment: number;
  };
  yearlyAppreciation: number;
  comps: Array<{
    address: string;
    price: number;
    sqft: number;
    soldDate: string;
  }>;
}
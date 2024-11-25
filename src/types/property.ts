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
  marketMetrics: {
    appreciationForecast: {
      fiveYear: number;
      annual: number;
    };
    marketMomentum: number;
    volatility: 'Low' | 'Medium' | 'High';
  };
  roi: {
    oneYear: number;
    fiveYear: number;
    tenYear: number;
  };
  rentalHistory?: {
    averageOccupancy: number;
    averageRent: number;
    historicalAppreciation: number;
  };
  propertyTaxes: number;
  insuranceCost: number;
  zoning: string;
  propertyType: 'Single Family' | 'Multi Family' | 'Commercial' | 'Mixed Use';
  tenantProfile?: {
    currentTenants: number;
    averageTenureMonths: number;
    occupancyRate: number;
  };
}
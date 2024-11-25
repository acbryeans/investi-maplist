import React, { createContext, useContext, useState } from 'react';
import type { Property } from '@/types/property';

interface CompareContextType {
  compareList: Property[];
  addToCompare: (property: Property) => void;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
  isInCompare: (propertyId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Property[]>([]);

  const addToCompare = (property: Property) => {
    if (compareList.length < 4 && !isInCompare(property.id)) {
      setCompareList([...compareList, property]);
    }
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareList(compareList.filter(p => p.id !== propertyId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (propertyId: string) => {
    return compareList.some(p => p.id === propertyId);
  };

  return (
    <CompareContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}; 
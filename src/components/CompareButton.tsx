import React from 'react';
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";

interface CompareButtonProps {
  onClick?: () => void;
  className?: string;
}

export const CompareButton = ({ onClick, className }: CompareButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={className}
    >
      <BarChart2 className="h-4 w-4 mr-2" />
      Compare
    </Button>
  );
}; 
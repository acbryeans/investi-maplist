import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts/CompareContext";
import { Scale } from "lucide-react";
import type { Property } from "@/types/property";

interface CompareButtonProps {
  property: Property;
}

export const CompareButton = ({ property }: CompareButtonProps) => {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent property card click
    if (isInCompare(property.id)) {
      removeFromCompare(property.id);
    } else {
      addToCompare(property);
    }
  };

  return (
    <Button
      variant={isInCompare(property.id) ? "purple" : "outline"}
      size="sm"
      className="absolute top-2 right-2 z-10"
      onClick={handleCompareClick}
    >
      <Scale className="h-4 w-4 mr-1" />
      {isInCompare(property.id) ? "Remove" : "Compare"}
    </Button>
  );
}; 
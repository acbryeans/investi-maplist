import { Button } from "@/components/ui/button";
import { MapIcon, ListIcon } from "lucide-react";

interface ViewToggleProps {
  view: "map" | "list";
  onViewChange: (view: "map" | "list") => void;
  isMobile?: boolean;
}

export const ViewToggle = ({ view, onViewChange, isMobile }: ViewToggleProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={view === "map" ? "default" : "outline"}
        onClick={() => onViewChange("map")}
        className={`gap-2 ${isMobile ? 'px-3 py-1.5 text-sm' : ''}`}
      >
        <MapIcon size={isMobile ? 14 : 16} />
        Map
      </Button>
      <Button
        variant={view === "list" ? "default" : "outline"}
        onClick={() => onViewChange("list")}
        className={`gap-2 ${isMobile ? 'px-3 py-1.5 text-sm' : ''}`}
      >
        <ListIcon size={isMobile ? 14 : 16} />
        List
      </Button>
    </div>
  );
};
import { Button } from "@/components/ui/button";
import { MapIcon, ListIcon } from "lucide-react";

interface ViewToggleProps {
  view: "map" | "list";
  onViewChange: (view: "map" | "list") => void;
}

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={view === "map" ? "default" : "outline"}
        onClick={() => onViewChange("map")}
        className="gap-2"
      >
        <MapIcon size={16} />
        Map
      </Button>
      <Button
        variant={view === "list" ? "default" : "outline"}
        onClick={() => onViewChange("list")}
        className="gap-2"
      >
        <ListIcon size={16} />
        List
      </Button>
    </div>
  );
};
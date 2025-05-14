
import { cn } from "@/lib/utils";

type SpotStatus = "available" | "occupied" | "reserved" | "disabled";

interface ParkingSpotProps {
  id: string;
  status: SpotStatus;
  size?: "compact" | "standard" | "large";
  onClick?: () => void;
}

const statusStyles = {
  available: "bg-parking-available text-white",
  occupied: "bg-parking-occupied text-white",
  reserved: "bg-parking-reserved text-white",
  disabled: "bg-gray-300 text-gray-500"
};

const ParkingSpot = ({ id, status, size = "standard", onClick }: ParkingSpotProps) => {
  return (
    <div 
      className={cn(
        "h-full flex items-center justify-center rounded-md cursor-pointer transition-all duration-200 hover:scale-105",
        statusStyles[status],
        status === "available" && "animate-pulse-slow"
      )}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="font-semibold">{id}</div>
        <div className="text-xs uppercase">{size}</div>
      </div>
    </div>
  );
};

export default ParkingSpot;

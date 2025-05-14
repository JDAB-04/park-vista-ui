
import DashboardCard from "../common/DashboardCard";
import ParkingSpot from "./ParkingSpot";
import { Button } from "@/components/ui/button";

// Mock data for parking spots
const generateMockParkingData = () => {
  const statuses: ("available" | "occupied" | "reserved" | "disabled")[] = [
    "available", "occupied", "reserved", "disabled"
  ];
  
  const sizes: ("compact" | "standard" | "large")[] = [
    "compact", "standard", "large"
  ];
  
  const sections = ["A", "B"];
  const spots = [];
  
  for (const section of sections) {
    for (let i = 1; i <= 15; i++) {
      const randomStatusIndex = Math.floor(Math.random() * 10);
      const status = randomStatusIndex < 4 ? statuses[0] : 
                     randomStatusIndex < 8 ? statuses[1] : 
                     randomStatusIndex < 9 ? statuses[2] : statuses[3];
      
      const randomSizeIndex = Math.floor(Math.random() * 10);
      const size = randomSizeIndex < 3 ? sizes[0] : 
                   randomSizeIndex < 9 ? sizes[1] : sizes[2];
      
      spots.push({
        id: `${section}-${i < 10 ? '0' + i : i}`,
        status,
        size
      });
    }
  }
  
  return spots;
};

const parkingSpots = generateMockParkingData();

const ParkingGrid = () => {
  return (
    <DashboardCard 
      title="Parking Spaces"
      actions={
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">View All</Button>
          <Button variant="ghost" size="sm">Filter</Button>
        </div>
      }
    >
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-4">
        {parkingSpots.slice(0, 20).map(spot => (
          <div key={spot.id} className="h-16">
            <ParkingSpot
              id={spot.id}
              status={spot.status}
              size={spot.size}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-parking-available rounded-full mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-parking-occupied rounded-full mr-2"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-parking-reserved rounded-full mr-2"></div>
            <span>Reserved</span>
          </div>
        </div>
        <div>
          <span className="font-medium">45</span> of <span className="font-medium">120</span> spots available
        </div>
      </div>
    </DashboardCard>
  );
};

export default ParkingGrid;

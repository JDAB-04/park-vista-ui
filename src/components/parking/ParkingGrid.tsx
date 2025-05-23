
import DashboardCard from "../common/DashboardCard";
import ParkingSpot from "./ParkingSpot";
import { Button } from "@/components/ui/button";
import { useParkingContext } from "@/contexts/ParkingContext";
import { useState, useEffect } from "react";

// Generate parking layout
const generateParkingLayout = (occupiedSpaces: number, totalSpaces: number = 120) => {
  const spots = [];
  const sections = ["A", "B"];
  
  // Calculate how many spots should be occupied
  let occupiedCount = 0;
  
  for (const section of sections) {
    for (let i = 1; i <= 15; i++) {
      const id = `${section}-${i < 10 ? '0' + i : i}`;
      
      // Determine status - occupied spots are distributed first
      let status: "available" | "occupied" | "reserved" | "disabled";
      if (occupiedCount < occupiedSpaces) {
        status = "occupied";
        occupiedCount++;
      } else {
        // Random distribution of remaining statuses
        const randomStatus = Math.random();
        if (randomStatus < 0.9) {
          status = "available";
        } else if (randomStatus < 0.95) {
          status = "reserved";
        } else {
          status = "disabled";
        }
      }
      
      // Random size distribution
      const randomSizeValue = Math.random();
      const size = randomSizeValue < 0.3 ? "compact" : 
                   randomSizeValue < 0.9 ? "standard" : "large";
      
      spots.push({
        id,
        status,
        size
      });
    }
  }
  
  return spots;
};

const ParkingGrid = () => {
  const { parkingStats, loadingStats } = useParkingContext();
  const [parkingSpots, setParkingSpots] = useState([]);
  
  // Update parking spots when stats change
  useEffect(() => {
    if (!loadingStats) {
      const spots = generateParkingLayout(parkingStats.occupiedSpaces);
      setParkingSpots(spots);
    }
  }, [parkingStats, loadingStats]);

  return (
    <DashboardCard 
      title="Espacios de Estacionamiento"
      actions={
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Ver Todo</Button>
          <Button variant="ghost" size="sm">Filtrar</Button>
        </div>
      }
    >
      {loadingStats ? (
        <div className="h-40 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-2 text-sm text-gray-500">Cargando espacios...</p>
          </div>
        </div>
      ) : (
        <>
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
                <span>Disponible</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-parking-occupied rounded-full mr-2"></div>
                <span>Ocupado</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-parking-reserved rounded-full mr-2"></div>
                <span>Reservado</span>
              </div>
            </div>
            <div>
              <span className="font-medium">{parkingStats.availableSpaces}</span> de <span className="font-medium">{parkingStats.totalSpaces}</span> espacios disponibles
            </div>
          </div>
        </>
      )}
    </DashboardCard>
  );
};

export default ParkingGrid;

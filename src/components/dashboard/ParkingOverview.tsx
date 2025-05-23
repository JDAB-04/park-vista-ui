
import { Button } from "@/components/ui/button";
import { Car, Clock, MapPin, CircleParking, Loader2 } from "lucide-react";
import StatCard from "../common/StatCard";
import { useParkingContext } from "@/contexts/ParkingContext";

const ParkingOverview = () => {
  const { parkingStats, loadingStats, refreshStats } = useParkingContext();

  return (
    <div className="mb-6">
      <div className="flex justify-end mb-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshStats}
          disabled={loadingStats}
          className="text-xs"
        >
          {loadingStats ? (
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          ) : null}
          Actualizar estadísticas
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Espacios Totales"
          value={parkingStats.totalSpaces}
          icon={CircleParking}
          iconColor="text-blue-600"
        />
        <StatCard
          title="Espacios Disponibles"
          value={parkingStats.availableSpaces}
          icon={MapPin}
          iconColor="text-parking-available"
        />
        <StatCard
          title="Espacios Ocupados"
          value={parkingStats.occupiedSpaces}
          icon={Car}
          iconColor="text-parking-occupied"
        />
        <StatCard
          title="Tiempo Promedio"
          value={parkingStats.averageStay}
          icon={Clock}
          iconColor="text-parking-reserved"
        />
      </div>
    </div>
  );
};

export default ParkingOverview;

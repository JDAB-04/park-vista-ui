
import { Button } from "@/components/ui/button";
import { Car, Clock, MapPin, Parking } from "lucide-react";
import StatCard from "../common/StatCard";

const ParkingOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Spaces"
        value={120}
        icon={Parking}
        iconColor="text-blue-600"
      />
      <StatCard
        title="Available Spaces"
        value={45}
        icon={MapPin}
        iconColor="text-parking-available"
        change={{ value: 12, type: "increase" }}
      />
      <StatCard
        title="Occupied Spaces"
        value={75}
        icon={Car}
        iconColor="text-parking-occupied"
        change={{ value: 8, type: "increase" }}
      />
      <StatCard
        title="Average Stay"
        value="2.5 hrs"
        icon={Clock}
        iconColor="text-parking-reserved"
        change={{ value: 5, type: "decrease" }}
      />
    </div>
  );
};

export default ParkingOverview;

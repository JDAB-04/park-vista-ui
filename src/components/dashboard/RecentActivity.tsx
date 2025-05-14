
import { Car, Clock } from "lucide-react";
import DashboardCard from "../common/DashboardCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    vehicleId: "ABC-123",
    type: "check-in",
    location: "A-12",
    time: "10:30 AM",
    timeElapsed: "1h 20m ago"
  },
  {
    id: 2,
    vehicleId: "XYZ-789",
    type: "check-out",
    location: "B-05",
    time: "10:15 AM",
    timeElapsed: "1h 35m ago",
    duration: "2h 15m",
    cost: "$4.50"
  },
  {
    id: 3,
    vehicleId: "DEF-456",
    type: "check-in",
    location: "C-08",
    time: "9:45 AM",
    timeElapsed: "2h 05m ago"
  },
  {
    id: 4,
    vehicleId: "GHI-321",
    type: "check-out",
    location: "A-04",
    time: "9:30 AM",
    timeElapsed: "2h 20m ago",
    duration: "1h 45m",
    cost: "$3.50"
  },
  {
    id: 5,
    vehicleId: "JKL-654",
    type: "check-in",
    location: "B-11",
    time: "9:15 AM",
    timeElapsed: "2h 35m ago"
  }
];

const RecentActivity = () => {
  return (
    <DashboardCard
      title="Recent Activity"
      actions={<Button variant="outline" size="sm">View All</Button>}
    >
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
              activity.type === "check-in" ? "bg-emerald-100" : "bg-amber-100"
            )}>
              <Car className={cn(
                "h-5 w-5",
                activity.type === "check-in" ? "text-emerald-600" : "text-amber-600"
              )} />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="font-medium">{activity.vehicleId}</h3>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-500">
                {activity.type === "check-in" 
                  ? `Checked in at space ${activity.location}` 
                  : `Checked out from space ${activity.location}`}
              </p>
              {activity.type === "check-out" && (
                <div className="flex justify-between mt-1 text-xs">
                  <span className="text-gray-500">Duration: {activity.duration}</span>
                  <span className="font-medium">{activity.cost}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default RecentActivity;

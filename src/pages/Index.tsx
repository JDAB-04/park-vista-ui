
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ParkingOverview from "@/components/dashboard/ParkingOverview";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ParkingGrid from "@/components/parking/ParkingGrid";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  New Check-in
                </Button>
              </div>
              
              <ParkingOverview />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <OccupancyChart />
                <RecentActivity />
              </div>
              
              <div className="mb-6">
                <ParkingGrid />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;

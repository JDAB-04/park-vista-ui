
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ParkingOverview from "@/components/dashboard/ParkingOverview";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ParkingGrid from "@/components/parking/ParkingGrid";
import { Button } from "@/components/ui/button";
import { CarFront, Plus } from "lucide-react";
import { useState } from "react";
import VehicleList from "@/components/vehicles/VehicleList";
import VehicleEntryExit from "@/components/vehicles/VehicleEntryExit";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {activeTab === "dashboard" && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setActiveTab("vehicle-entry")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo Ingreso
                    </Button>
                  </div>
                  
                  <ParkingOverview />
                  <div className="mb-6">
                    <ParkingGrid />
                  </div>
                </>
              )}

              {activeTab === "vehicle-entry" && (
                <>
                  <div className="flex items-center mb-6">
                    <h1 className="text-2xl font-bold">Ingreso y Salida de Vehículos</h1>
                  </div>
                  <VehicleEntryExit />
                </>
              )}

              {activeTab === "vehicle-list" && (
                <>
                  <div className="flex items-center mb-6">
                    <h1 className="text-2xl font-bold">Lista de Vehículos</h1>
                  </div>
                  <VehicleList />
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;

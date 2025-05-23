
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardCard from "../common/DashboardCard";
import { Button } from "@/components/ui/button";
import { Download, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useParkingContext } from "@/contexts/ParkingContext";

const VehicleList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { vehicles, loadingVehicles, refreshVehicles } = useParkingContext();
  
  // Handle search
  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (vehicle.spot?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  // Function to export data to CSV
  const exportToCSV = () => {
    const headers = ["Placa", "Tipo", "Entrada", "Fecha Entrada", "Ubicación", "Estado", "Salida", "Fecha Salida", "Duración", "Tarifa"];
    
    const csvData = filteredVehicles.map(vehicle => [
      vehicle.plate,
      vehicle.type === "car" ? "Automóvil" : "Camión",
      vehicle.entryTime || "",
      vehicle.entryDate || "",
      vehicle.spot || "",
      vehicle.status === "parked" ? "Estacionado" : "Salió",
      vehicle.exitTime || "",
      vehicle.exitDate || "",
      vehicle.duration || "",
      vehicle.fee || ""
    ]);
    
    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `vehiculos_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardCard 
      title="Historial de Vehículos"
      actions={
        <div className="space-x-2 flex">
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshVehicles}
            disabled={loadingVehicles}
          >
            {loadingVehicles ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Refrescar"
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      }
    >
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar por placa o ubicación..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {loadingVehicles ? (
        <div className="h-32 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Cargando vehículos...</span>
        </div>
      ) : filteredVehicles.length === 0 ? (
        <div className="h-32 flex items-center justify-center text-gray-500">
          No hay vehículos registrados
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Placa</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Salida</TableHead>
                <TableHead>Tarifa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id || vehicle.plate}>
                  <TableCell className="font-medium">{vehicle.plate}</TableCell>
                  <TableCell>{vehicle.type === "car" ? "Automóvil" : "Camión"}</TableCell>
                  <TableCell>
                    {vehicle.entryTime}
                    <div className="text-xs text-gray-500">{vehicle.entryDate}</div>
                  </TableCell>
                  <TableCell>{vehicle.spot || "-"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      vehicle.status === "parked" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {vehicle.status === "parked" ? "Estacionado" : "Salió"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {vehicle.exitTime ? (
                      <>
                        {vehicle.exitTime}
                        <div className="text-xs text-gray-500">{vehicle.exitDate}</div>
                      </>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{vehicle.fee || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </DashboardCard>
  );
};

export default VehicleList;

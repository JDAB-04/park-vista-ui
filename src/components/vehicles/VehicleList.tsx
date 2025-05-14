
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
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Sample data for the vehicle list
const vehicleData = [
  {
    id: 1,
    plate: "ABC-123",
    type: "Automóvil",
    entryTime: "10:30 AM",
    entryDate: "14/05/2023",
    status: "Estacionado",
    spot: "A-12"
  },
  {
    id: 2,
    plate: "XYZ-789",
    type: "Camión",
    entryTime: "11:15 AM",
    entryDate: "14/05/2023",
    status: "Salió",
    spot: "B-05",
    exitTime: "01:30 PM",
    exitDate: "14/05/2023",
    duration: "2h 15m",
    fee: "$4.50"
  },
  {
    id: 3,
    plate: "DEF-456",
    type: "Automóvil",
    entryTime: "09:45 AM",
    entryDate: "14/05/2023",
    status: "Estacionado",
    spot: "C-08"
  },
  {
    id: 4,
    plate: "GHI-321",
    type: "Automóvil",
    entryTime: "08:30 AM",
    entryDate: "14/05/2023",
    status: "Salió",
    spot: "A-04",
    exitTime: "10:15 AM",
    exitDate: "14/05/2023",
    duration: "1h 45m",
    fee: "$3.50"
  },
  {
    id: 5,
    plate: "JKL-654",
    type: "Camión",
    entryTime: "12:15 PM",
    entryDate: "14/05/2023",
    status: "Estacionado",
    spot: "B-11"
  }
];

const VehicleList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredVehicles = vehicleData.filter(vehicle => 
    vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.spot.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardCard 
      title="Historial de Vehículos"
      actions={
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
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
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.plate}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>
                  {vehicle.entryTime}
                  <div className="text-xs text-gray-500">{vehicle.entryDate}</div>
                </TableCell>
                <TableCell>{vehicle.spot}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    vehicle.status === "Estacionado" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {vehicle.status}
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
    </DashboardCard>
  );
};

export default VehicleList;

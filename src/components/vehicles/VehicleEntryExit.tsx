
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CarFront, LogOut } from "lucide-react";
import DashboardCard from "../common/DashboardCard";

const VehicleEntryExit = () => {
  const [plate, setPlate] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [action, setAction] = useState("entry");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ plate, vehicleType, action, timestamp: new Date() });
    // Here you would handle the vehicle entry or exit
    setPlate("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DashboardCard title="Registro de Vehículos">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plate">Placa del Vehículo</Label>
            <Input 
              id="plate" 
              value={plate} 
              onChange={(e) => setPlate(e.target.value)}
              placeholder="Ej: ABC-123" 
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Vehículo</Label>
            <div className="flex space-x-4">
              <Button 
                type="button"
                variant={vehicleType === "car" ? "default" : "outline"}
                onClick={() => setVehicleType("car")}
                className="flex-1"
              >
                <CarFront className="mr-2 h-4 w-4" />
                Automóvil
              </Button>
              <Button 
                type="button"
                variant={vehicleType === "truck" ? "default" : "outline"}
                onClick={() => setVehicleType("truck")}
                className="flex-1"
              >
                <CarFront className="mr-2 h-4 w-4" />
                Camión
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Acción</Label>
            <div className="flex space-x-4">
              <Button 
                type="button"
                variant={action === "entry" ? "default" : "outline"}
                onClick={() => setAction("entry")}
                className="flex-1"
              >
                Ingreso
              </Button>
              <Button 
                type="button"
                variant={action === "exit" ? "default" : "outline"}
                onClick={() => setAction("exit")}
                className="flex-1"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Salida
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            {action === "entry" ? "Registrar Ingreso" : "Registrar Salida"}
          </Button>
        </form>
      </DashboardCard>

      <DashboardCard title="Instrucciones">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg mb-2">Para registrar un ingreso:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Ingrese el número de placa del vehículo</li>
              <li>Seleccione el tipo de vehículo</li>
              <li>Asegúrese de que "Ingreso" esté seleccionado</li>
              <li>Haga clic en "Registrar Ingreso"</li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Para registrar una salida:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Ingrese el número de placa del vehículo</li>
              <li>Seleccione "Salida" en la sección de Acción</li>
              <li>Haga clic en "Registrar Salida"</li>
            </ol>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default VehicleEntryExit;

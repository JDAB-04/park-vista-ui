
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CarFront, LogOut } from "lucide-react";
import DashboardCard from "../common/DashboardCard";
import { useParkingContext } from "@/contexts/ParkingContext";
import { useToast } from "@/hooks/use-toast";

const VehicleEntryExit = () => {
  const [plate, setPlate] = useState("");
  const [vehicleType, setVehicleType] = useState<"car" | "truck">("car");
  const [action, setAction] = useState("entry");
  const { registerVehicleEntry, registerVehicleExit, vehicles } = useParkingContext();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!plate) {
      toast({
        title: "Error",
        description: "La placa es obligatoria",
        variant: "destructive"
      });
      return;
    }

    try {
      if (action === "entry") {
        // Check if vehicle is already parked
        const existingVehicle = vehicles.find(
          (v) => v.plate.toLowerCase() === plate.toLowerCase() && v.status === "parked"
        );
        
        if (existingVehicle) {
          toast({
            title: "Error",
            description: "Este vehículo ya está registrado en el parqueadero",
            variant: "destructive"
          });
          return;
        }
        
        await registerVehicleEntry({ 
          plate: plate.toUpperCase(), 
          type: vehicleType 
        });
      } else {
        // Check if vehicle exists before exit
        const existingVehicle = vehicles.find(
          (v) => v.plate.toLowerCase() === plate.toLowerCase() && v.status === "parked"
        );
        
        if (!existingVehicle) {
          toast({
            title: "Error",
            description: "Este vehículo no está registrado en el parqueadero",
            variant: "destructive"
          });
          return;
        }
        
        await registerVehicleExit(plate.toUpperCase());
      }
      
      // Reset form after successful submission
      setPlate("");
    } catch (error) {
      console.error("Error in vehicle registration:", error);
    }
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

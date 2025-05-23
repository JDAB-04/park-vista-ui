
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import apiService, { Vehicle } from '@/services/api';

interface ParkingStats {
  totalSpaces: number;
  availableSpaces: number;
  occupiedSpaces: number;
  averageStay: string;
}

interface ParkingContextType {
  vehicles: Vehicle[];
  parkingStats: ParkingStats;
  loadingVehicles: boolean;
  loadingStats: boolean;
  refreshVehicles: () => Promise<void>;
  refreshStats: () => Promise<void>;
  registerVehicleEntry: (vehicle: Omit<Vehicle, 'id' | 'status' | 'entryTime' | 'entryDate'>) => Promise<void>;
  registerVehicleExit: (plate: string) => Promise<void>;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const useParkingContext = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error("useParkingContext must be used within a ParkingProvider");
  }
  return context;
};

interface ParkingProviderProps {
  children: ReactNode;
}

export const ParkingProvider: React.FC<ParkingProviderProps> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const { toast } = useToast();
  const [parkingStats, setParkingStats] = useState<ParkingStats>({
    totalSpaces: 120,
    availableSpaces: 120,
    occupiedSpaces: 0,
    averageStay: "0 hrs"
  });

  const refreshVehicles = async () => {
    setLoadingVehicles(true);
    try {
      const data = await apiService.getVehicles();
      setVehicles(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los vehículos",
        variant: "destructive"
      });
    } finally {
      setLoadingVehicles(false);
    }
  };

  const refreshStats = async () => {
    setLoadingStats(true);
    try {
      const data = await apiService.getParkingStats();
      setParkingStats(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las estadísticas",
        variant: "destructive"
      });
    } finally {
      setLoadingStats(false);
    }
  };

  const registerVehicleEntry = async (vehicle: Omit<Vehicle, 'id' | 'status' | 'entryTime' | 'entryDate'>) => {
    try {
      await apiService.registerEntry(vehicle);
      toast({
        title: "Éxito",
        description: `Vehículo ${vehicle.plate} registrado correctamente`,
      });
      await refreshVehicles();
      await refreshStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar el ingreso del vehículo",
        variant: "destructive"
      });
    }
  };

  const registerVehicleExit = async (plate: string) => {
    try {
      await apiService.registerExit(plate);
      toast({
        title: "Éxito",
        description: `Salida de vehículo ${plate} registrada correctamente`,
      });
      await refreshVehicles();
      await refreshStats();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar la salida del vehículo",
        variant: "destructive"
      });
    }
  };

  // Initial data load
  useEffect(() => {
    refreshVehicles();
    refreshStats();
  }, []);

  return (
    <ParkingContext.Provider
      value={{
        vehicles,
        parkingStats,
        loadingVehicles,
        loadingStats,
        refreshVehicles,
        refreshStats,
        registerVehicleEntry,
        registerVehicleExit
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

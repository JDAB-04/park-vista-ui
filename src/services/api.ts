
import axios from 'axios';

// Base URL for your XAMPP server
const API_URL = 'http://localhost/parking-api';

// Vehicle types
export interface Vehicle {
  id?: number;
  plate: string;
  type: 'car' | 'truck';
  entryTime?: string;
  entryDate?: string;
  exitTime?: string;
  exitDate?: string;
  status: 'parked' | 'exited';
  spot?: string;
  duration?: string;
  fee?: string;
}

// API service
const apiService = {
  // Get all vehicles
  async getVehicles() {
    try {
      const response = await axios.get(`${API_URL}/vehicles.php`);
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  },

  // Register vehicle entry
  async registerEntry(vehicle: Omit<Vehicle, 'id' | 'status' | 'entryTime' | 'entryDate'>) {
    try {
      const response = await axios.post(`${API_URL}/vehicle_entry.php`, vehicle);
      return response.data;
    } catch (error) {
      console.error('Error registering vehicle entry:', error);
      throw error;
    }
  },

  // Register vehicle exit
  async registerExit(plate: string) {
    try {
      const response = await axios.post(`${API_URL}/vehicle_exit.php`, { plate });
      return response.data;
    } catch (error) {
      console.error('Error registering vehicle exit:', error);
      throw error;
    }
  },

  // Get parking statistics
  async getParkingStats() {
    try {
      const response = await axios.get(`${API_URL}/stats.php`);
      return response.data;
    } catch (error) {
      console.error('Error fetching parking stats:', error);
      throw error;
    }
  }
};

export default apiService;

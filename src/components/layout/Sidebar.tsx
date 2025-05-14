
import { Calendar, Car, Clock, Map, CircleParking, ParkingCircle } from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: Map,
    url: "/",
  },
  {
    title: "Parking Spaces",
    icon: ParkingCircle,
    url: "/spaces",
  },
  {
    title: "Vehicles",
    icon: Car,
    url: "/vehicles",
  },
  {
    title: "Reservations",
    icon: Calendar,
    url: "/reservations",
  },
  {
    title: "Activity Log",
    icon: Clock,
    url: "/activity",
  },
  {
    title: "Parking Rates",
    icon: CircleParking,
    url: "/rates",
  },
];

const Sidebar = () => {
  return (
    <SidebarComponent>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;


import { Bell, Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  return (
    <div className="w-full bg-slate-800/50 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && <SidebarTrigger />}
          <div className="flex items-center ml-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
              <CarFront className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              ParkVista
            </h2>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:bg-slate-700/50">
            <Bell className="h-5 w-5 text-gray-300" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-slate-700/50">
            <Settings className="h-5 w-5 text-gray-300" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-slate-700/50">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    {user?.name?.charAt(0) || <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800/95 backdrop-blur-md border-slate-700">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {user?.name && <p className="font-medium text-gray-200">{user.name}</p>}
                  {user?.email && <p className="w-[200px] truncate text-sm text-gray-400">{user.email}</p>}
                </div>
              </div>
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-slate-700/50">
                <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

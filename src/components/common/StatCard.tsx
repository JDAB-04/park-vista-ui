
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-400",
  change,
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "tech-card px-6 py-5 flex items-center hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300",
        className
      )}
    >
      <div
        className={cn(
          "h-12 w-12 rounded-full flex items-center justify-center mr-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30"
        )}
      >
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
      <div>
        <div className="text-sm font-medium text-gray-400">{title}</div>
        <div className="text-2xl font-bold mt-1 text-gray-200">{value}</div>
        {change && (
          <div
            className={cn(
              "text-xs font-medium mt-1",
              change.type === "increase"
                ? "text-emerald-400"
                : change.type === "decrease"
                ? "text-red-400"
                : "text-gray-400"
            )}
          >
            {change.type === "increase" && "+"}
            {change.type === "decrease" && "-"}
            {Math.abs(change.value)}% from last month
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;

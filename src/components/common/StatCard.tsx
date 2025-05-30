
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
  iconColor = "text-primary",
  change,
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-lg px-6 py-5 flex items-center",
        className
      )}
    >
      <div
        className={cn(
          "h-12 w-12 rounded-full flex items-center justify-center mr-4",
          iconColor.includes("text") ? `${iconColor}/10` : `text-white bg-${iconColor}`
        )}
      >
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
      <div>
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
        {change && (
          <div
            className={cn(
              "text-xs font-medium mt-1",
              change.type === "increase"
                ? "text-emerald-500"
                : change.type === "decrease"
                ? "text-red-500"
                : "text-gray-500"
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

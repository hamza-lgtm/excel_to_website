import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

const ProgressBar = ({ value, max, className }: ProgressBarProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.round((value / max) * 100);
  
  // Determine color based on percentage
  const getProgressColor = () => {
    if (percentage < 25) return "bg-red-500";
    if (percentage < 50) return "bg-orange-500";
    if (percentage < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Animate progress value on mount and when value changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Get status message based on percentage
  const getStatusMessage = () => {
    if (percentage < 25) return "Just getting started";
    if (percentage < 50) return "Making progress";
    if (percentage < 75) return "Well on your way";
    if (percentage < 100) return "Almost there";
    return "Assessment complete!";
  };

  // Estimated time remaining (mock calculation)
  const getEstimatedTimeRemaining = () => {
    const remainingSections = max - value;
    // Assuming 5 minutes per section
    const estimatedMinutes = remainingSections * 5;
    
    if (estimatedMinutes === 0) return "Complete";
    if (estimatedMinutes < 60) return `~${estimatedMinutes} min remaining`;
    
    const hours = Math.floor(estimatedMinutes / 60);
    const minutes = estimatedMinutes % 60;
    return `~${hours}h ${minutes > 0 ? `${minutes}m` : ''} remaining`;
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-sm mb-1">
        <div className="flex items-center">
          <span className="text-gray-700 font-medium">Assessment Progress</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-blue-500 cursor-help ml-1">
                  <Info className="h-4 w-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px] p-4">
                <p className="text-sm">Complete all sections to generate your final assessment report.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center">
          <span className={cn(
            "text-gray-600 font-medium px-2 py-0.5 rounded-full text-xs",
            percentage === 100 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
          )}>
            {percentage}%
          </span>
          <span className="text-xs text-gray-500 ml-2">{getStatusMessage()}</span>
        </div>
      </div>
      
      <div className="relative">
        <Progress 
          value={animatedValue} 
          className="h-3 bg-gray-200" 
          indicatorClassName={cn("transition-all duration-500", getProgressColor())}
          showValue={false}
        />
        
        {/* Progress markers */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between px-[2px] pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-3 w-0.5", 
                percentage > (i + 1) * 25 ? getProgressColor() : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span className="flex items-center">
          <span className={cn(
            "inline-block w-2 h-2 rounded-full mr-1",
            value > 0 ? getProgressColor() : "bg-gray-300"
          )}></span>
          {value} of {max} sections completed
        </span>
        {/* <span className="text-gray-600">{getEstimatedTimeRemaining()}</span> */}
      </div>
    </div>
  );
};

export default ProgressBar;

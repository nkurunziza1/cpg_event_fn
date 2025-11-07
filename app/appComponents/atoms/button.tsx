// components/ui/GradientButton.tsx
import { Network } from "lucide-react";

interface GradientButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const GradientButton = ({
  onClick,
  children = "Let's connect",
  className = "",
  icon = <Network className="w-4 h-4 flex-shrink-0 dark:text-iconColor" />,
}: GradientButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex  items-center cursor-pointer justify-center bg-black whitespace-nowrap min-w-[120px] font-normal text-black transition-all duration-300 py-2 rounded-md px-3 gap-2 text-sm hover:dark:bg-opacity-20 hover:bg-opacity-45 hover:text-white ml-4 ${className}  `}
    >
      {icon}
      <span className="truncate">{children}</span>
    </button>
  );
};

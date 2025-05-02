import { Badge } from "@/components/ui/badge";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function BadgePopover({
	children,
	text,
	variant = "default",
	disabled = false,
}: {
	children: ReactNode;
	text?: string;
	variant?: "secondary" | "default" | "destructive" | "outline";
	disabled?: boolean;
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Badge
					variant={variant}
					className={cn(
						"cursor-pointer w-4 h-4 rounded-full p-0 bg-foreground",
						disabled && "pointer-events-none bg-muted-foreground",
					)}
				>
					{children}
				</Badge>
			</PopoverTrigger>
			<PopoverContent side="top" className="px-2 py-1 text-base w-fit">
				{text}
			</PopoverContent>
		</Popover>
	);
}

import { Badge } from "@/components/ui/badge";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import type { ReactNode } from "react";

export default function BadgePopover({
	children,
	text,
	variant = "default"
}: { children: ReactNode; text: string, variant?: "secondary" | "default" | "destructive" | "outline" }) {
	return (
		<Popover >
			<PopoverTrigger asChild>
				<Badge variant={variant} className="cursor-pointer">{children}</Badge>
			</PopoverTrigger>
			<PopoverContent side="top" className="px-2 py-1 text-base w-fit bg-background/60 backdrop-blur-xs">{text}</PopoverContent>
		</Popover>
	);
}

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ReactNode } from "react";

interface Props {
	variant?: "link" | "destructive" | "outline" | "secondary" | "ghost";
	children: ReactNode;
	text: string;
	size?: "sm" | "lg" | "icon";
}
export default function TooltipButton({
	variant,
	children,
	text,
	size,
}: Props) {
	return (
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant={variant} size={size} asChild>
						{children}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{text}</p>
				</TooltipContent>
			</Tooltip>
	);
}

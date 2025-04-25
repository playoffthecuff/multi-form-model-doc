import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ReactNode } from "react";

interface Props {
	variant?: "link" | "destructive" | "outline" | "secondary" | "ghost";
	children: ReactNode;
	text: string;
	size?: "sm" | "lg" | "icon";
	onClick?: () => void;
}
export default function TooltipButton({
	variant,
	children,
	text,
	size,
	onClick,
}: Props) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant={variant} size={size} asChild onClick={onClick}>
					<div>{children}</div>
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>{text}</p>
			</TooltipContent>
		</Tooltip>
	);
}

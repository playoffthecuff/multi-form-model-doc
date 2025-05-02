"use client";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { type ReactNode, useState } from "react";

export default function YesNoPopover({
	disabled,
	icon,
	onRefute,
	actionText,
	questionText,
}: {
	disabled: boolean;
	icon: ReactNode;
	onRefute: () => void;
	actionText: string;
	questionText: string;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Popover open={open}>
			<PopoverTrigger asChild>
				<Button
					size={"icon"}
					disabled={disabled}
					variant={disabled ? "ghost" : "secondary"}
					onClick={() => setOpen(true)}
				>
					{icon}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="rounded-lg w-fit"
				side="top"
				onEscapeKeyDown={() => setOpen(false)}
			>
				<h2 className="font-medium">{actionText}</h2>
				<p>{questionText}</p>
				<div className="flex gap-x-4 mt-4">
					<Button variant={"secondary"} onClick={() => setOpen(false)}>
						No
					</Button>
					<Button
					variant={"destructive"}
						onClick={() => {
							onRefute();
							setOpen(false);
						}}
					>
						Yes
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

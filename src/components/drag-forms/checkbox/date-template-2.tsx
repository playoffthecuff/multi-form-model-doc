import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar, CalendarIcon, Settings, X } from "lucide-react";
import { date } from "zod";
import BadgePopover from "../../common/badge-popover";

export default function DateTemplate2() {
	return (
		<>
			<div className="flex p-0 items-center gap-x-4">
				<Button size="icon" variant={"ghost"} disabled>
					<Settings />
				</Button>
				<CardTitle className="flex h-full items-center justify-center flex-grow text-base border-b">
					Date
				</CardTitle>
				<Button size={"icon"} variant={"ghost"} disabled>
					<X />
				</Button>
			</div>
			<div className="flex flex-col">
				<div className="flex items-center leading-none">
					<div className="p-2.5">
						<BadgePopover disabled>i</BadgePopover>
					</div>
					<p>Label</p>
				</div>
				<Popover>
					<PopoverTrigger asChild disabled>
						<Button
							variant={"outline"}
							className="justify-start text-left font-normal"
						>
							<CalendarIcon />
							<span>Pick a date</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar mode="single" />
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
}

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import BadgePopover from "../../common/badge-popover";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

interface InputProps {
	label?: string;
	description?: string;
	placeholder?: string;
}

export default function DateTemplate({
	label = "Label",
	description = "description",
}: InputProps) {
	const [date, setDate] = useState<Date>();
	return (
		<div className="flex  flex-col gap-y-3">
			<div className="flex gap-x-2 ml-2.5">
				<BadgePopover text={description} disabled>
					i
				</BadgePopover>
				<Label>{label}</Label>
			</div>
			<Popover>
				<PopoverTrigger asChild disabled>
					<Button
						variant={"outline"}
						className={cn(
							"w-64 justify-start text-left font-normal",
							!date && "text-muted-foreground",
						)}
					>
						<CalendarIcon />
						{date ? format(date, "PPP") : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
				</PopoverContent>
			</Popover>
		</div>
	);
}

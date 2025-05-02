import BadgePopover from "../../common/badge-popover";
import { Label } from "../../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";

interface SelectProps {
	label?: string;
	description?: string;
	defaultValue?: string;
}

export default function SelectTemplate({
	label = "Label",
	description = "description",
	defaultValue = "Default value",
}: SelectProps) {
	return (
		<div className="flex  flex-col gap-y-3">
			<div className="flex gap-x-2 ml-2.5">
				<BadgePopover text={description} disabled>
					i
				</BadgePopover>
				<Label>{label}</Label>
			</div>
			<Select defaultValue={defaultValue}>
				<SelectTrigger className="min-w-64 pointer-events-none">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={defaultValue ?? ""}>{defaultValue}</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}

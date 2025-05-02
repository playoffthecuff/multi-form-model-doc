import BadgePopover from "../../common/badge-popover";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";

interface CheckboxProps {
	label?: string;
	description?: string;
}

export default function CheckboxTemplate({
	label = "Label",
	description = "description",
}: CheckboxProps) {
	return (
		<div className="flex  flex-col gap-y-3 ml-2.5">
			<div className="flex gap-x-2 items-center">
				<BadgePopover text={description} disabled>
					i
				</BadgePopover>
				<Label>{label}</Label>
			</div>
			<div className="flex items-center h-9">
				<Checkbox disabled />
			</div>
		</div>
	);
}

import { Input } from "@/components/ui/input";
import BadgePopover from "../../common/badge-popover";
import { Label } from "../../ui/label";

interface InputProps {
	label: string;
	description: string;
	placeholder: string;
	type: "text" | "password" | "number";
}

export default function InputField({
	label = "Label",
	description = "description",
	placeholder = "placeholder",
	type = "text",
}: Partial<InputProps>) {
	return (
		<div className="flex  flex-col gap-y-3">
			<div className="flex gap-x-2 ml-2.5">
				<BadgePopover text={description}>i</BadgePopover>
				<Label>{label}</Label>
			</div>
			<Input placeholder={placeholder} type={type} />
		</div>
	);
}

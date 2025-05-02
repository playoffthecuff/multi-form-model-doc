import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Settings, X } from "lucide-react";
import BadgePopover from "../../common/badge-popover";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";

export default function CheckboxTemplate() {
	return (
		<>
			<div className="flex p-0 items-center gap-x-4">
				<Button size="icon" variant={"ghost"} disabled>
					<Settings />
				</Button>
				<CardTitle className="flex h-full items-center justify-center flex-grow text-base border-b">
					Checkbox
				</CardTitle>
				<Button size={"icon"} variant={"ghost"} disabled>
					<X />
				</Button>
			</div>
			<div className="flex flex-col">
				<div className="flex items-center leading-none">
					<div className="p-2.5 cursor-default">
						<BadgePopover disabled>i</BadgePopover>
					</div>
					<Label>Label</Label>
				</div>
				<div className="flex items-center p-2.5 w-fit cursor-default">
					<Checkbox />
				</div>
			</div>
		</>
	);
}

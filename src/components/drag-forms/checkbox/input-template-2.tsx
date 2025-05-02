import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Settings, X } from "lucide-react";
import BadgePopover from "../../common/badge-popover";
import { Label } from "../../ui/label";
import { Input } from "@/components/ui/input";

export default function InputTemplate2() {
	return (
		<>
			<div className="flex p-0 items-center gap-x-4">
				<Button size="icon" variant={"ghost"} disabled>
					<Settings />
				</Button>
				<CardTitle className="flex h-full items-center justify-center flex-grow text-base border-b">
					Input
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
				<Input placeholder="placeholder" className="pointer-events-none" />
			</div>
		</>
	);
}

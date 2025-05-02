import YesNoPopover from "@/components/common/popovers/yes-no";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Settings, X } from "lucide-react";
import type { ReactNode, Ref } from "react";
import EdgeHighlight from "./edge-highlight";

export type FieldType = "checkbox" | "input" | "select" | "date";

export default function CardWrapper({
	children,
	dragging,
	ref,
	highlightTop = false,
	highlightBottom = false,
	disabled = false,
	onDelete,
	type,
}: {
	children: ReactNode;
	dragging: boolean;
	ref: Ref<HTMLDivElement>;
	highlightTop?: boolean;
	highlightBottom?: boolean;
	disabled?: boolean;
	onDelete: () => void;
	type: FieldType;
}) {
	return (
		<Card
			className="flex-col gap-4 h-fit p-2 relative cursor-grab"
			ref={ref}
			style={{ opacity: dragging ? 0.4 : 1 }}
		>
			<Dialog>
				<div className="flex p-0 items-center gap-x-4">
					<DialogTrigger asChild>
						<Button
							size="icon"
							disabled={disabled}
							variant={disabled ? "ghost" : "secondary"}
						>
							<Settings />
						</Button>
					</DialogTrigger>
					<CardTitle className="flex h-full items-center justify-center capitalize flex-grow text-base border-b">
						{type}
					</CardTitle>
					
					<YesNoPopover
						disabled={disabled}
						onRefute={onDelete}
						icon={<X />}
						actionText="Delete field"
						questionText="Are you sure?"
					/>
				</div>
				{children}
			</Dialog>
			
			<EdgeHighlight top={highlightTop} bottom={highlightBottom} />
		</Card>
	);
}

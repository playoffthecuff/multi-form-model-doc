import { Card } from "@/components/ui/card";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";
import CheckboxTemplate from "./checkbox-template";
import DateTemplate from "./date-template";
import InputTemplate from "./input-template";
import SelectTemplate from "./select-template";
import type { FieldType } from "../types";

export default function DraggableTemplate({
	fieldType,
}: { fieldType: FieldType }) {
	const cardRef = useRef(null);
	const [dragging, setDragging] = useState(false);

	useEffect(() => {
		const el = cardRef.current;
		if (!el) throw new Error();

		return draggable({
			element: el,
			onDragStart: () => setDragging(true),
			onDrop: () => setDragging(false),
			getInitialData: () => ({ fieldType, isTemplate: true }),
		});
	}, [fieldType]);

	return (
		<Card
			className="flex-col gap-y-2 h-fit p-2 relative cursor-grab w-68"
			ref={cardRef}
			style={{ opacity: dragging ? 0.4 : 1 }}
		>
			{fieldType === "checkbox" && <CheckboxTemplate />}
			{fieldType === "input" && <InputTemplate />}
			{fieldType === "select" && <SelectTemplate />}
			{fieldType === "date" && <DateTemplate />}
		</Card>
	);
}

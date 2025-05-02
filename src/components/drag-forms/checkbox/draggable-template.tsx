import { Card } from "@/components/ui/card";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";
import type { FieldType } from "../card-wrapper";
import CheckboxTemplate2 from "./checkbox-template2";
import SelectTemplate2 from "./select-template-2";
import InputTemplate2 from "./input-template-2";
import DateTemplate2 from "./date-template-2";

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
			{fieldType === "checkbox" && <CheckboxTemplate2 />}
			{fieldType === "input" && <InputTemplate2 />}
			{fieldType === "select" && <SelectTemplate2 />}
			{fieldType === "date" && <DateTemplate2 />}
		</Card>
	);
}

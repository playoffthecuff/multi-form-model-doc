import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { type ReactNode, useEffect, useRef, useState } from "react";
import CardWrapper, { type FieldType } from "./card-wrapper";

export default function TemplateCardWrapper({
	children,
	fieldType,
}: { children: ReactNode; fieldType: FieldType }) {
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
		<CardWrapper dragging={dragging} ref={cardRef} disabled type={fieldType}>
			{children}
		</CardWrapper>
	);
}

"use client";

import { autoScrollWindowForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { useEffect, useRef, useState } from "react";
import type { FieldType } from "./card-wrapper";
import type { CheckboxData } from "./checkbox/checkbox-form-card";
import DraggableCard, { type FieldData } from "./checkbox/draggable-card";
import type { InputData } from "./checkbox/input-form-card";
import type { SelectData } from "./checkbox/select-form-card";
import type { DateData } from "./checkbox/date-form-card";

export default function DroppableArea() {
	const containerRef = useRef(null);
	const dropZoneRef = useRef(null);
	const [entered, setEntered] = useState(false);
	const [elements, setElements] = useState<FieldType[]>([]);

	const [cards, setCards] = useState<FieldData[]>([]);

	const customReorder = (start: number, finish: number) => {
		setElements(
			reorder({
				list: elements,
				startIndex: start,
				finishIndex: finish,
			}),
		);
	};

	const addNewByIndex = (index: number, type: FieldType) => {
		const nextIndex = elements.length;
		const newElements = [...elements, type];
		setElements(
			reorder({
				list: newElements,
				startIndex: nextIndex,
				finishIndex: index,
			}),
		);
	};

	const addNewCheckboxByIndex = (index: number) =>
		addNewByIndex(index, "checkbox");

	const deleteByIndex = (index: number) =>
		setElements(elements.filter((_, i) => i !== index));

	useEffect(() => {
		const el = dropZoneRef.current;
		if (!el) throw new Error();
		return dropTargetForElements({
			element: el,
			onDragEnter() {
				setEntered(true);
			},
			onDragLeave() {
				setEntered(false);
			},
			canDrop({ source }) {
				return source.data.isTemplate as boolean;
			},
			onDrop({ source }) {
				console.log(source);
				setEntered(false);
				const checkboxTemplateData: CheckboxData = {
					label: "label",
					name: crypto.randomUUID(),
					type: "checkbox",
					description: "description",
				};
				const inputTemplateData: InputData = {
					label: "label",
					name: crypto.randomUUID(),
					type: "input",
					description: "description",
					placeholder: "placeholder",
				};
				const selectTemplateData: SelectData = {
					label: "label",
					name: crypto.randomUUID(),
					type: "select",
					description: "description",
					options: ["default value"],
					placeholder: "placeholder",
				};
				const dateTemplateData: DateData = {
					label: "label",
					name: crypto.randomUUID(),
					type: "date",
					description: "description",
					placeholder: "Pick a date"
				};

				let card: FieldData;

				if (source.data.fieldType === "checkbox") {
					card = checkboxTemplateData;
				} else if (source.data.fieldType === "input") {
					card = inputTemplateData;
				} else if (source.data.fieldType === "select") {
					card = selectTemplateData;
				} else if (source.data.fieldType === "date") {
					card = dateTemplateData;
				} else {
					return;
				}

				setCards([...cards, card]);
			},
		});
	}, [cards]);

	useEffect(() => autoScrollWindowForElements(), []);

	const updateCardByIndex = (index: number, card: FieldData) =>
		setCards([...cards.slice(0, index), card, ...cards.slice(index + 1)]);

	return (
		<div
			ref={containerRef}
			className="w-68 rounded-xl text-muted-foreground flex flex-col gap-y-2 bg-muted"
		>
			{cards.map((v, i) => (
				<DraggableCard
					key={v.name}
					cardProps={v}
					add={() => addNewCheckboxByIndex(i)}
					deleteByIndex={() => deleteByIndex(i)}
					index={i}
					reorder={customReorder}
					update={(card: FieldData) => updateCardByIndex(i, card)}
				/>
			))}
			<div
				ref={dropZoneRef}
				className="min-h-33 flex-grow flex justify-center items-center rounded-xl"
				style={{ backgroundColor: entered ? "#124" : "transparent" }}
			>
				Drop Here
			</div>
		</div>
	);
}

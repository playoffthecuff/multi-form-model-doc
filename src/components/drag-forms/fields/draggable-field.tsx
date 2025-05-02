"use client";

import { Card } from "@/components/ui/card";
import {
	type Edge,
	attachClosestEdge,
	extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
	draggable,
	dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";
import type { FieldType } from "../card-wrapper";
import EdgeHighlight from "./edge-highlight";
import CheckboxField, { type CheckboxData } from "./checkbox-field";
import type { DateData } from "./date-field";
import DateField from "./date-field";
import type { InputData } from "./input-field";
import InputFormCard from "./input-field";
import type { SelectData } from "./select-field";
import SelectField from "./select-field";

export type FieldData = CheckboxData | InputData | SelectData | DateData;

interface Props {
	disabled?: boolean;
	index: number;
	cardProps: FieldData;
	add: (index: number, type: FieldType) => void;
	reorder: (start: number, finish: number) => void;
	deleteByIndex: (index: number) => void;
	update: (d: FieldData) => void;
}

export default function DraggableField({
	cardProps,
	disabled = false,
	index,
	add,
	reorder,
	deleteByIndex,
	update,
}: Props) {
	const cardRef = useRef(null);
	const [dragging, setDragging] = useState(false);
	const [edge, setEdge] = useState<Edge | null>(null);
	const [isDragOver, setDragOver] = useState(false);

	useEffect(() => {
		const element = cardRef.current;
		if (!element) throw new Error();

		return combine(
			draggable({
				element,
				onDragStart() {
					setDragging(true);
				},
				onDrop() {
					setDragging(false);
				},
				getInitialData() {
					return { initialIndex: index };
				},
			}),
			dropTargetForElements({
				element,
				canDrop({ source }) {
					if (source.element === element) return false;
					return true;
				},
				getData({ input }) {
					const data = { initialIndex: index, type: cardProps.type };
					return attachClosestEdge(data, {
						element,
						input,
						allowedEdges: ["top", "bottom"],
					});
				},
				getIsSticky() {
					return true;
				},
				onDragEnter({ self }) {
					const closetEdge = extractClosestEdge(self.data);
					setEdge(closetEdge);
					setDragOver(true);
				},
				onDrag({ self }) {
					const closetEdge = extractClosestEdge(self.data);
					setDragOver(true);
					setEdge(closetEdge);
				},
				onDragLeave() {
					setDragOver(false);
					setEdge(null);
				},
				onDrop({ self, source }) {
					if (!edge) return;
					const sourceIndex = source.data.initialIndex as number;
					const selfIndex =
						(self.data.initialIndex as number) + +(edge === "bottom");
					if (source.data.isTemplate) {
						add(selfIndex, "checkbox");
					} else {
						reorder(sourceIndex, selfIndex);
					}
					setDragOver(false);
					setEdge(null);
				},
			}),
		);
	}, [reorder, index, edge, add, cardProps.type]);

	const deleteCurrent = () => deleteByIndex(index);

	return (
		<Card
			className="flex-col gap-y-2 h-fit p-2 relative cursor-grab"
			ref={cardRef}
			style={{ opacity: dragging ? 0.4 : 1 }}
		>
			{cardProps.type === "checkbox" && (
				<CheckboxField
					{...cardProps}
					onDelete={deleteCurrent}
					disabled={disabled}
					update={update}
				/>
			)}
			{cardProps.type === "input" && (
				<InputFormCard
					{...cardProps}
					onDelete={deleteCurrent}
					disabled={disabled}
					update={update}
				/>
			)}
			{cardProps.type === "select" && (
				<SelectField
					{...cardProps}
					onDelete={deleteCurrent}
					disabled={disabled}
					update={update}
				/>
			)}
			{cardProps.type === "date" && (
				<DateField
					{...cardProps}
					onDelete={deleteCurrent}
					disabled={disabled}
					update={update}
				/>
			)}
			<EdgeHighlight top={edge === "top"} bottom={edge === "bottom"} />
		</Card>
	);
}

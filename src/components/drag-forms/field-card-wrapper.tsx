"use client"

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
import { type ReactNode, useEffect, useRef, useState } from "react";
import CardWrapper, { type FieldType } from "./card-wrapper";

export default function FieldCardWrapper({
	children,
	fieldType,
	index,
	reorder,
	add,
	deleteByIndex,
}: {
	children: ReactNode;
	fieldType: FieldType;
	index: number;
	reorder: (start: number, finish: number) => void;
	add: (index: number, type: FieldType) => void;
	deleteByIndex: (index: number) => void;
}) {
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
					return { fieldType, initialIndex: index };
				},
			}),
			dropTargetForElements({
				element,
				canDrop({ source }) {
					if (source.element === element) return false;
					return true;
				},
				getData({ input }) {
					const data = { fieldType, initialIndex: index };
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
						add(selfIndex, source.data.fieldType as FieldType);
					} else {
						reorder(sourceIndex, selfIndex);
					}
					setDragOver(false);
					setEdge(null);
				},
			}),
		);
	}, [fieldType, reorder, index, edge, add]);

	const deleteCurrent = () => deleteByIndex(index);

	return (
		<CardWrapper
			dragging={dragging}
			ref={cardRef}
			highlightBottom={edge === "bottom"}
			highlightTop={edge === "top"}
			onDelete={deleteCurrent}
			type={fieldType}
		>
			{children}
		</CardWrapper>
	);
}

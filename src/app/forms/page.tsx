import DroppableArea from "@/components/drag-forms/droppable-area";
import DragForms from "@/components/drag-forms/template-area";

export default function FormsPage() {
	return (
		<div className="self-center my-auto flex gap-x-8">
			<DroppableArea />
			<DragForms />
		</div>
	);
}

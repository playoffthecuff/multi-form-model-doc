import DroppableArea from "@/components/drag-forms/droppable-area";
import Forms from "@/components/drag-forms/template-area";

export default function TestsPage() {
	return (
		<div className="self-center my-auto flex gap-x-8">
			<DroppableArea />
			<Forms />
		</div>
	);
}

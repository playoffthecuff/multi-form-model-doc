import { getQuantities } from "@/actions/quantity-units";
import EditableList from "@/components/quantity-forms/editable-list";

export default async function EditQuantitiesPage() {
	const quantityUnits = await getQuantities();
	return (
		<div className="flex flex-grow justify-center items-center flex-col gap-y-6 w-full">
			<EditableList initialItems={quantityUnits} />
		</div>
	);
}

import { getQuantityUnits } from "@/actions/quantity-units";
import EditableList from "@/components/quantity-forms/editable-list";

export default async function EditUnitsPage() {
	const quantityUnits = await getQuantityUnits();
	return (
		<div className="flex flex-grow justify-center items-center">
			<EditableList items={quantityUnits} />
		</div>
	);
}

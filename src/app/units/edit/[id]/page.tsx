import { getQuantityUnit } from "@/actions/quantity-units";
import { EditQuantity } from "@/components/quantity-forms/edit-quantity";
import { notFound } from "next/navigation";

export default async function QuantityEditPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const id = +(await params).id;
	const data = await getQuantityUnit(id);
	if (!data) notFound();
	return (
		<div className="flex flex-grow justify-center items-center">
			<EditQuantity quantity={data} />
		</div>
	);
}

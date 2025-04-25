"use client";

import { deleteQuantityUnits } from "@/actions/quantity-units";
import { Pencil, Repeat, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import BadgePopover from "../common/badge-popover";
import TooltipButton from "../common/tooltip-button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import toastCommonProps from "./toast-common-props";

interface Props {
	initialItems: { name: string; description: string; id: number }[];
}

export default function EditableList({ initialItems }: Props) {
	const [items, setItems] = useState(initialItems);

	async function deleteItem(id: number) {
		toast.promise(deleteQuantityUnits(id), {
			...toastCommonProps,
			success: () => {
				setItems(items.filter((v) => v.id !== id));
				return {
					message: "Successfully:",
					description: `data with id ${id} was deleted`,
					cancel: {
						label: (
							<div className="flex text-sm gap-x-4 justify-center flex-grow items-center">
								<X size={16} />
								Close
							</div>
						),
						onClick: () => void null,
					},
				};
			},
			error: () => {
				return {
					message: "Oops",
					description: "Something went wrong",
					action: {
						label: (
							<div className="flex text-sm gap-x-4 justify-center flex-grow items-center">
								<Repeat size={16} />
								Try again
							</div>
						),
						onClick: () => deleteItem(id),
					},
					cancel: {
						label: (
							<div className="flex text-sm gap-x-4 justify-center flex-grow items-center">
								<X size={16} />
								Close
							</div>
						),
						onClick: () => void null,
					},
				};
			},
		});
	}

	return (
		<>
			{items.map((v) => (
				<Card key={v.id} className="flex gap-x-4 flex-row w-full p-2 pl-4 max-w-80">
					<CardHeader className="flex flex-grow items-center p-0 gap-x-4">
						<CardDescription className="text-base">
							<BadgePopover text={v.description} variant="secondary">
								i
							</BadgePopover>
						</CardDescription>
						<CardTitle className="w-fit">{v.name}</CardTitle>
					</CardHeader>
					<CardFooter className="p-0 gap-x-4">
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<TooltipButton variant={"secondary"} text="Delete Quantity" size="icon">
									<Trash2 />
								</TooltipButton>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete quantity
										and its units from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={() => deleteItem(v.id)}>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>

						<TooltipButton variant={"secondary"} text="Edit Quantity" size="icon">
							<Link href={`./edit/${v.id}`}>
								<Pencil />
							</Link>
						</TooltipButton>
					</CardFooter>
				</Card>
			))}
		</>
	);
}

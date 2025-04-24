"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { addQuantityUnit } from "@/actions/quantity-units";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import BadgePopover from "../common/badge-popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { type QuantitySchema, quantitySchema } from "./schema";

export function CreateQuantity() {
	const form = useForm<QuantitySchema>({
		resolver: zodResolver(quantitySchema),
		defaultValues: {
			name: "",
			description: "",
			units: [{ factor: 1, isBase: true, name: "", symbol: "" }],
			baseUnitIndex: 0,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "units",
	});

	async function onSubmit(data: QuantitySchema) {
		try {
			await addQuantityUnit(data);
			toast.success("Successfully submitted:", {
				description: (
					<pre className="mt-2 w-80 rounded-md bg-slate-950 p-4">
						<code className="text-white">{JSON.stringify(data, null, 2)}</code>
					</pre>
				),
			});
		} catch (e) {
			toast.error("Oops", {
				description: (e as Error).message,
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="gap-1 my-2">
							<div className="flex gap-x-2">
								<BadgePopover variant={"secondary"} text="Quantity name">
									i
								</BadgePopover>
								<FormLabel>Name</FormLabel>
							</div>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<div className="min-h-5">
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="gap-1 my-2">
							<div className="flex gap-x-2">
								<BadgePopover variant={"secondary"} text="Quantity description">
									i
								</BadgePopover>
								<FormLabel>Description</FormLabel>
							</div>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<RadioGroup
					className="my-0"
					value={String(form.watch("baseUnitIndex"))}
					onValueChange={(v) => {
						form.setValue("baseUnitIndex", +v);
						const units = form.getValues("units");
						const updatedUnits = units.map((u, i) => ({
							...u,
							isBase: i === +v,
						}));
						form.setValue("units", updatedUnits, { shouldValidate: true });
					}}
				>
					<FormField
						name="units"
						control={form.control}
						render={() => (
							<FormItem className="my-0">
								{fields.map((unit, index) => (
									<div key={unit.id} className="flex flex-col gap-y-1">
										<FormField
											control={form.control}
											name={`units.${index}.name`}
											render={({ field }) => (
												<FormItem className="flex-1 gap-1 my-0">
													<FormLabel>Unit Name</FormLabel>
													<FormControl>
														<Input
															{...field}
															onChange={async (e) => {
																field.onChange(e);
																const unitNames = form
																	.getValues("units")
																	.map((_, i) => `units.${i}.name` as const);
																await form.trigger(unitNames);
															}}
														/>
													</FormControl>
													<div className="min-h-5">
														<FormMessage />
													</div>
												</FormItem>
											)}
										/>
										<div className="flex gap-x-4">
											<FormField
												control={form.control}
												name={`units.${index}.symbol`}
												render={({ field }) => (
													<FormItem className="gap-1 my-0">
														<FormLabel>Symbol</FormLabel>
														<FormControl>
															<Input
																{...field}
																onChange={async (e) => {
																	field.onChange(e);
																	const unitSymbols = form
																		.getValues("units")
																		.map((_, i) => `units.${i}.symbol` as const);
																	await form.trigger(unitSymbols);
																}}
															/>
														</FormControl>
														<div className="min-h-5">
															<FormMessage />
														</div>
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name={`units.${index}.factor`}
												render={({ field }) => (
													<FormItem className="gap-1 my-0">
														<FormLabel>Factor</FormLabel>
														<FormControl>
															<Input
																type="number"
																step={0.000001}
																{...field}
																min={0}
																onChange={async (e) => {
																	field.onChange(e.target.valueAsNumber);
																	const unitFactors = form
																		.getValues("units")
																		.map((_, i) => `units.${i}.factor` as const);
																	await form.trigger(unitFactors);
																}}
															/>
														</FormControl>
														<div className="min-h-5">
															<FormMessage />
														</div>
													</FormItem>
												)}
											/>
										</div>
										<div className="flex gap-x-4">
											<FormField
												control={form.control}
												name={`units.${index}.isBase`}
												render={() => (
													<FormItem className="gap-1 my-0">
														<FormLabel htmlFor={`unit-${index}`}>Base</FormLabel>
														<FormControl>
															<div className="h-9 w-9 flex items-center justify-center border rounded-md">
																<RadioGroupItem value={String(index)} id={`unit-${index}`} />
															</div>
														</FormControl>
														<div className="min-h-5">
															<FormMessage />
														</div>
													</FormItem>
												)}
											/>
											<Button
												type="button"
												className="mt-4.5 flex-grow"
												variant="secondary"
												onClick={() => remove(index)}
												disabled={fields.length < 2}
											>
												Remove Unit
												<Trash />
											</Button>
										</div>
										<Separator />
									</div>
								))}
								<div className="min-h-5">
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
				</RadioGroup>
				<Button
					type="button"
					variant="outline"
					onClick={() => append({ name: "", symbol: "", factor: 1, isBase: false })}
					className="w-full"
				>
					<Plus className="mr-2 h-4 w-4" />
					Add Unit
				</Button>
				<Separator />
				<Button type="submit" variant={"secondary"} className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
}

"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import BadgePopover from "../../common/badge-popover";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

export const checkboxSchema = z.object({
	id: z.string(),
	type: z.literal("checkbox"),
	description: z.string().optional(),
	label: z.string(),
	value: z.boolean(),
});

export type CheckboxSchema = z.infer<typeof checkboxSchema>;

interface CheckboxProps {
	label?: string;
	name: `fields.${number}.value`;
}

const propsSchema = z.object({
	description: z.string(),
});

export default function CheckboxField({
	label = "Label",
	name,
}: CheckboxProps) {
	const { control } = useFormContext();
	const description = useWatch({
		name: name.replace(/\.value$/, ".description"),
		control,
	});

	const propsForm = useForm({
		resolver: zodResolver(propsSchema),
		defaultValues: {
			description
		}
	});

	function onSubmit(values: z.infer<typeof propsSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem className="flex  flex-col gap-y-3 ml-2.5">
					<div className="flex gap-x-2 items-center">
						<BadgePopover text={description}>i</BadgePopover>
						<FormLabel>{label}</FormLabel>
					</div>
					<FormControl>
						<div className="flex items-center h-9">
							<Checkbox {...field} onClick={() => console.log(description)} />
						</div>
					</FormControl>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Edit {label} checkbox</DialogTitle>
							<DialogDescription>
								Make changes to your {label} field here. <br /> Click save when you're
								done.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-2">
								<Form {...propsForm}>
									<form onSubmit={propsForm.handleSubmit(onSubmit)}>
										<FormField
											control={propsForm.control}
											name="description"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="justify-self-end">Description</FormLabel>
													<Input {...field} className="col-span-3" />
												</FormItem>
											)}
										/>
										<Button type="submit">Submit</Button>
									</form>
								</Form>
							</div>
							<div className="grid grid-cols-4 items-center gap-2">
								<Label htmlFor="username" className="justify-self-end">
									Username
								</Label>
								<Input id="username" defaultValue="@peduarte" className="col-span-3" />
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									type="button"
									variant="secondary"
									onClick={() => console.log(propsForm.getValues())}
								>
									Save
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</FormItem>
			)}
		/>
	);
}

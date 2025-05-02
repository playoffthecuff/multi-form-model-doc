"use client";

import BadgePopover from "@/components/common/badge-popover";
import YesNoPopover from "@/components/common/popovers/yes-no";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Settings, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface SelectData {
	name: string;
	description?: string;
	label: string;
	disabled?: boolean;
	options: string[];
	placeholder?: string;
	type: "select";
}

interface SelectProps extends SelectData {
	onDelete: () => void;
	update: (card: SelectData) => void;
}

const schema = z.object({
	label: z.string().min(1, "required"),
	description: z.string().optional(),
	name: z.string(),
	options: z.array(z.string().min(1, "required")),
	placeholder: z.string().optional(),
	type: z.literal("select"),
});

export default function SelectField({
	label,
	description,
	name,
	options,
	placeholder,
	type,
	disabled = false,
	onDelete,
	update,
}: SelectProps) {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			description,
			label,
			name,
			options,
			placeholder,
			type,
		},
	});

	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={(v) => setOpen(v)}>
			<div className="flex p-0 items-center gap-x-4">
				<DialogTrigger asChild>
					<Button
						size="icon"
						disabled={disabled}
						variant={disabled ? "ghost" : "secondary"}
						onClick={() => setOpen(true)}
					>
						<Settings />
					</Button>
				</DialogTrigger>
				<CardTitle className="flex h-full items-center justify-center flex-grow text-base border-b">
					Select
				</CardTitle>
				<YesNoPopover
					disabled={disabled}
					onRefute={onDelete}
					icon={<X />}
					actionText="Delete field"
					questionText="Are you sure?"
				/>
			</div>

			<div className="flex flex-col">
				<div className="flex items-center leading-none">
					<div className="p-2.5 cursor-default">
						<BadgePopover text={description ?? ""} disabled={!description}>
							i
						</BadgePopover>
					</div>
					<Label>{label}</Label>
				</div>
				<div className="flex items-center cursor-default">
					<Select>
						<SelectTrigger className="min-w-64">
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent>
							{options.map((v) => (
								<SelectItem value={v} key={v}>
									{v}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<DialogContent
				className="sm:max-w-80 max-w-80 p-4 rounded-2xl"
				onEscapeKeyDown={() => setOpen(false)}
				onInteractOutside={() => setOpen(false)}
			>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit((v) => {
							update(v);
							setOpen(false);
						})}
					>
						<DialogHeader className="text-start">
							<DialogTitle>Edit {label} input</DialogTitle>
							<DialogDescription className="my-1">
								Make changes to your <strong>{label}</strong> input field.
							</DialogDescription>
						</DialogHeader>
						<div className="flex flex-col gap-y-2 py-4">
							<FormField
								control={form.control}
								name="label"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col gap-y-0.5">
											<div className="flex gap-x-2">
												<BadgePopover text="required">i</BadgePopover>
												<FormLabel className="justify-self-end mb-1">Label *</FormLabel>
											</div>
											<FormControl>
												<Input placeholder="type new label here..." {...field} />
											</FormControl>
											<div className="min-h-5">
												<FormMessage />
											</div>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col gap-y-0.5">
											<div className="flex gap-x-2">
												<BadgePopover text="optional">i</BadgePopover>
												<FormLabel className="justify-self-end mb-1">Description</FormLabel>
											</div>
											<FormControl>
												<Textarea placeholder="type new description here..." {...field} />
											</FormControl>
											<div className="min-h-5">
												<FormMessage />
											</div>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="placeholder"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col gap-y-0.5">
											<div className="flex gap-x-2">
												<BadgePopover text="optional">i</BadgePopover>
												<FormLabel className="justify-self-end mb-1">Placeholder</FormLabel>
											</div>
											<FormControl>
												<Input placeholder="type new placeholder here..." {...field} />
											</FormControl>
											<div className="min-h-5">
												<FormMessage />
											</div>
										</div>
									</FormItem>
								)}
							/>
						</div>
						<DialogDescription className="mb-2">
							Click save when you're done.
						</DialogDescription>
						<DialogFooter>
							<Button type="submit" className="w-full">
								<Save />
								Save
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

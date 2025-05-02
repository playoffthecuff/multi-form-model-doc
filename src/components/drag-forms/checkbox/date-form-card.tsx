"use client";

import BadgePopover from "@/components/common/badge-popover";
import YesNoPopover from "@/components/common/popovers/yes-no";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Save, Settings, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface DateData {
	name: string;
	description?: string;
	label: string;
	disabled?: boolean;
	placeholder?: string;
	type: "date";
}

interface DateProps extends DateData {
	onDelete: () => void;
	update: (card: DateData) => void;
}

const schema = z.object({
	label: z.string().min(1, "required"),
	description: z.string().optional(),
	placeholder: z.string().optional(),
	name: z.string(),
	type: z.literal("date"),
});

export default function DateFormCard({
	label,
	description,
	name,
	disabled = false,
	placeholder,
	type,
	onDelete,
	update,
}: DateProps) {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			description,
			label,
			name,
			placeholder,
			type,
		},
	});

	const [date, setDate] = useState<Date>();
	const [openSettings, setOpenSettings] = useState(false);
	const [openCalendar, setOpenCalendar] = useState(false);

	return (
		<Dialog open={openSettings} onOpenChange={(v) => setOpenSettings(v)}>
			<div className="flex p-0 items-center gap-x-4">
				<DialogTrigger asChild>
					<Button
						size="icon"
						disabled={disabled}
						variant={disabled ? "ghost" : "secondary"}
						onClick={() => setOpenSettings(true)}
					>
						<Settings />
					</Button>
				</DialogTrigger>
				<CardTitle className="flex h-full items-center justify-center flex-grow text-base border-b">
					Date
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
					<Popover open={openCalendar}>
						<PopoverTrigger asChild onClick={() => setOpenCalendar(true)}>
							<Button
								variant={"outline"}
								className={cn(
									"w-64 justify-start text-left font-normal",
									!date && "text-muted-foreground",
								)}
							>
								<CalendarIcon />
								{date ? format(date, "PPP") : <span>{placeholder}</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={date}
								onSelect={(v) => {
									setDate(v);
									setOpenCalendar(false);
								}}
							/>
						</PopoverContent>
					</Popover>
				</div>
			</div>
			<DialogContent
				className="sm:max-w-80 max-w-80 p-4 rounded-2xl"
				onEscapeKeyDown={() => setOpenSettings(false)}
				onInteractOutside={() => setOpenSettings(false)}
			>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit((v) => {
							update(v);
							setOpenSettings(false);
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

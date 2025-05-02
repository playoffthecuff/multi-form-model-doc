import BadgePopover from "@/components/common/badge-popover";
import YesNoPopover from "@/components/common/popovers/yes-no";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogClose,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface CheckboxData {
	defaultValue: boolean;
	description?: string;
	label: string;
	disabled?: boolean;
}

interface CheckboxProps extends CheckboxData {
	onDelete: () => void;
}

const schema = z.object({
	label: z.string().min(1, "required"),
	description: z.string().optional(),
	defaultValue: z.boolean(),
});

export default function CheckboxCard({
	defaultValue,
	label,
	description,
	disabled = false,
	onDelete,
}: CheckboxProps) {

	const settingsForm = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			description,
			label,
			defaultValue,
		},
	});

	return (
		<Dialog>
			<div className="flex p-0 items-center gap-x-4">
				<DialogTrigger asChild>
					<Button
						size="icon"
						disabled={disabled}
						variant={disabled ? "ghost" : "secondary"}
					>
						<Settings />
					</Button>
				</DialogTrigger>
				<CardTitle className="flex h-full items-center justify-center flex-grow text-base border-b">
					Checkbox
				</CardTitle>

				<YesNoPopover
					disabled={disabled}
					onRefute={onDelete}
					icon={<X />}
					actionText="Delete field"
					questionText="Are you sure?"
				/>
			</div>

			<div className="flex flex-col gap-y-3 ml-2.5">
				<div className="flex gap-x-2 items-center leading-none">
					<BadgePopover text={description ?? ""} disabled={!description}>
						i
					</BadgePopover>
					<Label>{label}</Label>
				</div>
				<div className="flex items-center h-9">
					<Checkbox defaultChecked={defaultValue} />
				</div>
			</div>
			<DialogContent className="sm:max-w-100 max-w-100">
				<Form {...settingsForm}>
					<form onSubmit={settingsForm.handleSubmit(console.log)}>
						<DialogHeader className="text-start">
							<DialogTitle>Edit {label} checkbox</DialogTitle>
							<DialogDescription>
								Make changes to your {label} field here.
								<br />
								Click save when you're done.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<FormField
								control={settingsForm.control}
								name="label"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col gap-y-2">
											<div className="flex gap-x-2">
												<BadgePopover text="required">i</BadgePopover>
												<FormLabel className="justify-self-end">Label</FormLabel>
											</div>
											<FormControl>
												<Input
													className="col-span-3"
													placeholder="type new description here"
													{...field}
												/>
											</FormControl>
											<div className="min-h-5">
												<FormMessage />
											</div>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={settingsForm.control}
								name="defaultValue"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col gap-y-2 min-h-9 justify-center">
											<div className="flex gap-x-2 h-full items-center">
												<BadgePopover disabled>i</BadgePopover>
												<FormLabel className="h-full">Default value</FormLabel>
												<FormControl>
													<div>
														<Checkbox
															className="col-span-3"
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
													</div>
												</FormControl>
											</div>
											<div className="min-h-5">
												<FormMessage />
											</div>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={settingsForm.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<div className="flex flex-col gap-y-2">
											<div className="flex gap-x-2">
												<BadgePopover text="optional">i</BadgePopover>
												<FormLabel className="justify-self-end">Description</FormLabel>
											</div>
											<FormControl>
												<Input
													className="col-span-3"
													placeholder="type new description here"
													{...field}
												/>
											</FormControl>
											<div className="min-h-5">
												<FormMessage />
											</div>
										</div>
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="submit" variant="secondary">
									Save
								</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

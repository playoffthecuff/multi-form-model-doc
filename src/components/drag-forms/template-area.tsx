"use client";

import DraggableTemplate from "./checkbox/draggable-template";

export default function DragForms() {
	return (
		<div className="flex flex-col gap-y-2">
			<DraggableTemplate fieldType="checkbox" />
			<DraggableTemplate fieldType="input" />
			<DraggableTemplate fieldType="select" />
			<DraggableTemplate fieldType="date" />

			{/* <TemplateCardWrapper fieldType="checkbox">
				<CheckboxTemplate />
			</TemplateCardWrapper>
			<TemplateCardWrapper fieldType="input">
				<InputTemplate />
			</TemplateCardWrapper>
			<TemplateCardWrapper fieldType="select">
				<SelectTemplate />
			</TemplateCardWrapper>
			<TemplateCardWrapper fieldType="date">
				<DateTemplate />
			</TemplateCardWrapper> */}
		</div>
	);
}

// import { type Control, type Path, useFieldArray, useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
// import { Checkbox } from "../ui/checkbox";
// import { Input } from "../ui/input";
// import { Edit } from "lucide-react";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
// import { Button } from "../ui/button";

// const stringSchema = z.object({
// 	id: z.string(),
// 	type: z.literal("input").or(z.literal("select")),
// 	label: z.string(),
// 	value: z.string(),
// });

// const booleanSchema = z.object({
// 	id: z.string(),
// 	type: z.literal("checkbox"),
// 	label: z.string(),
// 	value: z.boolean(),
// });

// export type StringSchema = z.infer<typeof stringSchema>;
// export type BooleanSchema = z.infer<typeof booleanSchema>;

// const formElementSchema = z.union([stringSchema, booleanSchema]);

// const schema = z.object({
// 	elements: z.array(formElementSchema).default([]),
// });

// export type Schema = z.infer<typeof schema>;

// export default function Forms() {
// 	const templateForm = useForm({
// 		defaultValues: {
// 			elements: [
// 				{
// 					id: "checkbox",
// 					type: "checkbox",
// 					label: "Чекбокс",
// 					value: false,
// 				},
// 				{
// 					id: "input",
// 					type: "input",
// 					label: "Текстовое поле",
// 					value: "Значение по умолчанию",
// 				},
// 				{
// 					id: "select",
// 					type: "select",
// 					label: "Выпадающий список",
// 					value: "Значение по умолчанию",
// 				},
// 			],
// 		},
// 	});

// 	const tempArr = useFieldArray({
// 		control: templateForm.control,
// 		name: "elements",
// 	});

// 	return (
// 		<div className="p-4 border rounded">
// 			<Form {...templateForm}>
// 				<form className="flex flex-col gap-y-4">
// 					{tempArr.fields.map((field, index) => (
// 						<DraggableTemplateItem
// 							item={field}
// 							key={field.id}
// 							control={templateForm.control as unknown as Control<Schema>}
// 							index={index}
// 							disabled
// 						/>
// 					))}
// 				</form>
// 			</Form>
// 		</div>
// 	);
// }

// interface FormValues {
// 	elements: {
// 		id: string;
// 		type: string;
// 		label: string;
// 		disabled?: boolean;
// 		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// 		value?: any;
// 	}[];
// }

// interface CommonProps {
// 	name: Path<FormValues>;
// 	label: string;
// 	disabled?: boolean;
// 	description?: string;
// }

// interface CheckboxData {
// 	checked?: boolean;
// }

// interface InputData {
// 	defaultValue?: string;
// }

// export interface CheckboxProps extends CommonProps, CheckboxData {
// 	control: Control<BooleanSchema>
// }

// export type FormItemType = "checkbox" | "input" | "select";

// interface SelectData {
// 	defaultValue?: string;
// 	options: string[];
// }

// function DraggableTemplateItem({
// 	item,
// 	index,
// 	control,
// 	disabled = false,
// }: {
// 	item: { id: string; type: string; label: string };
// 	className?: string;
// 	index: number;
// 	disabled?: boolean;
// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// 	control: Control<Schema, any>;
// }) {
// 	return (
// 		<div>
// 			{item.type === "checkbox" && (
// 				<CheckboxFormField
// 					label={item.label}
// 					name={`elements.${index}.value`}
// 					description="Описание"
// 					control={control as unknown as Control<BooleanSchema>}
// 					disabled={disabled}
// 				/>
// 			)}
// 			{item.type === "input" && (
// 				<InputFormField
// 					label={item.label}
// 					name={`elements.${index}.value`}
// 					description="Описание"
// 					control={control as unknown as Control<StringSchema>}
// 					disabled={disabled}
// 				/>
// 			)}
// 			{item.type === "select" && (
// 				<SelectFormField
// 					options={["Значение по умолчанию"]}
// 					label={item.label}
// 					name={`elements.${index}.value`}
// 					description="Описание"
// 					control={control as unknown as Control<StringSchema>}
// 					disabled={disabled}
// 				/>
// 			)}
// 		</div>
// 	);
// }

// interface SelectProps extends CommonProps, SelectData {
// 	control: Control<StringSchema>;
// }

// export function SelectFormField({
// 	options,
// 	name,
// 	label,
// 	description,
// 	disabled,
// 	control,
// }: SelectProps) {
// 	return (
// 		<FormField
// 			name={name}
// 			control={control}
// 			render={({ field }) => (
// 				<FormItem>
// 					<FormLabel>{label}</FormLabel>
// 					<Select
// 						onValueChange={field.onChange}
// 						disabled={disabled}
// 						value={field.value}
// 					>
// 						<FormControl>
// 							<SelectTrigger className="w-54">
// 								<SelectValue />
// 							</SelectTrigger>
// 						</FormControl>
// 						<SelectContent>
// 							{options.map((v, i) => (
// 								<div key={i} className="flex gap-x-2">
// 									<Button size="icon" variant="ghost">
// 										<Edit />
// 									</Button>
// 									<SelectItem value={v.toString()}>{v}</SelectItem>
// 								</div>
// 							))}
// 						</SelectContent>
// 					</Select>
// 					<FormDescription>{description}</FormDescription>
// 					<FormMessage />
// 				</FormItem>
// 			)}
// 		/>
// 	);
// }

// export function CheckboxFormField({
// 	name,
// 	label,
// 	description,
// 	disabled,
// 	control,
// }: CheckboxProps) {
// 	return (
// 		<FormField
// 			name={name}
// 			control={control}
// 			render={({ field }) => (
// 				<FormItem className="flex flex-row p-2">
// 					<FormControl>
// 						<Checkbox
// 							checked={field.value as unknown as boolean}
// 							onCheckedChange={field.onChange}
// 							disabled={disabled}
// 							onChange={field.onChange}
// 						/>
// 					</FormControl>
// 					<div className="space-y-1 leading-none">
// 						<FormLabel>{label}</FormLabel>
// 						<FormDescription>{description}</FormDescription>
// 						<FormMessage />
// 					</div>
// 				</FormItem>
// 			)}
// 		/>
// 	);
// }

// export interface InputProps extends CommonProps, InputData {
// 	control: Control<StringSchema>
// }

// export function InputFormField({
// 	name,
// 	description,
// 	label,
// 	control,
// 	disabled,
// }: InputProps) {
// 	return (
// 		<FormField
// 			name={name}
// 			control={control}
// 			render={({ field }) => {
// 				return (
// 					<FormItem>
// 						<FormLabel>{label}</FormLabel>
// 						<FormControl>
// 							<Input {...field} disabled={disabled} className="w-54" />
// 						</FormControl>
// 						<FormDescription>{description}</FormDescription>
// 						<FormMessage />
// 					</FormItem>
// 				);
// 			}}
// 		/>
// 	);
// }

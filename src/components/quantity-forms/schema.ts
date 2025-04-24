import { z } from "zod";

export const quantitySchema = z.object({
	name: z.string().min(1, "Required"),
	description: z.string(),
	units: z
		.array(
			z.object({
				name: z.string().min(1, "Required"),
				symbol: z.string().max(10).min(1, "Required"),
				factor: z.number().min(0),
				isBase: z.boolean(),
			}),
		)
		.superRefine((units, ctx) => {
			const seen = {
				name: new Map<string | number, number[]>(),
				symbol: new Map<string | number, number[]>(),
				factor: new Map<string | number, number[]>(),
			};

			units.forEach((v, i) => {
				for (const key of ["name", "symbol", "factor"] as const) {
					const value = v[key];
					const map = seen[key];
					if (map.has(value)) {
						map.get(value)?.push(i);
					} else {
						map.set(value, [i]);
					}
				}
			});

			for (const [key, map] of Object.entries(seen)) {
				for (const [_, indexes] of map.entries()) {
					if (indexes.length > 1) {
						indexes.forEach((index) => {
							ctx.addIssue({
								path: [index, key],
								code: z.ZodIssueCode.custom,
								message: `${key} must be unique`,
							});
						});
					}
				}
			}
		}),
	baseUnitIndex: z.number(),
});

export type QuantitySchema = z.infer<typeof quantitySchema>;
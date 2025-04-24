"use server";

import {
	type QuantitySchema,
	quantitySchema,
} from "@/components/quantity-forms/schema";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

function isPrismaDuplicateError(e: unknown): e is { code: string } {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return typeof e === "object" && e !== null && "code" in e && (e as any).code === "P2002";
}

const checkUser = async () => {
	const user = await currentUser();
	if (!user) throw new Error("User not found");
};

export async function getQuantityUnits() {
	return await prisma.quantity.findMany({
		orderBy: {
			name: "asc",
		},
	});
}

export async function addQuantityUnit(rawData: QuantitySchema) {
	const parsedData = quantitySchema.safeParse(rawData);
	if (!parsedData.success) throw new Error("invalid data");
	const { name, description, units } = parsedData.data;
	try {
		await prisma.quantity.create({
			data: {
				name,
				description,
				units: {
					create: units.map((v) => ({
						name: v.name,
						symbol: v.symbol,
						factor: v.factor,
						isBase: v.isBase,
					})),
				},
			},
		});
	} catch (e) {
		if (isPrismaDuplicateError(e)) {
			throw new Error("Such a quantity already exists");
		}
		throw new Error("Something went wrong");
	}
}

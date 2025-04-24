"use server";

import {
	type QuantitySchema,
	quantitySchema,
} from "@/components/quantity-forms/schema";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

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
		if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
			throw new Error("Such a quantity already exists");
		throw new Error("Something went wrong");
	}
}

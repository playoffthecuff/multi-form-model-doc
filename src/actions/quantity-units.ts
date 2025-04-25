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

export async function getQuantities() {
	return await prisma.quantity.findMany({
		orderBy: {
			name: "asc",
		},
	});
}

export async function getQuantityUnit(id: number) {
	return await prisma.quantity.findUnique({
		where: { id },
		include: {
			units: true,
		},
	});
}

export type QuantityUnit = Awaited<ReturnType<typeof getQuantityUnit>>;

export async function addQuantityUnits(rawData: QuantitySchema) {
	const parsedData = quantitySchema.safeParse(rawData);
	if (!parsedData.success) throw new Error("Invalid data");
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
export async function editQuantityUnits(rawData: QuantitySchema, id: number) {
	const parsedData = quantitySchema.safeParse(rawData);
	if (!parsedData.success) throw new Error("Invalid data");
	const { name, description, units } = parsedData.data;
	try {
		await prisma.quantity.update({
			where: {
				id,
			},
			data: {
				name,
				description,
				units: {
					deleteMany: {},
					create: units.map((v) => ({
						name: v.name,
						symbol: v.symbol,
						factor: v.factor,
						isBase: v.isBase,
					})),
				},
			},
		});
	} catch {
		throw new Error("Something went wrong");
	}
}

export async function deleteQuantityUnits(id: number) {
	try {
		await prisma.quantity.delete({
			where: {
				id,
			},
		});
	} catch {
		throw new Error("Something went wrong");
	}
}

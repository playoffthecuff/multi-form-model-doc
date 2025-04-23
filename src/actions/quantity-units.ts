"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

const checkUser = async () => {
	const user = await currentUser();
	if (!user) throw new Error("User not found");
};

// export async function createQuantityUnit(unit: )

export async function getQuantityUnits() {
	return await prisma.quantity.findMany({
		orderBy: {
			name: "asc",
		},
	});
}

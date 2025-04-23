import { PrismaClient } from "@/generated/prisma/client";

const client = () => new PrismaClient();

type Prisma = ReturnType<typeof client>;

const prismaGlobal = globalThis as unknown as {
	prisma: Prisma;
};

const prisma = prismaGlobal.prisma ?? client();

if (process.env.NODE_ENV !== "production") prismaGlobal.prisma = prisma;

export default prisma;

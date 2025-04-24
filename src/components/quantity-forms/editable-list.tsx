import { Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface Props {
	items: { name: string; description: string; id: number }[];
}

export default function EditableList({ items }: Props) {
	return (
		<>
			{items.map((v) => (
				<Card key={v.id} className="flex gap-x-4 flex-row w-80 p-2 pl-4">
					<CardHeader className="flex flex-grow items-center p-0 gap-x-4">
						<CardTitle className="w-fit">{v.name}</CardTitle>
						<CardDescription className="w-fit flex-grow text-base leading-4.5">{v.description}</CardDescription>
					</CardHeader>
					<CardFooter className="p-0">
						<Button asChild variant={"secondary"}>
							<Link href={`./edit/${v.id}`}>
								<Pencil />
							</Link>
						</Button>
					</CardFooter>
				</Card>
			))}
		</>
	);
}

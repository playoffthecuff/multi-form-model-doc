import { cn } from "@/lib/utils";

export default function EdgeHighlight({
	top,
	bottom,
}: { top: boolean; bottom: boolean }) {
	return (
		<>
			<div
				className={cn(
					"absolute left-0 top-0 w-full rounded-md rounded-b-none h-2",
					top && "bg-muted-foreground",
				)}
			/>
			<div
				className={cn(
					"absolute bottom-0 left-0 w-full rounded-md rounded-t-none h-2",
					bottom && "bg-muted-foreground",
				)}
			/>
		</>
	);
}

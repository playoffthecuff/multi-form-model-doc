import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export interface NavigationLink {
	title: string;
	href: string;
}
interface Props {
	links: NavigationLink[];
}

const Item = ({ href, title }: NavigationLink) => {
	return (
		<NavigationMenuItem>
			<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
				<Link href={href}>{title}</Link>
			</NavigationMenuLink>
		</NavigationMenuItem>
	);
};

export default function Navigation({ links }: Props) {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{links.map((v) => (
					<Item key={v.title} href={v.href} title={v.title} />
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

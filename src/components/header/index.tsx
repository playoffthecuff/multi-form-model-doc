import AuthButton from "./auth-button";
import { ModeToggler } from "./mode-toggler";
import Navigation, { type NavigationLink } from "./navigation";

const links: NavigationLink[] = [
	{ href: "/units/add", title: "Add" },
	{ href: "/units/edit", title: "Edit" },
	{ href: "/sign-in", title: "Sign In" },
	{ href: "/forms", title: "Forms" },
	{ href: "/tests", title: "tests" },
];

export default function Header() {
	return (
		<div>
			<div className="max-w-6xl mx-auto px-4 py-1 flex justify-between border items-center">
				<div>Logo</div>
				<Navigation links={links} />
				<div className="flex gap-2">
					<ModeToggler />
					<AuthButton />
				</div>
			</div>
		</div>
	);
}

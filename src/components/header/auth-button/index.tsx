"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function AuthButton() {
	const { theme } = useTheme();
	return (
		<>
			<SignedIn>
				<UserButton
					appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
				/>
			</SignedIn>
		</>
	);
}

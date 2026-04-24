import { type JSX } from "react";
import { cn } from "@bambi-ui/theme";

export interface CardProps {
	className?: string;
	title: string;
	children: React.ReactNode;
	href: string;
}

export function Card({ className, title, children, href }: CardProps): JSX.Element {
	return (
		<a
			className={cn(
				"block rounded-lg border border-border bg-secondary p-6 text-secondary-foreground no-underline transition-colors hover:bg-muted",
				className,
			)}
			href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo`}
			rel="noopener noreferrer"
			target="_blank"
		>
			<h2 className="mb-2 text-base font-semibold">
				{title} <span>→</span>
			</h2>
			<p className="text-sm text-muted-foreground">{children}</p>
		</a>
	);
}

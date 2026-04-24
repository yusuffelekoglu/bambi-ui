import { type JSX } from "react";
import { cn } from "@bambi-ui/theme";
import "./card.css";

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
				"bambi-card",
				className,
			)}
			href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo`}
			rel="noopener noreferrer"
			target="_blank"
		>
			<h2 className="bambi-card-title">
				{title} <span className="bambi-card-arrow">→</span>
			</h2>
			<p className="bambi-card-description">{children}</p>
		</a>
	);
}

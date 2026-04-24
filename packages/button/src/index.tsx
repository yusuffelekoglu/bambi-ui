"use client";

import { type ReactNode } from "react";
import { cn } from "@bambi-ui/theme";
import "./button.css";

export interface ButtonProps {
	children: ReactNode;
	className?: string;
	appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
	return (
		<button
			className={cn("bambi-button", className)}
			onClick={() => alert(`Hello from your ${appName} app!`)}
		>
			{children}
		</button>
	);
};

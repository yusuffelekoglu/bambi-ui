import { type JSX } from "react";
import { cn } from "@bambi-ui/theme";
import "./code.css";

export interface CodeProps {
	children: React.ReactNode;
	className?: string;
}

export function Code({ children, className }: CodeProps): JSX.Element {
	return <code className={cn("bambi-code", className)}>{children}</code>;
}

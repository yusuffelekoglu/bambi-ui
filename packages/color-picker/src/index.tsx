"use client";

import { useEffect, useRef, type JSX } from "react";
import { cn } from "@bambi-ui/theme";
import "./color-picker.css";

export interface ColorPickerProps {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps): JSX.Element {
	const textRef = useRef<HTMLInputElement>(null);
	const isFocused = useRef(false);

	useEffect(() => {
		if (textRef.current && !isFocused.current) {
			textRef.current.value = value;
		}
	}, [value]);

	return (
		<div className={cn("bambi-color-picker", className)}>
			<div className="bambi-color-picker-swatch-wrap">
				<span
					className="bambi-color-picker-swatch"
					style={{ backgroundColor: value }}
				/>
				<input
					type="color"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="bambi-color-picker-native"
					aria-label="Pick color"
				/>
			</div>

			<input
				ref={textRef}
				type="text"
				defaultValue={value}
				onFocus={() => {
					isFocused.current = true;
				}}
				onBlur={() => {
					isFocused.current = false;
					if (textRef.current) textRef.current.value = value;
				}}
				onChange={(e) => {
					if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
						onChange(e.target.value);
					}
				}}
				className="bambi-color-picker-input"
				maxLength={7}
				spellCheck={false}
				aria-label="Hex color value"
			/>
		</div>
	);
}

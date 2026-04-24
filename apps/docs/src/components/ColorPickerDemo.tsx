"use client";

import { useState } from "react";
import { ColorPicker } from "@bambi/ui";

interface ColorPickerDemoProps {
  initialValue?: string;
}

export function ColorPickerDemo({ initialValue = "#3b72e8" }: ColorPickerDemoProps) {
  const [color, setColor] = useState(initialValue);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <ColorPicker value={color} onChange={setColor} />
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full border border-border/60" style={{ backgroundColor: color }} />
        <span className="font-mono text-xs text-muted-foreground">{color}</span>
      </div>
    </div>
  );
}
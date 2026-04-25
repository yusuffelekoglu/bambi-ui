import { type KeyboardEvent, useCallback } from "react";

type PressOptions = {
  onPress?: () => void;
  disabled?: boolean;
};

type PressProps = {
  role: "button";
  tabIndex: 0 | -1;
  onClick: () => void;
  onKeyDown: (e: KeyboardEvent) => void;
  "aria-disabled": true | undefined;
};

export function usePress({ onPress, disabled = false }: PressOptions): {
  pressProps: PressProps;
} {
  const onClick = useCallback(() => {
    if (!disabled) onPress?.();
  }, [onPress, disabled]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !disabled) {
        e.preventDefault();
        onPress?.();
      }
    },
    [onPress, disabled],
  );

  return {
    pressProps: {
      role: "button",
      tabIndex: disabled ? -1 : 0,
      onClick,
      onKeyDown,
      "aria-disabled": disabled || undefined,
    },
  };
}

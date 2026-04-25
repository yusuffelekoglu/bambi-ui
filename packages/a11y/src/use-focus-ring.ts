import { useState, useCallback } from "react";

// module-level flag: true when the last interaction was keyboard
let isKeyboardNav = false;

if (typeof document !== "undefined") {
  document.addEventListener("keydown", () => { isKeyboardNav = true; }, true);
  document.addEventListener("pointerdown", () => { isKeyboardNav = false; }, true);
}

type FocusRingProps = {
  onFocus: () => void;
  onBlur: () => void;
  onPointerDown: () => void;
};

type FocusRingResult = {
  isFocusVisible: boolean;
  focusRingProps: FocusRingProps;
};

export function useFocusRing(): FocusRingResult {
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  const onFocus = useCallback(() => setIsFocusVisible(isKeyboardNav), []);
  const onBlur = useCallback(() => setIsFocusVisible(false), []);
  const onPointerDown = useCallback(() => setIsFocusVisible(false), []);

  return {
    isFocusVisible,
    focusRingProps: { onFocus, onBlur, onPointerDown },
  };
}

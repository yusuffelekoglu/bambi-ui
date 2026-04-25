import { type Ref, useCallback } from "react";

type PossibleRef<T> = Ref<T> | undefined | null;
type RefCallback<T> = (instance: T | null) => void;

function setRef<T>(ref: PossibleRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref != null) {
    (ref as { current: T | null }).current = value;
  }
}

export function composeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  return (node) => {
    for (const ref of refs) setRef(ref, node);
  };
}

export function useComposeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(composeRefs(...refs), refs);
}

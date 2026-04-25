# @bambi-ui/a11y

Accessibility primitives for building `@bambi-ui` components. Implements patterns from Radix UI and React Aria.

## Installation

```sh
pnpm add @bambi-ui/a11y
```

React 19 is required as a peer dependency.

## API

### `useId(prefix?)`

Wraps React's `useId` with an optional prefix. Use this to generate stable IDs for `aria-labelledby`, `aria-describedby`, and `htmlFor` pairs.

```tsx
const id = useId("dialog");
// → "dialog-:r1:"

<label htmlFor={id}>Name</label>
<input id={id} />
```

---

### `useFocusRing()`

Returns `isFocusVisible: true` only when the element was focused via keyboard. Mouse or touch focus does not trigger the ring, matching the `:focus-visible` CSS pseudo-class.

```tsx
const { isFocusVisible, focusRingProps } = useFocusRing();

<div
  tabIndex={0}
  data-focus-visible={isFocusVisible || undefined}
  {...focusRingProps}
/>
```

```css
[data-focus-visible] {
  outline: 2px solid var(--bambi-ring);
  outline-offset: 2px;
}
```

---

### `useFocusTrap(options?)`

Traps Tab/Shift+Tab inside a container. Auto-focuses the first focusable element on mount and restores focus to the previously active element on unmount.

```tsx
const ref = useFocusTrap<HTMLDivElement>();

<div ref={ref} role="dialog" aria-modal="true">
  <button>First</button>
  <button>Last</button>
</div>
```

| Option          | Type      | Default | Description                                  |
|-----------------|-----------|---------|----------------------------------------------|
| `enabled`       | `boolean` | `true`  | Disable the trap without unmounting          |
| `autoFocus`     | `boolean` | `true`  | Focus first focusable element on mount       |
| `restoreFocus`  | `boolean` | `true`  | Return focus to trigger element on unmount   |

---

### `usePress(options)`

Normalizes press interactions for non-native-button elements. Handles both `click` and keyboard `Enter`/`Space`, and spreads the correct ARIA role and `tabIndex`.

```tsx
const { pressProps } = usePress({ onPress: () => console.log("pressed") });

<div {...pressProps}>Custom button</div>
```

> Prefer a native `<button>` whenever possible. Use `usePress` only when the element cannot be a button (e.g. a card or list item that acts as a trigger).

---

### `useControllableState(options)`

Lets a component work in both controlled and uncontrolled modes without duplicating logic.

```tsx
const [open, setOpen] = useControllableState({
  value: props.open,          // undefined → uncontrolled
  defaultValue: false,
  onChange: props.onOpenChange,
});
```

| Option         | Type                  | Description                          |
|----------------|-----------------------|--------------------------------------|
| `value`        | `T \| undefined`      | Controlled value; `undefined` = uncontrolled |
| `defaultValue` | `T \| undefined`      | Initial value when uncontrolled      |
| `onChange`     | `(value: T) => void`  | Called on every change               |

---

### `composeRefs(...refs)` / `useComposeRefs(...refs)`

Merges multiple refs into one callback ref. Use `useComposeRefs` inside render; use `composeRefs` outside React.

```tsx
const Button = forwardRef((props, forwardedRef) => {
  const innerRef = useRef(null);
  const ref = useComposeRefs(forwardedRef, innerRef);
  return <button ref={ref} {...props} />;
});
```

---

### `announce(message, options?)`

Sends a message to screen readers via an `aria-live` region. Uses a double-buffer rotation so rapid announcements are never dropped.

```ts
announce("Item deleted");
announce("Error: required field", { politeness: "assertive" });
```

| Option        | Type                        | Default    | Description                           |
|---------------|-----------------------------|------------|---------------------------------------|
| `politeness`  | `"polite" \| "assertive"`   | `"polite"` | Assertive interrupts the current read |
| `clearAfter`  | `number` (ms)               | `7000`     | `0` keeps the message indefinitely   |

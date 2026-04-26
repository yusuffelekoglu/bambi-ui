# @bambi-ui/tabs

Accessible, themeable Tabs component for React — keyboard navigation, ARIA roles, controlled and uncontrolled modes.

## Installation

```sh
pnpm add @bambi-ui/tabs
```

Import the design tokens in your global CSS before using the components:

```css
@import "@bambi-ui/theme/tokens.css";
```

## Usage

```tsx
import { Tabs, TabList, Tab, TabPanel } from "@bambi-ui/tabs";

<Tabs defaultValue="account">
  <TabList>
    <Tab value="account">Account</Tab>
    <Tab value="password">Password</Tab>
    <Tab value="notifications">Notifications</Tab>
  </TabList>
  <TabPanel value="account">Account settings…</TabPanel>
  <TabPanel value="password">Password settings…</TabPanel>
  <TabPanel value="notifications">Notification preferences…</TabPanel>
</Tabs>
```

## Controlled

```tsx
const [tab, setTab] = useState("account");

<Tabs value={tab} onValueChange={setTab}>
  <TabList>
    <Tab value="account">Account</Tab>
    <Tab value="password">Password</Tab>
  </TabList>
  <TabPanel value="account">Account settings…</TabPanel>
  <TabPanel value="password">Password settings…</TabPanel>
</Tabs>
```

## Disabled tab

```tsx
<Tabs defaultValue="account">
  <TabList>
    <Tab value="account">Account</Tab>
    <Tab value="password" disabled>Password</Tab>
  </TabList>
  <TabPanel value="account">Account settings…</TabPanel>
  <TabPanel value="password">Password settings…</TabPanel>
</Tabs>
```

## Props

### `<Tabs>`

Extends all native `<div>` HTML attributes.

| Prop            | Type                      | Default |
|-----------------|---------------------------|---------|
| `defaultValue`  | `string`                  | —       |
| `value`         | `string`                  | —       |
| `onValueChange` | `(value: string) => void` | —       |

### `<TabList>`

Extends all native `<div>` HTML attributes.

### `<Tab>`

Extends all native `<button>` HTML attributes.

| Prop       | Type      | Default |
|------------|-----------|---------|
| `value`    | `string`  | —       |
| `disabled` | `boolean` | `false` |

### `<TabPanel>`

Extends all native `<div>` HTML attributes.

| Prop    | Type     | Default |
|---------|----------|---------|
| `value` | `string` | —       |

## Keyboard navigation

| Key          | Behavior                          |
|--------------|-----------------------------------|
| `ArrowRight` | Move focus to next tab (wraps)    |
| `ArrowLeft`  | Move focus to previous tab (wraps)|
| `Home`       | Move focus to first tab           |
| `End`        | Move focus to last tab            |
| `Tab`        | Move focus into / out of tabpanel |

Tabs use **automatic activation** — focus and selection move together on arrow key press, following the [ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

## Accessibility

- `TabList` renders with `role="tablist"`.
- Each `Tab` renders with `role="tab"`, `aria-selected`, and `aria-controls` pointing to its panel.
- Each `TabPanel` renders with `role="tabpanel"`, `tabIndex={0}`, and `aria-labelledby` pointing to its tab.
- Disabled tabs use the native `disabled` attribute and are skipped during keyboard navigation.
- Focus ring is only visible during keyboard navigation (`:focus-visible`).

## Theming

All tab tokens are defined under `--bambi-tab-*` in `@bambi-ui/theme/tokens.css`.

| Token                          | Default                        | Used for                  |
|--------------------------------|--------------------------------|---------------------------|
| `--bambi-tab-list-bg`          | `--bambi-muted`                | Tab list background       |
| `--bambi-tab-list-radius`      | `--bambi-radius-md`            | Tab list border radius    |
| `--bambi-tab-list-padding`     | `0.25rem`                      | Tab list inner padding    |
| `--bambi-tab-gap`              | `0.125rem`                     | Gap between tabs          |
| `--bambi-tab-bg`               | `transparent`                  | Inactive tab background   |
| `--bambi-tab-active-bg`        | `--bambi-background`           | Active tab background     |
| `--bambi-tab-active-shadow`    | `--bambi-shadow-sm`            | Active tab shadow         |
| `--bambi-tab-color`            | `--bambi-muted-foreground`     | Inactive tab text         |
| `--bambi-tab-active-color`     | `--bambi-foreground`           | Active tab text           |
| `--bambi-tab-disabled-opacity` | `0.5`                          | Disabled tab opacity      |
| `--bambi-tab-font-family`      | `--bambi-font-sans`            | Font family               |
| `--bambi-tab-font-size`        | `--bambi-text-sm`              | Font size                 |
| `--bambi-tab-font-weight`      | `--bambi-font-weight-medium`   | Font weight               |
| `--bambi-tab-padding`          | `0.375rem 0.75rem`             | Tab padding               |
| `--bambi-tab-radius`           | `--bambi-radius-sm`            | Tab border radius         |
| `--bambi-tab-transition`       | `bg/color/shadow 0.15s ease`   | Transition                |
| `--bambi-tab-panel-pt`         | `1rem`                         | Panel top padding         |
| `--bambi-tab-ring`             | `--bambi-ring`                 | Focus ring color          |
| `--bambi-tab-focus-ring-width` | `2px`                          | Focus ring width          |
| `--bambi-tab-focus-ring-offset`| `2px`                          | Focus ring offset         |

import { Button } from "@bambi-ui/core";

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
    </div>
  );
}

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function ButtonLoading() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button loading>Processing...</Button>
      <Button variant="secondary" loading>
        Loading
      </Button>
    </div>
  );
}

export function ButtonAsChild() {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button asChild variant="primary">
        <a href="#">Go to Portfolio</a>
      </Button>
      <Button asChild variant="outline">
        <a href="#">View Report</a>
      </Button>
    </div>
  );
}

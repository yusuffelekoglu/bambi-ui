import type { Metadata } from "next";
import path from "path";
import { Tabs, TabList, Tab, TabPanel } from "@bambi-ui/tabs";
import { Heading, Text } from "@bambi-ui/typography";
import { CodeBlock } from "@/components/CodeBlock";
import { ReadmeBlock } from "@/components/ReadmeBlock";

export const metadata: Metadata = {
  title: "Tabs",
  description:
    "Tabs component for bambi-ui — keyboard navigation, ARIA roles, controlled and uncontrolled modes. Fully accessible and WCAG 2.2 AA compliant.",
};

export default function TabsPage() {
  return (
    <>
      <Heading level={1} className="mb-2">Tabs</Heading>
      <Text variant="lead" className="mb-10">
        Accessible tabbed interface with keyboard navigation and full ARIA support.
      </Text>

      {/* Default */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Default</h2>
      <div className="mb-2 rounded-lg border border-border bg-secondary p-8">
        <Tabs defaultValue="account">
          <TabList>
            <Tab value="account">Account</Tab>
            <Tab value="password">Password</Tab>
            <Tab value="notifications">Notifications</Tab>
          </TabList>
          <TabPanel value="account">
            <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
          </TabPanel>
          <TabPanel value="password">
            <p className="text-sm text-muted-foreground">Change your password and security settings.</p>
          </TabPanel>
          <TabPanel value="notifications">
            <p className="text-sm text-muted-foreground">Configure how and when you receive notifications.</p>
          </TabPanel>
        </Tabs>
      </div>
      <CodeBlock lang="tsx" code={`<Tabs defaultValue="account">
  <TabList>
    <Tab value="account">Account</Tab>
    <Tab value="password">Password</Tab>
    <Tab value="notifications">Notifications</Tab>
  </TabList>
  <TabPanel value="account">Account settings…</TabPanel>
  <TabPanel value="password">Password settings…</TabPanel>
  <TabPanel value="notifications">Notification preferences…</TabPanel>
</Tabs>`} />

      {/* Disabled */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Disabled tab</h2>
      <div className="mb-2 rounded-lg border border-border bg-secondary p-8">
        <Tabs defaultValue="account">
          <TabList>
            <Tab value="account">Account</Tab>
            <Tab value="password" disabled>Password</Tab>
            <Tab value="notifications">Notifications</Tab>
          </TabList>
          <TabPanel value="account">
            <p className="text-sm text-muted-foreground">Manage your account settings and preferences.</p>
          </TabPanel>
          <TabPanel value="notifications">
            <p className="text-sm text-muted-foreground">Configure how and when you receive notifications.</p>
          </TabPanel>
        </Tabs>
      </div>
      <CodeBlock lang="tsx" code={`<Tabs defaultValue="account">
  <TabList>
    <Tab value="account">Account</Tab>
    <Tab value="password" disabled>Password</Tab>
    <Tab value="notifications">Notifications</Tab>
  </TabList>
  …
</Tabs>`} />

      <hr className="border-border" />
      <div className="mt-8">
        <ReadmeBlock packagePath={path.join(process.cwd(), "../../packages/tabs/README.md")} />
      </div>
    </>
  );
}

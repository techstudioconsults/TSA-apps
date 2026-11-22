import { RoleGate } from "./_components/role-gate";

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGate allow="content">{children}</RoleGate>;
}

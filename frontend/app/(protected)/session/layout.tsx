
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Session",
  description: "Engage with your AI study companion.",
};

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

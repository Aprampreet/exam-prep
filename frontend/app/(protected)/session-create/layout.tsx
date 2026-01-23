
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Session",
  description: "Upload study materials and start a new session.",
};

export default function CreateSessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

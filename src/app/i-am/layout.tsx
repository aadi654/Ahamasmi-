import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "I AM | Ahamasmi Architect",
  alternates: {
    canonical: "/i-am",
  },
};

export default function IAmLayout({ children }: { children: ReactNode }) {
  return children;
}

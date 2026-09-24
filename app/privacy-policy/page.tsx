import type { Metadata } from "next";
import { legal } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/LegalPage";

const doc = legal.privacy;

export const metadata: Metadata = pageMetadata({ title: doc.title, description: doc.lead, path: "/privacy-policy" });

export default function Page() {
  return <LegalPage doc={doc} />;
}

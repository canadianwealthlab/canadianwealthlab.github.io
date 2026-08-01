import type { Metadata } from "next";
import { StandardsPage } from "@/components/standards-page";

export const metadata: Metadata = { title: "Sources and Corrections", description: "CWL source hierarchy, evidence labels, update process, and material correction standard.", alternates: { canonical: "/about/sources-and-corrections" } };

export default function SourcesCorrectionsPage() {
  return <StandardsPage kicker="SOURCES AND CORRECTIONS" title="Trace the evidence and correct the record" description="A source supports a specific claim. A material error is corrected visibly and without quietly changing the conclusion." sections={[
    { title: "Source hierarchy", points: ["Government departments, agencies, regulators, legislation, and official program publications.", "Official fund facts, prospectuses, lender disclosures, pension documents, and product information.", "Recognized statistical agencies and original academic research.", "High-quality secondary analysis for context, not as a substitute for an authoritative rule."] },
    { title: "Evidence labels", paragraphs: ["Facts, assumptions, estimates, and editorial interpretations are not interchangeable. Community material remains separately labelled anecdotal context. External links allow readers to inspect the original source."] },
    { title: "What is corrected", points: ["Incorrect facts, formulas, calculations, or attribution.", "Outdated rules or product details that materially affect a decision.", "Wording that creates a materially misleading conclusion.", "Broken sources when an authoritative replacement exists."] },
    { title: "Correction process", paragraphs: ["Potential issues are reproduced and checked against the controlling source. Confirmed errors are corrected, the review date is updated, and a material change to a conclusion or result receives a visible note. Minor spelling and clarity edits do not require a formal note."] },
  ]} />;
}

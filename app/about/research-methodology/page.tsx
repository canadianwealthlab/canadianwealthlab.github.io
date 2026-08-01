import type { Metadata } from "next";
import { StandardsPage } from "@/components/standards-page";

export const metadata: Metadata = { title: "Research Methodology", description: "How CWL builds decision frameworks, examples, formulas, and calculator models.", alternates: { canonical: "/about/research-methodology" } };

export default function ResearchMethodologyPage() {
  return <StandardsPage kicker="RESEARCH METHODOLOGY" title="Make the model inspectable" description="A useful financial model explains the decision, inputs, arithmetic, uncertainty, and conditions that reverse the result." sections={[
    { title: "Decision definition", paragraphs: ["Research begins with a defined choice and reader. The strongest reasonable case for each legitimate option is developed before a conclusion is written."] },
    { title: "Facts and assumptions", points: ["Facts are traceable and dated when they can change.", "Assumptions are identified as selected inputs, not predictions.", "Examples use CAD by default and show arithmetic.", "Options are compared over the same period and on the same tax and fee basis.", "Sensitivity cases test uncertainty rather than hiding it behind a precise output."] },
    { title: "Calculators", paragraphs: ["Existing calculators apply documented formulas to browser inputs. They are scenario tools, not forecasts, approvals, tax returns, or financial plans. Inputs remain in the active browser session and are not submitted to CWL.", "Formula changes require regression tests and checks for zero, boundary, and unusually high inputs. Lender, issuer, tax software, or official program calculations control when contractual or statutory methods differ."] },
    { title: "Limits", paragraphs: ["General models cannot capture every credit, benefit, provincial rule, fee, life event, contract term, market path, or household value. Consequential decisions may require regulated or qualified professional advice."] },
  ]} />;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Calendar, Building2, FileText } from "lucide-react";

interface ContractDetailsProps {
  contractNo: string;
  payer: string;
  branch: string;
  effectiveDate: string;
  expiryDate: string;
}

// Define contract terms by payer - DIFFERENT content for each payer
const CONTRACT_TERMS: Record<string, {
  sections: Array<{
    number: number;
    title: string;
    content: string | string[];
    color: string;
  }>;
  notes: string[];
}> = {
  "AL ETIHAD": {
    sections: [
      {
        number: 1,
        title: "Service Coverage & Scope",
        content: "SGH Jeddah agrees to provide medical services per attached schedules. Services follow Saudi MOH standards and CCHI guidelines. Emergency and non-emergency care included as specified in price list attachments.",
        color: "blue"
      },
      {
        number: 2,
        title: "Fee Payment Terms",
        content: [
          "Invoicing: Monthly consolidated invoices for rendered services",
          "Payment Timeline: Net 30 days from invoice submission date",
          "Discount Structure: Pre-agreed rates apply per service schedule",
          "Interest on Delays: As per Saudi commercial regulations if applicable"
        ],
        color: "green"
      },
      {
        number: 3,
        title: "Insurance Authorization & Referral",
        content: "AL ETIHAD provides authorization through approved channels. Emergency cases treated immediately with post-notification within 24 hours. Valid member cards and referrals required per CCHI standards.",
        color: "purple"
      },
      {
        number: 4,
        title: "Billing & Claims Submission",
        content: [
          "Submission Window: Claims within 15 calendar days of service completion",
          "Required Documentation: Complete medical records and NPHIES codes mandatory",
          "Review Period: AL ETIHAD reviews claims within 10 business days",
          "Rejected Claims: Hospital may resubmit corrected claims within 5 days"
        ],
        color: "orange"
      },
      {
        number: 5,
        title: "Quality Standards & Compliance",
        content: "Hospital maintains CBAHI accreditation and MOH licensing. Quality audits conducted periodically. Compliance with cooperative health insurance law (M/10) and amendments required at all times.",
        color: "red"
      },
      {
        number: 6,
        title: "Confidentiality & Data Protection",
        content: "Patient data protected per Saudi PDPL and CCHI regulations. Medical records confidential between parties. Information sharing limited to insurance processing and regulatory requirements only.",
        color: "indigo"
      },
      {
        number: 7,
        title: "Contract Duration & Renewal",
        content: [
          "Duration: Three (3) years from contract effective date",
          "Renewal Notice: Either party notifies 90 days before expiry",
          "Rate Review: Annual negotiations permitted with 60 days notice",
          "Auto-Renewal: Contract extends yearly unless terminated properly"
        ],
        color: "cyan"
      },
      {
        number: 8,
        title: "Dispute Resolution & Termination",
        content: "Disputes resolved via direct negotiation first, then escalation to CCHI if needed. Termination requires 90 days written notice. Material breach allows immediate termination with documented proof.",
        color: "pink"
      }
    ],
    notes: [
      "All prices are in Saudi Riyals (SAR) unless otherwise stated",
      "Government fees and taxes may be additional to contracted rates",
      "Service prices are subject to annual review as per contract",
      "This contract is governed by Saudi Arabian laws and CCHI regulations"
    ]
  },
  "Bupa": {
    sections: [
      {
        number: 1,
        title: "Service Coverage & Scope",
        content: "The Hospital agrees to provide comprehensive healthcare services as per the attached Service Schedule and Price List. All services shall be provided in accordance with international standards and Saudi Ministry of Health regulations.",
        color: "blue"
      },
      {
        number: 2,
        title: "Fee Payment Terms",
        content: [
          "Monthly invoicing based on actual service utilization",
          "Payment due within 30 days from invoice date",
          "Agreed discount rates apply to all services as listed",
          "Late payment subject to 1.5% monthly interest charge"
        ],
        color: "green"
      },
      {
        number: 3,
        title: "Insurance Authorization & Referral",
        content: "The Payer shall provide pre-authorization for non-emergency services. Emergency services may proceed without prior authorization, provided notification is given within 24 hours. All referrals must be from recognized practitioners with active licenses.",
        color: "purple"
      },
      {
        number: 4,
        title: "Billing & Claims Submission",
        content: [
          "Hospital to submit claims within 15 days of service delivery",
          "Claims must include complete patient data and supporting documentation",
          "Incomplete claims will be returned within 5 days"
        ],
        color: "orange"
      },
      {
        number: 5,
        title: "Quality Standards & Compliance",
        content: "The Hospital commits to maintaining all required certifications and accreditations. Annual audits shall be conducted to ensure compliance with contractual obligations and quality standards. Non-compliance may result in service suspension.",
        color: "red"
      },
      {
        number: 6,
        title: "Confidentiality & Data Protection",
        content: "Both parties shall maintain strict confidentiality of patient information and contractual terms. All data handling shall comply with Saudi PDPL regulations and international healthcare privacy standards.",
        color: "indigo"
      },
      {
        number: 7,
        title: "Contract Duration & Renewal",
        content: [
          "Initial contract period: Three (3) years from effective date",
          "Renewal requires written notice 90 days prior to expiry",
          "Terms may be renegotiated annually with mutual consent"
        ],
        color: "cyan"
      },
      {
        number: 8,
        title: "Dispute Resolution & Termination",
        content: "Any disputes shall be resolved through mutual discussion first, followed by escalation to senior management. Either party may terminate with 90 days written notice. Breach of critical terms allows immediate termination upon written notice.",
        color: "pink"
      }
    ],
    notes: [
      "All prices are in Saudi Riyals (SAR) unless otherwise stated",
      "Government fees and taxes are additional to contracted rates",
      "Service prices are subject to annual review and adjustment",
      "This contract is governed by Saudi Arabian laws"
    ]
  }
};

// Color mapping for badges
const colorClasses: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
  green: "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300",
  red: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-300",
  indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300",
  cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-300",
  pink: "bg-pink-100 text-pink-700 dark:bg-pink-950/30 dark:text-pink-300"
};

const bulletColorClasses: Record<string, string> = {
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  purple: "text-purple-600 dark:text-purple-400",
  orange: "text-orange-600 dark:text-orange-400",
  red: "text-red-600 dark:text-red-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  cyan: "text-cyan-600 dark:text-cyan-400",
  pink: "text-pink-600 dark:text-pink-400"
};

export function ContractDetails({
  contractNo,
  payer,
  branch,
  effectiveDate,
  expiryDate,
}: ContractDetailsProps) {
  // Get contract terms for the specific payer, fallback to Bupa
  const terms = CONTRACT_TERMS[payer] || CONTRACT_TERMS["Bupa"];

  return (
    <div className="space-y-6">
      {/* Contract Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-blue-500 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-sm font-semibold">Contract Number</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-foreground">{contractNo}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-green-500" />
              <CardTitle className="text-sm font-semibold">Payer & Branch</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-foreground">{payer}</p>
            <p className="text-sm text-muted-foreground">{branch}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-sm font-semibold">Effective Date</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-foreground">{effectiveDate}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-500" />
              <CardTitle className="text-sm font-semibold">Expiry Date</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-foreground">{expiryDate}</p>
          </CardContent>
        </Card>
      </div>

      {/* Terms and Conditions */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-white">Terms and Conditions</CardTitle>
              <p className="text-sm text-slate-200 mt-1">Agreement Details and Obligations</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {terms.sections.map((section) => (
            <div key={section.number} className="space-y-3">
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full ${colorClasses[section.color]} font-semibold text-sm`}>
                  {section.number}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{section.title}</h3>
                  {typeof section.content === "string" ? (
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {section.content}
                    </p>
                  ) : (
                    <ul className="text-sm text-muted-foreground mt-2 space-y-2 list-inside">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className={`${bulletColorClasses[section.color]} font-bold flex-shrink-0`}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Important Notes */}
          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/30 border-l-4 border-l-amber-500 rounded">
            <h4 className="font-semibold text-amber-900 dark:text-amber-200 text-sm mb-2">
              📋 Important Notes
            </h4>
            <ul className="text-xs text-amber-800 dark:text-amber-300 space-y-1">
              {terms.notes.map((note, idx) => (
                <li key={idx}>• {note}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Status Badge */}
      <div className="flex justify-center">
        <Badge variant="outline" className="text-base px-4 py-2 bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Active Contract - Valid and Binding
        </Badge>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { BranchSelector } from "@/components/BranchSelector";
import { PDFViewer } from "@/components/PDFViewer";
import { ContractDetails } from "@/components/ContractDetails";
import { PAYERS, BRANCHES, CONTRACT_PDFS } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText } from "lucide-react";

export default function ContractsPage() {
  const [searchParams] = useSearchParams();
  const [selectedBranch, setSelectedBranch] = useState(
    searchParams.get("branch") || "jeddah"
  );
  const [selectedPayer, setSelectedPayer] = useState(
    searchParams.get("payer") || "bupa"
  );

  const selectedPayerData = PAYERS.find((p) => p.id === selectedPayer);
  const selectedBranchData = BRANCHES.find((b) => b.id === selectedBranch);
  const contractKey = `${selectedPayer}:${selectedBranch}`;
  const contractUrl = CONTRACT_PDFS[contractKey];
  const payerCode = (() => {
    const name = selectedPayerData?.name || "SGH";
    const firstToken = name.split(/\s+/)[0] || name;
    const sanitized = firstToken.replace(/[^A-Za-z0-9]/g, "");
    return (sanitized.slice(0, 3) || "SGH").toUpperCase();
  })();
  const contractNo = `SGH-2026-${payerCode}-001`;
  const effectiveDate = "January 1, 2025";
  const expiryDate = "December 31, 2027";

  return (
    <MainLayout>
      <div className="page-transition space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Contracts</h1>
                <p className="text-muted-foreground">
                  View contract documents for insurance payers
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <BranchSelector value={selectedBranch} onValueChange={setSelectedBranch} />
            <Select value={selectedPayer} onValueChange={setSelectedPayer}>
              <SelectTrigger className="w-full sm:w-[220px] h-11 bg-card">
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground">Payer</span>
                  <SelectValue>
                    {selectedPayerData?.name || "Select payer"}
                  </SelectValue>
                </div>
              </SelectTrigger>
              <SelectContent>
                {PAYERS.map((payer) => (
                  <SelectItem key={payer.id} value={payer.id}>
                    {payer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* PDF Viewer */}
        <PDFViewer
          title="Insurance Contract Agreement"
          payer={selectedPayerData?.name || ""}
          branch={selectedBranchData?.name || ""}
          lastUpdated="Jan 10, 2026"
          pdfUrl={contractUrl}
          contractNo={contractNo}
          effectiveDate={effectiveDate}
          expiryDate={expiryDate}
        />

        {/* Contract Details */}
        <ContractDetails
          contractNo={contractNo}
          payer={selectedPayerData?.name || "Bupa"}
          branch={selectedBranchData?.name || "Jeddah"}
          effectiveDate={effectiveDate}
          expiryDate={expiryDate}
        />
      </div>
    </MainLayout>
  );
}

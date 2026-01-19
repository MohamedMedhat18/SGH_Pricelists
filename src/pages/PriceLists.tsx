import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { BranchSelector } from "@/components/BranchSelector";
import { PriceListTable } from "@/components/PriceListTable";
import { PAYERS, BRANCHES, PRICE_SHEET_URLS, PRICE_SHEET_VARIANTS, JEDDAH_PAYERS, MADINAH_PAYERS, MAKKAH_PAYERS, DAMMAM_PAYERS } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileSpreadsheet } from "lucide-react";

export default function PriceListsPage() {
  const [searchParams] = useSearchParams();
  const [selectedBranch, setSelectedBranch] = useState(
    searchParams.get("branch") || "jeddah"
  );
  const [selectedPayer, setSelectedPayer] = useState(
    searchParams.get("payer") || "bupa"
  );
  const [selectedSheet, setSelectedSheet] = useState<string>("");

  // تحديد قائمة payers حسب الفرع المختار
  const isJeddah = selectedBranch === "jeddah";
  const isMadinah = selectedBranch === "madinah";
  const isMakkah = selectedBranch === "makkah";
  const isDammam = selectedBranch === "dammam";
  const payersList = isJeddah
    ? JEDDAH_PAYERS.map((name) => {
        return PAYERS.find((p) => p.name.toLowerCase().replace(/\s+/g, "") === name.toLowerCase().replace(/\s+/g, "")) || { id: name, name };
      })
    : isMadinah
    ? MADINAH_PAYERS.map((name) => {
        return PAYERS.find((p) => p.name.toLowerCase().replace(/\s+/g, "") === name.toLowerCase().replace(/\s+/g, "")) || { id: name, name };
      })
    : isMakkah
    ? MAKKAH_PAYERS.map((name) => {
        return PAYERS.find((p) => p.name.toLowerCase().replace(/\s+/g, "") === name.toLowerCase().replace(/\s+/g, "")) || { id: name, name };
      })
    : isDammam
    ? DAMMAM_PAYERS.map((name) => {
        return PAYERS.find((p) => p.name.toLowerCase().replace(/\s+/g, "") === name.toLowerCase().replace(/\s+/g, "")) || { id: name, name };
      })
    : PAYERS;
  const selectedPayerData = payersList.find((p) => p.id === selectedPayer);
  const selectedBranchData = BRANCHES.find((b) => b.id === selectedBranch);
  const sheetKey = `${selectedPayer}:${selectedBranch}`;
  
  // Check if this payer/branch has multiple sheets
  const sheetVariants = PRICE_SHEET_VARIANTS[sheetKey];
  const hasMultipleSheets = !!sheetVariants;

  // Always show sheet dropdown if there are multiple sheets
  // Default to first variant if none selected
  let sheetUrl = PRICE_SHEET_URLS[sheetKey];
  if (hasMultipleSheets) {
    const variantKeys = Object.keys(sheetVariants);
    let defaultSheet = variantKeys[0];
    if (!selectedSheet || !sheetVariants[selectedSheet]) {
      setSelectedSheet(defaultSheet);
      sheetUrl = sheetVariants[defaultSheet];
    } else {
      sheetUrl = sheetVariants[selectedSheet];
    }
  }

  return (
    <MainLayout>
      <div className="page-transition space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Price Lists</h1>
                <p className="text-muted-foreground">
                  View and manage pricing for insurance payers
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
                {payersList.map((payer) => (
                  <SelectItem key={payer.id} value={payer.id}>
                    {payer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Sheet Selector - Only show if multiple sheets available */}
            {hasMultipleSheets && (
              <Select value={selectedSheet} onValueChange={setSelectedSheet}>
                <SelectTrigger className="w-full sm:w-[220px] h-11 bg-card">
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground">Sheet</span>
                    <SelectValue>
                      {selectedSheet || "Select sheet"}
                    </SelectValue>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(sheetVariants).map((sheetName) => (
                    <SelectItem key={sheetName} value={sheetName}>
                      {sheetName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Current Selection Info */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{selectedPayerData?.name}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{selectedBranchData?.name}</span>
        </div>

        {/* Price List Table */}
        <PriceListTable payerId={selectedPayer} branchId={selectedBranch} sheetUrl={sheetUrl} />
      </div>
    </MainLayout>
  );
}

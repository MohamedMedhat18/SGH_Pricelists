import { useState } from "react";
import {
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PDFViewerProps {
  title: string;
  payer: string;
  branch: string;
  lastUpdated: string;
  pdfUrl?: string;
  contractNo?: string;
  effectiveDate?: string;
  expiryDate?: string;
}

export function PDFViewer({ title, payer, branch, lastUpdated, pdfUrl, contractNo, effectiveDate, expiryDate }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [page, setPage] = useState(1);
  const totalPages = 5; // Sample total

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  
  const handleDownloadPDF = () => {
    const url = pdfUrl || "/contracts/SGH-Jeddah-BUPA-Contract.pdf";
    const link = document.createElement("a");
    link.href = url;
    link.download = `${contractNo || `SGH-${branch}-${payer}-Contract`}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="card-elevated overflow-hidden">
      <CardHeader className="border-b border-border bg-muted/30 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">{title}</CardTitle>
              <div className="flex items-center gap-2 mt-0.5 text-sm text-muted-foreground">
                <span>{payer}</span>
                <span>•</span>
                <span>{branch}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mr-2">
              <Calendar className="h-3 w-3" />
              {lastUpdated}
            </div>
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </CardHeader>

      {!pdfUrl && (
        <div className="px-4 py-2 text-sm text-amber-700 bg-amber-50 border-b border-amber-200">
          No contract PDF found for this payer/branch. Download will use default sample.
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleZoomIn}
            disabled={zoom >= 200}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <div className="w-px h-5 bg-border mx-2" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Preview Area */}
      <CardContent className="p-8 lg:p-12">
        <div
          className="flex items-center justify-center min-h-[650px]"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          {/* Professional PDF Document Card */}
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
            {/* Document Header - Gradient Background */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 px-12 py-10">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                  SAUDI GERMAN HOSPITAL
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px w-8 bg-blue-300/50" />
                  <p className="text-blue-100 font-semibold text-sm uppercase tracking-widest">
                    Insurance Contract Agreement
                  </p>
                  <div className="h-px w-8 bg-blue-300/50" />
                </div>
              </div>
            </div>

            {/* Contract Details - Grid Layout */}
            <div className="px-12 py-10">
              <div className="grid grid-cols-2 gap-8 mb-10">
                {/* Contract Number */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                    Contract Number
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {contractNo || "SGH-2026-001"}
                  </p>
                </div>

                {/* Effective Date */}
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                    Effective Date
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {effectiveDate || "January 1, 2025"}
                  </p>
                </div>

                {/* Payer */}
                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                    Insurance Payer
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {payer}
                  </p>
                </div>

                {/* Expiry Date */}
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                    Expiry Date
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {expiryDate || "December 31, 2027"}
                  </p>
                </div>
              </div>

              {/* Branch Section */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl px-6 py-5 mb-10 border border-slate-200/50 dark:border-slate-700/30">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">
                  Service Location
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {branch} Branch
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600 mb-10" />

              {/* Footer */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-800/50 mb-4">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                    ACTIVE CONTRACT
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  This is a certified copy of the official contract
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Document generated on: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {pdfUrl && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
              <span>Embedded PDF Preview</span>
              <a href={pdfUrl} target="_blank" rel="noreferrer" className="text-primary font-medium">Open in new tab</a>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              <object data={pdfUrl} type="application/pdf" className="w-full h-[720px]">
                <p className="p-4 text-sm">PDF preview is not available in this browser. <a className="text-primary" href={pdfUrl} target="_blank" rel="noreferrer">Open the PDF</a>.</p>
              </object>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

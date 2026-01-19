// حل تحذيرات TypeScript لمتغيرات debug في window
declare global {
  interface Window {
    __DEBUG_DYNAMIC_HEADERS?: any;
    __DEBUG_FIRST_ROW?: any;
  }
}
import { useEffect, useMemo, useState } from "react";
import { Search, Download, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

// Helper function to properly parse CSV lines respecting quoted fields
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // Field separator
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  // Push the last field
  result.push(current.trim());
  return result;
}

interface PriceListItem {
  id: string;
  serviceCode: string;
  serviceName: string;
  category: string;
  unitPrice: number;
  discount: number;
  finalPrice: number;
  status: "active" | "pending" | "inactive";
}

// Sample data for demonstration
const sampleData: PriceListItem[] = [
  {
    id: "1",
    serviceCode: "CONS-001",
    serviceName: "General Consultation",
    category: "Consultation",
    unitPrice: 250,
    discount: 10,
    finalPrice: 225,
    status: "active",
  },
  {
    id: "2",
    serviceCode: "LAB-101",
    serviceName: "Complete Blood Count (CBC)",
    category: "Laboratory",
    unitPrice: 120,
    discount: 15,
    finalPrice: 102,
    status: "active",
  },
  {
    id: "3",
    serviceCode: "RAD-201",
    serviceName: "Chest X-Ray",
    category: "Radiology",
    unitPrice: 350,
    discount: 5,
    finalPrice: 332.5,
    status: "active",
  },
  {
    id: "4",
    serviceCode: "SURG-301",
    serviceName: "Minor Surgery",
    category: "Surgery",
    unitPrice: 2500,
    discount: 20,
    finalPrice: 2000,
    status: "pending",
  },
  {
    id: "5",
    serviceCode: "PHARM-401",
    serviceName: "Medication Package A",
    category: "Pharmacy",
    unitPrice: 180,
    discount: 0,
    finalPrice: 180,
    status: "active",
  },
];

interface PriceListTableProps {
  payerId: string;
  branchId: string;
  sheetUrl?: string | null;
}

export function PriceListTable({ payerId, branchId, sheetUrl }: PriceListTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [remoteData, setRemoteData] = useState<any[] | null>(null);
  const [dynamicHeaders, setDynamicHeaders] = useState<string[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [feedError, setFeedError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchCSV = async () => {
      if (!sheetUrl) {
        setRemoteData(null);
        setDynamicHeaders([]);
        return;
      }
      try {
        setLoadingFeed(true);
        setFeedError(null);
        
        console.log('Fetching from:', sheetUrl);
        
        const res = await fetch(sheetUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        
        console.log('CSV text received, length:', text.length);
        
        // Parse CSV with proper handling of quoted values
        let parsed: any[] = [];
        const lines = text.split(/\r?\n/);
        console.log('Total lines in CSV:', lines.length);
        
        // Extract headers from first line
        const headerLine = lines[0];
        console.log('Header line:', headerLine);
        const headers = parseCSVLine(headerLine).map(h => h.trim()).filter(h => h);
        console.log('Parsed headers:', headers);
        setDynamicHeaders(headers);
        window.__DEBUG_DYNAMIC_HEADERS = headers;
        
        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue; // Skip empty lines
          
          const values = parseCSVLine(line);
          const row: any = {};
          
          headers.forEach((header, idx) => {
            if (header) {
              row[header] = values[idx] || '';
            }
          });
          
          parsed.push(row);
        }
        
        console.log('Total parsed rows:', parsed.length);
        if (parsed.length > 0) {
          console.log('First row data:', parsed[0]);
          window.__DEBUG_FIRST_ROW = parsed[0];
        }

        // Keep raw CSV data, just filter empty rows
        const filtered = parsed.filter(row => {
          if (!row) return false;
          // Check if row has any meaningful data
          const hasData = Object.values(row).some(val => val && val.toString().trim().length > 0);
          return hasData;
        });
        
        console.log('Filtered data count:', filtered.length);
        
        if (filtered.length > 0) {
          setRemoteData(filtered as any);
          setTotalRecords(filtered.length);
          setCurrentPage(1);
        } else {
          setRemoteData(null);
          setTotalRecords(0);
        }
      } catch (err: any) {
        console.error('CSV fetch error:', err);
        setFeedError(err?.message || "Failed to load sheet");
        setRemoteData(null);
        setTotalRecords(0);
        setDynamicHeaders([]);
      } finally {
        setLoadingFeed(false);
      }
    };
    
    fetchCSV();
  }, [sheetUrl]);

  const sourceData = remoteData && remoteData.length ? remoteData : sampleData;
  
  // Always use dynamic headers if present, even if different from default
  const headersToDisplay = useMemo(() => {
    if (dynamicHeaders && dynamicHeaders.length > 0) {
      return dynamicHeaders.map(h => h && h.trim()).filter(h => h && h.length > 0);
    }
    return ["Service Code", "Service Description", "type", "Fee", "1/1/2026 FEE", "Discount", "Effective Date", "Termination Date", "Schedule Name", "NPHIES Code"];
  }, [dynamicHeaders]);

  // Detect a category-like column (Department or Type) and gather unique values for filtering
  const categoryColumn = useMemo(() => {
    const lowerHeaders = headersToDisplay.map((h) => h.toLowerCase());
    const deptIdx = lowerHeaders.findIndex((h) => h.includes("department"));
    if (deptIdx !== -1) return headersToDisplay[deptIdx];
    const typeIdx = lowerHeaders.findIndex((h) => h.includes("type"));
    if (typeIdx !== -1) return headersToDisplay[typeIdx];
    return null;
  }, [headersToDisplay]);

  const categoryOptions = useMemo(() => {
    if (!categoryColumn) return [] as string[];
    const set = new Set<string>();
    sourceData.forEach((row: any) => {
      const val = (row[categoryColumn] || "").toString().trim();
      if (val) set.add(val);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [categoryColumn, sourceData]);
  
  // Filter data based on search query
  const filteredData = sourceData.filter((item: any) => {
    const searchLower = searchQuery.toLowerCase();
    
    const matchesSearch = headersToDisplay.some(header => {
      const value = (item[header] || "").toString().toLowerCase();
      return value.includes(searchLower);
    });

    if (!matchesSearch) return false;

    if (categoryFilter === "all" || !categoryColumn) return true;

    const categoryValue = (item[categoryColumn] || "").toString().toLowerCase();
    return categoryValue.includes(categoryFilter.toLowerCase());
  });
  
  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    
    const aVal = (a[sortField] || "").toString();
    const bVal = (b[sortField] || "").toString();
    
    // Try to parse as numbers
    const aNum = parseFloat(aVal.replace(/,/g, ''));
    const bNum = parseFloat(bVal.replace(/,/g, ''));
    
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    }
    
    // String comparison
    return sortDirection === "asc" 
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  // Apply pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your Excel file is being prepared for download.",
    });
  };

  // Determine if a header is numeric
  const isNumericColumn = (header: string) => {
    return ['Fee', 'Price', 'Discount', 'LOS', 'price'].some(keyword => header.toLowerCase().includes(keyword.toLowerCase()));
  };

  return (
    <div className="space-y-4">
      {loadingFeed && (
        <div className="text-xs text-muted-foreground">Loading sheet…</div>
      )}
      {feedError && (
        <div className="text-xs text-destructive">Sheet error: {feedError}</div>
      )}
      {!loadingFeed && !feedError && remoteData && (
        <div className="text-xs text-green-600">
          Loaded {totalRecords} records from CSV • {headersToDisplay.length} columns
        </div>
      )}
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gradient-to-r from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-4 rounded-lg border border-border/50">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search across all columns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 border-border/50 shadow-sm focus:shadow-md transition-shadow"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="shadow-sm">
                <Filter className="h-4 w-4 mr-2" />
                {categoryFilter === "all" ? "Filter" : categoryColumn ? categoryFilter : "Filter"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCategoryFilter("all")}>All</DropdownMenuItem>
              {categoryOptions.map((opt) => (
                <DropdownMenuItem key={opt} onClick={() => setCategoryFilter(opt)}>
                  {opt}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={handleExport} className="shadow-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-x-visible bg-card shadow-md w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-200">
              {headersToDisplay.map((header) => {
                if (dynamicHeaders && dynamicHeaders.length > 0) {
                  console.log('TableHead header:', header);
                }
                return (
                  <TableHead 
                    key={header}
                    className="cursor-pointer select-none hover:text-foreground transition-colors whitespace-nowrap" 
                    onClick={() => handleSort(header)}
                  >
                    <div className={`flex items-center gap-2 font-semibold ${isNumericColumn(header) ? 'justify-end' : ''}`}>
                      <span className="text-xs sm:text-sm">{header}</span>
                      <ArrowUpDown className={`h-4 w-4 transition-all flex-shrink-0 ${sortField === header ? "text-primary opacity-100" : "opacity-40"}`} />
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, idx) => (
              <TableRow 
                key={idx} 
                className={`border-b transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 ${idx % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50/50 dark:bg-slate-950/50'}`}
              >
                {headersToDisplay.map((header) => {
                  const value = item[header] || "";
                  const isNumeric = isNumericColumn(header);
                  if (dynamicHeaders && dynamicHeaders.length > 0) {
                    console.log('TableCell header:', header, '| value:', value);
                  }
                  return (
                    <TableCell 
                      key={`${idx}-${header}`}
                      className={`text-sm whitespace-nowrap ${isNumeric ? 'text-right font-mono' : 'font-medium max-w-xs'}`}
                    >
                      {/* Color code special columns */}
                      {header.includes("Code") || header.includes("code") ? (
                        <span className="text-primary font-semibold">{value}</span>
                      ) : header.toLowerCase().includes("price") || header.toLowerCase().includes("fee") ? (
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{value}</span>
                      ) : header.toLowerCase().includes("discount") ? (
                        <span className={`font-semibold ${parseFloat(value) > 0 ? 'text-green-600 dark:text-green-400' : 'text-slate-500'}`}>{
                          value !== '' ? `${parseFloat(value) < 1 ? parseFloat(value) * 100 : parseFloat(value)}%` : value
                        }</span>
                      ) : header.toLowerCase().includes("type") || header.toLowerCase().includes("department") ? (
                        <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium">{value}</span>
                      ) : (
                        <span>{value}</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4 rounded-lg border border-border/50">
        <div className="text-sm font-medium text-foreground">
          <span className="text-muted-foreground">Showing </span>
          <span className="font-semibold text-primary">{startIndex + 1}</span>
          <span className="text-muted-foreground"> to </span>
          <span className="font-semibold text-primary">{Math.min(startIndex + itemsPerPage, filteredData.length)}</span>
          <span className="text-muted-foreground"> of </span>
          <span className="font-semibold text-primary">{filteredData.length}</span>
          <span className="text-muted-foreground"> results</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="shadow-sm"
          >
            ← Previous
          </Button>
          <div className="px-3 py-1 rounded-md bg-background border border-border text-sm font-semibold text-foreground">
            Page <span className="text-primary">{currentPage}</span> of <span className="text-primary">{Math.max(1, totalPages)}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="shadow-sm"
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}

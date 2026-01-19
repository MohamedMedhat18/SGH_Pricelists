// قائمة payers الحقيقية لفرع Dammam بناءً على المجلدات الفعلية
export const DAMMAM_PAYERS = [
  "AL ETIHAD",
  "Arabian shield",
  "BUPA",
  "GIG",
  "Globemed",
  "Gulf Union",
  "Malath",
  "Medgulf",
  "NCCI",
  "Nextcare",
  "Rajihi Takaful",
  "Saico",
  "TCS"
];
// قائمة payers الحقيقية لفرع مكة بناءً على المجلدات الفعلية
export const MAKKAH_PAYERS = [
  "AL ETIHAD",
  "Alrajhi Takaful",
  "Arabian Shield",
  "Bupa",
  "GIG",
  "GLOBMED",
  "GOSI",
  "Medgulf",
  "Ncci",
  "Saico",
  "TCS"
];
// SGH Branches
export const BRANCHES = [
  { id: "abha-clinics", name: "Abha Clinics", region: "Southern" },
  { id: "aseer", name: "Aseer", region: "Southern" },
  { id: "beverly-clinics", name: "Beverly Clinics", region: "Central" },
  { id: "dammam", name: "Dammam", region: "Eastern" },
  { id: "hail", name: "Hail", region: "Northern" },
  { id: "haj", name: "HAJ", region: "Western" },
  { id: "jeddah", name: "Jeddah", region: "Western" },
  { id: "madinah", name: "Madinah", region: "Western" },
  { id: "makkah", name: "Makkah", region: "Western" },
  { id: "riyadh", name: "Riyadh", region: "Central" },
  { id: "direct-accounts", name: "Direct Accounts (JHaH)", region: "Central" },
  { id: "moh", name: "MOH", region: "National" },
] as const;

// Insurance Payers
export const PAYERS = [
  { id: "al-etihad", name: "AL ETIHAD", category: "Major" },
  { id: "al-rajhi", name: "Al Rajhi Takaful", category: "Major" },
  { id: "asico", name: "ASICO", category: "Standard" },
  { id: "bupa", name: "Bupa", category: "Premium" },
  { id: "gig", name: "GIG", category: "Major" },
  { id: "globemed", name: "GLOBEMED", category: "Major" },
  { id: "medgulf", name: "Medgulf", category: "Major" },
  { id: "ncci", name: "NCCI", category: "Standard" },
  { id: "saico", name: "Saico", category: "Standard" },
  { id: "tcs", name: "TCS", category: "Standard" },
  { id: "arabian-shield", name: "Arabian Shield", category: "Standard" },
  { id: "gulf-union", name: "Gulf Union", category: "Standard" },
  { id: "malath", name: "Malath", category: "Standard" },
  { id: "nextcare", name: "Nextcare", category: "TPA" },
  { id: "moh", name: "MOH", category: "Government" },
  { id: "gulfunion", name: "GULFUNION", category: "Standard" },
] as const;

// User roles
export const USER_ROLES = [
  { id: "view-only", name: "View Only", description: "Can view price lists and contracts (read-only)" },
  { id: "view-copy", name: "View & Copy", description: "Can view, copy cell values, copy tables" },
  { id: "download", name: "Download", description: "Can download Excel files and PDFs" },
  { id: "edit", name: "Edit", description: "Can modify price lists and contracts (admin only)" },
] as const;

export type Branch = typeof BRANCHES[number];
export type Payer = typeof PAYERS[number];
export type UserRole = typeof USER_ROLES[number]["id"];

// Price list CSV URLs mapped by payerId:branchId (local CSVs in public/data)
// Example key format: "bupa:jeddah"
// Put your CSVs under public/data and map them here
export const PRICE_SHEET_URLS: Record<string, string> = {
  "bupa:jeddah": "/data/bupa-jeddah.csv",
  "al-etihad:jeddah": "/data/al-etihad-jeddah.csv",
  "bupa:riyadh": "/data/bupa-riyadh.csv",
  "al-etihad:riyadh": "/data/al-etihad-riyadh.csv",
  "arabian-shield:riyadh": "/data/arabian-shield-riyadh.csv",
  "gig:riyadh": "/data/gig-riyadh.csv",
  "globemed:riyadh": "/data/globemed-riyadh.csv",
  "malath:riyadh": "/data/malath-riyadh.csv",
  "medgulf:riyadh": "/data/medgulf-riyadh.csv",
  "ncci:riyadh": "/data/ncci-riyadh-sheet1.csv",
  "nextcare:riyadh": "/data/next-care-riyadh.csv",
  "al-rajhi:riyadh": "/data/rajhi-takafwl-riyadh.csv",
  "saico:riyadh": "/data/saico-riyadh.csv",
  "tcs:riyadh": "/data/tcs-riyadh.csv",
};

// Multi-sheet price lists - when payer has multiple sheets
export const PRICE_SHEET_VARIANTS: Record<string, Record<string, string>> = {
        // Dammam Branch (main sheets only, auto-generated)
        "al-etihad:dammam": {
          "Service": "/data/al-etihad-dammam-sgh-unified-pricelist-service.csv"
        },
        "bupa:dammam": {
          "PL Bupa": "/data/bupa-dammam-pl-bupa.csv"
        },
                "arabian-shield:dammam": {
                  "Final List": "/data/arabian-shield-dammam-arabian-shield-proposal---dammam-(final)-(002)+-final-list.csv",
                  "Consumable": "/data/arabian-shield-dammam-arabian-shield-proposal---dammam-(final)-(002)+-consumable.csv",
                  "Medical Device": "/data/arabian-shield-dammam-arabian-shield-proposal---dammam-(final)-(002)+-medical-device.csv",
                  "SFDA": "/data/arabian-shield-dammam-arabian-shield-proposal---dammam-(final)-(002)+-sfda.csv"
                },
        "gig:dammam": {
          "Sheet1": "/data/gig-dammam-dammam--gig--pl---dec-2020-(v4)-for-itd-final-vip-vvip-sheet1.csv"
        },
        "globemed:dammam": {
          "Main": "/data/globemed-dammam-gm-dammam-2024-globmed-dammam-sgh-proposal.csv"
        },
        "gulf-union:dammam": {
          "Services": "/data/gulf-union-dammam-dammam---gulfunion-pl--dec-2019-(v6)-sghd-services-format.csv"
        },
        "malath:dammam": {
          "Services": "/data/malath-dammam-dammam---malath-pl-2019----dec-2020-(v3)-sghd-services-format.csv"
        },
        "medgulf:dammam": {
          "HCP-PriceBook": "/data/medgulf-dammam-medgulf-pl-effective-from-1.8.2024-(aseer---madinah---jeddah---dammam---hail---riyadh)-hcp-pricebook.csv"
        },
        "ncci:dammam": {
          "Sheet1": "/data/ncci-dammam-558076---dammam-pl-sheet1.csv"
        },
        "nextcare:dammam": {
          "Services": "/data/nextcare-dammam-dammam---nextcare-pl-(v4)-for-itd-sghd-services-format.csv"
        },
        "rajihi-takaful:dammam": {
          "Other Hospital": "/data/rajihi-takaful-dammam-sgh-alrajhi-takaful-from-1-7-2024-other-hospital.csv"
        },
        "saico:dammam": {
          "Price List 2023": "/data/saico-dammam-dammam---saico--price-list-2023-saico-price-list-2023.csv"
        },
        "tcs:dammam": {
          "Services": "/data/tcs-dammam-tcs-pl-2019--feb-2020-(v4)-(v5)-sghd-services-format.csv"
        },
      "al-etihad:makkah": {
        "Consultation": "/data/al-etihad-makkah-sgh-unified-pricelist-consultation.csv",
        "Consumables": "/data/al-etihad-makkah-sgh-unified-pricelist-consumables.csv",
        "Medical Devices": "/data/al-etihad-makkah-sgh-unified-pricelist-medical-devices.csv",
        "PKGs": "/data/al-etihad-makkah-sgh-unified-pricelist-pkgs.csv",
        "Service": "/data/al-etihad-makkah-sgh-unified-pricelist-service.csv",
        "SFDA": "/data/al-etihad-makkah-sgh-unified-pricelist-sfda.csv"
      },
      "al-rajhi:makkah": {
        "Admission Code For Approval Only": "/data/al-rajhi-makkah-sgh-alrajhi-takaful-jeddah--makkah-admission-code-for-approval-onl.csv",
        "FuzzyLookup Addin Undo Sheet": "/data/al-rajhi-makkah-sgh-alrajhi-takaful-jeddah--makkah-fuzzylookup_addin_undo_sheet.csv",
        "Updated List": "/data/al-rajhi-makkah-sgh-alrajhi-takaful-jeddah--makkah-updated-list.csv"
      },
      "arabian-shield:makkah": {
        "Consumable": "/data/arabian-shield-makkah-copy-of-arabian-shield-proposal---makkah-(final)._-(002)+-consumable.csv",
        "Final List": "/data/arabian-shield-makkah-copy-of-arabian-shield-proposal---makkah-(final)._-(002)+-final-list.csv",
        "Medical Device": "/data/arabian-shield-makkah-copy-of-arabian-shield-proposal---makkah-(final)._-(002)+-medical-device.csv",
        "SFDA": "/data/arabian-shield-makkah-copy-of-arabian-shield-proposal---makkah-(final)._-(002)+-sfda.csv"
      },
      "bupa:makkah": {
        "Table 1": "/data/bupa-makkah-saudi-german-hospital-makkah-2026-final.csv"
      },
      "gig:makkah": {
        "Clean": "/data/gig-makkah-clean.csv"
      },
      "globemed:makkah": {
        "Final List": "/data/globemed-makkah-sgh-makkah-final-price-list-globmed-final-list-.csv",
        "Same Discount Structure": "/data/globemed-makkah-sgh-makkah-final-price-list-globmed-same-discount-structure.csv"
      },
      "gosi:makkah": {
        "All": "/data/gosi-makkah-gosi--prices-list_pkg-deals_2021_2022_checking-ok_-1-All.csv",
        "Price": "/data/gosi-makkah-gosi--prices-list_pkg-deals_2021_2022_checking-ok_-1-Price.csv",
        "PKG": "/data/gosi-makkah-gosi--prices-list_pkg-deals_2021_2022_checking-ok_-1-PKG.csv",
        "CCHI Approved NON SFDA": "/data/gosi-makkah-gosi--prices-list_pkg-deals_2021_2022_checking-ok_-1-CCHI_Approved_NON_SFDA.csv",
        "CSS": "/data/gosi-makkah-gosi--prices-list_pkg-deals_2021_2022_checking-ok_-1-CSS.csv"
      },
      "medgulf:makkah": {
        "HCP Pricebook": "/data/medgulf-makkah-hcp-pricebook---sgh---makkah-hcp-pricebook.csv",
        "Sheet1": "/data/medgulf-makkah-hcp-pricebook---sgh---makkah-sheet1.csv"
      },
      "ncci:makkah": {
        "CGT": "/data/ncci-makkah-559428---makka-cgt-sheet1.csv",
        "PL": "/data/ncci-makkah-559428---makka-pl-sheet1.csv",
        "Consumables": "/data/ncci-makkah-559428---makka-sgh---consumables-01-01-2025-559428---makka-consumables.csv"
      },
      "saico:makkah": {
        "PKGs": "/data/saico-makkah-saico--price-list-2023-pkgs.csv",
        "Price List 2023": "/data/saico-makkah-saico--price-list-2023-saico--price-list-2023.csv"
      },
      "tcs:makkah": {
        "Note": "/data/tcs-makkah-tcs-copy-of-sgh-n-pl-sbs-mapping_f_agreemnt_revised-note.csv",
        "Perdiem": "/data/tcs-makkah-tcs-copy-of-sgh-n-pl-sbs-mapping_f_agreemnt_revised-perdiem.csv",
        "PKG Exclusions": "/data/tcs-makkah-tcs-copy-of-sgh-n-pl-sbs-mapping_f_agreemnt_revised-pkg-exclusions.csv",
        "PKGs": "/data/tcs-makkah-tcs-copy-of-sgh-n-pl-sbs-mapping_f_agreemnt_revised-pkgs.csv",
        "PL": "/data/tcs-makkah-tcs-copy-of-sgh-n-pl-sbs-mapping_f_agreemnt_revised-pl.csv",
        "Sheet2": "/data/tcs-makkah-tcs-copy-of-sgh-n-pl-sbs-mapping_f_agreemnt_revised-sheet2.csv",
        "Sheet3": "/data/tcs-makkah-tcs-copy-of-sgh-n-pl-sbs-mapping_f_agreemnt_revised-sheet3.csv"
      },
    "al-etihad:madinah": {
      "Consultation": "/data/al-etihad-madinah-sgh-unified-pricelist-consultation.csv",
      "Consumables": "/data/al-etihad-madinah-sgh-unified-pricelist-consumables.csv",
      "Medical Devices": "/data/al-etihad-madinah-sgh-unified-pricelist-medical-devices.csv",
      "PKGs": "/data/al-etihad-madinah-sgh-unified-pricelist-pkgs.csv",
      "Service": "/data/al-etihad-madinah-sgh-unified-pricelist-service.csv",
      "SFDA": "/data/al-etihad-madinah-sgh-unified-pricelist-sfda.csv"
    },
      "arabian-shield:madinah": {
        "Consumbles": "/data/arabian-shield-madinah-copy-of-arabian-shield-proposal---madinah-(final)-(003)+-consumables.csv",
        "Final List": "/data/arabian-shield-madinah-copy-of-arabian-shield-proposal---madinah-(final)-(003)+-final-list.csv",
        "FuzzyLookup": "/data/arabian-shield-madinah-copy-of-arabian-shield-proposal---madinah-(final)-(003)+-fuzzylookup_addin_undo_sheet.csv",
        "Medical Devices": "/data/arabian-shield-madinah-copy-of-arabian-shield-proposal---madinah-(final)-(003)+-meidcal-devices.csv",
        "SFDA": "/data/arabian-shield-madinah-copy-of-arabian-shield-proposal---madinah-(final)-(003)+-sfda.csv"
      },
      "bupa:madinah": {
        "Home Care": "/data/bupa-madinah-madinah-pl-latest-version-12.12.2024-home-care.csv",
        "Page1": "/data/bupa-madinah-madinah-pl-latest-version-12.12.2024-page1.csv",
        "Sheet1": "/data/bupa-madinah-madinah-pl-latest-version-12.12.2024-sheet1.csv"
      },
      "gig:madinah": {
        "New": "/data/gig-madinah-madinah-gig-pl-2021-new.csv",
        "PKG": "/data/gig-madinah-madinah-gig-pl-2021-pkg.csv",
        "Surgery": "/data/gig-madinah-madinah-gig-pl-2021-surgery.csv"
      },
      "globemed:madinah": {
        "All PL": "/data/globemed-madinah-globemed-madina-2024-all-pl.csv"
      },
      "gulf-union:madinah": {
        "Price List": "/data/gulf-union-madinah-gulf-union---sgh-group-price-list-2023-madinah.csv",
        "PKG": "/data/gulf-union-madinah-madinah-gulfunion-pkg-pl-2022-sheet1.csv",
        "Sheet1": "/data/gulf-union-madinah-gulf-union---sgh-group-price-list-2023-sheet1.csv",
        "Sheet3": "/data/gulf-union-madinah-gulf-union---sgh-group-price-list-2023-sheet3.csv",
        "Sheet4": "/data/gulf-union-madinah-gulf-union---sgh-group-price-list-2023-sheet4.csv"
      },
      "malath:madinah": {
        "All PL": "/data/malath-madinah-madinah-malath-pl-2022-all-pl.csv",
        "PKG": "/data/malath-madinah-madinah-malath-pl-2022-pkg.csv"
      },
      "medgulf:madinah": {
        "GVMetadata": "/data/medgulf-madinah-hcp-pricebook-gvmetadata.csv",
        "HCP Pricebook": "/data/medgulf-madinah-hcp-pricebook-hcp-pricebook.csv",
        "PL PKG": "/data/medgulf-madinah-madinah-medgulf--pl-pkg.csv",
        "PL Price List": "/data/medgulf-madinah-madinah-medgulf--pl-price-list.csv",
        "Effective 1.8.2024 GVMetadata": "/data/medgulf-madinah-medgulf-pl-effective-from-1.8.2024-(aseer---madinah---jeddah---dammam---hail---riyadh)-gvmetadata.csv",
        "Effective 1.8.2024 HCP Pricebook": "/data/medgulf-madinah-medgulf-pl-effective-from-1.8.2024-(aseer---madinah---jeddah---dammam---hail---riyadh)-hcp-pricebook.csv",
        "Effective 1.8.2024 Sheet1": "/data/medgulf-madinah-medgulf-pl-effective-from-1.8.2024-(aseer---madinah---jeddah---dammam---hail---riyadh)-sheet1.csv"
      },
      "ncci:madinah": {
        "Consumables": "/data/ncci-madinah-529022---madina-sgh---consumables-01-01-2025-529022---madina-consumables.csv",
        "CGT": "/data/ncci-madinah-529022---madinah-cgt-sheet1.csv",
        "PL": "/data/ncci-madinah-529022---madinah-pl-sheet1.csv"
      },
      "nextcare:madinah": {
        "All Price": "/data/nextcare-madinah-madinah-nextcare-pl-2021-all-price.csv",
        "Disposable and Implants": "/data/nextcare-madinah-madinah-nextcare-pl-2021-disosable-and-implants.csv",
        "PKG": "/data/nextcare-madinah-madinah-nextcare-pl-2021-pkg.csv"
      },
      "al-rajhi:madinah": {
        "Admission Code For Approval Only": "/data/al-rajhi-madinah-sgh-alrajhi-takaful-from-1-7-2024-admission-code-for-approval-onl.csv",
        "FuzzyLookup Addin Undo Sheet": "/data/al-rajhi-madinah-sgh-alrajhi-takaful-from-1-7-2024-fuzzylookup_addin_undo_sheet.csv",
        "Other Hospital": "/data/al-rajhi-madinah-sgh-alrajhi-takaful-from-1-7-2024-other-hospital.csv"
      },
      "saico:madinah": {
        "PKGs": "/data/saico-madinah-madinah-saico-pl-2023-pkgs.csv",
        "Price List 2023": "/data/saico-madinah-madinah-saico-pl-2023-saico--price-list-2023.csv"
      },
      "tcs:madinah": {
        "CCHI Approved Non SFDA": "/data/tcs-madinah-madinah-tcs-2021-cchi-approved-non-sfda.csv",
        "CSS": "/data/tcs-madinah-madinah-tcs-2021-css.csv",
        "DIEM": "/data/tcs-madinah-madinah-tcs-2021-diem.csv",
        "PKG": "/data/tcs-madinah-madinah-tcs-2021-pkg.csv",
        "Price": "/data/tcs-madinah-madinah-tcs-2021-price.csv"
      },
  "al-etihad:jeddah": {
    "Consultation": "/data/al-etihad-jeddah-sgh-unified-pricelist-consultation.csv",
    "Consumables": "/data/al-etihad-jeddah-sgh-unified-pricelist-consumables.csv",
    "Medical Devices": "/data/al-etihad-jeddah-sgh-unified-pricelist-medical-devices.csv",
    "PKGs": "/data/al-etihad-jeddah-sgh-unified-pricelist-pkgs.csv",
    "Service": "/data/al-etihad-jeddah-sgh-unified-pricelist-service.csv",
    "SFDA": "/data/al-etihad-jeddah-sgh-unified-pricelist-sfda.csv"
  },
  "arabian-shield:jeddah": {
    "Consumable": "/data/arabian-shield-jeddah-copy-of-arabian-shield-proposal---jeddah-(final)-(002)+-consumable.csv",
    "Final List": "/data/arabian-shield-jeddah-copy-of-arabian-shield-proposal---jeddah-(final)-(002)+-final-list.csv",
    "Medical Device": "/data/arabian-shield-jeddah-copy-of-arabian-shield-proposal---jeddah-(final)-(002)+-medical-device.csv",
    "SFDA": "/data/arabian-shield-jeddah-copy-of-arabian-shield-proposal---jeddah-(final)-(002)+-sfda-.csv"
  },
  "bupa:jeddah": {
    "Home Care": "/data/bupa-jeddah-jeddah-pl-latest-version-1.1.2025-home-care.csv",
    "Limited Period Agreed Codes": "/data/bupa-jeddah-jeddah-pl-latest-version-1.1.2025-limited-period-agreed-codes-.csv",
    "Page1": "/data/bupa-jeddah-jeddah-pl-latest-version-1.1.2025-page1.csv",
    "Sheet1": "/data/bupa-jeddah-jeddah-pl-latest-version-1.1.2025-sheet1.csv"
  },
  "gig:jeddah": {
    "SGHJ - AXA PL 2021": "/data/gig-jeddah-jeddah-gig-pl-2021-sghj---axa-pl-2021-.csv",
    "Sheet1": "/data/gig-jeddah-jeddah-gig-pl-2021-sheet1.csv"
  },
  "globemed:jeddah": {
    "All PL": "/data/globemed-jeddah-globemed-jeddah-2024-all-pl.csv"
  },
  "gulf-union:jeddah": {
    "Gulf Union PL 2021": "/data/gulf-union-jeddah-jeddah-gulf-union-pl-2021---2022-2023-gulf-union-pl-2021.csv",
    "Sheet1": "/data/gulf-union-jeddah-jeddah-gulf-union-pl-2021---2022-2023-sheet1.csv"
  },
  "malath:jeddah": {
    "Malath PL 2021": "/data/malath-jeddah-jeddah-malath-pl--2021-malath-pl-2021.csv"
  },
  "medgulf:jeddah": {
    "GVMetadata": "/data/medgulf-jeddah-medgulf-pl-effective-from-1.8.2024-gvmetadata.csv",
    "HCP Pricebook": "/data/medgulf-jeddah-medgulf-pl-effective-from-1.8.2024-hcp-pricebook.csv",
    "LOS": "/data/medgulf-jeddah-medgulf-pl-effective-from-1.8.2024-los.csv"
  },
  "ncci:jeddah": {
    "Main": "/data/ncci-jeddah-8177----jeddah-pl-sheet1.csv",
    "Consumables": "/data/ncci-jeddah-8177---jedda-sgh---consumables-01-01-2025-8177-jedda-consumables.csv",
    "Consumables Sheet1": "/data/ncci-jeddah-8177---jedda-sgh---consumables-01-01-2025-sheet1.csv",
    "CGT": "/data/ncci-jeddah-8177---jeddah-cgt-sheet1.csv"
  },
  "nextcare:jeddah": {
    "Nextcare": "/data/nextcare-jeddah-jeddah-nextcare-pl---2021-2022-nextcare.csv"
  },
  "al-rajhi:jeddah": {
    "Admission Code For Approval Only": "/data/al-rajhi-jeddah-sgh-alrajhi-takaful-jeddah--makkah-admission-code-for-approval-onl.csv",
    "FuzzyLookup Addin Undo Sheet": "/data/al-rajhi-jeddah-sgh-alrajhi-takaful-jeddah--makkah-fuzzylookup_addin_undo_sheet.csv",
    "Updated List": "/data/al-rajhi-jeddah-sgh-alrajhi-takaful-jeddah--makkah-updated-list.csv"
  },
  "saico:jeddah": {
    "PKGs": "/data/saico-jeddah-jeddah-saico--pl-2023-pkgs.csv",
    "Price List 2023": "/data/saico-jeddah-jeddah-saico--pl-2023-saico--price-list-2023.csv"
  },
  "tcs:jeddah": {
    "SGHJ TCS PL + SBS": "/data/tcs-jeddah-jeddah-tcs--pl-2022---copy-sghj-tcs-pl-+-sbs.csv",
    "SGHJ TCS PL..": "/data/tcs-jeddah-jeddah-tcs--pl-2022---copy-sghj-tcs-pl..csv",
    "Sheet1": "/data/tcs-jeddah-jeddah-tcs--pl-2022---copy-sheet1.csv",
    "Sheet2": "/data/tcs-jeddah-jeddah-tcs--pl-2022---copy-sheet2.csv",
    "Sheet3": "/data/tcs-jeddah-jeddah-tcs--pl-2022---copy-sheet3.csv",
    "SGHJ TCS PL + SBS (PL 2022)": "/data/tcs-jeddah-jeddah-tcs--pl-2022-sghj-tcs-pl-+-sbs.csv",
    "SGHJ TCS PL.. (PL 2022)": "/data/tcs-jeddah-jeddah-tcs--pl-2022-sghj-tcs-pl..csv",
    "Sheet1 (PL 2022)": "/data/tcs-jeddah-jeddah-tcs--pl-2022-sheet1.csv",
    "Sheet2 (PL 2022)": "/data/tcs-jeddah-jeddah-tcs--pl-2022-sheet2.csv",
    "Sheet3 (PL 2022)": "/data/tcs-jeddah-jeddah-tcs--pl-2022-sheet3.csv",
    "Consumables CST To Be Mapped To GMDN": "/data/tcs-jeddah-jeddah-tcs-consumables-cst-to-be-mapped-to-gmdn.csv"
  }
};

// Contract PDF paths mapped by payerId:branchId
export const CONTRACT_PDFS: Record<string, string> = {
  "bupa:jeddah": "/contracts/SGH-Jeddah-BUPA-Contract.pdf",
  "al-etihad:jeddah": "/contracts/SGH-Jeddah-AL-ETIHAD-Contract.pdf",
  "bupa:riyadh": "/contracts/SGH-Riyadh-BUPA-Contract.pdf",
  "al-etihad:riyadh": "/contracts/SGH-Riyadh-AL-ETIHAD-Contract.pdf",
};

// قائمة payers الحقيقية لفرع جدة بناءً على المجلدات الفعلية
export const JEDDAH_PAYERS = [
  "AL ETIHAD",
  "Arabian Shield",
  "BUPA",
  "GIG",
  "GLOBEMED",
  "GULF UNION",
  "MALATH",
  "MEDGULF",
  "NCCI",
  "NEXT CARE",
  "RAJHI TAKAFWL",
  "SAICO",
  "TCS"
];

// قائمة payers الحقيقية لفرع Madinah بناءً على المجلدات الفعلية
export const MADINAH_PAYERS = [
  "AL ETIHAD",
  "Arabian Shield",
  "BUPA",
  "GIG",
  "GLOBEMED",
  "GULFUNION",
  "MALATH",
  "MEDGULF",
  "NCCI",
  "NEXT CARE",
  "RAJHI TAKAFWL",
  "Saico",
  "TCS"
];

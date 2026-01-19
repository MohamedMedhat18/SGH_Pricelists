import os
import pandas as pd
from pathlib import Path

# مسارات العمل
DAMMAM_ROOT = r"C:/Users/MMMElsayed/OneDrive - Saudi German Health/Final Group Contracts & Price Lists/Dammam/Latest valid  Pricelist"
OUTPUT_DIR = r"C:/Users/MMMElsayed/sgh-deal-guard/public/data"

# دوال مساعدة

def clean_sheet_name(sheet):
    return (
        sheet.lower()
        .replace(" ", "-")
        .replace("/", "-")
        .replace("\\", "-")
        .replace("__", "-")
        .replace("--", "-")
        .replace("(", "")
        .replace(")", "")
        .replace("[", "")
        .replace("]", "")
        .replace(",", "-")
        .replace(".", "-")
        .replace("+", "-")
        .replace("'", "")
        .replace("&", "and")
        .replace("%", "pct")
        .replace("#", "num")
        .replace("_", "-")
        .strip("-")
    )

def convert_excels():
    for payer_folder in os.listdir(DAMMAM_ROOT):
        payer_path = os.path.join(DAMMAM_ROOT, payer_folder)
        if not os.path.isdir(payer_path):
            continue
        for file in os.listdir(payer_path):
            if file.lower().endswith((".xlsx", ".xls", ".xlsb")):
                excel_path = os.path.join(payer_path, file)
                try:
                    xls = pd.ExcelFile(excel_path)
                except Exception as e:
                    print(f"[ERROR] Cannot open {excel_path}: {e}")
                    continue
                for sheet in xls.sheet_names:
                    try:
                        df = xls.parse(sheet)
                        # تخطى الشيتات الفارغة أو التي لا تحتوي بيانات فعلية
                        if df.dropna(how="all").empty or df.shape[1] < 2:
                            continue
                        # اسم ملف CSV الناتج
                        base = Path(file).stem.lower().replace(" ", "-")
                        sheet_clean = clean_sheet_name(sheet)
                        payer_clean = payer_folder.lower().replace(" ", "-")
                        csv_name = f"{payer_clean}-dammam-{base}-{sheet_clean}.csv"
                        csv_path = os.path.join(OUTPUT_DIR, csv_name)
                        df.to_csv(csv_path, index=False)
                        print(f"[OK] {csv_path}")
                    except Exception as e:
                        print(f"[ERROR] {excel_path} [{sheet}]: {e}")

if __name__ == "__main__":
    convert_excels()
    print("\nتم التحويل بنجاح! تأكد من ربط الملفات الجديدة في constants.ts إذا تغيرت الأسماء.")

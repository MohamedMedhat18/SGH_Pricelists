import os
import pandas as pd

excel_base = r"C:/Users/MMMElsayed/OneDrive - Saudi German Health/Final Group Contracts & Price Lists/Dammam/Latest valid  Pricelist"
csv_base = r"C:/Users/MMMElsayed/sgh-deal-guard/public/data"

def safe_filename(name):
    return name.lower().replace(' ', '-').replace('/', '_').replace('(', '').replace(')', '').replace('+', '').replace('#', '').replace('.', '').replace("'", "")

for payer in os.listdir(excel_base):
    payer_path = os.path.join(excel_base, payer)
    if not os.path.isdir(payer_path):
        continue
    for file in os.listdir(payer_path):
        if not file.lower().endswith(('.xlsx', '.xls', '.xlsb')):
            continue
        excel_path = os.path.join(payer_path, file)
        try:
            xls = pd.ExcelFile(excel_path)
            for sheet in xls.sheet_names:
                df = xls.parse(sheet)
                if df.empty or len(df.columns) == 0:
                    continue
                safe_payer = safe_filename(payer)
                safe_file = safe_filename(file.split('.')[0])
                safe_sheet = safe_filename(sheet)
                csv_name = f"{safe_payer}-{safe_file}-{safe_sheet}.csv"
                csv_path = os.path.join(csv_base, csv_name)
                df.to_csv(csv_path, index=False)
                print(f"Saved: {csv_path} | Sheet: {sheet} | Columns: {list(df.columns)} | Rows: {len(df)}")
        except Exception as e:
            print(f"Error with {excel_path}: {e}")

print("تم التحويل الذكي ورفع كل الشيتات التي تحتوي على بيانات فعلية فقط لـ Dammam.")

input_path = r'C:/Users/MMMElsayed/sgh-deal-guard/public/data/gig-makkah.csv'
output_path = r'C:/Users/MMMElsayed/sgh-deal-guard/public/data/gig-makkah-clean.csv'
with open(input_path, encoding='utf-8') as f:
    lines = f.readlines()
header_idx = None
for i, line in enumerate(lines):
    if 'ServiceCode' in line:
        header_idx = i
        break
if header_idx is not None:
    with open(output_path, 'w', encoding='utf-8') as f:
        f.writelines(lines[header_idx:])
    print(f'تم تنظيف الملف وحفظه في: {output_path}')
else:
    print('لم يتم العثور على header فعلي في الملف!')

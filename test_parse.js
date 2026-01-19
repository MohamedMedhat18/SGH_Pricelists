function parseCSVLine(line) {
  const result = [];
  let current = '';
  let insideQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const line = 'NEU-0004,VENTICULO-ATRIAL SHUNT,P1   ,"16,573.72","16,739.00",0,1/1/2022, ,IP Package,40003-00-00,,,,,,';
const parts = parseCSVLine(line);
console.log('Headers:', ['Code', 'Desc', 'Type', 'Fee', '1/1/2026 FEE', 'Discount']);
console.log('Values:', parts.slice(0, 6));
console.log('Fee field (index 3):', parts[3]);
console.log('1/1/2026 FEE field (index 4):', parts[4]);
console.log('Parse to number:', parseFloat(parts[4].replace(/,/g, '')));

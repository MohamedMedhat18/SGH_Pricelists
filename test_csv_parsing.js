// Test CSV parsing function
function parseCSVLine(line) {
  const result = [];
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

// Test cases
const testLines = [
  'Service Code,Service Description,type,Fee,1/1/2026 FEE,Discount,Effective Date,Termination Date,Schedule Name,NPHIES Code,,,,,,',
  'NEU-0004,VENTICULO-ATRIAL SHUNT,P1   ,"16,573.72","16,739.00",0,1/1/2022, ,IP Package,40003-00-00,,,,,,',
  'MS-C-001711,CRTD ITREVIA 5 HF-T-QP PRO MRI BIOTRONIK # 402657,CM,"104,000","104,000",15,1/1/2022, ,Consumables, ,,,,,,',
];

testLines.forEach((line, idx) => {
  const result = parseCSVLine(line);
  console.log(`Line ${idx}:`);
  console.log(`  Count: ${result.length}`);
  console.log(`  Fields: ${JSON.stringify(result.slice(0, 6))}`);
});

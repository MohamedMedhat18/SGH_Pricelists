const fs = require('fs');

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

// Read CSV file
const text = fs.readFileSync('public/data/bupa-jeddah.csv', 'utf-8');
const lines = text.split(/\r?\n/);

console.log('Total lines:', lines.length);

const headerLine = lines[0];
const headers = parseCSVLine(headerLine).map(h => h.trim());
console.log('Headers:', headers);

// Parse first 5 data rows
const parsed = [];
for (let i = 1; i < Math.min(6, lines.length); i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  const values = parseCSVLine(line);
  const row = {};
  headers.forEach((header, idx) => {
    if (header) {
      row[header] = values[idx] || '';
    }
  });
  parsed.push(row);
}

console.log('\nFirst 5 rows parsed:');
parsed.forEach((row, idx) => {
  const cleanRow = {};
  for (const key in row) {
    const cleanKey = key.trim();
    if (!cleanKey) continue;
    const rawValue = row[key];
    if (rawValue === undefined || rawValue === null || rawValue === '') {
      cleanRow[cleanKey] = '';
      continue;
    }
    const cleanValue = String(rawValue)
      .trim()
      .replace(/^"|"$/g, '')
      .replace(/^'|'$/g, '')
      .trim();
    cleanRow[cleanKey] = cleanValue;
  }
  
  const serviceCode = (cleanRow["Service Code"] || "").toString().trim();
  const serviceName = (cleanRow["Service Description"] || "").toString().trim();
  const unitStr = (cleanRow["1/1/2026 FEE"] || cleanRow.Fee || "").toString().replace(/,/g, '').trim();
  const unit = parseFloat(unitStr) || 0;
  const discStr = (cleanRow.Discount || "0").toString().replace("%", "").trim();
  const disc = parseFloat(discStr) || 0;
  const final = unit * (1 - disc / 100);
  
  console.log(`Row ${idx}:`, {
    code: serviceCode,
    name: serviceName,
    unit,
    disc,
    final,
    hasCode: serviceCode && serviceCode.trim().length > 0,
    hasName: serviceName && serviceName.trim().length > 0
  });
});

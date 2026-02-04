/**
 * scripts/lib/csv.mjs
 *
 * Tiny RFC4180-ish CSV reader.
 * - Handles commas, quotes, escaped quotes, and newlines inside quoted fields.
 * - No dependencies.
 */

import fs from "node:fs/promises";

/** @typedef {string[]} CsvRow */

/**
 * Parse CSV content into rows (array-of-arrays).
 *
 * @param {string} text
 * @returns {CsvRow[]}
 */
export function parseCsv(text) {
  /** @type {CsvRow[]} */
  const rows = [];

  /** @type {CsvRow} */
  let row = [];
  let cur = "";
  let inQuotes = false;

  const pushField = () => {
    row.push(cur);
    cur = "";
  };

  const pushRow = () => {
    // Ignore entirely empty trailing row
    if (row.length === 1 && row[0] === "" && rows.length > 0) {
      row = [];
      return;
    }
    rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (ch === '"') {
      const next = text[i + 1];
      if (inQuotes && next === '"') {
        // Escaped quote
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && (ch === ",")) {
      pushField();
      continue;
    }

    if (!inQuotes && (ch === "\n")) {
      pushField();
      pushRow();
      continue;
    }

    if (!inQuotes && (ch === "\r")) {
      // Ignore CR; LF will handle newline.
      continue;
    }

    cur += ch;
  }

  // Final field/row
  pushField();
  if (row.length > 1 || row[0] !== "") pushRow();

  return rows;
}

/**
 * Read a CSV file and map rows to objects via header.
 *
 * @param {string} filePath
 * @returns {Promise<Array<Record<string, string>>>}
 */
export async function readCsvObjects(filePath) {
  const txt = await fs.readFile(filePath, "utf8");
  const rows = parseCsv(txt);
  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.trim());
  const out = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    /** @type {Record<string, string>} */
    const obj = {};
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = (r[j] ?? "");
    }
    out.push(obj);
  }

  return out;
}

/**
 * Read a CSV file and return both header and object rows.
 *
 * @param {string} filePath
 * @returns {Promise<{header: string[], rows: Array<Record<string, string>>}>}
 */
export async function readCsvWithHeader(filePath) {
  const txt = await fs.readFile(filePath, "utf8");
  const rows = parseCsv(txt);
  if (rows.length === 0) return { header: [], rows: [] };

  const header = rows[0].map((h) => h.trim());
  const mapped = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    /** @type {Record<string, string>} */
    const obj = {};
    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = (r[j] ?? "");
    }
    mapped.push(obj);
  }

  return { header, rows: mapped };
}

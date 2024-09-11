// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import patterns from "../assets/patterns.json";
const { contextBridge } = require("electron");
const path = require("path");
const fs = require("fs");
const patternsXTaxonomy = parseCSV(
  fs.readFileSync(path.join(__dirname, "patternsXTaxonomy.csv"), "utf-8")
);
const actionVerbs = Object.entries(patternsXTaxonomy[1].slice(3, -4));
let categorizedActionVerbs = {};
let curCategory = "";
for (let [index, category] of Object.entries(
  patternsXTaxonomy[0].slice(3, -4)
)) {
  if (category !== "") {
    curCategory = category;
    categorizedActionVerbs[category] = [];
  }
  categorizedActionVerbs[curCategory].push(
    {title: patternsXTaxonomy[1][Number(index) + 3].split("\n"), value:Number(index)}
  );
}
for (var pattern of patterns) {
  for (var row of patternsXTaxonomy) {
    if (row[0] === pattern.title) {
      var res = {};
      const isUsable =
        row[row.length - 2] === "FALSE" && row[row.length - 4] === "FALSE";
      for (const [index, actionVerb] of actionVerbs) {
        const i = Number(index) + 3;
        if (actionVerb === "") continue;
        res[actionVerb] = isUsable && row[i] === "TRUE";
      }
      pattern["actionVerbs"] = res;
      pattern["rawCSVRow"] = row;
    }
  }
}
contextBridge.exposeInMainWorld("resources", {
  patterns: patterns,
  patternsXTaxonomy: fs.readFileSync(
    path.join(__dirname, "patternsXTaxonomy.csv"),
    "utf-8"
  ),
  actionVerbs: actionVerbs,
  categorizedActionVerbs: categorizedActionVerbs,
});

function parseCSV(str) {
  const arr = [];
  let quote = false; // 'true' means we're inside a quoted field

  // Iterate over each character, keep track of current row and column (of the returned array)
  for (let row = 0, col = 0, c = 0; c < str.length; c++) {
    let cc = str[c],
      nc = str[c + 1]; // Current character, next character
    arr[row] = arr[row] || []; // Create a new row if necessary
    arr[row][col] = arr[row][col] || ""; // Create a new column (start with empty string) if necessary

    // If the current character is a quotation mark, and we're inside a
    // quoted field, and the next character is also a quotation mark,
    // add a quotation mark to the current column and skip the next character
    if (cc == '"' && quote && nc == '"') {
      arr[row][col] += cc;
      ++c;
      continue;
    }

    // If it's just one quotation mark, begin/end quoted field
    if (cc == '"') {
      quote = !quote;
      continue;
    }

    // If it's a comma and we're not in a quoted field, move on to the next column
    if (cc == "," && !quote) {
      ++col;
      continue;
    }

    // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
    // and move on to the next row and move to column 0 of that new row
    if (cc == "\r" && nc == "\n" && !quote) {
      ++row;
      col = 0;
      ++c;
      continue;
    }

    // If it's a newline (LF or CR) and we're not in a quoted field,
    // move on to the next row and move to column 0 of that new row
    if (cc == "\n" && !quote) {
      ++row;
      col = 0;
      continue;
    }
    if (cc == "\r" && !quote) {
      ++row;
      col = 0;
      continue;
    }

    // Otherwise, append the current character to the current column
    arr[row][col] += cc;
  }
  return arr;
}

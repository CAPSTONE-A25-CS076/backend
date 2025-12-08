const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

class LeadsService {
  constructor() {
    const csvPath = path.join(__dirname, "..", "data", "predicted.csv");

    const fileContent = fs.readFileSync(csvPath);
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
    this._leads = records.map((row, index) => ({
      rank: index + 1,
      ...row,
    }));
  }

  getLeads() {
    return this._leads;
  }
}

module.exports = LeadsService;

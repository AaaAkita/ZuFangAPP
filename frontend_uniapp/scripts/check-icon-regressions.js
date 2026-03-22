#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const SRC_DIR = path.resolve(__dirname, "..", "src");
const TARGET_EXTENSIONS = new Set([".vue", ".ts", ".js", ".scss", ".css", ".html"]);

const FORBIDDEN_PATTERNS = [
  {
    name: "legacy-class",
    regex: /material-symbols-outlined/g,
    message: "Use app-icon instead of material-symbols-outlined.",
  },
  {
    name: "remote-font-google",
    regex: /fonts\.googleapis\.com|fonts\.gstatic\.com/gi,
    message: "Do not depend on remote icon/font URLs.",
  },
  {
    name: "iconfont-cdn",
    regex: /iconfont\.cn|cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com/gi,
    message: "Do not depend on icon CDN URLs.",
  },
  {
    name: "ligature-icon-text",
    regex:
      /<text[^>]*>\s*(person|lock|visibility|visibility_off|arrow_forward|arrow_back|search|home|favorite|favorite_border|chat_bubble|account_circle|location_on|map|tune|sort|close|star|bookmark)\s*<\/text>/gi,
    message: "Do not render icon ligatures via <text>icon_name</text>.",
  },
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }
    if (TARGET_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function getLineNumber(content, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (content[i] === "\n") line += 1;
  }
  return line;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const issues = [];

  for (const pattern of FORBIDDEN_PATTERNS) {
    pattern.regex.lastIndex = 0;
    let match;
    while ((match = pattern.regex.exec(content)) !== null) {
      issues.push({
        filePath,
        line: getLineNumber(content, match.index),
        rule: pattern.name,
        message: pattern.message,
        excerpt: match[0].slice(0, 120),
      });
    }
  }

  return issues;
}

function main() {
  const files = walk(SRC_DIR);
  const issues = files.flatMap(scanFile);

  if (issues.length === 0) {
    console.log("check:icons passed. No icon regression patterns found.");
    return;
  }

  console.error(`check:icons failed. Found ${issues.length} issue(s):`);
  for (const issue of issues) {
    const relativePath = path.relative(path.resolve(__dirname, ".."), issue.filePath);
    console.error(`- ${relativePath}:${issue.line} [${issue.rule}] ${issue.message}`);
    console.error(`  ${issue.excerpt}`);
  }

  process.exit(1);
}

main();


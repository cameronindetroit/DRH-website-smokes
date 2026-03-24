#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const mdPath = path.join(repoRoot, 'plans', 'test-plan-review-20260317.md');
const outHtml = path.join(repoRoot, 'plans', 'edge-negative-smoke-tests.html');

const md = fs.readFileSync(mdPath, 'utf8');
const startToken = '## Edge & Negative Smoke Tests';
const start = md.indexOf(startToken);
if (start === -1) {
  console.error('Section not found in', mdPath);
  process.exit(2);
}
let end = md.indexOf('\n---\n', start);
if (end === -1) end = md.length;
const section = md.slice(start, end).trim();

// Simple markdown -> HTML converter for this section
function escapeHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

const lines = section.split(/\r?\n/);
let html = '';
let inCode = false;
let listItems = [];
for (let i=0;i<lines.length;i++){
  const line = lines[i];
  if (line.startsWith('```')){
    if (!inCode){ inCode = true; html += '<pre><code>'; }
    else { inCode = false; html += '</code></pre>\n'; }
    continue;
  }
  if (inCode){ html += escapeHtml(line) + '\n'; continue; }

  if (line.startsWith('## ')){
    html += `<h2>${escapeHtml(line.replace('## ',''))}</h2>\n`;
    continue;
  }
  if (line.startsWith('Purpose:')){
    html += `<p>${escapeHtml(line)}</p>\n`;
    continue;
  }
  if (line.startsWith('- ')){
    // collect list item
    const content = line.replace(/^-\s+/, '').trim();
    // bold title pattern: **TITLE**: desc
    const m = content.match(/^\*\*(.+?)\*\*:\s*(.*)$/);
    if (m){
      const title = escapeHtml(m[1]);
      const desc = escapeHtml(m[2]);
      listItems.push(`<li><strong>${title}</strong>: ${desc}</li>`);
    } else {
      listItems.push(`<li>${escapeHtml(content)}</li>`);
    }
    continue;
  }
  if (line.trim() === ''){ html += '<p></p>\n'; continue; }
  html += `<p>${escapeHtml(line)}</p>\n`;
}

if (listItems.length) html += `<ul>\n${listItems.join('\n')}\n</ul>\n`;

const fullHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Edge & Negative Smoke Tests</title>
  <style>
    body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:28px; color:#111}
    h2{color:#0b3d91}
    ul{margin-left:1em}
    pre{background:#f6f8fa;padding:12px;border-radius:6px;overflow:auto}
    code{background:#f1f1f1;padding:2px 4px;border-radius:4px}
  </style>
</head>
<body>
${html}
</body>
</html>`;

fs.writeFileSync(outHtml, fullHtml, 'utf8');
console.log('Wrote', outHtml);

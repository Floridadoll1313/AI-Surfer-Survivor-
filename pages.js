#!/usr/bin/env node

/**
 * Node.js script to generate Markdown pages for GitHub Pages from content blocks.
 * - Expects a content.json file with sections for each page.
 * - Outputs Markdown files with YAML front matter into a docs/ folder (or your preferred path).
 * - Optional: you can enable HTML generation by setting generateHtml = true.
 */

'use strict';
const fs = require('fs');
const path = require('path');

// CONFIG: adjust paths as needed
const OUTPUT_DIR = path.join(__dirname, 'docs');
const CONTENT_FILE = path.join(__dirname, 'content.json'); // or content.json5 if you prefer

// Whether to also output a simple HTML version (mirrors the Markdown body)
const GENERATE_HTML = false;

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Load content
let content;
try {
  const raw = fs.readFileSync(CONTENT_FILE, 'utf8');
  content = JSON.parse(raw);
} catch (e) {
  console.error('Failed to read or parse content.json:', e.message);
  process.exit(1);
}

// Helper to make front matter
function frontMatter(obj) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(obj)) {
    // simple scalar values; arrays serialized as YAML lists
    if (Array.isArray(v)) {
      lines.push(`${k}:`);
      for (const item of v) lines.push(`  - ${item}`);
    } else if (typeof v === 'string') {
      lines.push(`${k}: "${v.replace(/"/g, '\\"')}"`);
    } else {
      lines.push(`${k}: ${JSON.stringify(v)}`);
    }
  }
  lines.push('---\n');
  return lines.join('\n');
}

// Page generator
function writePage(slug, title, description, keywords, bodyMarkdown) {
  const fm = {
    title,
    description,
    keywords,
    layout: 'page'
  };
  const md = `${frontMatter(fm)}\n${bodyMarkdown}\n`;
  const outPath = path.join(OUTPUT_DIR, `${slug}.md`);
  fs.writeFileSync(outPath, md, 'utf8');
  console.log('Wrote', outPath);
  if (GENERATE_HTML) {
    // Very simple HTML wrapper (no styling)
    const htmlBody = bodyMarkdown
      .replace(/^### /gm, '<h3>$&</h3>')
      .replace(/^## /gm, '<h2>$&</h2>')
      .replace(/^# /gm, '<h1>$&</h1>')
      .replace(/\!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body>${htmlBody}</body></html>`;
    const htmlPath = path.join(OUTPUT_DIR, `${slug}.html`);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('Wrote', htmlPath);
  }
}

// Main: read content.json and generate pages
/**
content.json structure example:
{
  "pages": [
    {
      "slug": "ocean-tide-drop-production-concept",
      "title": "Ocean Tide Drop — Production Concept and Visuals",
      "description": "A futuristic reality competition...",
      "keywords": ["Ocean Tide Drop","AI Surfer Survivor","holographic puzzles"],
      "body_md": "....markdown content..."
    },
    ...
  ]
}
*/
function main() {
  if (!content.pages || !Array.isArray(content.pages)) {
    console.error('content.json must have a pages array.');
    process.exit(1);
  }

  // ensure output content
  for (const p of content.pages) {
    if (!p.slug || !p.title || !p.body_md) {
      console.warn('Skipping a page missing slug/title/body_md');
      continue;
    }
    writePage(p.slug, p.title, p.description || '', p.keywords || [], p.body_md);
  }
}

main();

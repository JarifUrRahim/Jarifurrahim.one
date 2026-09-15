import fs from 'node:fs';
import path from 'node:path';
import { chapterDiscovery, publication, themeHref, themes } from './discovery-config.mjs';

const root = process.cwd();
const manuscriptDir = path.join(root, 'manuscript');
const outputDir = path.join(root, 'chapters');
fs.mkdirSync(outputDir, { recursive: true });

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const inline = (value) => escapeHtml(value)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>')
  .replace(/`(.+?)`/g, '<code>$1</code>')
  .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

const renderDiscoveryPanel = (slug) => {
  const entry = chapterDiscovery[slug];
  if (!entry) return '';
  const edition = publication.editions[entry.edition];
  const themeLinks = entry.themeIds.map((themeId) => `<a href="${themeHref(themeId)}">${escapeHtml(themes[themeId].title)}</a>`).join(' · ');
  const bridge = entry.bridge ? `<p class="bridge"><strong>Cross-edition reading:</strong> <a href="${entry.bridge.href}">${escapeHtml(entry.bridge.label)}</a></p>` : '';
  return `<section class="reader-panel" aria-labelledby="reader-guide-title">
    <p class="reader-label">Reader guide · discovery context</p>
    <h2 id="reader-guide-title">A question this chapter helps examine</h2>
    <p>${escapeHtml(entry.readerQuestion)}</p>
    <p><strong>Related reader pathways:</strong> ${themeLinks}</p>
    <p><strong>Scope boundary:</strong> ${escapeHtml(entry.boundary)}</p>
    ${bridge}
    <p class="publication-line"><strong>Publication record:</strong> ${escapeHtml(edition.label)} · <a href="${edition.doiUrl}" target="_blank" rel="noopener noreferrer">DOI ${escapeHtml(edition.doi)}</a> · <a href="${publication.author.pageUrl}" rel="author">Author: ${escapeHtml(publication.author.name)}</a> · <a href="${publication.author.orcid}" target="_blank" rel="noopener noreferrer">ORCID</a></p>
  </section>`;
};

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let list = [];
  let table = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      html.push(`<ul>${list.map(item => `<li>${inline(item)}</li>`).join('')}</ul>`);
      list = [];
    }
  };
  const flushTable = () => {
    if (table.length) {
      const rows = table.filter((row, index) => index !== 1 || !/^\s*\|?\s*:?-{3,}/.test(row));
      const parsed = rows.map(row => row.replace(/^\||\|$/g, '').split('|').map(cell => cell.trim()));
      if (parsed.length > 1) {
        html.push(`<div class="table-wrap"><table><thead><tr>${parsed[0].map(cell => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${parsed.slice(1).map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      }
      table = [];
    }
  };
  const flush = () => { flushParagraph(); flushList(); flushTable(); };

  for (const line of lines) {
    if (/^\|/.test(line)) { flushParagraph(); flushList(); table.push(line); continue; }
    if (!line.trim()) { flush(); continue; }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flush();
      const level = Math.min(heading[1].length + 1, 5);
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    if (/^>\s+/.test(line)) {
      flush();
      html.push(`<blockquote><p>${inline(line.replace(/^>\s+/, ''))}</p></blockquote>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      list.push(line.replace(/^[-*]\s+/, ''));
      continue;
    }
    if (/^---+$/.test(line)) { flush(); html.push('<hr />'); continue; }
    paragraph.push(line.trim());
  }
  flush();
  return html.join('\n');
}

const sourceFiles = fs.readdirSync(manuscriptDir)
  .filter(name => /^\d\d-.*\.md$/.test(name))
  .sort();

for (const file of sourceFiles) {
  const markdown = fs.readFileSync(path.join(manuscriptDir, file), 'utf8');
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : 'Reconnecting Intelligence With The Soul';
  const body = renderMarkdown(markdown);
  const outName = file.replace(/\.md$/, '.html');
  const slug = file.replace(/\.md$/, '');
  const discovery = chapterDiscovery[slug];
  const edition = publication.editions['0.1'];
  const chapterUrl = `${publication.siteUrl}/chapters/${outName}`;
  const chapterSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Chapter',
    '@id': `${chapterUrl}#chapter`,
    url: chapterUrl,
    name: title,
    isPartOf: { '@id': `${edition.rootUrl}#book` },
    author: { '@type': 'Person', '@id': 'https://jarifurrahim.one/#person', name: publication.author.name, url: publication.author.url, sameAs: [publication.author.orcid] },
    inLanguage: 'en',
    about: (discovery?.themeIds || []).map((themeId) => ({ '@type': 'DefinedTerm', name: themes[themeId].title, url: themeHref(themeId) })),
  }).replace(/</g, '\\u003c');
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="index,follow" />
  <link rel="canonical" href="${chapterUrl}" />
  <link rel="author" href="${publication.author.pageUrl}" />
  <meta name="author" content="${escapeHtml(publication.author.name)}" />
  <title>${escapeHtml(title)} | Reconnecting Intelligence With The Soul</title>
  <meta name="description" content="${escapeHtml(title)} — a chapter from Reconnecting Intelligence With The Soul by G. K. M. Jarif Ur Rahim." />
  <style>
    :root{--ink:#15131a;--paper:#f7f5ef;--muted:#68616e;--violet:#583b83;--gold:#ae7b22;--line:#d8d1c5;--max:760px}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:Georgia,"Times New Roman",serif;line-height:1.75}.top{border-bottom:1px solid var(--line);font:600 12px/1.2 Arial,sans-serif;letter-spacing:.11em;text-transform:uppercase}.top div{max-width:var(--max);margin:auto;padding:22px 24px;display:flex;justify-content:space-between;gap:18px}.top a{color:var(--ink);text-decoration:none}.shell{max-width:var(--max);margin:auto;padding:9vh 24px}h1{font-size:clamp(2.5rem,6vw,4.5rem);line-height:.98;font-weight:500;letter-spacing:-.05em;margin:0 0 42px}h2{font-size:clamp(1.55rem,3vw,2.1rem);line-height:1.13;margin:56px 0 16px;font-weight:500}h3{font-size:1.12rem;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif;margin:40px 0 12px;color:var(--violet)}p{font-size:1.1rem;margin:0 0 23px}a{color:var(--violet)}blockquote{border-left:3px solid var(--gold);margin:34px 0;padding:4px 0 4px 22px;color:#44394d;font-size:1.18rem}blockquote p{margin:0}.table-wrap{overflow:auto;margin:32px 0}table{width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:.91rem}th,td{border:1px solid var(--line);text-align:left;padding:12px;vertical-align:top}th{background:#eee9f3;color:var(--violet)}ul{padding-left:24px;margin:0 0 24px}li{margin:8px 0;font-size:1.08rem}code{background:#eee9f3;padding:2px 5px}hr{border:0;border-top:1px solid var(--line);margin:42px 0}.reader-panel{margin:48px 0 0;padding:26px;border:1px solid var(--line);background:#fbfaf6}.reader-panel h2{margin:6px 0 16px;font-size:clamp(1.35rem,3vw,1.8rem)}.reader-panel p{font-size:1rem;margin:0 0 15px}.reader-label{color:var(--gold);font:700 11px/1 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}.reader-panel .publication-line{padding-top:14px;border-top:1px solid var(--line);color:var(--muted);font:13px/1.6 Arial,sans-serif}.reader-panel .bridge{padding:12px 14px;background:#eee9f3}.back{display:inline-block;margin-top:48px;font:600 12px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-decoration:none}.foot{max-width:var(--max);margin:auto;padding:28px 24px 56px;border-top:1px solid var(--line);font:13px/1.6 Arial,sans-serif;color:var(--muted)}@media(max-width:600px){.top div{align-items:flex-start;flex-direction:column}.shell{padding-top:7vh}p{font-size:1.04rem}}
  </style>
  <script type="application/ld+json">${chapterSchema}</script>
</head>
<body>
  <header class="top"><div><a href="../">Iqra · Reconnecting Intelligence With The Soul</a><span>Book Edition 0.1</span></div></header>
  <main class="shell">${body}${renderDiscoveryPanel(slug)}<a class="back" href="../">← Back to the book</a></main>
  <footer class="foot">© 2026 G. K. M. Jarif Ur Rahim · <a href="${publication.author.pageUrl}" rel="author">Author record</a> · <a href="${publication.author.url}">Canonical portfolio</a> · <a href="${publication.author.orcid}" target="_blank" rel="noopener noreferrer">ORCID</a></footer>
</body>
</html>`;
  fs.writeFileSync(path.join(outputDir, outName), html.replace(/[ \t]+$/gm, ''));
}

console.log(`Rendered ${sourceFiles.length} chapter files.`);

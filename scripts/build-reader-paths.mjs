import fs from 'node:fs';
import path from 'node:path';
import { chapterDiscovery, publication, themes, themeHref } from './discovery-config.mjs';

const root = process.cwd();
const outputDir = path.join(root, 'themes');
fs.mkdirSync(outputDir, { recursive: true });

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const titleFromSlug = (slug) => slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
const chapterHref = (slug, edition) => edition === '2.0'
  ? `../edition-2/chapters/${slug}.html`
  : `../chapters/${slug}.html`;

for (const [themeId, theme] of Object.entries(themes)) {
  const entries = Object.entries(chapterDiscovery)
    .filter(([, entry]) => entry.themeIds.includes(themeId))
    .map(([slug, entry]) => ({ slug, entry }));

  const cards = entries.map(({ slug, entry }) => {
    const edition = publication.editions[entry.edition];
    return `<li><a href="${chapterHref(slug, entry.edition)}"><span>${escapeHtml(edition.label)}</span><strong>${escapeHtml(titleFromSlug(slug))}</strong><p>${escapeHtml(entry.readerQuestion)}</p></a></li>`;
  }).join('\n');

  const pageUrl = themeHref(themeId);
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#page`,
    url: pageUrl,
    name: theme.title,
    description: theme.description,
    isPartOf: { '@id': `${publication.siteUrl}/#book` },
    author: { '@type': 'Person', name: publication.author.name, url: publication.author.url, sameAs: [publication.author.orcid] },
    mainEntity: entries.map(({ slug, entry }) => ({
      '@type': 'CreativeWork',
      name: titleFromSlug(slug),
      url: entry.edition === '2.0'
        ? `${publication.siteUrl}/edition-2/chapters/${slug}.html`
        : `${publication.siteUrl}/chapters/${slug}.html`,
    })),
  }).replace(/</g, '\\u003c');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="index,follow" />
  <meta name="author" content="${escapeHtml(publication.author.name)}" />
  <link rel="canonical" href="${pageUrl}" />
  <link rel="author" href="${publication.author.url}" />
  <title>${escapeHtml(theme.title)} | iqra Reading Path</title>
  <meta name="description" content="${escapeHtml(theme.description)} A reader-serving iqra pathway across DOI-registered book editions." />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(theme.title)} | iqra Reading Path" />
  <meta property="og:description" content="${escapeHtml(theme.description)}" />
  <meta property="og:url" content="${pageUrl}" />
  <style>
    :root{--ink:#15131a;--paper:#f7f5ef;--muted:#68616e;--violet:#583b83;--gold:#ae7b22;--line:#d8d1c5;--max:900px}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:Georgia,"Times New Roman",serif;line-height:1.65}a{color:var(--violet)}.top{border-bottom:1px solid var(--line);font:600 12px/1.2 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase}.top div{max-width:var(--max);margin:auto;padding:22px 24px;display:flex;gap:18px;justify-content:space-between}.top a{color:var(--ink);text-decoration:none}.shell{max-width:var(--max);margin:auto;padding:9vh 24px 7vh}.eyebrow{color:var(--gold);font:700 11px/1 Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase}h1{margin:16px 0 22px;font-size:clamp(2.7rem,7vw,5.5rem);line-height:.96;font-weight:500;letter-spacing:-.055em}.lead{max-width:720px;font-size:clamp(1.2rem,2vw,1.55rem);color:#3d3742}.boundary{margin:38px 0;padding:22px;border-left:3px solid var(--violet);background:#eee9f3}.boundary h2{margin:0 0 8px;font-size:1.15rem;font-weight:500}.boundary p{margin:0;color:#44394d}.questions{margin:42px 0}.questions h2{font-size:1.6rem;font-weight:500}.questions ul{padding-left:22px}.questions li{margin:10px 0;font-size:1.08rem}.reading{list-style:none;margin:42px 0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.reading a{display:block;min-height:190px;padding:22px;border:1px solid var(--line);background:#fbfaf6;text-decoration:none;color:var(--ink)}.reading a:hover{border-color:var(--gold)}.reading span{display:block;color:var(--gold);font:700 10px Arial,sans-serif;letter-spacing:.13em;text-transform:uppercase}.reading strong{display:block;margin:12px 0 10px;font-size:1.35rem;line-height:1.08;font-weight:500}.reading p{margin:0;color:var(--muted);font-size:.96rem}.record{margin-top:48px;padding:22px;border:1px solid var(--line);background:#fbfaf6}.record p{margin:8px 0;color:var(--muted)}footer{border-top:1px solid var(--line);padding:30px 24px 52px;color:var(--muted);font:13px/1.6 Arial,sans-serif}footer div{max-width:var(--max);margin:auto}@media(max-width:650px){.top div{align-items:flex-start;flex-direction:column}.shell{padding-top:7vh}.reading{grid-template-columns:1fr}}
  </style>
  <script type="application/ld+json">${schema}</script>
</head>
<body>
  <header class="top"><div><a href="../">iqra · Reconnecting Intelligence With The Soul</a><span>Reader pathway</span></div></header>
  <main class="shell">
    <p class="eyebrow">Reader-serving discovery</p>
    <h1>${escapeHtml(theme.title)}</h1>
    <p class="lead">${escapeHtml(theme.description)}</p>
    <section class="boundary"><h2>Reading boundary</h2><p>${escapeHtml(theme.boundary)}</p></section>
    <section class="questions"><h2>Questions this pathway holds open</h2><ul>${theme.questions.map((question) => `<li>${escapeHtml(question)}</li>`).join('')}</ul></section>
    <section aria-labelledby="reading-title"><h2 id="reading-title">Read across the book</h2><ul class="reading">${cards}</ul></section>
    <section class="record"><h2>Publication &amp; author record</h2><p>These chapters remain part of their original DOI-registered editions. This pathway adds reading navigation; it does not revise the chapter texts or publication records.</p><p><a href="${publication.author.url}" rel="author">${escapeHtml(publication.author.name)} — author record</a> · <a href="${publication.author.evidenceUrl}">public evidence record</a> · <a href="${publication.author.orcid}" target="_blank" rel="noopener noreferrer">ORCID</a></p></section>
  </main>
  <footer><div>© 2026 ${escapeHtml(publication.author.name)} · <a href="../">Book Edition 0.1</a> · <a href="../edition-2/">Book Edition 2.0</a></div></footer>
</body>
</html>`;
  fs.writeFileSync(path.join(outputDir, `${themeId}.html`), html);
}

console.log(`Rendered ${Object.keys(themes).length} reader-serving theme pages.`);

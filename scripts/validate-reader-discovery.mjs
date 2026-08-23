import fs from 'node:fs';
import path from 'node:path';
import { chapterDiscovery, themes } from './discovery-config.mjs';

const root = process.cwd();
const failures = [];
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const requireText = (relativePath, needle) => {
  const contents = read(relativePath);
  if (!contents.includes(needle)) failures.push(`${relativePath} is missing ${needle}`);
};

for (const [themeId] of Object.entries(themes)) {
  const file = `themes/${themeId}.html`;
  if (!fs.existsSync(path.join(root, file))) failures.push(`${file} does not exist`);
  else {
    requireText(file, 'Reader-serving discovery');
    requireText(file, 'https://jarifurrahim.one/evidence');
    requireText(file, 'https://orcid.org/0009-0004-0763-322X');
  }
}

for (const [slug, entry] of Object.entries(chapterDiscovery)) {
  const file = entry.edition === '2.0'
    ? `edition-2/chapters/${slug}.html`
    : `chapters/${slug}.html`;
  if (!fs.existsSync(path.join(root, file))) {
    failures.push(`${file} does not exist`);
    continue;
  }
  requireText(file, 'Reader guide · discovery context');
  requireText(file, 'https://jarifurrahim.one');
  requireText(file, 'https://orcid.org/0009-0004-0763-322X');
  requireText(file, '"@type":"Chapter"');
}

for (const file of ['index.html', 'edition-2/index.html']) {
  requireText(file, 'Read by question');
  requireText(file, 'https://jarifurrahim.one/evidence');
}

const sitemap = read('sitemap.xml');
for (const themeId of Object.keys(themes)) {
  requireText('sitemap.xml', `themes/${themeId}.html`);
}

if (failures.length) {
  console.error('Reader discovery validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Reader discovery validation passed: ${Object.keys(themes).length} theme hubs and ${Object.keys(chapterDiscovery).length} chapter panels verified.`);

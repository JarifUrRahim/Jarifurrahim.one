import fs from 'node:fs';
import path from 'node:path';
import { chapterDiscovery } from './discovery-config.mjs';

const root = process.cwd();
const failures = [];
const authorUrl = 'https://iqra.jarifurrahim.one/author/';
const canonicalPersonId = 'https://jarifurrahim.one/#person';
const portraitPath = 'assets/author/g-k-m-jarif-ur-rahim-riws-author.webp';
const portraitUrl = `https://iqra.jarifurrahim.one/${portraitPath}`;

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const requireText = (relativePath, needle) => {
  if (!read(relativePath).includes(needle)) failures.push(`${relativePath} is missing ${needle}`);
};

const authorPage = read('author/index.html');
for (const needle of [
  `<link rel="canonical" href="${authorUrl}" />`,
  portraitUrl,
  'alt="G. K. M. Jarif Ur Rahim, author of the iqra book editions"',
  'https://doi.org/10.5281/zenodo.21895928',
  'https://doi.org/10.5281/zenodo.21925197',
  canonicalPersonId,
  'Publication boundary.',
]) {
  if (!authorPage.includes(needle)) failures.push(`author/index.html is missing ${needle}`);
}

const jsonLdMatch = authorPage.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
if (!jsonLdMatch) {
  failures.push('author/index.html has no JSON-LD script');
} else {
  try {
    const schema = JSON.parse(jsonLdMatch[1]);
    const profile = schema['@graph']?.find((entry) => entry['@type'] === 'ProfilePage');
    const person = schema['@graph']?.find((entry) => entry['@type'] === 'Person');
    if (profile?.mainEntity?.['@id'] !== canonicalPersonId) failures.push('ProfilePage does not reference the canonical Person identifier');
    if (person?.['@id'] !== canonicalPersonId) failures.push('Person schema does not use the canonical Person identifier');
  } catch (error) {
    failures.push(`author/index.html JSON-LD is not valid JSON: ${error.message}`);
  }
}

const portrait = fs.readFileSync(path.join(root, portraitPath));
if (portrait.length < 16 || portrait.subarray(0, 4).toString('ascii') !== 'RIFF' || portrait.subarray(8, 12).toString('ascii') !== 'WEBP') {
  failures.push(`${portraitPath} is not a valid WebP container`);
}

requireText('index.html', 'href="author/" rel="author"');
requireText('index.html', canonicalPersonId);
requireText('edition-2/index.html', 'href="../author/" rel="author"');
requireText('sitemap.xml', `<loc>${authorUrl}</loc>`);
requireText('llms.txt', `[Author page — public authorship, book editions, DOI and identity destinations](${authorUrl})`);

for (const [slug, entry] of Object.entries(chapterDiscovery)) {
  const file = entry.edition === '2.0'
    ? `edition-2/chapters/${slug}.html`
    : `chapters/${slug}.html`;
  requireText(file, `<link rel="author" href="${authorUrl}" />`);
  requireText(file, canonicalPersonId);
}

if (failures.length) {
  console.error('Author page validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Author page validation passed: author metadata, portrait asset, 2 DOI links, sitemap, llms.txt, and ${Object.keys(chapterDiscovery).length} chapter author references verified.`);

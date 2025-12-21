import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const read = (file) => readFileSync(resolve(file), 'utf8');

const files = {
  hero: 'src/components/Hero.jsx',
  contact: 'src/pages/Contact.jsx',
  footer: 'src/components/Footer.jsx',
};

const heroSource = read(files.hero);
const contactSource = read(files.contact);
const footerSource = read(files.footer);

const anchorId = 'speciale-openingstijden';
const anchorPattern = new RegExp(`id=["']${anchorId}["']`, 'g');

const heroMatches = heroSource.match(anchorPattern) ?? [];
const contactMatches = contactSource.match(anchorPattern) ?? [];

const errors = [];

if (heroMatches.length > 0) {
  errors.push('Hero should not include the speciale-openingstijden id.');
}

if (contactMatches.length !== 1) {
  errors.push('Contact should include exactly one speciale-openingstijden id.');
}

if (!footerSource.includes(`/contact#${anchorId}`)) {
  errors.push('Footer should link to /contact#speciale-openingstijden.');
}

if (errors.length > 0) {
  console.error('Anchor validation failed:\n');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Anchor validation passed.');

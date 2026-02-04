import fs from 'node:fs';

// Deterministic gate for eval fixtures.
if (!fs.existsSync('./README.md')) {
  console.error('README.md missing');
  process.exit(1);
}
console.log('verify: ok');

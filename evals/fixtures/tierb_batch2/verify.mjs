import fs from 'node:fs/promises';
import path from 'node:path';

const target = path.join(process.cwd(), 'src', 'hello.js');
try {
  const st = await fs.stat(target);
  if (!st.isFile()) throw new Error('not a file');
  console.log('verify ok: src/hello.js exists');
} catch (err) {
  console.error('verify failed: missing src/hello.js');
  process.exitCode = 1;
}

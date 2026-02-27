import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_DESCRIPTION_LENGTH = 1024;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const packsDir = path.join(repoRoot, 'packs');

function walkDirectory(dirPath, visitor) {
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDirectory(fullPath, visitor);
      continue;
    }
    visitor(fullPath);
  }
}

function relativePath(filePath) {
  return path.relative(repoRoot, filePath).replaceAll('\\', '/');
}

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return match ? match[1] : null;
}

function normalizeInlineScalar(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function extractIndentedBlock(lines, startIndex) {
  const blockLines = [];
  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\S/.test(line)) {
      break;
    }
    blockLines.push(line);
  }

  if (blockLines.length === 0) {
    return '';
  }

  let minIndent = Number.POSITIVE_INFINITY;
  for (const line of blockLines) {
    if (!/\S/.test(line)) {
      continue;
    }
    const indent = line.match(/^ */u)[0].length;
    minIndent = Math.min(minIndent, indent);
  }

  if (!Number.isFinite(minIndent)) {
    minIndent = 0;
  }

  return blockLines
    .map((line) => {
      const indentPrefix = ' '.repeat(minIndent);
      return line.startsWith(indentPrefix) ? line.slice(minIndent) : line.trimStart();
    })
    .join('\n');
}

function extractDescription(frontmatter) {
  const lines = frontmatter.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^description:\s*(.*)$/u);
    if (!match) {
      continue;
    }

    const value = match[1] ?? '';
    if (value.startsWith('|') || value.startsWith('>') || value.length === 0) {
      return extractIndentedBlock(lines, index + 1);
    }

    return normalizeInlineScalar(value);
  }

  return null;
}

function listSkillFiles() {
  const skillFiles = [];
  walkDirectory(packsDir, (filePath) => {
    if (path.basename(filePath) !== 'SKILL.md') {
      return;
    }
    if (!filePath.includes(`${path.sep}skills${path.sep}`)) {
      return;
    }
    skillFiles.push(filePath);
  });
  return skillFiles.sort((left, right) => left.localeCompare(right));
}

function validateFile(filePath) {
  const issues = [];
  const content = readFileSync(filePath, 'utf8');
  const frontmatter = extractFrontmatter(content);
  if (!frontmatter) {
    issues.push('Missing YAML frontmatter');
    return { path: relativePath(filePath), descriptionLength: null, issues };
  }

  const description = extractDescription(frontmatter);
  if (description === null) {
    issues.push('Missing frontmatter description');
    return { path: relativePath(filePath), descriptionLength: null, issues };
  }

  const descriptionLength = description.length;
  if (descriptionLength > MAX_DESCRIPTION_LENGTH) {
    issues.push(`Description too long (${descriptionLength} > ${MAX_DESCRIPTION_LENGTH})`);
  }

  return { path: relativePath(filePath), descriptionLength, issues };
}

const results = listSkillFiles().map(validateFile);
const failures = results.filter((result) => result.issues.length > 0);

if (failures.length > 0) {
  console.error(`FAIL: Found ${failures.length} invalid SKILL.md frontmatter descriptions.`);
  for (const failure of failures) {
    console.error(`- ${failure.path}`);
    for (const issue of failure.issues) {
      console.error(`  - ${issue}`);
    }
  }
  process.exit(1);
}

console.log(`PASS: ${results.length} SKILL.md files have frontmatter description <= ${MAX_DESCRIPTION_LENGTH}.`);
for (const result of results) {
  console.log(`- ${result.path}: ${result.descriptionLength}`);
}

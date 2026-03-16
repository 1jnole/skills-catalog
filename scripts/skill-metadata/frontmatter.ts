import { parseDocument } from 'yaml';

import { type ReadSkillFrontmatterResult } from './validation/types';

type ExtractFrontmatterBlockResult =
  | { ok: true; value: string }
  | { ok: false; reason: 'missing_frontmatter' | 'invalid_frontmatter_yaml' };

function extractFrontmatterBlock(content: string): ExtractFrontmatterBlockResult {
  const normalizedContent = content.replace(/^\uFEFF/, '');
  const lines = normalizedContent.split(/\r?\n/);

  if (lines[0]?.trim() !== '---') {
    return {
      ok: false,
      reason: 'missing_frontmatter',
    };
  }

  const closingDelimiterIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---');

  if (closingDelimiterIndex === -1) {
    return {
      ok: false,
      reason: 'invalid_frontmatter_yaml',
    };
  }

  return {
    ok: true,
    value: lines.slice(1, closingDelimiterIndex).join('\n'),
  };
}

export function readSkillFrontmatter(content: string): ReadSkillFrontmatterResult {
  const frontmatterBlockResult = extractFrontmatterBlock(content);

  if (frontmatterBlockResult.ok === false) {
    return frontmatterBlockResult;
  }

  const frontmatterDocument = parseDocument(frontmatterBlockResult.value);

  if (frontmatterDocument.errors.length > 0) {
    return {
      ok: false,
      reason: 'invalid_frontmatter_yaml',
    };
  }

  return {
    ok: true,
    value: frontmatterDocument.toJS(),
  };
}

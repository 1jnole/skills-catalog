import { describe, expect, it } from 'vitest';

import { readSkillFrontmatter } from './frontmatter';

describe('readSkillFrontmatter', () => {
  it('returns the parsed frontmatter object for a valid block', () => {
    expect(readSkillFrontmatter(['---', 'name: demo-skill', 'description: works', '---'].join('\n'))).toEqual({
      ok: true,
      value: {
        description: 'works',
        name: 'demo-skill',
      },
    });
  });

  it('accepts a BOM-prefixed frontmatter block with CRLF line endings', () => {
    expect(readSkillFrontmatter(['\uFEFF---', 'name: demo-skill', 'description: works', '---'].join('\r\n'))).toEqual({
      ok: true,
      value: {
        description: 'works',
        name: 'demo-skill',
      },
    });
  });

  it('returns missing_frontmatter when the file does not start with a frontmatter block', () => {
    expect(readSkillFrontmatter('# no frontmatter')).toEqual({
      ok: false,
      reason: 'missing_frontmatter',
    });
  });

  it('returns invalid_frontmatter_yaml when the opening delimiter has no closing delimiter', () => {
    expect(readSkillFrontmatter(['---', 'name: demo-skill', 'description: works'].join('\n'))).toEqual({
      ok: false,
      reason: 'invalid_frontmatter_yaml',
    });
  });

  it('returns invalid_frontmatter_yaml when the YAML payload cannot be parsed', () => {
    expect(readSkillFrontmatter(['---', 'name: [broken', 'description: works', '---'].join('\n'))).toEqual({
      ok: false,
      reason: 'invalid_frontmatter_yaml',
    });
  });
});

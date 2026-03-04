import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

/* ──────────────────────────────────────────────────────────────────────
   Paths
   ────────────────────────────────────────────────────────────────────── */

const THIS_FILE = fileURLToPath(import.meta.url);
const THIS_DIR = path.dirname(THIS_FILE);
const FRONTEND_SRC = path.resolve(THIS_DIR, '..');
const PROJECT_ROOT = path.resolve(FRONTEND_SRC, '..', '..');
const BACKEND_SRC = path.resolve(PROJECT_ROOT, 'backend/src');
const UI_DIR = path.resolve(FRONTEND_SRC, 'UI');
const UI_INDEX = path.resolve(UI_DIR, 'index.ts');

/* ──────────────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────────────── */

function getFiles(
  dir: string,
  extensions: string[],
  exclude: string[] = [],
): string[] {
  if (!fs.existsSync(dir)) return [];
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      if (exclude.includes(fullPath)) continue;
      files.push(...getFiles(fullPath, extensions, exclude));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

function relativeTo(base: string, filePath: string): string {
  return path.relative(base, filePath);
}

function getLines(content: string): string[] {
  return content.split('\n');
}

/** Strip single-line // comments and strings to reduce false positives */
function stripCommentsAndStrings(line: string): string {
  return line
    .replace(/\/\/.*$/, '')
    .replace(/'[^']*'/g, '""')
    .replace(/"[^"]*"/g, '""')
    .replace(/`[^`]*`/g, '""');
}

function getFrontendTsFiles(): string[] {
  return getFiles(FRONTEND_SRC, ['.ts', '.tsx'], [
    path.resolve(FRONTEND_SRC, '__tests__'),
  ]);
}

function getBackendTsFiles(): string[] {
  return getFiles(BACKEND_SRC, ['.ts']);
}

function getAllTsFiles(): string[] {
  return [...getFrontendTsFiles(), ...getBackendTsFiles()];
}

function countFunctionLines(content: string): { name: string; lineCount: number; line: number }[] {
  const lines = getLines(content);
  const results: { name: string; lineCount: number; line: number }[] = [];
  let braceDepth = 0;
  let funcStart = -1;
  let funcName = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect function/method start
    const funcMatch = line.match(
      /(?:function\s+(\w+)|(?:const|let)\s+(\w+)\s*=\s*(?:async\s*)?\(|(\w+)\s*\([^)]*\)\s*(?::\s*[^{]+)?\s*\{)/
    );
    if (funcMatch && braceDepth === 0) {
      funcName = funcMatch[1] || funcMatch[2] || funcMatch[3] || 'anonymous';
      if (line.includes('{')) {
        funcStart = i;
        braceDepth = 1;
        // Count remaining braces on the same line
        for (let j = line.indexOf('{') + 1; j < line.length; j++) {
          if (line[j] === '{') braceDepth++;
          if (line[j] === '}') braceDepth--;
        }
        if (braceDepth === 0) {
          results.push({ name: funcName, lineCount: 1, line: i + 1 });
          funcStart = -1;
        }
        continue;
      }
    }

    if (funcStart >= 0) {
      for (const char of line) {
        if (char === '{') braceDepth++;
        if (char === '}') braceDepth--;
      }
      if (braceDepth === 0) {
        results.push({ name: funcName, lineCount: i - funcStart + 1, line: funcStart + 1 });
        funcStart = -1;
      }
    }
  }
  return results;
}

/* ──────────────────────────────────────────────────────────────────────
   UI Component Rules
   ────────────────────────────────────────────────────────────────────── */

describe('UI component rules', () => {
  const RAW_ELEMENTS = ['<button', '<input', '<select', '<textarea'];

  it('no raw interactive HTML elements outside src/UI/', () => {
    const files = getFiles(FRONTEND_SRC, ['.tsx'], [UI_DIR, path.resolve(FRONTEND_SRC, '__tests__')]);
    const violations: string[] = [];

    for (const filePath of files) {
      const lines = getLines(readFile(filePath));
      const rel = relativeTo(FRONTEND_SRC, filePath);
      lines.forEach((line, index) => {
        for (const element of RAW_ELEMENTS) {
          if (line.includes(element)) {
            violations.push(`${rel}:${index + 1} — raw "${element}>" found. Use a UI component instead.`);
          }
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it('every UI component file is exported from UI/index.ts', () => {
    const componentFiles = fs.readdirSync(UI_DIR).filter((f) => f.startsWith('UI') && f.endsWith('.tsx'));
    const indexContent = readFile(UI_INDEX);
    const missing = componentFiles
      .map((f) => f.replace('.tsx', ''))
      .filter((name) => !indexContent.includes(name));

    expect(missing).toEqual([]);
  });

  it('every UI component has a props interface (IUI*Props)', () => {
    const componentFiles = fs.readdirSync(UI_DIR).filter((f) => f.startsWith('UI') && f.endsWith('.tsx'));
    const missing = componentFiles.filter((file) => {
      const content = readFile(path.join(UI_DIR, file));
      const expected = `interface I${file.replace('.tsx', '')}Props`;
      return !content.includes(expected);
    });

    expect(missing).toEqual([]);
  });

  it('every UI component accepts a className prop', () => {
    const componentFiles = fs.readdirSync(UI_DIR).filter((f) => f.startsWith('UI') && f.endsWith('.tsx'));
    const missing = componentFiles.filter((f) => !readFile(path.join(UI_DIR, f)).includes('className'));

    expect(missing).toEqual([]);
  });

  it('every UI component uses dark: variants', () => {
    const componentFiles = fs.readdirSync(UI_DIR).filter((f) => f.startsWith('UI') && f.endsWith('.tsx'));
    const missing = componentFiles.filter((f) => !readFile(path.join(UI_DIR, f)).includes('dark:'));

    expect(missing).toEqual([]);
  });
});

/* ──────────────────────────────────────────────────────────────────────
   General — TypeScript Only
   ────────────────────────────────────────────────────────────────────── */

describe('General — TypeScript only', () => {
  it('no .js/.jsx source files in frontend/src or backend/src (config files excluded)', () => {
    const jsFiles = [
      ...getFiles(FRONTEND_SRC, ['.js', '.jsx']),
      ...getFiles(BACKEND_SRC, ['.js', '.jsx']),
    ];

    expect(jsFiles.map((f) => relativeTo(PROJECT_ROOT, f))).toEqual([]);
  });

  it('no `any` type in source files', () => {
    const violations: string[] = [];

    for (const filePath of getAllTsFiles()) {
      const lines = getLines(readFile(filePath));
      const rel = relativeTo(PROJECT_ROOT, filePath);
      lines.forEach((line, index) => {
        const stripped = stripCommentsAndStrings(line);
        // Match `: any`, `<any>`, `as any`, but not words containing "any" like "company"
        if (/(?::\s*any\b|<any>|as\s+any\b)/.test(stripped)) {
          violations.push(`${rel}:${index + 1} — \`any\` type found`);
        }
      });
    }

    expect(violations).toEqual([]);
  });
});

/* ──────────────────────────────────────────────────────────────────────
   Frontend — React Rules
   ────────────────────────────────────────────────────────────────────── */

describe('Frontend — React rules', () => {
  it('no class components', () => {
    const violations: string[] = [];

    for (const filePath of getFiles(FRONTEND_SRC, ['.tsx'])) {
      const content = readFile(filePath);
      const rel = relativeTo(FRONTEND_SRC, filePath);
      if (/class\s+\w+\s+extends\s+(React\.)?Component/.test(content)) {
        violations.push(`${rel} — class component found. Use functional components only.`);
      }
    }

    expect(violations).toEqual([]);
  });

  it('components should be under 150 lines', () => {
    const violations: string[] = [];

    for (const filePath of getFiles(FRONTEND_SRC, ['.tsx'])) {
      const content = readFile(filePath);
      const lineCount = getLines(content).length;
      const rel = relativeTo(FRONTEND_SRC, filePath);
      if (lineCount > 150) {
        violations.push(`${rel} — ${lineCount} lines (max 150)`);
      }
    }

    expect(violations).toEqual([]);
  });
});

/* ──────────────────────────────────────────────────────────────────────
   Code Quality — Variable Declarations
   ────────────────────────────────────────────────────────────────────── */

describe('Code quality — variable declarations', () => {
  it('no `var` declarations', () => {
    const violations: string[] = [];

    for (const filePath of getAllTsFiles()) {
      const lines = getLines(readFile(filePath));
      const rel = relativeTo(PROJECT_ROOT, filePath);
      lines.forEach((line, index) => {
        const stripped = stripCommentsAndStrings(line);
        if (/\bvar\s+\w/.test(stripped)) {
          violations.push(`${rel}:${index + 1} — \`var\` found. Use \`const\` or \`let\`.`);
        }
      });
    }

    expect(violations).toEqual([]);
  });
});

/* ──────────────────────────────────────────────────────────────────────
   Code Quality — Code Hygiene
   ────────────────────────────────────────────────────────────────────── */

describe('Code quality — code hygiene', () => {
  it('no console.log in frontend source files', () => {
    const violations: string[] = [];

    for (const filePath of getFrontendTsFiles()) {
      const lines = getLines(readFile(filePath));
      const rel = relativeTo(FRONTEND_SRC, filePath);
      lines.forEach((line, index) => {
        const stripped = stripCommentsAndStrings(line);
        if (/console\.\w+\s*\(/.test(stripped)) {
          violations.push(`${rel}:${index + 1} — \`console.*\` found in frontend code`);
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it('no empty catch blocks', () => {
    const violations: string[] = [];

    for (const filePath of getAllTsFiles()) {
      const content = readFile(filePath);
      const rel = relativeTo(PROJECT_ROOT, filePath);
      // Match catch blocks with only whitespace inside
      const matches = content.match(/catch\s*\([^)]*\)\s*\{\s*\}/g);
      if (matches) {
        violations.push(`${rel} — empty catch block found (${matches.length})`);
      }
    }

    expect(violations).toEqual([]);
  });

  it('no == or != (use === and !==)', () => {
    const violations: string[] = [];

    for (const filePath of getAllTsFiles()) {
      const lines = getLines(readFile(filePath));
      const rel = relativeTo(PROJECT_ROOT, filePath);
      lines.forEach((line, index) => {
        const stripped = stripCommentsAndStrings(line);
        // Match == or != but not === or !==
        if (/(?<!=)==(?!=)|(?<!!)!=(?!=)/.test(stripped)) {
          violations.push(`${rel}:${index + 1} — loose equality found. Use \`===\` / \`!==\`.`);
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it('no functions longer than 40 lines', () => {
    const violations: string[] = [];

    for (const filePath of getAllTsFiles()) {
      const content = readFile(filePath);
      const rel = relativeTo(PROJECT_ROOT, filePath);
      const functions = countFunctionLines(content);

      for (const func of functions) {
        if (func.lineCount > 40) {
          violations.push(`${rel}:${func.line} — function \`${func.name}\` is ${func.lineCount} lines (max 40)`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});

/* ──────────────────────────────────────────────────────────────────────
   Code Quality — TypeScript Specific
   ────────────────────────────────────────────────────────────────────── */

describe('Code quality — TypeScript specific', () => {
  it('no @ts-ignore or @ts-expect-error', () => {
    const violations: string[] = [];

    for (const filePath of getAllTsFiles()) {
      const lines = getLines(readFile(filePath));
      const rel = relativeTo(PROJECT_ROOT, filePath);
      lines.forEach((line, index) => {
        if (/@ts-ignore|@ts-expect-error/.test(line)) {
          violations.push(`${rel}:${index + 1}`);
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it('no non-null assertions (!)', () => {
    const violations: string[] = [];

    for (const filePath of getAllTsFiles()) {
      const lines = getLines(readFile(filePath));
      const rel = relativeTo(PROJECT_ROOT, filePath);
      lines.forEach((line, index) => {
        const stripped = stripCommentsAndStrings(line);
        // Match `!.` or `!)` patterns (non-null assertion) but not `!==` or `!variable`
        if (/\w+!\.\w|!\)/.test(stripped) && !/!==/.test(stripped)) {
          violations.push(`${rel}:${index + 1} — non-null assertion \`!\` found. Handle the null case.`);
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it('no wildcard imports (import *)', () => {
    const violations: string[] = [];

    for (const filePath of getAllTsFiles()) {
      const lines = getLines(readFile(filePath));
      const rel = relativeTo(PROJECT_ROOT, filePath);
      lines.forEach((line, index) => {
        if (/import\s+\*\s+as/.test(line)) {
          violations.push(`${rel}:${index + 1} — wildcard import found`);
        }
      });
    }

    expect(violations).toEqual([]);
  });
});

/* ──────────────────────────────────────────────────────────────────────
   Code Quality — Imports
   ────────────────────────────────────────────────────────────────────── */

describe('Code quality — naming conventions', () => {
  it('component files use PascalCase', () => {
    const componentDirs = [
      path.join(FRONTEND_SRC, 'pages'),
      path.join(FRONTEND_SRC, 'components'),
      path.join(FRONTEND_SRC, 'UI'),
    ];
    const violations: string[] = [];

    for (const dir of componentDirs) {
      if (!fs.existsSync(dir)) continue;
      for (const file of getFiles(dir, ['.tsx'])) {
        const name = path.basename(file, '.tsx');
        if (name[0] !== name[0].toUpperCase()) {
          violations.push(`${relativeTo(FRONTEND_SRC, file)} — component file must be PascalCase`);
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it('utility/service files use camelCase', () => {
    const utilDirs = [
      path.join(FRONTEND_SRC, 'services'),
      path.join(FRONTEND_SRC, 'hooks'),
      path.join(FRONTEND_SRC, 'utils'),
      path.join(BACKEND_SRC, 'services'),
      path.join(BACKEND_SRC, 'utils'),
      path.join(BACKEND_SRC, 'config'),
    ];
    const violations: string[] = [];

    for (const dir of utilDirs) {
      if (!fs.existsSync(dir)) continue;
      for (const file of getFiles(dir, ['.ts'])) {
        const name = path.basename(file, '.ts');
        if (name === 'index') continue;
        // camelCase starts with lowercase
        if (name[0] !== name[0].toLowerCase()) {
          violations.push(`${relativeTo(PROJECT_ROOT, file)} — utility file must be camelCase`);
        }
      }
    }

    expect(violations).toEqual([]);
  });

});

/* ──────────────────────────────────────────────────────────────────────
   Backend Specific Rules
   ────────────────────────────────────────────────────────────────────── */

describe('Backend specific rules', () => {
  it('no process.env outside config/ directory', () => {
    const configDir = path.resolve(BACKEND_SRC, 'config');
    const files = getFiles(BACKEND_SRC, ['.ts']).filter(
      (f) => !f.startsWith(configDir),
    );
    const violations: string[] = [];

    for (const filePath of files) {
      const lines = getLines(readFile(filePath));
      const rel = relativeTo(BACKEND_SRC, filePath);
      lines.forEach((line, index) => {
        const stripped = stripCommentsAndStrings(line);
        if (/process\.env/.test(stripped)) {
          violations.push(`${rel}:${index + 1} — \`process.env\` found outside config/. Use the centralized env config.`);
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it('no wildcard CORS origin', () => {
    const violations: string[] = [];

    for (const filePath of getBackendTsFiles()) {
      const content = readFile(filePath);
      const rel = relativeTo(BACKEND_SRC, filePath);
      if (/origin:\s*['"`]\*['"`]/.test(content)) {
        violations.push(`${rel} — \`cors({ origin: '*' })\` found. Whitelist specific origins.`);
      }
    }

    expect(violations).toEqual([]);
  });

  it('error handler middleware is registered last (after routes)', () => {
    const serverPath = path.join(BACKEND_SRC, 'server.ts');
    if (!fs.existsSync(serverPath)) return;

    const content = readFile(serverPath);
    const lines = getLines(content);

    let lastRouteUseLine = -1;
    let errorHandlerLine = -1;

    lines.forEach((line, index) => {
      if (/app\.use\(.*(?:routes|router|Router)/.test(line)) {
        lastRouteUseLine = index;
      }
      if (/app\.use\(.*(?:errorHandler|errorMiddleware)/.test(line)) {
        errorHandlerLine = index;
      }
    });

    if (errorHandlerLine >= 0 && lastRouteUseLine >= 0) {
      expect(errorHandlerLine).toBeGreaterThan(lastRouteUseLine);
    }
  });

  it('error responses follow standard format { error: { code, message } }', () => {
    const violations: string[] = [];

    for (const filePath of getBackendTsFiles()) {
      const content = readFile(filePath);
      const rel = relativeTo(BACKEND_SRC, filePath);

      // Find res.status(...).json(...) calls
      const jsonCalls = content.match(/res\.status\(\d+\)\.json\(\{[\s\S]*?\}\)/g);
      if (!jsonCalls) continue;

      for (const call of jsonCalls) {
        // Error responses (4xx, 5xx) should have { error: { ... } }
        const statusMatch = call.match(/status\((\d+)\)/);
        if (statusMatch) {
          const status = parseInt(statusMatch[1], 10);
          if (status >= 400 && !call.includes('error:')) {
            violations.push(`${rel} — error response (${status}) missing standard \`{ error: { code, message } }\` format`);
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });
});

/* ──────────────────────────────────────────────────────────────────────
   Naming — Booleans
   ────────────────────────────────────────────────────────────────────── */

describe('Naming — booleans', () => {
  it('boolean variables/state use is/has/can/should prefix', () => {
    const violations: string[] = [];

    for (const filePath of getAllTsFiles()) {
      const lines = getLines(readFile(filePath));
      const rel = relativeTo(PROJECT_ROOT, filePath);
      lines.forEach((line, index) => {
        // Match: const/let myVar: boolean or useState<boolean>
        const boolDecl = line.match(/(?:const|let)\s+(\w+)\s*(?::\s*boolean|=\s*useState<boolean>)/);
        if (boolDecl) {
          const name = boolDecl[1];
          if (!/^(is|has|can|should)/.test(name)) {
            violations.push(`${rel}:${index + 1} — boolean \`${name}\` should start with is/has/can/should`);
          }
        }
      });
    }

    expect(violations).toEqual([]);
  });
});

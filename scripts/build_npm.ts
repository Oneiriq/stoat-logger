#!/usr/bin/env -S deno run -A

import { build, emptyDir } from 'jsr:@deno/dnt@0.41.3'

await emptyDir('./npm')

await build({
  entryPoints: ['./mod.ts'],
  outDir: './npm',
  shims: {
    // Use Deno shims for compatibility
    deno: true,
  },
  package: {
    name: '@oneiriq/stoat-logger',
    version: Deno.args[0] || '1.1.0',
    description: 'Stoat Logger is a simple and modular logging framework with support for multiple transports for Deno and NodeJS.',
    license: 'MIT',
    author: {
      name: 'oneiriq',
    },
    publishConfig: {
      access: 'public',
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/oneiriq/stoat-logger.git',
    },
    bugs: {
      url: 'https://github.com/oneiriq/stoat-logger/issues',
    },
    homepage: 'https://github.com/oneiriq/stoat-logger#readme',
    keywords: [
      'child-logger',
      'context',
      'deno',
      'framework',
      'json',
      'log',
      'logger',
      'logging',
      'microservices',
      'monitoring',
      'nodejs',
      'observability',
      'opentelemetry',
      'otel',
      'performance',
      'sanitization',
      'serialization',
      'structured-logging',
      'tracing',
      'transports',
      'typescript',
      'file-logger',
      'console-logger'
    ],
    engines: {
      node: '>=18.0.0',
    },
    dependencies: { },
  },
  postBuild() {
    // Copy important files to npm directory
    Deno.copyFileSync('LICENSE', 'npm/LICENSE')
    Deno.copyFileSync('README.md', 'npm/README.md')
    Deno.copyFileSync('CHANGELOG.md', 'npm/CHANGELOG.md')
  },
  // Use the import map from deno.json
  importMap: './deno.json',
  // Test configuration
  test: false,
  // Skip type checking for faster builds (can be enabled for thorough checking)
  typeCheck: 'both',
  // Generate declaration files
  declaration: 'separate',
  // ESM and CommonJS support
  scriptModule: 'cjs',
  // Filter out test files
  filterDiagnostic(diagnostic) {
    // Ignore specific diagnostics if needed
    return true
  },
  compilerOptions: {
    target: 'ES2022',
    lib: ['ES2022'],
  },
})

console.log('\nNPM package build completed. Output: ./npm')
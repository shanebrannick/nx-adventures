import { defineConfig } from 'vitest/config'

// Root-level Vitest config that delegates to per-project Vite configs
export default defineConfig({
  test: {
    // Treat each project's vite config as a Vitest project. The extension
    // and Vitest will discover these files and run tests with the correct
    // Vite config (so nxViteTsPaths() and other plugins run per-project).
    projects: [
      'apps/**/vite.config.{mjs,js,ts,mts}',
      'libs/**/vite.config.{mjs,js,ts,mts}',
      'apps/**/vitest.config.{mjs,js,ts,mts}',
      'libs/**/vitest.config.{mjs,js,ts,mts}',
    ],
  },
})

# Copilot instructions for this repository

Purpose: Give an AI coding agent the minimal, actionable context to be productive in this Nx + Angular sample workspace.

- Big picture:
  - This is an Nx monorepo with a single Angular application at [apps/angular-demo](apps/angular-demo).
  - The app uses the Angular builders for build/serve (`@angular/build:*`) and Vitest for unit tests via Nx (`@nx/vite:test`). See [apps/angular-demo/project.json](apps/angular-demo/project.json).
  - Source root: [apps/angular-demo/src](apps/angular-demo/src). App entry is [apps/angular-demo/src/main.ts](apps/angular-demo/src/main.ts).

- Primary developer workflows (use `nx`):
  - Dev server: `npx nx serve angular-demo` or `nx run angular-demo:serve` (development by default).
  - Build production: `npx nx build angular-demo` or `nx run angular-demo:build:production`.
  - Run unit tests: `npx nx test angular-demo` (Vitest via Nx).
  - Lint: `npx nx lint angular-demo`.
  - Inspect project targets: `npx nx show project angular-demo`.

- Key files to check when modifying behavior:
  - Project config / targets: [apps/angular-demo/project.json](apps/angular-demo/project.json)
  - App entry: [apps/angular-demo/src/main.ts](apps/angular-demo/src/main.ts)
  - App code & routes: [apps/angular-demo/src/app](apps/angular-demo/src/app)
  - Public/static assets: [apps/angular-demo/public](apps/angular-demo/public)
  - Workspace config: [nx.json](nx.json) and [tsconfig.base.json](tsconfig.base.json)
  - Vitest workspace config: [vitest.workspace.ts](vitest.workspace.ts)

- Project-specific patterns and conventions (discoverable):
  - Always run tasks through Nx (targets are defined/inferred in `project.json`). Don’t call underlying tooling directly.
  - The `serve` target is `@angular/build:dev-server` and is configured to use the `build` target; updates should consider both targets.
  - Tests use the Nx Vite test executor; expect Vitest-style `.spec.ts` files (example: [apps/angular-demo/src/app/app.spec.ts](apps/angular-demo/src/app/app.spec.ts)).
  - Static assets are served from `apps/angular-demo/public` and included in `build` via the `assets` option in `project.json`.

- Integration points & external deps:
  - Angular build tooling (`@angular/*`) and Nx executors are primary build integrations; check `package.json` for versions when diagnosing failures.
  - No backend/service code is present in the repo; focus is on frontend build/test flow.

- When changing or adding targets:
  - Edit [apps/angular-demo/project.json](apps/angular-demo/project.json) and prefer Nx generators for new projects: `npx nx g @nx/angular:app <name>`.

- Helpful commands for agents (examples):
```bash
# serve locally
npx nx serve angular-demo

# build production
npx nx build angular-demo

# run tests
npx nx test angular-demo

# show project config
npx nx show project angular-demo
```

- Other notes for AI agents:
  - See [AGENTS.md](AGENTS.md) for additional workspace-specific agent guidance (Nx-related rules).
  - Keep edits minimal and focused: change `project.json` or files under `apps/angular-demo/src` for app behavior; update `vitest.workspace.ts` for test runner changes.

If anything here is unclear or you'd like more detail (CI notes, preferred commit message format, or deeper architecture docs), say which area to expand.

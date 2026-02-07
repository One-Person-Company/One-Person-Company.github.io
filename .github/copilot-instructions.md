# Project Guidelines

## Code Style

- **Language**: TypeScript strict mode (see [tsconfig.json](tsconfig.json))
- **React Patterns**: Functional components with hooks; use React 19 latest APIs
- **File Organization**: Components and logic in `src/`, styling in `.css` files alongside components
- **Import Style**: ES modules; use relative imports for local files
- **Type Checking**: All code must pass `tsc` type checking before build
- **Formatting**: Follow ESLint rules configured in [eslint.config.js](eslint.config.js)
  - Uses `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
  - React Compiler optimizations enabled via babel-plugin-react-compiler

## Architecture

- **Build Tool**: Vite (using rolldown-vite for faster builds)
- **Entry Point**: [src/main.tsx](src/main.tsx) - creates React root in `#root` element
- **Main Component**: [src/App.tsx](src/App.tsx) - top-level React component with shared layout
- **Styling**: CSS modules optional; currently using vanilla CSS in `src/App.css` and `src/index.css`
- **React Compiler**: Enabled automatically—optimizes component memoization and closures during build

## Build and Test

```bash
# Development with HMR
bun run dev

# Type check and build
bun run build

# Lint code
bun run lint

# Preview production build
bun run preview
```

- Build combines TypeScript compilation (`tsc -b`) with Vite bundling
- HMR (Hot Module Replacement) active on `bun run dev`

## Project Conventions

- **Component Files**: `.tsx` for React components, `.ts` for utilities
- **State Management**: React hooks (useState, useEffect) for local state
- **Config Files**: 
  - `tsconfig.json` - TypeScript configuration
  - `tsconfig.app.json` - App-specific TS settings
  - `tsconfig.node.json` - Build tool TS settings
  - `vite.config.ts` - Vite build configuration
- **React Compiler**: Automatically memoizes components and optimizes rendering—no manual memoization needed unless profiling indicates otherwise

## Integration Points

- **Vite Plugins**: React plugin (`@vitejs/plugin-react`) handles JSX and HMR
- **Asset Handling**: Place static assets in `public/` (served at root) or `src/assets/` (bundled with code)
- **Environment**: Browser-only code; globals from `globals.browser` configured in ESLint

## Security

- No authentication or sensitive data patterns currently in codebase
- Keep dependencies updated (`npm audit` for vulnerabilities)
- Use HTTPS for any external API calls when deployed

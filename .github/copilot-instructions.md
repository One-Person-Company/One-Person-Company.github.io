# Project Guidelines

## Code Style

- **Language**: TypeScript strict mode (see [tsconfig.json](../tsconfig.json))
- **React Patterns**: Functional components with hooks; use React 19 latest APIs
- **File Organization**: 
  - Layouts in `src/layouts/` (Header.tsx, Footer.tsx, Layout.tsx)
  - Pages in `src/pages/{PageName}/index.tsx` with co-located `index.css`
  - Utilities in `src/utils/`, config in `src/config/`
- **Import Style**: ES modules; use relative imports for local files
- **Type Checking**: All code must pass `tsc` type checking before build
- **Formatting**: Follow ESLint rules configured in [eslint.config.js](../eslint.config.js)
  - Uses `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
  - React Compiler optimizations enabled via babel-plugin-react-compiler

## Architecture

- **Build Tool**: Vite (using rolldown-vite for faster builds)
- **Entry Point**: [src/main.tsx](../src/main.tsx) - creates React root in `#root` element
- **Routing**: react-router-dom 7.x with centralized config in [src/config/routes.tsx](../src/config/routes.tsx)
  - Layout wrapper in [src/layouts/Layout.tsx](../src/layouts/Layout.tsx)
  - All page imports must use explicit `/index` suffix (e.g., `'../pages/Home/index'`)
- **Styling**: Tailwind CSS 4.x with dark theme (black: #000000)
  - Global styles in [src/index.css](../src/index.css)
  - Component-specific CSS co-located with components
- **Animation**: framer-motion for page transitions and scroll animations
- **i18n**: react-i18next with language files in [src/locales/](../src/locales/)
  - Always use `t('key')` function, never ternary operators for translations
  - Support for zh/en languages with localStorage persistence

## Content Management

- **Articles**: Markdown files with YAML frontmatter in `src/assets/articles/research/{lang}/`
  - Language-specific directories: `zh/` and `en/`
  - Frontmatter fields: `id`, `title`, `description`, `date`, `author`, `slug`
  - Dynamic loading via `import.meta.glob` with caching in [src/config/articles.tsx](../src/config/articles.tsx)
  - Custom browser-compatible frontmatter parser in [src/utils/frontmatter.ts](../src/utils/frontmatter.ts) (no gray-matter dependency)
- **Markdown Rendering**: react-markdown + remark-gfm for GitHub-flavored syntax
- **Asset Handling**: Use `src/assets/` for bundled content, `public/` for static files served at root

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
- Vite config includes `assetsInclude: ['**/*.md']` for markdown imports

## Project Conventions

- **Component Files**: `.tsx` for React components, `.ts` for utilities
- **Page Structure**: Each page in `src/pages/{PageName}/index.tsx` + `index.css`
- **State Management**: React hooks (useState, useEffect) for local state
- **Scroll Behavior**: 
  - Home page: `overflow: hidden` on html/body with internal snap-scroll sections
  - Research/Detail pages: `h-screen overflow-y-auto` for internal scrolling
- **Async Functions**: Article loading functions are async with caching to avoid redundant loads
- **Config Files**: 
  - `tsconfig.json` - TypeScript configuration
  - `tsconfig.app.json` - App-specific TS settings
  - `tsconfig.node.json` - Build tool TS settings
  - `vite.config.ts` - Vite build configuration including markdown asset support
  - `tailwind.config.js` - Tailwind CSS configuration
- **React Compiler**: Automatically memoizes components and optimizes rendering—no manual memoization needed unless profiling indicates otherwise

## Integration Points

- **Vite Plugins**: React plugin (`@vitejs/plugin-react`) handles JSX and HMR
- **i18n Integration**: Language stored in localStorage as `language` key; changes trigger re-renders
- **Markdown Processing**: 
  - Use `import.meta.glob` with `{ query: '?raw', import: 'default' }` for markdown imports
  - Parse frontmatter before rendering content
  - Load language-specific files based on `i18n.language`
- **Environment**: Browser-only code; no Node.js APIs (e.g., no Buffer)

## Security

- No authentication or sensitive data patterns currently in codebase
- Keep dependencies updated (`bun update` for vulnerabilities)
- Use HTTPS for any external API calls when deployed
- All AI-generated or user-contributed content is sanitized through react-markdown

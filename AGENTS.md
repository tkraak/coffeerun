# AGENTS.md

This file contains guidelines for agentic coding agents working in the CoffeeRun repository.

## Project Overview

CoffeeRun is a vanilla JavaScript shopping cart application for managing coffee orders. It demonstrates JavaScript module patterns, constructor calls, and prototypes without build tools or transpilers.

## Commands

### Development
- `npm start` - Start HTTP server for development
- `npm run lint` - Run Standard.js linting
- `npm run lint:fix` - Auto-fix linting issues

### Testing
- `npm test` - Run all unit tests with AVA
- `npx ava test/filename.test.js` - Run single test file
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run coverage` - Generate coverage report

### CI/CD
Uses GitHub Actions with Node 20. Runs lint, unit tests with coverage, and Playwright E2E tests.

## Code Style Guidelines

### Module Pattern
Use UMD pattern for browser/Node.js compatibility:
```javascript
(function (exports, $) {
  // Module code
  exports.ModuleName = ModuleName
})(typeof exports === 'undefined' ? window.app : exports, window.jQuery)
```

### Formatting & Linting
- 2 spaces indentation (EditorConfig enforced)
- No semicolons, single quotes, no trailing whitespace
- LF line endings, final newline required
- Standard.js with globals: `cy`, `it`, `describe`, `context`, `before`, `beforeEach`, `expect`, `assert`, `specify`

### Naming Conventions
- **Classes/Constructors**: PascalCase (`CheckList`, `Truck`)
- **Functions/Methods**: camelCase (`addClickHandler`)
- **Variables**: camelCase (`checkList`, `formHandler`)
- **jQuery objects**: `$` prefix (`$element`, `$div`)

### Error Handling
- Throw `Error` objects with descriptive messages
- Validate constructor parameters immediately
- Check DOM element existence before use

### DOM Manipulation
- Use jQuery for all DOM operations
- Cache elements: `this.$element = $(selector)`
- Data attributes: `[data-coffee-order="form"]`
- Event delegation with `.on()`

### Asynchronous Operations
- Use Promises for async operations
- Return promises from async methods
- Use async/await in tests

### Testing Guidelines
- AVA for unit tests, Sinon for mocking
- Import helpers from `./helpers/window`
- Restore sandbox: `test.afterEach(..., () => restore())`
- Test success/error cases, use `t.throws()`, `t.true()`

### Data Storage
- In-memory storage with Promise-based API
- Email addresses as unique identifiers
- Order data: `emailAddress`, `size`, `flavor`, `coffee`, `strength`

## Code Organization
- `/app/` - Application modules (one per file)
- `/test/` - Unit tests mirroring app structure
- `/test/helpers/` - Test helpers
- `/e2e/` - Playwright E2E tests

## Dependencies
- jQuery 3.7.1 - DOM manipulation
- AVA 2.4.0 - Unit testing
- Sinon 21.0.1 - Mocking/stubbing
- Standard 17.1.2 - Linting
- Playwright 1.57.0 - E2E testing
- NYC 17.1.0 - Coverage
- JSDOM 27.4.0 - Browser environment simulation
- http-server 14.1.1 - Development server
- Snazzy 9.0.0 - Linting output formatter

## Browser Compatibility
- Node.js >= 20.0.0 (CI uses Node 20)
- Modern JavaScript without transpilation
- UMD pattern for browser/Node.js compatibility
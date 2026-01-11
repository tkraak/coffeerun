# AGENTS.md

This file contains guidelines for agentic coding agents working in the CoffeeRun repository.

## Project Overview

CoffeeRun is a vanilla JavaScript shopping cart application for managing coffee orders. It's a learning project from "Front-end Web Development: The Big Nerd Ranch Guide" that demonstrates JavaScript module patterns, constructor calls, and prototypes without build tools or transpilers.

## Commands

### Development
- `npm start` - Start HTTP server for development
- `npm run lint` - Run Standard.js linting with snazzy output
- `npm test` - Run unit tests with AVA and NYC coverage
- `npm run coverage` - Generate coverage report with LCOV format

### Testing
- `npm test` - Run all unit tests
- `npx ava test/filename.test.js` - Run single test file
- `npx ava test/e2e/filename.spec.js` - Run single E2E test file
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run test:e2e:ui` - Run Playwright tests with UI
- `npm run test:e2e:debug` - Run Playwright tests in debug mode
- `npm run test:e2e:headed` - Run Playwright tests in headed mode

### CI/CD
The project uses GitHub Actions with Node 14 on Ubuntu. CI runs lint, unit tests with coverage, and Cypress E2E tests.

## Code Style Guidelines

### Module Pattern
All modules use the UMD (Universal Module Definition) pattern:
```javascript
(function (exports, $) {
  // Module code here
  exports.ModuleName = ModuleName
})(typeof exports === 'undefined' ? window.app : exports, window.jQuery)
```

### Formatting
- Use 2 spaces for indentation (EditorConfig)
- No trailing whitespace
- LF line endings
- Insert final newline
- UTF-8 encoding

### Linting
Project uses Standard.js with these global allowances:
- `cy`, `it`, `describe`, `context`, `before`, `beforeEach`, `expect`, `assert`, `specify`
- Ignores `/cypress/integration/examples`

### Naming Conventions
- **Classes/Constructors**: PascalCase (e.g., `CheckList`, `Truck`, `FormHandler`)
- **Functions/Methods**: camelCase (e.g., `addClickHandler`, `createOrder`)
- **Variables**: camelCase (e.g., `checkList`, `formHandler`, `truckId`)
- **Constants**: UPPER_SNAKE_CASE (rare, but use for true constants)
- **jQuery objects**: Prefix with `$` (e.g., `$element`, `$div`, `$label`)

### Error Handling
- Throw `Error` objects with descriptive messages
- Validate constructor parameters immediately
- Check for DOM element existence and throw if not found
- Example: `throw new Error('No selector provided.')`

### DOM Manipulation
- Use jQuery for DOM operations
- Cache jQuery elements in constructor: `this.$element = $(selector)`
- Use data attributes for element selection: `[data-coffee-order="form"]`
- Remove loader backgrounds when content is ready: `removeClass('loader-bg')`

### Asynchronous Operations
- Use Promises for async operations
- Chain `.then()` for promise resolution
- Use async/await in tests with Sinon stubs
- Return promises from methods that perform async operations

### Testing Guidelines
- Use AVA for unit tests
- Use Sinon for mocking and stubbing
- Import test helpers from `./helpers/window`
- Restore sandbox after each test: `test.afterEach('restore default sandbox', () => restore())`
- Use `t.throws()` for error testing
- Use `t.true()` for boolean assertions
- Test both success and error cases

### jQuery Usage
- Use `$('<div></div>', { properties })` for element creation
- Use `.on()` for event handling with delegation
- Use `.find()` and `.closest()` for DOM traversal
- Use `.append()` for adding elements
- Use `.removeClass()` for CSS class manipulation

### Data Storage
- Local data store uses in-memory storage with Promise-based API
- Email addresses used as unique identifiers
- All order data includes: `emailAddress`, `size`, `flavor`, `coffee`, `strength`
- Data persists only during the current session

### Code Organization
- App modules in `/app/` directory
- Test files in `/test/` directory mirroring app structure
- Test helpers in `/test/helpers/`
- Cypress E2E tests in `/cypress/integration/`
- Each module exports a single constructor/class

### Dependencies
- jQuery for DOM manipulation
- AVA for unit testing
- Cypress for E2E testing
- Sinon for test doubles
- Standard.js for linting
- NYC for coverage

### Browser Compatibility
- Supports Node.js >= 8.0.0
- Uses modern JavaScript features but avoids transpilation
- UMD pattern ensures compatibility with both browser and Node.js
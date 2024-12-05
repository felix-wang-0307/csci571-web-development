# Introduction to JavaScript Frameworks

## Node.js
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server-side, enabling you to build scalable network applications. 

Node.js is/does:
- event-driven
- non-blocking I/O model 
  - Provides POSIX functions for File I/O
  - Includes both synchronous and asynchronous file I/O support
- Maintains several connections per server to make HTTP requests
- Bundled with 'npm'

## TypeScript
TypeScript is a superset of JavaScript that adds optional static typing and other features to the language. It is designed for large-scale applications and transpiles to plain JavaScript. TypeScript provides:

- Supports Optionals (e.g. `let x: number | null = null;`)
- Includes support for classes and modules
- Can seamlessly consume JavaScript
- A **syntactical** superset of JavaScript
  - But not a **semantic** superset of JavaScript

## Angular (v2+)
Angular is a TypeScript-based open-source front-end web application framework. It is maintained by Google and is used for building single-page web applications. Angular provides:

- **Two-way data binding**
- Includes a reactive programming library for JavaScript called RxJS
- Depends on TypeScript, RxJS and Node
- Can be used to **build Single Page Applications**, by rendering plain HTML at the server side

## React
React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of developers. React provides/is:

- 
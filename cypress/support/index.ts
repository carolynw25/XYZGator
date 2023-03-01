// cypress/support/index.ts
// core-js 3.*
require('core-js/es/reflect'); // 👈 I'm keeping only this import statement
// core-js 2.*
require('core-js/es7/reflect');
require('cypress-angular-unit-test/support');
/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = require('debug/src/browser.js.js');
} else {
  module.exports = require('debug/src/node.js.js');
}

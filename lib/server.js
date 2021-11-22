#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";

var _debug = _interopRequireDefault(require("debug"));

var _http = _interopRequireDefault(require("http"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var debug = (0, _debug["default"])("polymath:server");
/**
 * Normalize a port into a number, string, or false.
 */

function isNan(obj) {
  return obj != null;
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNan(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Get port from environment and store in Express.
 */


var port = normalizePort(process.env.PORT || "3000");

_app["default"].set("port", port);
/**
 * Create HTTP server.
 */


var server = _http["default"].createServer(_app["default"]);
/**
 * Event listener for HTTP server "error" event.
 */


function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  } // handle specific listen errors with friendly messages


  switch (error.code) {
    case "EACCES":
      process.exit(1);
      break;

    case "EADDRINUSE":
      process.exit(1);
      break;

    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */


function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe ".concat(addr) : "port ".concat(addr.port);
  debug("Listening on ".concat(bind));
}
/**
 * Listen on provided port, on all network interfaces.
 */


server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
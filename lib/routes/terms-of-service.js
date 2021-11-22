"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var termsRouter = _express["default"].Router();

termsRouter.get("/", function (req, res) {
  res.render("terms-of-service", {
    title: "Express"
  });
});
var _default = termsRouter;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var indexRouter = _express["default"].Router();
/* GET home page. */


indexRouter.get("/", function (req, res) {
  res.render("index", {
    title: "Express"
  });
});
var _default = indexRouter;
exports["default"] = _default;
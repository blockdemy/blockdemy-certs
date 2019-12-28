"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _formData = _interopRequireDefault(require("form-data"));

var _client = _interopRequireDefault(require("./client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Certs = function Certs(APIKey) {
  _classCallCheck(this, Certs);

  _defineProperty(this, "getDocuments", function () {
    return _client["default"].get('/documents');
  });

  _defineProperty(this, "getDocument", function (documentId) {
    return _client["default"].get("/documents/".concat(documentId));
  });

  _defineProperty(this, "verify",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(file) {
      var body, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              body = new _formData["default"]();
              body.append('file', file);
              _context.next = 5;
              return _client["default"].post('/verify', body, {
                headers: _objectSpread({}, body.getHeaders())
              });

            case 5:
              data = _context.sent;
              return _context.abrupt("return", data);

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _context.t0.response);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "postDocument",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(_ref2) {
      var title, description, ownerAddress, expires, signers, file, blockchain, body, signersString, data;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              title = _ref2.title, description = _ref2.description, ownerAddress = _ref2.ownerAddress, expires = _ref2.expires, signers = _ref2.signers, file = _ref2.file, blockchain = _ref2.blockchain;
              _context2.prev = 1;
              body = new _formData["default"]();

              if (!signers) {
                _context2.next = 8;
                break;
              }

              if (Array.isArray(signers)) {
                _context2.next = 6;
                break;
              }

              throw new Error('Signers must be an array');

            case 6:
              signersString = JSON.stringify(signers);
              body.append('signers', signersString);

            case 8:
              if (!blockchain) {
                // Default parameter
                blockchain = 'ETHEREUM';
              }

              body.append('title', title);
              body.append('description', description);
              body.append('ownerAddress', ownerAddress);
              body.append('expires', new Date(expires).toString());
              body.append('file', file);
              body.append('blockchain', blockchain);
              _context2.next = 17;
              return _client["default"].post('/documents', body, {
                headers: _objectSpread({}, body.getHeaders())
              });

            case 17:
              data = _context2.sent;
              return _context2.abrupt("return", data);

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", _context2.t0.response);

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 21]]);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());

  _client["default"].defaults.headers.common.Authorization = "Certs ".concat(APIKey);
};

var _default = Certs;
exports["default"] = _default;
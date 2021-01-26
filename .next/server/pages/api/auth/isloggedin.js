module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/auth/isloggedin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/auth/isloggedin.js":
/*!**************************************!*\
  !*** ./pages/api/auth/isloggedin.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _middlewares_dbMiddleware_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../middlewares/dbMiddleware.js */ \"./pages/api/middlewares/dbMiddleware.js\");\n/* harmony import */ var _verification_verifyToken_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../verification/verifyToken.js */ \"./pages/api/verification/verifyToken.js\");\n\n\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nlet User;\n\ntry {\n  User = mongoose.model(\"Users\");\n} catch {\n  User = __webpack_require__(/*! ../models/Users */ \"./pages/api/models/Users.js\");\n}\n\nconst handler = async (req, res) => {\n  try {\n    const user = await User.findById(req.user._id);\n    res.json({\n      user: {\n        _id: user._id,\n        firstName: user.firstName,\n        lastName: user.lastName,\n        email: user.email,\n        isModerator: user.isModerator,\n        isSubscribed: user.isSubscribed,\n        createdAt: user.createdAt,\n        updatedAt: user.updatedAt,\n        tokenCreated: req.user.tokenCreated\n      }\n    });\n  } catch (err) {\n    res.send(err);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_verification_verifyToken_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Object(_middlewares_dbMiddleware_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(handler)));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvYXV0aC9pc2xvZ2dlZGluLmpzP2IzYTkiXSwibmFtZXMiOlsibW9uZ29vc2UiLCJyZXF1aXJlIiwiVXNlciIsIm1vZGVsIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInVzZXIiLCJmaW5kQnlJZCIsIl9pZCIsImpzb24iLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImVtYWlsIiwiaXNNb2RlcmF0b3IiLCJpc1N1YnNjcmliZWQiLCJjcmVhdGVkQXQiLCJ1cGRhdGVkQXQiLCJ0b2tlbkNyZWF0ZWQiLCJlcnIiLCJzZW5kIiwidmVyaWZ5IiwiY29ubmVjdERiIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUNBLE1BQU1BLFFBQVEsR0FBR0MsbUJBQU8sQ0FBQywwQkFBRCxDQUF4Qjs7QUFFQSxJQUFJQyxJQUFKOztBQUNBLElBQUk7QUFDRkEsTUFBSSxHQUFHRixRQUFRLENBQUNHLEtBQVQsQ0FBZSxPQUFmLENBQVA7QUFDRCxDQUZELENBRUUsTUFBTTtBQUNORCxNQUFJLEdBQUdELG1CQUFPLENBQUMsb0RBQUQsQ0FBZDtBQUNEOztBQUVELE1BQU1HLE9BQU8sR0FBRyxPQUFPQyxHQUFQLEVBQVlDLEdBQVosS0FBb0I7QUFDaEMsTUFBSTtBQUNGLFVBQU1DLElBQUksR0FBRyxNQUFNTCxJQUFJLENBQUNNLFFBQUwsQ0FBY0gsR0FBRyxDQUFDRSxJQUFKLENBQVNFLEdBQXZCLENBQW5CO0FBQ0FILE9BQUcsQ0FBQ0ksSUFBSixDQUFTO0FBQ1BILFVBQUksRUFBRTtBQUNKRSxXQUFHLEVBQUVGLElBQUksQ0FBQ0UsR0FETjtBQUVKRSxpQkFBUyxFQUFFSixJQUFJLENBQUNJLFNBRlo7QUFHSkMsZ0JBQVEsRUFBRUwsSUFBSSxDQUFDSyxRQUhYO0FBSUpDLGFBQUssRUFBRU4sSUFBSSxDQUFDTSxLQUpSO0FBS0pDLG1CQUFXLEVBQUVQLElBQUksQ0FBQ08sV0FMZDtBQU1KQyxvQkFBWSxFQUFFUixJQUFJLENBQUNRLFlBTmY7QUFPSkMsaUJBQVMsRUFBRVQsSUFBSSxDQUFDUyxTQVBaO0FBUUpDLGlCQUFTLEVBQUVWLElBQUksQ0FBQ1UsU0FSWjtBQVNKQyxvQkFBWSxFQUFFYixHQUFHLENBQUNFLElBQUosQ0FBU1c7QUFUbkI7QUFEQyxLQUFUO0FBYUQsR0FmRCxDQWVFLE9BQU9DLEdBQVAsRUFBWTtBQUNaYixPQUFHLENBQUNjLElBQUosQ0FBU0QsR0FBVDtBQUNEO0FBQ0YsQ0FuQkg7O0FBcUJpQkUsMklBQU0sQ0FBQ0MsNEVBQVMsQ0FBQ2xCLE9BQUQsQ0FBVixDQUFyQiIsImZpbGUiOiIuL3BhZ2VzL2FwaS9hdXRoL2lzbG9nZ2VkaW4uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29ubmVjdERiIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kYk1pZGRsZXdhcmUuanNcIjtcbmltcG9ydCB2ZXJpZnkgZnJvbSBcIi4uL3ZlcmlmaWNhdGlvbi92ZXJpZnlUb2tlbi5qc1wiO1xuY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG5cbmxldCBVc2VyO1xudHJ5IHtcbiAgVXNlciA9IG1vbmdvb3NlLm1vZGVsKFwiVXNlcnNcIik7XG59IGNhdGNoIHtcbiAgVXNlciA9IHJlcXVpcmUoXCIuLi9tb2RlbHMvVXNlcnNcIik7XG59XG5cbmNvbnN0IGhhbmRsZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQocmVxLnVzZXIuX2lkKTtcbiAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIF9pZDogdXNlci5faWQsXG4gICAgICAgICAgZmlyc3ROYW1lOiB1c2VyLmZpcnN0TmFtZSxcbiAgICAgICAgICBsYXN0TmFtZTogdXNlci5sYXN0TmFtZSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBpc01vZGVyYXRvcjogdXNlci5pc01vZGVyYXRvcixcbiAgICAgICAgICBpc1N1YnNjcmliZWQ6IHVzZXIuaXNTdWJzY3JpYmVkLFxuICAgICAgICAgIGNyZWF0ZWRBdDogdXNlci5jcmVhdGVkQXQsXG4gICAgICAgICAgdXBkYXRlZEF0OiB1c2VyLnVwZGF0ZWRBdCxcbiAgICAgICAgICB0b2tlbkNyZWF0ZWQ6IHJlcS51c2VyLnRva2VuQ3JlYXRlZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVzLnNlbmQoZXJyKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGRlZmF1bHQgdmVyaWZ5KGNvbm5lY3REYihoYW5kbGVyKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/auth/isloggedin.js\n");

/***/ }),

/***/ "./pages/api/middlewares/dbMiddleware.js":
/*!***********************************************!*\
  !*** ./pages/api/middlewares/dbMiddleware.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\n\nconst connectDb = handler => async (req, res) => {\n  if (mongoose.connections[0].readyState) return handler(req, res);\n  await mongoose.connect(\"mongodb+srv://sajalrs:nPjsKovk2Vpyml2C@cluster0.w2ffs.mongodb.net/cluster0?retryWrites=true&w=majority\", {\n    useNewUrlParser: true,\n    useFindAndModify: true,\n    useCreateIndex: true\n  });\n  return handler(req, res);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (connectDb);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvbWlkZGxld2FyZXMvZGJNaWRkbGV3YXJlLmpzPzM3MTMiXSwibmFtZXMiOlsibW9uZ29vc2UiLCJyZXF1aXJlIiwiY29ubmVjdERiIiwiaGFuZGxlciIsInJlcSIsInJlcyIsImNvbm5lY3Rpb25zIiwicmVhZHlTdGF0ZSIsImNvbm5lY3QiLCJwcm9jZXNzIiwidXNlTmV3VXJsUGFyc2VyIiwidXNlRmluZEFuZE1vZGlmeSIsInVzZUNyZWF0ZUluZGV4Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQU1BLFFBQVEsR0FBR0MsbUJBQU8sQ0FBQywwQkFBRCxDQUF4Qjs7QUFDQUEsbUJBQU8sQ0FBQyxvQ0FBRCxDQUFQOztBQUVBLE1BQU1DLFNBQVMsR0FBSUMsT0FBRCxJQUFhLE9BQU9DLEdBQVAsRUFBWUMsR0FBWixLQUFvQjtBQUNqRCxNQUFJTCxRQUFRLENBQUNNLFdBQVQsQ0FBcUIsQ0FBckIsRUFBd0JDLFVBQTVCLEVBQXdDLE9BQU9KLE9BQU8sQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLENBQWQ7QUFDeEMsUUFBTUwsUUFBUSxDQUFDUSxPQUFULENBQWlCQyx3R0FBakIsRUFBd0M7QUFDNUNDLG1CQUFlLEVBQUUsSUFEMkI7QUFFNUNDLG9CQUFnQixFQUFFLElBRjBCO0FBRzVDQyxrQkFBYyxFQUFFO0FBSDRCLEdBQXhDLENBQU47QUFNQSxTQUFPVCxPQUFPLENBQUNDLEdBQUQsRUFBTUMsR0FBTixDQUFkO0FBQ0QsQ0FURDs7QUFXZUgsd0VBQWYiLCJmaWxlIjoiLi9wYWdlcy9hcGkvbWlkZGxld2FyZXMvZGJNaWRkbGV3YXJlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG5yZXF1aXJlKFwiZG90ZW52L2NvbmZpZ1wiKTtcblxuY29uc3QgY29ubmVjdERiID0gKGhhbmRsZXIpID0+IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBpZiAobW9uZ29vc2UuY29ubmVjdGlvbnNbMF0ucmVhZHlTdGF0ZSkgcmV0dXJuIGhhbmRsZXIocmVxLCByZXMpO1xuICBhd2FpdCBtb25nb29zZS5jb25uZWN0KHByb2Nlc3MuZW52Lk1PTkdPX1VSTCwge1xuICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcbiAgICB1c2VGaW5kQW5kTW9kaWZ5OiB0cnVlLFxuICAgIHVzZUNyZWF0ZUluZGV4OiB0cnVlLFxuICB9KTtcblxuICByZXR1cm4gaGFuZGxlcihyZXEsIHJlcyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0RGI7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/middlewares/dbMiddleware.js\n");

/***/ }),

/***/ "./pages/api/models/Users.js":
/*!***********************************!*\
  !*** ./pages/api/models/Users.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst UserSchema = mongoose.Schema({\n  firstName: String,\n  lastName: String,\n  email: String,\n  isSubscribed: Boolean,\n  isModerator: Boolean,\n  password: String\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model(\"Users\", UserSchema);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvbW9kZWxzL1VzZXJzLmpzPzk5ZWQiXSwibmFtZXMiOlsibW9uZ29vc2UiLCJyZXF1aXJlIiwiVXNlclNjaGVtYSIsIlNjaGVtYSIsImZpcnN0TmFtZSIsIlN0cmluZyIsImxhc3ROYW1lIiwiZW1haWwiLCJpc1N1YnNjcmliZWQiLCJCb29sZWFuIiwiaXNNb2RlcmF0b3IiLCJwYXNzd29yZCIsInRpbWVzdGFtcHMiLCJtb2R1bGUiLCJleHBvcnRzIiwibW9kZWwiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLFFBQVEsR0FBR0MsbUJBQU8sQ0FBQywwQkFBRCxDQUF4Qjs7QUFFQSxNQUFNQyxVQUFVLEdBQUdGLFFBQVEsQ0FBQ0csTUFBVCxDQUFnQjtBQUMvQkMsV0FBUyxFQUFFQyxNQURvQjtBQUUvQkMsVUFBUSxFQUFFRCxNQUZxQjtBQUcvQkUsT0FBSyxFQUFFRixNQUh3QjtBQUkvQkcsY0FBWSxFQUFFQyxPQUppQjtBQUsvQkMsYUFBVyxFQUFFRCxPQUxrQjtBQU0vQkUsVUFBUSxFQUFFTjtBQU5xQixDQUFoQixFQU9oQjtBQUFDTyxZQUFVLEVBQUU7QUFBYixDQVBnQixDQUFuQjtBQVNBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJkLFFBQVEsQ0FBQ2UsS0FBVCxDQUFlLE9BQWYsRUFBd0JiLFVBQXhCLENBQWpCIiwiZmlsZSI6Ii4vcGFnZXMvYXBpL21vZGVscy9Vc2Vycy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcblxuY29uc3QgVXNlclNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYSh7XG4gICAgZmlyc3ROYW1lOiBTdHJpbmcsXG4gICAgbGFzdE5hbWU6IFN0cmluZyxcbiAgICBlbWFpbDogU3RyaW5nLFxuICAgIGlzU3Vic2NyaWJlZDogQm9vbGVhbixcbiAgICBpc01vZGVyYXRvcjogQm9vbGVhbixcbiAgICBwYXNzd29yZDogU3RyaW5nXG59LCB7dGltZXN0YW1wczogdHJ1ZX0pXG5cbm1vZHVsZS5leHBvcnRzID0gbW9uZ29vc2UubW9kZWwoXCJVc2Vyc1wiLCBVc2VyU2NoZW1hKSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/models/Users.js\n");

/***/ }),

/***/ "./pages/api/verification/verifyToken.js":
/*!***********************************************!*\
  !*** ./pages/api/verification/verifyToken.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nconst verify = handler => async (req, res) => {\n  const token = req.cookies.token;\n  if (!token) return res.status(401).send({\n    error: \"Please Login to Proceed\"\n  });\n\n  try {\n    const verified = jwt.verify(token, \"sakalskelqkwelkalsdzelqkjdazxcfsdhruvmcasdasgf\");\n    req.user = verified;\n  } catch (err) {\n    res.status(400).send({\n      error: \"Invalid Token\"\n    });\n  }\n\n  return handler(req, res);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (verify);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvdmVyaWZpY2F0aW9uL3ZlcmlmeVRva2VuLmpzP2JhOTEiXSwibmFtZXMiOlsiand0IiwicmVxdWlyZSIsInZlcmlmeSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJ0b2tlbiIsImNvb2tpZXMiLCJzdGF0dXMiLCJzZW5kIiwiZXJyb3IiLCJ2ZXJpZmllZCIsInByb2Nlc3MiLCJ1c2VyIiwiZXJyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQU1BLEdBQUcsR0FBR0MsbUJBQU8sQ0FBQyxrQ0FBRCxDQUFuQjs7QUFFQSxNQUFNQyxNQUFNLEdBQUlDLE9BQUQsSUFBYSxPQUFPQyxHQUFQLEVBQVlDLEdBQVosS0FBb0I7QUFDOUMsUUFBTUMsS0FBSyxHQUFHRixHQUFHLENBQUNHLE9BQUosQ0FBWUQsS0FBMUI7QUFDQSxNQUFJLENBQUNBLEtBQUwsRUFBWSxPQUFPRCxHQUFHLENBQUNHLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxTQUFLLEVBQUU7QUFBVCxHQUFyQixDQUFQOztBQUNaLE1BQUk7QUFDRixVQUFNQyxRQUFRLEdBQUdYLEdBQUcsQ0FBQ0UsTUFBSixDQUFXSSxLQUFYLEVBQWtCTSxnREFBbEIsQ0FBakI7QUFDQVIsT0FBRyxDQUFDUyxJQUFKLEdBQVdGLFFBQVg7QUFDRCxHQUhELENBR0UsT0FBT0csR0FBUCxFQUFZO0FBQ1pULE9BQUcsQ0FBQ0csTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCO0FBQUVDLFdBQUssRUFBRTtBQUFULEtBQXJCO0FBQ0Q7O0FBQ0QsU0FBT1AsT0FBTyxDQUFDQyxHQUFELEVBQU1DLEdBQU4sQ0FBZDtBQUNELENBVkQ7O0FBWWVILHFFQUFmIiwiZmlsZSI6Ii4vcGFnZXMvYXBpL3ZlcmlmaWNhdGlvbi92ZXJpZnlUb2tlbi5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGp3dCA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7XG5cbmNvbnN0IHZlcmlmeSA9IChoYW5kbGVyKSA9PiBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgdG9rZW4gPSByZXEuY29va2llcy50b2tlbjtcbiAgaWYgKCF0b2tlbikgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHsgZXJyb3I6IFwiUGxlYXNlIExvZ2luIHRvIFByb2NlZWRcIiB9KTtcbiAgdHJ5IHtcbiAgICBjb25zdCB2ZXJpZmllZCA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LlRPS0VOX1NFQ1JFVCk7XG4gICAgcmVxLnVzZXIgPSB2ZXJpZmllZDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBlcnJvcjogXCJJbnZhbGlkIFRva2VuXCIgfSk7XG4gIH1cbiAgcmV0dXJuIGhhbmRsZXIocmVxLCByZXMpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdmVyaWZ5O1xuXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/verification/verifyToken.js\n");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv/config\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnYvY29uZmlnXCI/M2M1MCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJkb3RlbnYvY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52L2NvbmZpZ1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///dotenv/config\n");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIj82NDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Impzb253ZWJ0b2tlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///jsonwebtoken\n");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiP2ZmZDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoibW9uZ29vc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///mongoose\n");

/***/ })

/******/ });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/auth/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/auth/login.js":
/*!*********************************!*\
  !*** ./pages/api/auth/login.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _middlewares_dbMiddleware_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../middlewares/dbMiddleware.js */ \"./pages/api/middlewares/dbMiddleware.js\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cookie */ \"cookie\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nconst {\n  loginValidation\n} = __webpack_require__(/*! ../validation/validation */ \"./pages/api/validation/validation.js\");\n\nlet User;\n\ntry {\n  User = mongoose.model(\"Users\");\n} catch {\n  User = __webpack_require__(/*! ../models/Users */ \"./pages/api/models/Users.js\");\n}\n\nconst handler = async (req, res) => {\n  const {\n    error\n  } = loginValidation(req.body);\n\n  if (error) {\n    const toReturn = error.details[0].message.replace('\"email\"', \"Email\").replace('\"password\"', \"Password\");\n    return res.status(400).send({\n      error: toReturn\n    });\n  }\n\n  const user = await User.findOne({\n    email: req.body.email\n  });\n  if (!user) return res.status(400).send({\n    error: \"The email or password is incorrect\"\n  });\n  const validPass = await bcrypt.compare(req.body.password, user.password);\n  if (!validPass) return res.status(400).send({\n    error: \"The email or password is incorrect\"\n  });\n  const token = jwt.sign({\n    _id: user._id,\n    tokenCreated: new Date()\n  }, \"sakalskelqkwelkalsdzelqkjdazxcfsdhruvmcasdasgf\"); // res.header('Auth-Token', token).send({token: token})\n  //   res.cookie(\"token\", token, { httpOnly: true }).json({ token: token });\n\n  res.setHeader(\"Set-Cookie\", Object(cookie__WEBPACK_IMPORTED_MODULE_1__[\"serialize\"])(\"token\", token, {\n    path: \"/\"\n  }, {\n    httpOnly: true\n  }));\n  res.json({\n    token: token\n  }); // res.send({ token: token });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_middlewares_dbMiddleware_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(handler));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvYXV0aC9sb2dpbi5qcz8zNmI5Il0sIm5hbWVzIjpbIm1vbmdvb3NlIiwicmVxdWlyZSIsImJjcnlwdCIsImp3dCIsImxvZ2luVmFsaWRhdGlvbiIsIlVzZXIiLCJtb2RlbCIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJlcnJvciIsImJvZHkiLCJ0b1JldHVybiIsImRldGFpbHMiLCJtZXNzYWdlIiwicmVwbGFjZSIsInN0YXR1cyIsInNlbmQiLCJ1c2VyIiwiZmluZE9uZSIsImVtYWlsIiwidmFsaWRQYXNzIiwiY29tcGFyZSIsInBhc3N3b3JkIiwidG9rZW4iLCJzaWduIiwiX2lkIiwidG9rZW5DcmVhdGVkIiwiRGF0ZSIsInByb2Nlc3MiLCJzZXRIZWFkZXIiLCJzZXJpYWxpemUiLCJwYXRoIiwiaHR0cE9ubHkiLCJqc29uIiwiY29ubmVjdERiIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQ0EsTUFBTUEsUUFBUSxHQUFHQyxtQkFBTyxDQUFDLDBCQUFELENBQXhCOztBQUNBLE1BQU1DLE1BQU0sR0FBR0QsbUJBQU8sQ0FBQywwQkFBRCxDQUF0Qjs7QUFDQSxNQUFNRSxHQUFHLEdBQUdGLG1CQUFPLENBQUMsa0NBQUQsQ0FBbkI7O0FBQ0EsTUFBTTtBQUFFRztBQUFGLElBQXNCSCxtQkFBTyxDQUFDLHNFQUFELENBQW5DOztBQUVBLElBQUlJLElBQUo7O0FBQ0EsSUFBSTtBQUNGQSxNQUFJLEdBQUdMLFFBQVEsQ0FBQ00sS0FBVCxDQUFlLE9BQWYsQ0FBUDtBQUNELENBRkQsQ0FFRSxNQUFNO0FBQ05ELE1BQUksR0FBR0osbUJBQU8sQ0FBQyxvREFBRCxDQUFkO0FBQ0Q7O0FBRUQsTUFBTU0sT0FBTyxHQUFHLE9BQU9DLEdBQVAsRUFBWUMsR0FBWixLQUFvQjtBQUNsQyxRQUFNO0FBQUVDO0FBQUYsTUFBWU4sZUFBZSxDQUFDSSxHQUFHLENBQUNHLElBQUwsQ0FBakM7O0FBQ0EsTUFBSUQsS0FBSixFQUFXO0FBQ1QsVUFBTUUsUUFBUSxHQUFHRixLQUFLLENBQUNHLE9BQU4sQ0FBYyxDQUFkLEVBQWlCQyxPQUFqQixDQUNkQyxPQURjLENBQ04sU0FETSxFQUNLLE9BREwsRUFFZEEsT0FGYyxDQUVOLFlBRk0sRUFFUSxVQUZSLENBQWpCO0FBR0EsV0FBT04sR0FBRyxDQUFDTyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRVAsV0FBSyxFQUFFRTtBQUFULEtBQXJCLENBQVA7QUFDRDs7QUFFRCxRQUFNTSxJQUFJLEdBQUcsTUFBTWIsSUFBSSxDQUFDYyxPQUFMLENBQWE7QUFBRUMsU0FBSyxFQUFFWixHQUFHLENBQUNHLElBQUosQ0FBU1M7QUFBbEIsR0FBYixDQUFuQjtBQUVBLE1BQUksQ0FBQ0YsSUFBTCxFQUNFLE9BQU9ULEdBQUcsQ0FDUE8sTUFESSxDQUNHLEdBREgsRUFFSkMsSUFGSSxDQUVDO0FBQUVQLFNBQUssRUFBRTtBQUFULEdBRkQsQ0FBUDtBQUlGLFFBQU1XLFNBQVMsR0FBRyxNQUFNbkIsTUFBTSxDQUFDb0IsT0FBUCxDQUFlZCxHQUFHLENBQUNHLElBQUosQ0FBU1ksUUFBeEIsRUFBa0NMLElBQUksQ0FBQ0ssUUFBdkMsQ0FBeEI7QUFDQSxNQUFJLENBQUNGLFNBQUwsRUFDRSxPQUFPWixHQUFHLENBQ1BPLE1BREksQ0FDRyxHQURILEVBRUpDLElBRkksQ0FFQztBQUFFUCxTQUFLLEVBQUU7QUFBVCxHQUZELENBQVA7QUFJRixRQUFNYyxLQUFLLEdBQUdyQixHQUFHLENBQUNzQixJQUFKLENBQ1o7QUFBRUMsT0FBRyxFQUFFUixJQUFJLENBQUNRLEdBQVo7QUFBaUJDLGdCQUFZLEVBQUUsSUFBSUMsSUFBSjtBQUEvQixHQURZLEVBRVpDLGdEQUZZLENBQWQsQ0F0QmtDLENBMEJsQztBQUNBOztBQUVBcEIsS0FBRyxDQUFDcUIsU0FBSixDQUNFLFlBREYsRUFFRUMsd0RBQVMsQ0FBQyxPQUFELEVBQVVQLEtBQVYsRUFBaUI7QUFBRVEsUUFBSSxFQUFFO0FBQVIsR0FBakIsRUFBZ0M7QUFBRUMsWUFBUSxFQUFFO0FBQVosR0FBaEMsQ0FGWDtBQUtBeEIsS0FBRyxDQUFDeUIsSUFBSixDQUFTO0FBQUNWLFNBQUssRUFBRUE7QUFBUixHQUFULEVBbENrQyxDQW9DbEM7QUFDRCxDQXJDRDs7QUF1Q2VXLDJJQUFTLENBQUM1QixPQUFELENBQXhCIiwiZmlsZSI6Ii4vcGFnZXMvYXBpL2F1dGgvbG9naW4uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29ubmVjdERiIGZyb20gXCIuLi9taWRkbGV3YXJlcy9kYk1pZGRsZXdhcmUuanNcIjtcbmltcG9ydCB7IHNlcmlhbGl6ZSB9IGZyb20gXCJjb29raWVcIjtcbmNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuY29uc3QgYmNyeXB0ID0gcmVxdWlyZShcImJjcnlwdGpzXCIpO1xuY29uc3Qgand0ID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTtcbmNvbnN0IHsgbG9naW5WYWxpZGF0aW9uIH0gPSByZXF1aXJlKFwiLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uXCIpO1xuXG5sZXQgVXNlcjtcbnRyeSB7XG4gIFVzZXIgPSBtb25nb29zZS5tb2RlbChcIlVzZXJzXCIpO1xufSBjYXRjaCB7XG4gIFVzZXIgPSByZXF1aXJlKFwiLi4vbW9kZWxzL1VzZXJzXCIpO1xufVxuXG5jb25zdCBoYW5kbGVyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgZXJyb3IgfSA9IGxvZ2luVmFsaWRhdGlvbihyZXEuYm9keSk7XG4gIGlmIChlcnJvcikge1xuICAgIGNvbnN0IHRvUmV0dXJuID0gZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlXG4gICAgICAucmVwbGFjZSgnXCJlbWFpbFwiJywgXCJFbWFpbFwiKVxuICAgICAgLnJlcGxhY2UoJ1wicGFzc3dvcmRcIicsIFwiUGFzc3dvcmRcIik7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgZXJyb3I6IHRvUmV0dXJuIH0pO1xuICB9XG5cbiAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiByZXEuYm9keS5lbWFpbCB9KTtcblxuICBpZiAoIXVzZXIpXG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cyg0MDApXG4gICAgICAuc2VuZCh7IGVycm9yOiBcIlRoZSBlbWFpbCBvciBwYXNzd29yZCBpcyBpbmNvcnJlY3RcIiB9KTtcblxuICBjb25zdCB2YWxpZFBhc3MgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShyZXEuYm9keS5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG4gIGlmICghdmFsaWRQYXNzKVxuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoNDAwKVxuICAgICAgLnNlbmQoeyBlcnJvcjogXCJUaGUgZW1haWwgb3IgcGFzc3dvcmQgaXMgaW5jb3JyZWN0XCIgfSk7XG5cbiAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbihcbiAgICB7IF9pZDogdXNlci5faWQsIHRva2VuQ3JlYXRlZDogbmV3IERhdGUoKSB9LFxuICAgIHByb2Nlc3MuZW52LlRPS0VOX1NFQ1JFVFxuICApO1xuICAvLyByZXMuaGVhZGVyKCdBdXRoLVRva2VuJywgdG9rZW4pLnNlbmQoe3Rva2VuOiB0b2tlbn0pXG4gIC8vICAgcmVzLmNvb2tpZShcInRva2VuXCIsIHRva2VuLCB7IGh0dHBPbmx5OiB0cnVlIH0pLmpzb24oeyB0b2tlbjogdG9rZW4gfSk7XG5cbiAgcmVzLnNldEhlYWRlcihcbiAgICBcIlNldC1Db29raWVcIixcbiAgICBzZXJpYWxpemUoXCJ0b2tlblwiLCB0b2tlbiwgeyBwYXRoOiBcIi9cIiB9LCB7IGh0dHBPbmx5OiB0cnVlIH0pXG4gICk7XG5cbiAgcmVzLmpzb24oe3Rva2VuOiB0b2tlbn0pO1xuXG4gIC8vIHJlcy5zZW5kKHsgdG9rZW46IHRva2VuIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdERiKGhhbmRsZXIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/api/auth/login.js\n");

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

/***/ "./pages/api/validation/validation.js":
/*!********************************************!*\
  !*** ./pages/api/validation/validation.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Joi = __webpack_require__(/*! @hapi/joi */ \"@hapi/joi\");\n\nconst registerValidation = data => {\n  const schema = Joi.object({\n    firstName: Joi.string().required(),\n    lastName: Joi.string().required(),\n    email: Joi.string().min(6).required().email(),\n    password: Joi.string().min(6).required(),\n    isSubscribed: Joi.boolean()\n  });\n  return schema.validate(data);\n};\n\nconst loginValidation = data => {\n  const schema = Joi.object({\n    email: Joi.string().min(6).required().email(),\n    password: Joi.string().min(6).required()\n  });\n  return schema.validate(data);\n};\n\nconst messageValidation = data => {\n  const schema = Joi.object({\n    firstName: Joi.string().required(),\n    lastName: Joi.string().required(),\n    email: Joi.string().min(6).required().email(),\n    subject: Joi.string().min(6).required(),\n    content: Joi.required()\n  });\n  return schema.validate(data);\n};\n\nconst resetPasswordValidation = data => {\n  const schema = Joi.object({\n    email: Joi.string().min(6).required().email()\n  });\n  return schema.validate(data);\n};\n\nmodule.exports.registerValidation = registerValidation;\nmodule.exports.loginValidation = loginValidation;\nmodule.exports.messageValidation = messageValidation;\nmodule.exports.resetPasswordValidation = resetPasswordValidation;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvdmFsaWRhdGlvbi92YWxpZGF0aW9uLmpzPzYyNzQiXSwibmFtZXMiOlsiSm9pIiwicmVxdWlyZSIsInJlZ2lzdGVyVmFsaWRhdGlvbiIsImRhdGEiLCJzY2hlbWEiLCJvYmplY3QiLCJmaXJzdE5hbWUiLCJzdHJpbmciLCJyZXF1aXJlZCIsImxhc3ROYW1lIiwiZW1haWwiLCJtaW4iLCJwYXNzd29yZCIsImlzU3Vic2NyaWJlZCIsImJvb2xlYW4iLCJ2YWxpZGF0ZSIsImxvZ2luVmFsaWRhdGlvbiIsIm1lc3NhZ2VWYWxpZGF0aW9uIiwic3ViamVjdCIsImNvbnRlbnQiLCJyZXNldFBhc3N3b3JkVmFsaWRhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEdBQUcsR0FBR0MsbUJBQU8sQ0FBQyw0QkFBRCxDQUFuQjs7QUFFQSxNQUFNQyxrQkFBa0IsR0FBSUMsSUFBRCxJQUFVO0FBQ25DLFFBQU1DLE1BQU0sR0FBR0osR0FBRyxDQUFDSyxNQUFKLENBQVc7QUFDeEJDLGFBQVMsRUFBRU4sR0FBRyxDQUFDTyxNQUFKLEdBQWFDLFFBQWIsRUFEYTtBQUV4QkMsWUFBUSxFQUFFVCxHQUFHLENBQUNPLE1BQUosR0FBYUMsUUFBYixFQUZjO0FBR3hCRSxTQUFLLEVBQUVWLEdBQUcsQ0FBQ08sTUFBSixHQUFhSSxHQUFiLENBQWlCLENBQWpCLEVBQW9CSCxRQUFwQixHQUErQkUsS0FBL0IsRUFIaUI7QUFJeEJFLFlBQVEsRUFBRVosR0FBRyxDQUFDTyxNQUFKLEdBQWFJLEdBQWIsQ0FBaUIsQ0FBakIsRUFBb0JILFFBQXBCLEVBSmM7QUFLeEJLLGdCQUFZLEVBQUViLEdBQUcsQ0FBQ2MsT0FBSjtBQUxVLEdBQVgsQ0FBZjtBQVFBLFNBQU9WLE1BQU0sQ0FBQ1csUUFBUCxDQUFnQlosSUFBaEIsQ0FBUDtBQUNELENBVkQ7O0FBWUEsTUFBTWEsZUFBZSxHQUFJYixJQUFELElBQVU7QUFDaEMsUUFBTUMsTUFBTSxHQUFHSixHQUFHLENBQUNLLE1BQUosQ0FBVztBQUN4QkssU0FBSyxFQUFFVixHQUFHLENBQUNPLE1BQUosR0FBYUksR0FBYixDQUFpQixDQUFqQixFQUFvQkgsUUFBcEIsR0FBK0JFLEtBQS9CLEVBRGlCO0FBRXhCRSxZQUFRLEVBQUVaLEdBQUcsQ0FBQ08sTUFBSixHQUFhSSxHQUFiLENBQWlCLENBQWpCLEVBQW9CSCxRQUFwQjtBQUZjLEdBQVgsQ0FBZjtBQUtBLFNBQU9KLE1BQU0sQ0FBQ1csUUFBUCxDQUFnQlosSUFBaEIsQ0FBUDtBQUNELENBUEQ7O0FBU0EsTUFBTWMsaUJBQWlCLEdBQUlkLElBQUQsSUFBVTtBQUNsQyxRQUFNQyxNQUFNLEdBQUdKLEdBQUcsQ0FBQ0ssTUFBSixDQUFXO0FBQ3hCQyxhQUFTLEVBQUVOLEdBQUcsQ0FBQ08sTUFBSixHQUFhQyxRQUFiLEVBRGE7QUFFeEJDLFlBQVEsRUFBRVQsR0FBRyxDQUFDTyxNQUFKLEdBQWFDLFFBQWIsRUFGYztBQUd4QkUsU0FBSyxFQUFFVixHQUFHLENBQUNPLE1BQUosR0FBYUksR0FBYixDQUFpQixDQUFqQixFQUFvQkgsUUFBcEIsR0FBK0JFLEtBQS9CLEVBSGlCO0FBSXhCUSxXQUFPLEVBQUVsQixHQUFHLENBQUNPLE1BQUosR0FBYUksR0FBYixDQUFpQixDQUFqQixFQUFvQkgsUUFBcEIsRUFKZTtBQUt4QlcsV0FBTyxFQUFFbkIsR0FBRyxDQUFDUSxRQUFKO0FBTGUsR0FBWCxDQUFmO0FBUUEsU0FBT0osTUFBTSxDQUFDVyxRQUFQLENBQWdCWixJQUFoQixDQUFQO0FBQ0QsQ0FWRDs7QUFZQSxNQUFNaUIsdUJBQXVCLEdBQUlqQixJQUFELElBQVU7QUFDeEMsUUFBTUMsTUFBTSxHQUFHSixHQUFHLENBQUNLLE1BQUosQ0FBVztBQUN4QkssU0FBSyxFQUFFVixHQUFHLENBQUNPLE1BQUosR0FBYUksR0FBYixDQUFpQixDQUFqQixFQUFvQkgsUUFBcEIsR0FBK0JFLEtBQS9CO0FBRGlCLEdBQVgsQ0FBZjtBQUlBLFNBQU9OLE1BQU0sQ0FBQ1csUUFBUCxDQUFnQlosSUFBaEIsQ0FBUDtBQUNELENBTkQ7O0FBUUFrQixNQUFNLENBQUNDLE9BQVAsQ0FBZXBCLGtCQUFmLEdBQW9DQSxrQkFBcEM7QUFDQW1CLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlTixlQUFmLEdBQWlDQSxlQUFqQztBQUNBSyxNQUFNLENBQUNDLE9BQVAsQ0FBZUwsaUJBQWYsR0FBbUNBLGlCQUFuQztBQUNBSSxNQUFNLENBQUNDLE9BQVAsQ0FBZUYsdUJBQWYsR0FBeUNBLHVCQUF6QyIsImZpbGUiOiIuL3BhZ2VzL2FwaS92YWxpZGF0aW9uL3ZhbGlkYXRpb24uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBKb2kgPSByZXF1aXJlKFwiQGhhcGkvam9pXCIpO1xuXG5jb25zdCByZWdpc3RlclZhbGlkYXRpb24gPSAoZGF0YSkgPT4ge1xuICBjb25zdCBzY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgICBmaXJzdE5hbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICAgIGxhc3ROYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICBlbWFpbDogSm9pLnN0cmluZygpLm1pbig2KS5yZXF1aXJlZCgpLmVtYWlsKCksXG4gICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKS5taW4oNikucmVxdWlyZWQoKSxcbiAgICBpc1N1YnNjcmliZWQ6IEpvaS5ib29sZWFuKCksXG4gIH0pO1xuXG4gIHJldHVybiBzY2hlbWEudmFsaWRhdGUoZGF0YSk7XG59O1xuXG5jb25zdCBsb2dpblZhbGlkYXRpb24gPSAoZGF0YSkgPT4ge1xuICBjb25zdCBzY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgICBlbWFpbDogSm9pLnN0cmluZygpLm1pbig2KS5yZXF1aXJlZCgpLmVtYWlsKCksXG4gICAgcGFzc3dvcmQ6IEpvaS5zdHJpbmcoKS5taW4oNikucmVxdWlyZWQoKSxcbiAgfSk7XG5cbiAgcmV0dXJuIHNjaGVtYS52YWxpZGF0ZShkYXRhKTtcbn07XG5cbmNvbnN0IG1lc3NhZ2VWYWxpZGF0aW9uID0gKGRhdGEpID0+IHtcbiAgY29uc3Qgc2NoZW1hID0gSm9pLm9iamVjdCh7XG4gICAgZmlyc3ROYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICBsYXN0TmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgZW1haWw6IEpvaS5zdHJpbmcoKS5taW4oNikucmVxdWlyZWQoKS5lbWFpbCgpLFxuICAgIHN1YmplY3Q6IEpvaS5zdHJpbmcoKS5taW4oNikucmVxdWlyZWQoKSxcbiAgICBjb250ZW50OiBKb2kucmVxdWlyZWQoKSxcbiAgfSk7XG5cbiAgcmV0dXJuIHNjaGVtYS52YWxpZGF0ZShkYXRhKTtcbn07XG5cbmNvbnN0IHJlc2V0UGFzc3dvcmRWYWxpZGF0aW9uID0gKGRhdGEpID0+IHtcbiAgY29uc3Qgc2NoZW1hID0gSm9pLm9iamVjdCh7XG4gICAgZW1haWw6IEpvaS5zdHJpbmcoKS5taW4oNikucmVxdWlyZWQoKS5lbWFpbCgpLFxuICB9KTtcblxuICByZXR1cm4gc2NoZW1hLnZhbGlkYXRlKGRhdGEpO1xufTtcblxubW9kdWxlLmV4cG9ydHMucmVnaXN0ZXJWYWxpZGF0aW9uID0gcmVnaXN0ZXJWYWxpZGF0aW9uO1xubW9kdWxlLmV4cG9ydHMubG9naW5WYWxpZGF0aW9uID0gbG9naW5WYWxpZGF0aW9uO1xubW9kdWxlLmV4cG9ydHMubWVzc2FnZVZhbGlkYXRpb24gPSBtZXNzYWdlVmFsaWRhdGlvbjtcbm1vZHVsZS5leHBvcnRzLnJlc2V0UGFzc3dvcmRWYWxpZGF0aW9uID0gcmVzZXRQYXNzd29yZFZhbGlkYXRpb247XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/api/validation/validation.js\n");

/***/ }),

/***/ "@hapi/joi":
/*!****************************!*\
  !*** external "@hapi/joi" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@hapi/joi\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAaGFwaS9qb2lcIj8wOGM3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IkBoYXBpL2pvaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBoYXBpL2pvaVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@hapi/joi\n");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRqc1wiP2NlNTUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYmNyeXB0anMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiY3J5cHRqc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///bcryptjs\n");

/***/ }),

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWVcIj8yZDIxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImNvb2tpZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///cookie\n");

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
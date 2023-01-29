"use strict";
(() => {
var exports = {};
exports.id = 876;
exports.ids = [876,951];
exports.modules = {

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 7567:
/***/ ((module) => {

module.exports = require("ethereumjs-util");

/***/ }),

/***/ 1982:
/***/ ((module) => {

module.exports = require("ethers");

/***/ }),

/***/ 4511:
/***/ ((module) => {

module.exports = require("next-iron-session");

/***/ }),

/***/ 6555:
/***/ ((module) => {

module.exports = import("uuid");;

/***/ }),

/***/ 1057:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6555);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9585);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([uuid__WEBPACK_IMPORTED_MODULE_0__]);
uuid__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.withSession)(async (req, res)=>{
    if (req.method === "POST") {
        try {
            const { body  } = req;
            const nft = body.nft;
            if (!nft.name || !nft.description || !nft.attributes) {
                return res.status(422).send({
                    message: "Some of the form data are missing!"
                });
            }
            await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.addressCheckMiddleware)(req, res);
            const jsonRes = await axios__WEBPACK_IMPORTED_MODULE_2___default().post("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
                pinataMetadata: {
                    name: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)()
                },
                pinataContent: nft
            }, {
                headers: {
                    pinata_api_key: _utils__WEBPACK_IMPORTED_MODULE_1__.pinataApiKey,
                    pinata_secret_api_key: _utils__WEBPACK_IMPORTED_MODULE_1__.pinataSecretApiKey
                }
            });
            return res.status(200).send(jsonRes.data);
        } catch  {
            return res.status(422).send({
                message: "Cannot create JSON"
            });
        }
    } else if (req.method === "GET") {
        try {
            const message = {
                contractAddress: _utils__WEBPACK_IMPORTED_MODULE_1__.contractAddress,
                id: (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)()
            };
            req.session.set("message-session", message);
            await req.session.save();
            return res.json(message);
        } catch  {
            return res.status(422).send({
                message: "Cannot generate a message!"
            });
        }
    } else {
        return res.status(200).json({
            message: "Invalid api route"
        });
    }
}));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [585], () => (__webpack_exec__(1057)));
module.exports = __webpack_exports__;

})();
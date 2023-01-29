"use strict";
(() => {
var exports = {};
exports.id = 201;
exports.ids = [201,951];
exports.modules = {

/***/ 7765:
/***/ ((module) => {

module.exports = require("@pinata/sdk");

/***/ }),

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

/***/ 8941:
/***/ ((module) => {

module.exports = require("form-data");

/***/ }),

/***/ 4511:
/***/ ((module) => {

module.exports = require("next-iron-session");

/***/ }),

/***/ 6555:
/***/ ((module) => {

module.exports = import("uuid");;

/***/ }),

/***/ 6295:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6555);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9585);
/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8941);
/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(form_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _pinata_sdk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7765);
/* harmony import */ var _pinata_sdk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_pinata_sdk__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([uuid__WEBPACK_IMPORTED_MODULE_0__]);
uuid__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





// const pinataSDK = require('@pinata/sdk');
const pinata = new (_pinata_sdk__WEBPACK_IMPORTED_MODULE_4___default())("5c4a0e6ee96bf5b06d0a", "b639b61e1ee7c4915488242b8d1164a4cc0438de4cbbff474892e4ca34b7eeed");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.withSession)(async (req, res)=>{
    if (req.method === "POST") {
        const { bytes , fileName , contentType  } = req.body;
        if (!bytes || !fileName || !contentType) {
            return res.status(422).send({
                message: "Image data are missing"
            });
        }
        await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.addressCheckMiddleware)(req, res);
        const buffer = Buffer.from(Object.values(bytes));
        const formData = new (form_data__WEBPACK_IMPORTED_MODULE_2___default())();
        formData.append("file", buffer, {
            contentType,
            filename: fileName + "-" + (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)()
        });
        // const formData = new FormData();
        // const src = "path/to/file.png";
        // const file = fs.createReadStream(src)
        // formData.append('file', file)
        // const metadata = JSON.stringify({
        //   name: 'File name',
        // });
        // formData.append('pinataMetadata', metadata);
        // const options = JSON.stringify({
        //   cidVersion: 0,
        // })
        // formData.append('pinataOptions', options);
        try {
            const fileRes = await axios__WEBPACK_IMPORTED_MODULE_3___default().post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: Infinity,
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyY2M3M2UwYy1kMzg3LTRkMmYtODA4MC1jZjhjY2RmYjc3NjYiLCJlbWFpbCI6InRldGFuZXgudGVjaG5pY2FsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1YzRhMGU2ZWU5NmJmNWIwNmQwYSIsInNjb3BlZEtleVNlY3JldCI6ImI2MzliNjFlMWVlN2M0OTE1NDg4MjQyYjhkMTE2NGE0Y2MwNDM4ZGU0Y2JiZmY0NzQ4OTJlNGNhMzRiN2VlZWQiLCJpYXQiOjE2NzQ5ODEyNzF9.0XGTgMeqAvdfv-dIkmWCrHyf30hcvICpC4T29LLuJ0E"
                }
            });
            return res.status(200).send(fileRes.data);
            console.log(fileRes.data);
        } catch (error) {
            return res.status(422).send({
                message: "Invalid endpoint"
            });
            console.log(error);
        }
    // const readableStreamForFile = fs.createReadStream('./yourfile.png');
    // const options = {
    //     pinataMetadata: {
    //         name: MyCustomName,
    //         keyvalues: {
    //             customKey: 'customValue',
    //             customKey2: 'customValue2'
    //         }
    //     },
    //     pinataOptions: {
    //         cidVersion: 0
    //     }
    // };
    // pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    //     //handle results here
    //     console.log(result);
    // }).catch((err) => {
    //     //handle error here
    //     console.log(err);
    // });
    // const fileRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    //   maxBodyLength: Infinity,
    //   headers: {
    //     "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
    //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyY2M3M2UwYy1kMzg3LTRkMmYtODA4MC1jZjhjY2RmYjc3NjYiLCJlbWFpbCI6InRldGFuZXgudGVjaG5pY2FsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1YzRhMGU2ZWU5NmJmNWIwNmQwYSIsInNjb3BlZEtleVNlY3JldCI6ImI2MzliNjFlMWVlN2M0OTE1NDg4MjQyYjhkMTE2NGE0Y2MwNDM4ZGU0Y2JiZmY0NzQ4OTJlNGNhMzRiN2VlZWQiLCJpYXQiOjE2NzQ5ODEyNzF9.0XGTgMeqAvdfv-dIkmWCrHyf30hcvICpC4T29LLuJ0E', 
    //     pinata_api_key: '5c4a0e6ee96bf5b06d0a',
    //     pinata_secret_api_key: 'b639b61e1ee7c4915488242b8d1164a4cc0438de4cbbff474892e4ca34b7eeed'
    //   }
    // });
    // return res.status(200).send(fileRes.data);
    } else {
        return res.status(422).send({
            message: "Invalid endpoint"
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
var __webpack_exports__ = __webpack_require__.X(0, [585], () => (__webpack_exec__(6295)));
module.exports = __webpack_exports__;

})();
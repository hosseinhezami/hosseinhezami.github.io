"use strict";
exports.id = 816;
exports.ids = [816];
exports.modules = {

/***/ 3323:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ setupHooks)
/* harmony export */ });
/* harmony import */ var _useAccount__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5335);
/* harmony import */ var _useNetwork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9515);
/* harmony import */ var _useListedNfts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8241);
/* harmony import */ var _useOwnedNfts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7417);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_useAccount__WEBPACK_IMPORTED_MODULE_0__, _useNetwork__WEBPACK_IMPORTED_MODULE_1__, _useListedNfts__WEBPACK_IMPORTED_MODULE_2__, _useOwnedNfts__WEBPACK_IMPORTED_MODULE_3__]);
([_useAccount__WEBPACK_IMPORTED_MODULE_0__, _useNetwork__WEBPACK_IMPORTED_MODULE_1__, _useListedNfts__WEBPACK_IMPORTED_MODULE_2__, _useOwnedNfts__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const setupHooks = (deps)=>{
    return {
        useAccount: (0,_useAccount__WEBPACK_IMPORTED_MODULE_0__/* .hookFactory */ .p)(deps),
        useNetwork: (0,_useNetwork__WEBPACK_IMPORTED_MODULE_1__/* .hookFactory */ .p)(deps),
        useListedNfts: (0,_useListedNfts__WEBPACK_IMPORTED_MODULE_2__/* .hookFactory */ .p)(deps),
        useOwnedNfts: (0,_useOwnedNfts__WEBPACK_IMPORTED_MODULE_3__/* .hookFactory */ .p)(deps)
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5335:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p": () => (/* binding */ hookFactory)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5941);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_1__]);
swr__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const hookFactory = ({ provider , ethereum , isLoading  })=>{
    return ()=>{
        const { data , mutate , isValidating , ...swr } = (0,swr__WEBPACK_IMPORTED_MODULE_1__["default"])(provider ? "web3/useAccount" : null, async ()=>{
            const accounts = await provider.listAccounts();
            const account = accounts[0];
            if (!account) {
                throw "Cannot retreive account! Please, connect to web3 wallet.";
            }
            return account;
        }, {
            revalidateOnFocus: false,
            shouldRetryOnError: false
        });
        (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
            ethereum === null || ethereum === void 0 ? void 0 : ethereum.on("accountsChanged", handleAccountsChanged);
            return ()=>{
                ethereum === null || ethereum === void 0 ? void 0 : ethereum.removeListener("accountsChanged", handleAccountsChanged);
            };
        });
        const handleAccountsChanged = (...args)=>{
            const accounts = args[0];
            if (accounts.length === 0) {
                console.error("Please, connect to Web3 wallet");
            } else if (accounts[0] !== data) {
                mutate(accounts[0]);
            }
        };
        const connect = async ()=>{
            try {
                ethereum === null || ethereum === void 0 ? void 0 : ethereum.request({
                    method: "eth_requestAccounts"
                });
            } catch (e) {
                console.error(e);
            }
        };
        return {
            ...swr,
            data,
            isValidating,
            isLoading: isLoading,
            isInstalled: (ethereum === null || ethereum === void 0 ? void 0 : ethereum.isMetaMask) || false,
            mutate,
            connect
        };
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8241:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p": () => (/* binding */ hookFactory)
/* harmony export */ });
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5941);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_3__]);
swr__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const hookFactory = ({ contract  })=>()=>{
        const { data , ...swr } = (0,swr__WEBPACK_IMPORTED_MODULE_3__["default"])(contract ? "web3/useListedNfts" : null, async ()=>{
            const nfts = [];
            const coreNfts = await contract.getAllNftsOnSale();
            for(let i = 0; i < coreNfts.length; i++){
                const item = coreNfts[i];
                const tokenURI = await contract.tokenURI(item.tokenId);
                const metaRes = await fetch(tokenURI);
                const meta = await metaRes.json();
                nfts.push({
                    price: parseFloat(ethers__WEBPACK_IMPORTED_MODULE_0__.ethers.utils.formatEther(item.price)),
                    tokenId: item.tokenId.toNumber(),
                    creator: item.creator,
                    isListed: item.isListed,
                    meta
                });
            }
            return nfts;
        });
        const _contract = contract;
        const buyNft = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (tokenId, value)=>{
            try {
                const result = await _contract.buyNft(tokenId, {
                    value: ethers__WEBPACK_IMPORTED_MODULE_0__.ethers.utils.parseEther(value.toString())
                });
                await react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.promise(result.wait(), {
                    pending: "Processing transaction",
                    success: "Nft is yours! Go to Profile page",
                    error: "Processing error"
                });
            } catch (e) {
                console.error(e.message);
            }
        }, [
            _contract
        ]);
        return {
            ...swr,
            buyNft,
            data: data || []
        };
    }
;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9515:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p": () => (/* binding */ hookFactory)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5941);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_0__]);
swr__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache"
};
const targetId = (/* unused pure expression or super */ null && ("5"));
const targetNetwork = NETWORKS[5];
const hookFactory = ({ provider , isLoading  })=>()=>{
        const { data , isValidating , ...swr } = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])(provider ? "web3/useNetwork" : null, async ()=>{
            const chainId = (await provider.getNetwork()).chainId;
            if (!chainId) {
                throw "Cannot retreive network. Please, refresh browser or connect to other one.";
            }
            return NETWORKS[5];
        }, {
            revalidateOnFocus: false
        });
        const isSupported = data === targetNetwork;
        return {
            ...swr,
            data,
            isValidating,
            targetNetwork,
            isSupported,
            isConnectedToNetwork: !isLoading && isSupported,
            isLoading: isLoading
        };
    }
;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7417:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p": () => (/* binding */ hookFactory)
/* harmony export */ });
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5941);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr__WEBPACK_IMPORTED_MODULE_3__]);
swr__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const hookFactory = ({ contract  })=>()=>{
        const { data , ...swr } = (0,swr__WEBPACK_IMPORTED_MODULE_3__["default"])(contract ? "web3/useOwnedNfts" : null, async ()=>{
            const nfts = [];
            const coreNfts = await contract.getOwnedNfts();
            for(let i = 0; i < coreNfts.length; i++){
                const item = coreNfts[i];
                const tokenURI = await contract.tokenURI(item.tokenId);
                const metaRes = await fetch(tokenURI);
                const meta = await metaRes.json();
                nfts.push({
                    price: parseFloat(ethers__WEBPACK_IMPORTED_MODULE_0__.ethers.utils.formatEther(item.price)),
                    tokenId: item.tokenId.toNumber(),
                    creator: item.creator,
                    isListed: item.isListed,
                    meta
                });
            }
            return nfts;
        });
        const _contract = contract;
        const listNft = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (tokenId, price)=>{
            try {
                const result = await _contract.placeNftOnSale(tokenId, ethers__WEBPACK_IMPORTED_MODULE_0__.ethers.utils.parseEther(price.toString()), {
                    value: ethers__WEBPACK_IMPORTED_MODULE_0__.ethers.utils.parseEther(0.025.toString())
                });
                await react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.promise(result.wait(), {
                    pending: "Processing transaction",
                    success: "Item has been listed",
                    error: "Processing error"
                });
            } catch (e) {
                console.error(e.message);
            }
        }, [
            _contract
        ]);
        return {
            ...swr,
            listNft,
            data: data || []
        };
    }
;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8816:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$6": () => (/* binding */ useWeb3),
/* harmony export */   "xn": () => (/* binding */ useHooks),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6247);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils__WEBPACK_IMPORTED_MODULE_2__]);
_utils__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const pageReload = ()=>{
    window.location.reload();
};
const handleAccount = (ethereum)=>async ()=>{
        const isLocked = !await ethereum._metamask.isUnlocked();
        if (isLocked) {
            pageReload();
        }
    }
;
const setGlobalListeners = (ethereum)=>{
    ethereum.on("chainChanged", pageReload);
    ethereum.on("accountsChanged", handleAccount(ethereum));
};
const removeGlobalListeners = (ethereum)=>{
    ethereum === null || ethereum === void 0 ? void 0 : ethereum.removeListener("chainChanged", pageReload);
    ethereum === null || ethereum === void 0 ? void 0 : ethereum.removeListener("accountsChanged", handleAccount);
};
const Web3Context = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .createDefaultState */ .dR)());
const Web3Provider = ({ children  })=>{
    const { 0: web3Api , 1: setWeb3Api  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .createDefaultState */ .dR)());
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        async function initWeb3() {
            try {
                const provider = new ethers__WEBPACK_IMPORTED_MODULE_3__.ethers.providers.Web3Provider(window.ethereum);
                const contract = await (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .loadContract */ .U5)("NftMarket", provider);
                const signer = provider.getSigner();
                const signedContract = contract.connect(signer);
                setTimeout(()=>setGlobalListeners(window.ethereum)
                , 500);
                setWeb3Api((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .createWeb3State */ .se)({
                    ethereum: window.ethereum,
                    provider,
                    contract: signedContract,
                    isLoading: false
                }));
            } catch (e) {
                console.error("Please, install web3 wallet");
                setWeb3Api((api)=>(0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .createWeb3State */ .se)({
                        ...api,
                        isLoading: false
                    })
                );
            }
        }
        initWeb3();
        return ()=>removeGlobalListeners(window.ethereum)
        ;
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Web3Context.Provider, {
        value: web3Api,
        children: children
    });
};
function useWeb3() {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Web3Context);
}
function useHooks() {
    const { hooks  } = useWeb3();
    return hooks;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Web3Provider);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6247:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dR": () => (/* binding */ createDefaultState),
/* harmony export */   "se": () => (/* binding */ createWeb3State),
/* harmony export */   "U5": () => (/* binding */ loadContract)
/* harmony export */ });
/* harmony import */ var _hooks_web3_setupHooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3323);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1982);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hooks_web3_setupHooks__WEBPACK_IMPORTED_MODULE_0__]);
_hooks_web3_setupHooks__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const createDefaultState = ()=>{
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true,
        hooks: (0,_hooks_web3_setupHooks__WEBPACK_IMPORTED_MODULE_0__/* .setupHooks */ .b)({
            isLoading: true
        })
    };
};
const createWeb3State = ({ ethereum , provider , contract , isLoading  })=>{
    return {
        ethereum,
        provider,
        contract,
        isLoading,
        hooks: (0,_hooks_web3_setupHooks__WEBPACK_IMPORTED_MODULE_0__/* .setupHooks */ .b)({
            ethereum,
            provider,
            contract,
            isLoading
        })
    };
};
const NETWORK_ID = "5";
const loadContract = async (name, provider)=>{
    if (!NETWORK_ID) {
        return Promise.reject("Network ID is not defined!");
    }
    const res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();
    if (Artifact.networks[NETWORK_ID].address) {
        const contract = new ethers__WEBPACK_IMPORTED_MODULE_1__.ethers.Contract(Artifact.networks[NETWORK_ID].address, Artifact.abi, provider);
        return contract;
    } else {
        return Promise.reject(`Contract: [${name}] cannot be loaded!`);
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
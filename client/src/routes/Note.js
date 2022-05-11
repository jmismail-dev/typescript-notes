"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const react_markdown_1 = __importDefault(require("react-markdown"));
const remark_gfm_1 = __importDefault(require("remark-gfm"));
const moment_1 = __importDefault(require("moment"));
// UI
require("./Note.scss");
function Note({}) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const params = (0, react_router_dom_1.useParams)();
    const isError = (0, react_redux_1.useSelector)(store => store.notes.isError);
    const errorMessage = (0, react_redux_1.useSelector)(store => store.notes.error);
    const { title, body, createdOn } = (0, react_redux_1.useSelector)(store => store.notes.note);
    // Params
    const noteId = params.noteId;
    // Get Initial Notes Data
    (0, react_1.useEffect)(() => {
        dispatch({
            type: 'FETCH_SINGLE_USER_NOTE',
            payload: noteId
        });
    }, [noteId]);
    return !isError ? (react_1.default.createElement(react_bootstrap_1.Container, { className: 'my-4' },
        react_1.default.createElement("h2", null, title),
        react_1.default.createElement("p", { className: "lead" }, (0, moment_1.default)(createdOn).format('DD-MM-YYYY HH:mm')),
        react_1.default.createElement("div", { className: 'content' },
            react_1.default.createElement(react_markdown_1.default, { children: body, remarkPlugins: [remark_gfm_1.default] })))) : (react_1.default.createElement(react_1.default.Fragment, null, errorMessage));
}
exports.default = Note;

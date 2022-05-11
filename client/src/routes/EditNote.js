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
const rehype_sanitize_1 = __importDefault(require("rehype-sanitize"));
const react_markdown_editor_lite_1 = __importDefault(require("react-markdown-editor-lite"));
const react_markdown_1 = __importDefault(require("react-markdown"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
// UI
require("react-markdown-editor-lite/lib/index.css");
const EditNote = (props) => {
    const [value, setValue] = (0, react_1.useState)();
    const [title, setTitle] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)('');
    const params = (0, react_router_dom_1.useParams)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleChange = (0, react_1.useCallback)((value) => {
        setValue(value);
    }, [value]);
    const handleTitleChange = (0, react_1.useCallback)((e) => {
        setTitle(e.target.value);
    }, [title]);
    const changeError = (value) => {
        setError(value);
    };
    // Params
    const noteId = params.noteId;
    // Get Initial Notes Data
    (0, react_1.useEffect)(() => {
        dispatch({
            type: 'FETCH_SINGLE_USER_NOTE',
            payload: noteId
        });
    }, [noteId]);
    const data = (0, react_redux_1.useSelector)(store => store.notes.note);
    // Get Initial Notes Data
    (0, react_1.useEffect)(() => {
        if (data) {
            setTitle(data.title);
            setValue({ text: data.body });
        }
    }, [data]);
    const getValue = value;
    const successClbk = () => {
        navigate('/');
    };
    const handleSubmit = () => {
        if (getValue.text && getValue.text.trim() !== '' && title.trim() !== '') {
            dispatch({
                type: 'UPDATE_NOTE_INIT',
                payload: {
                    title,
                    body: getValue.text,
                    id: noteId
                },
                success: successClbk
            });
            changeError('');
        }
        else if (title.length > 40) {
            changeError('Title should be less than 40 characters');
        }
        else {
            changeError('Title and Content required');
        }
    };
    return (react_1.default.createElement(react_bootstrap_1.Container, { className: 'my-4' },
        error && (react_1.default.createElement(react_bootstrap_1.Alert, { variant: 'danger' }, error)),
        react_1.default.createElement(react_bootstrap_1.Form.Group, null,
            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: 'text', placeholder: 'Enter Title', onChange: handleTitleChange, value: title })),
        react_1.default.createElement("div", { className: "my-1" },
            react_1.default.createElement(react_markdown_editor_lite_1.default, { style: { height: '500px' }, allowPasteImage: true, value: getValue && getValue.text, renderHTML: text => (react_1.default.createElement(react_markdown_1.default, { children: text, rehypePlugins: [
                        rehype_sanitize_1.default
                    ] })), onChange: handleChange })),
        react_1.default.createElement(react_bootstrap_1.Button, { onClick: () => handleSubmit(), className: 'my-4' }, " Update ")));
};
exports.default = EditNote;

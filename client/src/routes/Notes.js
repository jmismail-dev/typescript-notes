"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
function Notes({}) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const notes = (0, react_redux_1.useSelector)(store => store.notes.notes);
    // Get Initial Notes Data
    (0, react_1.useEffect)(() => {
        dispatch({
            type: 'FETCH_ALL_USER_NOTES'
        });
    }, []);
    const handleRedirect = (id) => {
        navigate(`/${id}`);
    };
    const editRedirect = (id) => {
        navigate(`/edit/${id}`);
    };
    const redirectCreate = () => {
        navigate(`/create`);
    };
    return (React.createElement(react_bootstrap_1.Container, { className: 'my-4' },
        React.createElement(react_bootstrap_1.Button, { onClick: redirectCreate }, " Add "), notes === null || notes === void 0 ? void 0 :
        notes.map((note, index) => (React.createElement(react_bootstrap_1.Card, { key: index, className: 'my-1' },
            React.createElement(react_bootstrap_1.Card.Body, { onClick: () => handleRedirect(note.id), style: { cursor: 'pointer' } },
                React.createElement(react_bootstrap_1.Card.Title, null, note.title),
                React.createElement("p", null,
                    note.body.substr(0, 100),
                    note.body.length > 100 ? "..." : "")),
            React.createElement(react_bootstrap_1.Card.Footer, null,
                React.createElement(react_bootstrap_1.Button, { onClick: () => editRedirect(note.id) }, " Edit ")))))));
}
exports.default = Notes;

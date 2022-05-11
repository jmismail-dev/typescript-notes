"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
//  Pages
const Notes_1 = __importDefault(require("./routes/Notes"));
const Note_1 = __importDefault(require("./routes/Note"));
const AddNote_1 = __importDefault(require("./routes/AddNote"));
const EditNote_1 = __importDefault(require("./routes/EditNote"));
// Store
const store_1 = __importDefault(require("./store"));
const App = (props) => {
    return (React.createElement(react_redux_1.Provider, { store: store_1.default },
        React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement(react_router_dom_1.Routes, null,
                React.createElement(react_router_dom_1.Route, { path: '/', element: React.createElement(Notes_1.default, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/edit/:noteId', element: React.createElement(EditNote_1.default, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/:noteId', element: React.createElement(Note_1.default, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/create', element: React.createElement(AddNote_1.default, null) })))));
};
exports.default = App;

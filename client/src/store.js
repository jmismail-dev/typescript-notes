"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_saga_1 = __importDefault(require("redux-saga"));
const extension_1 = require("@redux-devtools/extension");
const reducers_1 = __importDefault(require("./reducers"));
const Notes_1 = __importDefault(require("./sagas/Notes"));
// Create the saga middleware
const sagaMiddleware = (0, redux_saga_1.default)();
// Mount it on the Store
const store = (0, redux_1.createStore)(reducers_1.default, 
// applyMiddleware(sagaMiddleware),
(0, extension_1.composeWithDevTools)((0, redux_1.applyMiddleware)(sagaMiddleware)));
// Then run the saga
sagaMiddleware.run(Notes_1.default);
// Render the application
exports.default = store;

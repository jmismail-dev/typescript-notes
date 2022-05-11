"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
// Reducers 
const notes_1 = __importDefault(require("./notes"));
exports.default = (0, redux_1.combineReducers)({
    notes: notes_1.default
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const AllUserNotes_1 = __importDefault(require("./AllUserNotes"));
const GetSingleUserNote_1 = __importDefault(require("./GetSingleUserNote"));
const PostNote_1 = __importDefault(require("./PostNote"));
const UpdateNote_1 = __importDefault(require("./UpdateNote"));
function* default_1() {
    yield (0, effects_1.all)([(0, AllUserNotes_1.default)(), (0, GetSingleUserNote_1.default)(), (0, PostNote_1.default)(), (0, UpdateNote_1.default)()]);
}
exports.default = default_1;
;

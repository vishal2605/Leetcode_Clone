"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.Problems = exports.Admin = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String },
    name: String,
    password: String
});
const adminSchema = new mongoose_1.default.Schema({
    username: String,
    name: String,
    password: String
});
const ProblemSchema = new mongoose_1.default.Schema({
    title: String,
    difficulty: String,
    tag: String,
    videoLink: String,
    questionLink: String
});
const TagSchema = new mongoose_1.default.Schema({
    tag: String,
    length: Number
});
// Define mongoose models
exports.User = mongoose_1.default.model('User', userSchema);
exports.Admin = mongoose_1.default.model('Admin', adminSchema);
exports.Problems = mongoose_1.default.model('Problems', ProblemSchema);
exports.Tag = mongoose_1.default.model('Tag', TagSchema);

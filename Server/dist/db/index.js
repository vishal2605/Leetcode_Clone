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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Problems = exports.Admin = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String },
    name: String,
    password: String,
    purchasedCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' }]
});
const adminSchema = new mongoose_1.default.Schema({
    username: String,
    name: String,
    password: String
});
const ProblemSchema = new mongoose_1.default.Schema({
    title: String,
    difficulty: String,
    description: String,
    topicTag: [{ type: mongoose_1.Schema.Types.String }],
    example: [{
            input: String,
            output: String,
        }],
    constraints: String,
    testcase: [{
            input: String,
            output: String,
        }]
});
// Define mongoose models
exports.User = mongoose_1.default.model('User', userSchema);
exports.Admin = mongoose_1.default.model('Admin', adminSchema);
exports.Problems = mongoose_1.default.model('Problems', ProblemSchema);

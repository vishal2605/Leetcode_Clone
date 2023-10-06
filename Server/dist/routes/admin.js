"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const auth_2 = require("../middleware/auth");
const zod_1 = __importDefault(require("zod"));
const router = express_1.default.Router();
const loginInput = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string()
});
const signUpInput = zod_1.default.object({
    name: zod_1.default.string(),
    username: zod_1.default.string(),
    password: zod_1.default.string()
});
router.get('/me', auth_2.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = yield req.headers["adminId"];
    const admin = yield db_1.Admin.findOne({ _id: adminId });
    if (!admin) {
        res.status(403).json({ msg: "Admin doesnt exist" });
        return;
    }
    res.json(admin.username);
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedInput = signUpInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(403).json({
            msg: "Parsing Error"
        });
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const name = parsedInput.data.name;
    const admin = yield db_1.Admin.findOne({ username, password });
    console.log("admin signup");
    if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
    }
    else {
        const obj = { username: username, password: password, name: name };
        const newAdmin = new db_1.Admin(obj);
        newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, auth_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedInput = loginInput.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(403).json({
            msg: "Parsing Error"
        });
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const admin = yield db_1.Admin.findOne({ username, password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, auth_1.SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
router.get('/problemSetAll', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problems = yield db_1.Problems.find({});
    res.json({ problems });
}));
router.post('/problem', auth_2.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problem = new db_1.Problems(req.body);
    yield problem.save();
    res.json({ message: 'Problem created successfully', problemId: problem.id });
}));
router.put('/problems/:problemId', auth_2.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problem = yield db_1.Problems.findByIdAndUpdate(req.params.problemId, req.body);
    if (problem) {
        res.json({ message: 'Problem is Updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Problem not found' });
    }
}));
router.get('/problems/:problemId', auth_2.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problem = yield db_1.Problems.findById(req.params.problemId);
    if (problem) {
        res.json(problem);
    }
    else {
        res.status(404).json("Course not found");
    }
}));
exports.default = router;

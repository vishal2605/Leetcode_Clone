"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb+srv://vishal2001lohar:Vishal123@cluster0.x3os1qm.mongodb.net/', { dbName: "problem" });
//Admin routes
app.use('/admin', admin_1.default);
//User routes
app.use('/users', user_1.default);
app.listen(3000, () => console.log('Server running on port 3000'));

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./modules/user/user.router");
const auth_router_1 = require("./modules/auth/auth.router");
const post_router_1 = require("./modules/post/post.router");
const project_router_1 = require("./modules/project/project.router");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, compression_1.default)()); // Compresses response bodies for faster delivery
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use("/api/v1/user", user_router_1.userRouter);
app.use("/api/v1/post", post_router_1.postRouter);
app.use("/api/v1/project", project_router_1.projectRouter);
app.use("/api/v1/auth", auth_router_1.authRouter);
app.get("/", (_req, res) => {
    res.send("API is running!!");
});
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});
exports.default = app;

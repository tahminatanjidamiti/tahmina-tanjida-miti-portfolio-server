"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./post.controller");
const router = express_1.default.Router();
router.post("/", post_controller_1.PostController.createPost);
router.get("/stats", post_controller_1.PostController.getBlogStat);
router.get("/", post_controller_1.PostController.getAllPosts);
router.get("/:id", post_controller_1.PostController.getPostById);
router.patch("/:id", post_controller_1.PostController.updatePost);
router.delete("/:id", post_controller_1.PostController.deletePost);
exports.postRouter = router;

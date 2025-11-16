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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_service_1 = require("./post.service");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //     console.log("Headers:", req.headers["content-type"]);
    //   console.log("Raw Body:", req.body);
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send("Empty body received");
        }
        const result = yield post_service_1.PostService.createPost(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        // console.log(error.message)
        res.status(500).send(error.message);
    }
});
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;
        const tags = req.query.tags ? req.query.tags.split(",") : [];
        const result = yield post_service_1.PostService.getAllPosts({ page, limit, search, isFeatured, tags });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch posts", details: err });
    }
});
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_service_1.PostService.getPostById(Number(req.params.id));
    if (!post)
        return res.status(404).json({ error: "Post not found" });
    res.json(post);
});
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("controller", req.body)
    const post = yield post_service_1.PostService.updatePost(Number(req.params.id), req.body);
    res.json(post);
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield post_service_1.PostService.deletePost(Number(req.params.id));
    res.json({ message: "Post deleted" });
});
const getBlogStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield post_service_1.PostService.getBlogStat();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch stats", details: err });
    }
});
exports.PostController = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getBlogStat
};

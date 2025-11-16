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
exports.ProjectController = void 0;
const project_service_1 = require("./project.service");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield project_service_1.ProjectService.createProject(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error, message: "Failed to create project" });
    }
});
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;
        const features = req.query.features ? req.query.features.split(",") : [];
        const result = yield project_service_1.ProjectService.getAllProjects({ page, limit, search, isFeatured, features });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch projects", details: err });
    }
});
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_service_1.ProjectService.getProjectById(Number(req.params.id));
    if (!project)
        return res.status(404).json({ error: "Project not found" });
    res.json(project);
});
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("controller", req.body)
    const project = yield project_service_1.ProjectService.updateProject(Number(req.params.id), req.body);
    res.json(project);
});
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield project_service_1.ProjectService.deleteProject(Number(req.params.id));
    res.json({ message: "Project deleted" });
});
const getProjectStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield project_service_1.ProjectService.getProjectStat();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch stats", details: err });
    }
});
exports.ProjectController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectStat,
};

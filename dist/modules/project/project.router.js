"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("./project.controller");
const router = express_1.default.Router();
router.post("/", project_controller_1.ProjectController.createProject);
router.get("/stats", project_controller_1.ProjectController.getProjectStat);
router.get("/", project_controller_1.ProjectController.getAllProjects);
router.get("/:id", project_controller_1.ProjectController.getProjectById);
router.patch("/:id", project_controller_1.ProjectController.updateProject);
router.delete("/:id", project_controller_1.ProjectController.deleteProject);
exports.projectRouter = router;

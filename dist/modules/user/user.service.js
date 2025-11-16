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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../../app/config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    const isUserExist = yield db_1.prisma.user.findUnique({
        where: { email },
    });
    if (isUserExist) {
        throw new Error("User already exists");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(process.env.BCRYPT_SALT_ROUND));
    const createdUser = yield db_1.prisma.user.create({
        data: Object.assign({ email, password: hashedPassword }, rest),
    });
    return createdUser;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            picture: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            status: true,
            isVerified: true,
            posts: true,
            projects: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            picture: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            isVerified: true,
            posts: true,
            projects: true
        }
    });
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let dataToUpdate = Object.assign({}, payload);
    if (payload.password) {
        dataToUpdate.password = yield bcryptjs_1.default.hash(payload.password, Number(process.env.BCRYPT_SALT_ROUND));
    }
    const updatedUser = yield db_1.prisma.user.update({
        where: { id },
        data: dataToUpdate,
    });
    return updatedUser;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.user.delete({
        where: {
            id
        }
    });
    return result;
});
exports.UserService = {
    createUser,
    getAllFromDB,
    getUserById,
    updateUser,
    deleteUser
};

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
exports.AuthService = void 0;
const db_1 = require("../../app/config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const loginWithEmailAndPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const user = yield db_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user)
        throw new Error("User not found!");
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatched)
        throw new Error("Password does not match!");
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture: user.picture,
        phone: user.phone,
        status: user.status,
        isVerified: user.isVerified
    };
});
const authWithGoogle = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield db_1.prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (!user) {
        user = yield db_1.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                picture: data.picture,
            }
        });
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture: user.picture,
        phone: user === null || user === void 0 ? void 0 : user.phone,
        status: user === null || user === void 0 ? void 0 : user.status,
        isVerified: user === null || user === void 0 ? void 0 : user.isVerified,
    };
});
exports.AuthService = {
    loginWithEmailAndPassword,
    authWithGoogle
};

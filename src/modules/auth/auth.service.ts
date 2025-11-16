import { prisma } from "../../app/config/db";
import { Prisma } from "../../generated/prisma/client";
import bcryptjs from "bcryptjs";

const loginWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) throw new Error("User not found!");

    const isPasswordMatched = await bcryptjs.compare(password, user.password as string);
    if (!isPasswordMatched) throw new Error("Password does not match!");

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
};

const authWithGoogle = async (data: Prisma.UserCreateInput) => {
    let user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (!user) {
        user = await prisma.user.create({
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
        phone: user?.phone,
        status: user?.status,
        isVerified: user?.isVerified,
    };
}

export const AuthService = {
    loginWithEmailAndPassword,
    authWithGoogle
}
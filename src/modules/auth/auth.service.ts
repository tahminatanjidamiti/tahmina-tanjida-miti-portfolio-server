import { prisma } from "../../app/config/db";


const loginWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("User not found!")
    }

    if (password === user.password) {
        return user
    }
    else {
        throw new Error("Password is incorrect!")
    }
}


export const AuthService = {
    loginWithEmailAndPassword,

}
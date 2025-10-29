import bcryptjs from "bcryptjs";
import { Role, Prisma } from "../../generated/prisma/client";
import { prisma } from "../config/db";

export const seedAdmin = async () => {
  try {
    const isAdminExist = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_EMAIL },
    });

    if (isAdminExist) {
      return;
    }

    const hashedPassword = await bcryptjs.hash(
      process.env.ADMIN_PASSWORD as string,
      Number(process.env.BCRYPT_SALT_ROUND)
    );

    const payload: Prisma.UserCreateInput = {
      name: "Admin",
      role: Role.ADMIN,
      email: process.env.ADMIN_EMAIL as string,
      password: hashedPassword,
      isVerified: true,
    };

    const admin = await prisma.user.create({ data: payload });
    // console.log("Admin Created Successfully", admin);
  } catch (error) {
    // console.error(error);
  }
};
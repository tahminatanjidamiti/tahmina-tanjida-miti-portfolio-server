import { prisma } from "../../app/config/db";
import { Prisma, User } from "../../generated/prisma/client";
import bcryptjs from "bcryptjs";


const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    const { email, password, ...rest } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcryptjs.hash(password as string, Number(process.env.BCRYPT_SALT_ROUND))

  const createdUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      ...rest,
    },
  });

    return createdUser
}


const getAllFromDB = async () => {
    const result = await prisma.user.findMany({
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
            posts: true,
            projects: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
}

const getUserById = async (id: number) => {
    const result = await prisma.user.findUnique({
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
            posts: true,
            projects: true
        }
    })
    return result;
}

const updateUser = async (id: number, payload: Partial<Prisma.UserUpdateInput>) => {
    let dataToUpdate = { ...payload };

  if (payload.password) {
    dataToUpdate.password = await bcryptjs.hash(payload.password as string, Number(process.env.BCRYPT_SALT_ROUND))
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: dataToUpdate,
  });

  return updatedUser;
}

const deleteUser = async (id: number) => {
    const result = await prisma.user.delete({
        where: {
            id
        }
    })
    return result;
}

export const UserService = {
    createUser,
    getAllFromDB,
    getUserById,
    updateUser,
    deleteUser
}
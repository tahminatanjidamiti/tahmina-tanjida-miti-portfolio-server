import { prisma } from "../../app/config/db";
import { Prisma, Project } from "../../generated/prisma/client";

type CreateProjectPayload = Prisma.ProjectCreateInput & { authorId: number };

const createProject = async (payload: CreateProjectPayload): Promise<Project> => {
    const {
        title,
        thumbnail,
        liveSite,
        clientSite,
        serverSite,
        description,
        features,
        isFeatured,
        authorId
    } = payload;

    const cleanData = {
        title,
        thumbnail,
        liveSite,
        clientSite,
        serverSite,
        description,
        features,
        isFeatured,
        author: {
        connect: { id: authorId }
      }
    };

    const result = await prisma.project.create({
        data: cleanData,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
    return result
};

const getAllProjects = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured,
    features
}: {
    page?: number;
    limit?: number;
    search?: string;
    isFeatured?: boolean;
    features?: string[];
}) => {
    const skip = (page - 1) * limit;

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ]
            },
            typeof isFeatured === "boolean" && { isFeatured },
            (features && features.length > 0) && { techStack: { hasEvery: features } }
        ].filter(Boolean)
    };

    const result = await prisma.project.findMany({
        skip,
        take: limit,
        where,
        include: { author: true },
        orderBy: { createdAt: "desc" }
    });

    const total = await prisma.project.count({ where });

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getProjectById = async (id: number) => {
    return await prisma.$transaction(async (tx) => {
        await tx.project.update({
            where: { id },
            data: { views: { increment: 1 } }
        });

        return await tx.project.findUnique({
            where: { id },
            include: { author: true }
        });
    });
};

const updateProject = async (id: number, data: Partial<Prisma.ProjectUpdateInput>) => {
    // console.log("service", id, data)
    return prisma.project.update({ where: { id }, data });
};

const deleteProject = async (id: number) => {
    return prisma.project.delete({ where: { id } });
};

const getProjectStat = async () => {
    return await prisma.$transaction(async (tx) => {
        const aggregates = await tx.project.aggregate({
            _count: true,
            _sum: { views: true },
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true },
        });

        const featuredCount = await tx.project.count({ where: { isFeatured: true } });

        const topFeatured = await tx.project.findFirst({
            where: { isFeatured: true },
            orderBy: { views: "desc" }
        });

        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const lastWeekProjectCount = await tx.project.count({
            where: { createdAt: { gte: lastWeek } }
        });

        return {
            stats: {
                totalProjects: aggregates._count ?? 0,
                totalViews: aggregates._sum.views ?? 0,
                avgViews: aggregates._avg.views ?? 0,
                minViews: aggregates._min.views ?? 0,
                maxViews: aggregates._max.views ?? 0
            },
            featured: {
                count: featuredCount,
                topProject: topFeatured,
            },
            lastWeekProjectCount
        };
    });
};

export const ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectStat,
};

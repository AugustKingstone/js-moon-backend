import prisma from "../config/database";

export const UserModel = {
  findAll: () => {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
  },

  findById: (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
  },

  findByEmail: (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },

  create: (data: { name: string; email: string; password: string }) => {
    return prisma.user.create({ data });
  },

  update: (id: string, data: { name?: string; email?: string }) => {
    return prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
  },

  delete: (id: string) => {
    return prisma.user.delete({ where: { id } });
  },
};

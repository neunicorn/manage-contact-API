import bcrypt from "bcrypt";
import { prismaClient } from "../src/application/db/connect.js";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasiabro", 10),
      name: "test",
      token: "testtoken",
    },
  });
};

// get user
export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

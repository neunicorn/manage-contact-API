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

export const removeContact = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: "test",
      first_name: "test",
      last_name: "test",
      email: "test@gmail.com",
      phone: "1234567890",
    },
  });
};

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: "test",
    },
  });
};

export const createTestContactMany = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: "test",
        first_name: "test" + i,
        last_name: "test" + i,
        email: "test" + i + "@gmail.com",
        phone: `1234567890${i}`,
      },
    });
  }
};

export const removeAllTestAddresses = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "test",
      },
    },
  });
};

export const createTestAddress = async () => {
  const contact = await getTestContact();
  await prismaClient.address.create({
    data: {
      street: "jalan",
      city: "Kota",
      state: "state",
      country: "Negara",
      postal_code: "123456",
      contact_id: contact.id,
    },
  });
};

export const getTestAddress = async () => {
  return prismaClient.address.findFirst({
    where: {
      contact: {
        username: "test",
      },
    },
  });
};

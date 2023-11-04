import { prismaClient } from "../application/db/connect.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
  usernameValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "username already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  const result = await prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });

  return result;
};

const login = async (request) => {
  const user = validate(loginUserValidation, request);

  const isUserExists = await prismaClient.user.findUnique({
    where: {
      username: user.username,
    },
  });

  if (!isUserExists) {
    throw new ResponseError(401, "username or password is wrong");
  }

  const isPasswordMatch = await bcrypt.compare(
    user.password,
    isUserExists.password
  );

  if (!isPasswordMatch) {
    throw new ResponseError(401, "username or password is wrong");
  }

  const token = uuid().toString();

  await prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: {
      token: token,
    },
  });

  return token;
};

const get = async (username) => {
  username = validate(usernameValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user not found");
  }

  return user;
};

const update = async (request, username) => {
  const user = validate(updateUserValidation, request);

  const checkUser = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!checkUser) {
    throw new ResponseError(404, "user not found");
  }

  const data = {};

  if (request.password) {
    request.password = await bcrypt.hash(request.password, 10);
    data.password = request.password;
  }

  if (request.name) {
    data.name = request.name;
  }

  const update = await prismaClient.user.update({
    where: {
      username: username,
    },
    data,
    select: {
      username: true,
      name: true,
    },
  });

  return update;
};

const logout = async (username) => {
  username = validate(usernameValidation, username);

  const userCheck = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!userCheck) {
    throw new ResponseError(404, "user not found");
  }

  const user = await prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      token: "",
    },
    select: {
      name: true,
    },
  });

  return user;

  //   const user = await prismaClient.user
  //     .$queryRaw`UPDATE user set TOKEN = ${token} where username  = ${username}`;
};

export default {
  register,
  login,
  get,
  update,
  logout,
};

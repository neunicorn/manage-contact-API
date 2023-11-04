import { prismaClient } from "../application/db/connect";
import { ResponseError } from "../error/response-error";

export const auth = async (req, res, next) => {
  try {
    const token = req.get("Authorization");

    if (!token) {
      throw { code: 401, message: "unauthorized" };
    }

    const username = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
      select: {
        username: true,
      },
    });

    if (!username) {
      throw { code: 401, message: "unauthorized" };
    }

    req.user = username;

    next();
  } catch (err) {
    res.status(err.code || 500).json({
      status: false,
      message: err.message || "internal server error",
    });
  }
};

import userService from "../services/user-service.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  register,
};

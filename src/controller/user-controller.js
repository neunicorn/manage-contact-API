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

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);

    res.status(200).json({
      status: true,
      message: "USER_LOGGEDIN",
      data: {
        token: result,
      },
    });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await userService.get(username);
    res.status(200).json({
      status: true,
      message: "USER_FETCHED",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await userService.update(req.body, username);

    res.status(200).json({
      status: true,
      message: "USER_UPDATED",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const username = req.user.username;

    await userService.logout(username);

    res.status(200).json({
      status: true,
      message: "USER_LOGGEDOUT",
    });
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
  get,
  update,
  logout,
};

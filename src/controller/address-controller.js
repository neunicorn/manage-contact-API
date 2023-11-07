import addressService from "../services/address-service.js";

const create = async (req, res, next) => {
  try {
    const result = await addressService.create(
      req.user,
      req.params.contactId,
      req.body
    );
    res.status(201).json({
      status: true,
      message: "ADDRESS_CREATED",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await addressService.get(
      req.user,
      req.params.contactId,
      req.params.addressId
    );

    res.status(200).json({
      status: true,
      message: "ADDRESS_RETRIEVED",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id = req.params.addressId;
    const result = await addressService.update(
      req.user,
      req.params.contactId,
      req.body
    );
    res.status(200).json({
      status: true,
      message: "ADDRESS_UPDATED",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await addressService.remove(
      req.user,
      req.params.contactId,
      req.params.addressId
    );

    res.status(200).json({
      status: true,
      message: "ADDRESS_REMOVED",
    });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const result = await addressService.list(req.user, req.params.contactId);
    res.status(200).json({
      status: true,
      message: "GET_ADDRESS_LIST",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  create,
  get,
  update,
  remove,
  list,
};

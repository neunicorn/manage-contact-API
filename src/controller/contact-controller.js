import contactService from "../services/contact-service.js";

const create = async (req, res, next) => {
  try {
    req.body.username = req.user.username;
    const result = await contactService.createContact(req.body);

    res.status(201).json({
      status: true,
      message: "CONTACT_CREATED",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await contactService.get(req.user, req.params.contactId);
    res.status(200).json({
      status: true,
      message: "CONTACT_RETRIEVED",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    req.body.id = req.params.contactId;
    req.body.username = req.user.username;
    const result = await contactService.update(req.body);
    res.status(200).json({
      status: true,
      message: "CONTACT_UPDATED",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await contactService.remove(req.user, req.params.contactId);
    res.status(200).json({
      status: true,
      message: "CONTACT_REMOVED",
    });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  const request = {
    name: req.query.name,
    email: req.query.email,
    phone: req.query.phone,
    page: req.query.page,
    size: req.query.size,
  };
  try {
    const result = await contactService.search(req.user, request);
    res.status(200).json({
      status: true,
      message: "CONTACTS_RETRIEVED",
      data: result.data,
      pagging: result.pagging,
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
  search,
};

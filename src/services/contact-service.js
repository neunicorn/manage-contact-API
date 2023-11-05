import { prismaClient } from "../application/db/connect.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";

const createContact = async (request) => {
  const contact = validate(createContactValidation, request);

  const checkUser = await prismaClient.user.count({
    where: {
      username: contact.username,
    },
  });

  if (checkUser !== 1) {
    throw new ResponseError(404, "username not found");
  }

  const result = await prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  return result;
};

const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
  if (!contact) throw new ResponseError(404, "contact not found");

  return contact;
};

const update = async (request) => {
  const contact = validate(updateContactValidation, request);

  const checkContact = await prismaClient.contact.count({
    where: {
      username: contact.username,
      id: contact.id,
    },
  });

  if (checkContact !== 1) throw new ResponseError(404, "contact not found");
  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
    },
  });

  if (!contact) throw new ResponseError(404, "contact not found");

  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchContactValidation, request);

  const skip = (request.page - 1) * request.size;
  const take = request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.name) {
    filters.push({
      OR: [
        {
          first_name: {
            contains: request.name,
          },
        },
        {
          last_name: {
            contains: request.name,
          },
        },
      ],
    });
  }
  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone,
      },
    });
  }
  if (request.email) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }

  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: take,
    skip: skip,
  });

  const totalItems = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: contacts,
    pagging: {
      page: request.page,
      size: take,
      total_items: totalItems,
      total_pages: Math.ceil(totalItems / take),
    },
  };
};

export default {
  createContact,
  get,
  update,
  remove,
  search,
};

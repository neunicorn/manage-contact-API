import request from "supertest";
import { app } from "../src/application/app.js";
import { logger } from "../src/application/log/logging.js";
import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeAllTestAddresses,
  removeContact,
  removeTestUser,
} from "./test-util.js";

describe("POST /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeContact();
    await removeTestUser();
  });
  it("should be able create address in a specific contact", async () => {
    const testContact = await getTestContact();

    const result = await request(app)
      .post(`/api/contacts/${testContact.id}/addresses`)
      .send({
        street: "jalan",
        city: "Kota",
        state: "state",
        country: "Negara",
        postal_code: "123456",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(201);
    expect(result.body.status).toBeTruthy();
    expect(result.body.data.id).toBeDefined();
  });
  it("should be reject create address, because id contact not found", async () => {
    const testContact = await getTestContact();

    const result = await request(app)
      .post(`/api/contacts/2432556/addresses`)
      .send({
        street: "jalan",
        city: "Kota",
        state: "state",
        country: "Negara",
        postal_code: "123456",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(404);
    expect(result.body.status).toBeFalsy();
    expect(result.body.message).toBe("contact not found");
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeContact();
    await removeTestUser();
  });

  it("should be able get specific address of an contact based on id", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await request(app)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
    expect(result.body.data.id).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeContact();
    await removeTestUser();
  });

  it("should be able update address data", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await request(app)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .send({
        street: "test",
        city: "test",
        state: "test",
        country: "test",
        postal_code: "test",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
    expect(result.body.data.id).toBeDefined();
  });

  it("should be rejected because wrong data input", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await request(app)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .send({
        street: "test",
        city: "test",
        state: "test",
        country: "",
        postal_code: "",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(400);
    expect(result.body.status).toBeFalsy();
  });
  it("should be rejected because wrong id", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await request(app)
      .put(`/api/contacts/45345/addresses/${testAddress.id}`)
      .send({
        street: "test",
        city: "test",
        state: "test",
        country: "test",
        postal_code: "test23",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(404);
    expect(result.body.status).toBeFalsy();
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeContact();
    await removeTestUser();
  });

  it("should be able remove address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await request(app)
      .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
    expect(result.body.message).toBe("ADDRESS_REMOVED");
  });
});

describe("GET /api/contacts/:contactsId/addresses", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeContact();
    await removeTestUser();
  });

  it("should be able get address list from a contacts", async () => {
    const contact = await getTestContact();

    const result = await request(app)
      .get(`/api/contacts/${contact.id}/addresses`)
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
  });
});

import request from "supertest";
import { app } from "../src/application/app.js";
import {
  createTestContact,
  createTestContactMany,
  createTestUser,
  getTestContact,
  getTestUser,
  removeContact,
  removeTestUser,
} from "./test-util.js";
import { logger } from "../src/application/log/logging.js";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeContact();
    await removeTestUser();
  });
  it("should can make contact", async () => {
    const result = await request(app)
      .post("/api/contacts")
      .send({
        first_name: "first",
        last_name: "last name",
        email: "example@email.com",
        phone: "1234567890",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(201);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("first");
    expect(result.body.data.last_name).toBe("last name");
    expect(result.body.data.email).toBe("example@email.com");
    expect(result.body.data.phone).toBe("1234567890");
  });

  it("should can create contact with several parameters are used", async () => {
    const result = await request(app)
      .post("/api/contacts")
      .send({
        first_name: "first",
        phone: "1234567890",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(201);
    expect(result.body.status).toBeTruthy();
    expect(result.body.message).toBe("CONTACT_CREATED");
    expect(result.body.data.first_name).toBe("first");
    expect(result.body.data.phone).toBe("1234567890");
  });

  it("should reject because wrong param input", async () => {
    const result = await request(app)
      .post("/api/contacts")
      .send({
        first_name: "",
        phone: "1234567890",
        email: "zulfan",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(400);
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeContact();
    await removeTestUser();
  });

  it("should be able to get contact", async () => {
    const { id } = await getTestContact();
    const result = await request(app)
      .get(`/api/contacts/${id}`)
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
    expect(result.body.data.id).toBe(id);
  });

  it("should return 404 if contact id is not found", async () => {
    const testContact = await getTestContact();

    const result = await request(app)
      .get("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "testtoken");

    expect(result.status).toBe(404);
    expect(result.body.status).toBeFalsy();
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeContact();
    await removeTestUser();
  });
  it("should be able update contact", async () => {
    const contact = await getTestContact();
    const result = await request(app)
      .put(`/api/contacts/${contact.id}`)
      .send({
        username: "test2",
        first_name: "test2",
        last_name: "tes2t",
        email: "test2@gmail.com",
        phone: "1234567890",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
    expect(result.body.message).toBe("CONTACT_UPDATED");
    expect(result.body.data.id).toBe(contact.id);
    expect(result.body.data.first_name).toBe("test2");
    expect(result.body.data.last_name).toBe("tes2t");
    expect(result.body.data.email).toBe("test2@gmail.com");
    expect(result.body.data.phone).toBe("1234567890");
  });
  it("should be error because wrong id", async () => {
    const contact = await getTestContact();
    const result = await request(app)
      .put(`/api/contacts/98734`)
      .send({
        username: "test2",
        first_name: "test2",
        last_name: "tes2t",
        email: "test2@gmail.com",
        phone: "1234567890",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(404);
    expect(result.body.status).toBeFalsy();
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeContact();
    await removeTestUser();
  });

  it("should be able to remove contact based on contactId", async () => {
    const { id } = await getTestContact();
    const result = await request(app)
      .delete("/api/contacts/" + id)
      .set("Authorization", "testtoken");
    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
    expect(result.body.message).toBe("CONTACT_REMOVED");
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContactMany();
  });

  afterEach(async () => {
    await removeContact();
    await removeTestUser();
  });

  it("should be able to search contacts using query params", async () => {
    const result = await request(app)
      .get("/api/contacts")
      .query({
        name: "test",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(200);
  });
});

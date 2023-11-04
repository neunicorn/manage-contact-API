import request from "supertest";
import { app } from "../src/application/app.js";
import { prismaClient } from "../src/application/db/connect.js";
import { logger } from "../src/application/log/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe("POST /api/users", () => {
  afterAll(async () => {
    await removeTestUser();
  });

  it("should be able to register new user", async () => {
    const result = await request(app).post("/api/users").send({
      username: "test",
      name: "Muhamad Zulfan",
      password: "bukutulis12",
    });

    expect(result.status).toEqual(201);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("Muhamad Zulfan");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await request(app).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result);

    expect(result.status).toBe(400);
    expect(result.body.message).toBeDefined();
  });

  it("should reject if username already registered ", async () => {
    const result = await request(app).post("/api/users").send({
      username: "test",
      name: "Muhamad Zulfan",
      password: "bukutulis12",
    });

    expect(result.status).toBe(400);
    expect(result.body.status).toBeFalsy();
    expect(result.body.message).toBe("username already exists");
  });
});

describe("POST /api/users/login", () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await removeTestUser();
  });

  it("should can login", async () => {
    const result = await request(app).post("/api/users/login").send({
      username: "test",
      password: "rahasiabro",
    });

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
    expect(result.body.data.token).toBeDefined();
  });

  it("should be reject because unautorize", async () => {
    const result = await request(app).post("/api/users/login").send({
      username: "",
      password: "",
    });

    logger.info(result);

    expect(result.status).toBe(400);
    expect(result.body.status).toBeFalsy();
  });

  it("should be reject because password is wrong", async () => {
    const result = await request(app).post("/api/users/login").send({
      username: "test",
      password: "hehehehe",
    });

    logger.info(result);

    expect(result.status).toBe(401);
    expect(result.body.status).toBeFalsy();
    expect(result.body.message).toBe("username or password is wrong");
  });
});

describe("GET /api/users/current", () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await removeTestUser();
  });
  it("should be able to get user", async () => {
    const result = await request(app)
      .get("/api/users/current")
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
  });
});

describe("PATCH /api/users/current", () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await removeTestUser();
  });

  it("should be able update user password and name", async () => {
    const result = await request(app)
      .patch("/api/users/current")
      .send({
        name: "zulfan",
        password: "rahasiabangetbro",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
    expect(result.body.data.name).toBe("zulfan");
    expect(result.body.data.username).toBe("test");
    const user = await prismaClient.user.findUnique({
      where: {
        username: "test",
      },
    });
    expect(
      await bcrypt.compare("rahasiabangetbro", user.password)
    ).toBeTruthy();
  });

  it("should be able update user password only", async () => {
    const result = await request(app)
      .patch("/api/users/current")
      .send({
        password: "rahasiabangetbro",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
    expect(result.body.data.username).toBe("test");
    const user = await prismaClient.user.findUnique({
      where: {
        username: "test",
      },
    });
    expect(
      await bcrypt.compare("rahasiabangetbro", user.password)
    ).toBeTruthy();
  });
  it("should be able update user name only", async () => {
    const result = await request(app)
      .patch("/api/users/current")
      .send({
        name: "zulfan",
      })
      .set("Authorization", "testtoken");

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.status).toBeTruthy();
    expect(result.body.data.name).toBe("zulfan");
    expect(result.body.data.username).toBe("test");
  });
});

describe.only("DELETE /api/users/logout", () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await removeTestUser();
  });

  it("should be logout, TOKEN deleted", async () => {
    const response = await request(app)
      .delete("/api/users/logout")
      .set("Authorization", "testtoken");

    logger.info(response);

    expect(response.status).toBe(200);
    expect(response.body.status).toBeTruthy();
    expect(response.body.message).toBe("USER_LOGGEDOUT");
  });
});

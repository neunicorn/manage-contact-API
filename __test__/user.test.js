import request from "supertest";
import { app } from "../src/application/app.js";
import { prismaClient } from "../src/application/db/connect.js";
import { logger } from "../src/application/log/logging.js";

describe("POST /api/users", () => {
  afterAll(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "baehq12",
      },
    });
  });

  it("should be able to register new user", async () => {
    const result = await request(app).post("/api/users").send({
      username: "baehq12",
      name: "Muhamad Zulfan",
      password: "bukutulis12",
    });

    expect(result.status).toEqual(201);
    expect(result.body.data.username).toBe("baehq12");
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
      username: "baehq12",
      name: "Muhamad Zulfan",
      password: "bukutulis12",
    });

    expect(result.status).toBe(400);
    expect(result.body.status).toBeFalsy();
    expect(result.body.message).toBe("username already exists");
  });
});

const request = require("supertest");
const app = require("../server");
const { sequelize, User } = require("../models");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("POST /api/auth/register", () => {
  it("debería registrar un usuario nuevo", async () => {
    const res = await request(app).post("/api/auth/register").send({
      nombre: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});

describe("GET /api/auth/perfil", () => {
  it("no debería dejar acceder sin token", async () => {
    const res = await request(app).get("/api/auth/perfil");
    expect(res.statusCode).toBe(401);
  });
  it("debería permitir el acceso con un token válido", async () => {
    const registerRes = await request(app).post("/api/auth/register").send({
      nombre: "User Exitoso",
      email: "exito@test.com",
      password: "password123",
    });

    const { token } = registerRes.body;

    const res = await request(app)
      .get("/api/auth/perfil")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("email", "exito@test.com");
  });
});

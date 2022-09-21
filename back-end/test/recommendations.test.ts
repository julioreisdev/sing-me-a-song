import app from "../src/app";
import supertest from "supertest";
import recommendationsFactory from "./factories/recommendationsFactory";
import { prisma } from "../src/database";
import { Recommendation } from "@prisma/client";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
});

describe("/recommendations POST", () => {
  it("Deve retornar 422 ao tentar cadastrar com formato inválido.", async () => {
    const recommendation =
      await recommendationsFactory.recommendationInvalidFormmat();
    const response = await supertest(app)
      .post("/recommendations")
      .send(recommendation);

    expect(response.status).toBe(422);
  });
  it("Deve retornar 201 ao tentar cadastrar com formato válido.", async () => {
    const recommendation =
      await recommendationsFactory.recommendationValidFormmat();
    const response = await supertest(app)
      .post("/recommendations")
      .send(recommendation);

    expect(response.status).toBe(201);
  });
});

describe("/recommendations GET", () => {
  it("Deve retornar 200 e um array ao buscar por recomendações.", async () => {
    const response = await supertest(app).get("/recommendations").send();
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("/recommendations/random GET", () => {
  it("Deve retornar 404 ao buscar aleatoriamente sem recomendações cadastradas.", async () => {
    const response = await supertest(app).get("/recommendations/random").send();
    expect(response.status).toBe(404);
  });
  it("Deve retornar 200 ao buscar aleatoriamente com recomendações cadastradas.", async () => {
    const recommendation =
      await recommendationsFactory.recommendationValidFormmat();
    await supertest(app).post("/recommendations").send(recommendation);
    const response = await supertest(app).get("/recommendations/random").send();
    expect(response.status).toBe(200);
  });
});

describe("/recommendations/id GET", () => {
  it("Deve retornar 404 ao buscar por id que não existe.", async () => {
    const response = await supertest(app).get("/recommendations/-1").send();
    expect(response.status).toBe(404);
  })
  it("Deve retornar 200 ao buscar por id existente.", async() => {
    const recommendation =
      await recommendationsFactory.recommendationValidFormmat();
    await supertest(app).post("/recommendations").send(recommendation);
    const result: Recommendation[] = await prisma.recommendation.findMany()
    const response = await supertest(app).get(`/recommendations/${result[0].id}`).send();
    expect(response.status).toBe(200);
  })
})

afterAll(async () => {
  await prisma.$disconnect();
});

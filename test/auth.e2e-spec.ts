import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/modules/app.module";

describe("Authorization testing", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("Register request", async () => {
    const email = "admin1234567@gmail.com";
    return await request(app.getHttpServer())
      .post("/auth/register").send({ email, password: "12345678" })
      .expect(201).then((res) => {
        expect(res.body.email).toEqual(email);
        expect(res.body.id).toBeDefined();
      });
  });

  it("Register as a new user and get who am i request from cookie", async () => {
    const email = "admin12345678@gmail.com";
    const res = await request(app.getHttpServer())
      .post("/auth/register").send({ email, password: "12345678" }).expect(201);

    let cookie = res.get("Set-Cookie");
    const { body } = await request(app.getHttpServer())
      .get("/auth/me").set("Cookie", cookie).expect(200);
    expect(body.email).toEqual(email);
  });
});

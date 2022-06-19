import { Test } from "@nestjs/testing";
import { AuthService } from "../src/services/auth.service";
import { UserService } from "../src/services/user.service";
import { Auth } from "../src/schema/user.entity";

describe("AuthService", () => {
  let service: AuthService;
  let fakeUserService: Partial<UserService>;
  const users: Auth[] = [];
  beforeEach(async () => {
    fakeUserService = {
      findAll: async () => Promise.resolve(users),
      create: async (email, password) => Promise.resolve({
        id: Math.floor(Math.random() * 999999),
        email,
        online: true,
        password
      }),
      save: async (user) => {
        users.push(user);
        return user;
      },
      findOneBy: async (query) => {
        const user = users.filter(u => u.email === query.email || u.id === query.id);
        return Promise.resolve(user[0] as Auth);
      }
    };
    const module = await Test.createTestingModule({
      providers: [AuthService, { provide: UserService, useValue: fakeUserService }]
    }).compile();
    service = module.get(AuthService);
  });

  it("creating instance of auth service", async () => {
    expect(service).toBeDefined();
  });

  it("register new user", async () => {
    const user = await service.register("admin@gmail.com", "12345678");
    expect(user).toBeDefined();
    expect(user.password).not.toEqual("12345678");
    expect(user.online).toEqual(true);
  });

  it("login existing user", async () => {
    await service.register("admin@gmail.com", "12345678");
    const user = await service.login("admin@gmail.com", "12345678");
    expect(user).toBeDefined();
  });

  it("throws if an invalid password is provided", async () => {
    await service.register("admin@gmail.com", "12345678");
    await expect(service.login("admin@gmail.com", "123456789")).rejects.toThrow(Error);
  });

});

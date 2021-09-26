const app = require("../src");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const { initializeDatabase } = require("../src/Database");

describe("Main test", () => {
	const user = {
		email: "useroraculo@email.com",
		password: "oraculo123",
		departmentID: 3,
		level: 2,
		sectionID: 3,
	};

	beforeAll(async () => {
		await initializeDatabase();
		await request(app).post("/register").send(user);
		return;
	});

	it("Test express server app", (done) => {
		expect(app).toBeDefined();
		done();
		return;
	});

	it("POST /register - should not create because user already exists", async () => {
		const res = await request(app).post("/register").send(user);
		expect(res.statusCode).toEqual(400);
		return res;
	});

	it("POST /login - should login", async () => {
		const res = await request(app)
			.post("/login")
			.send({ email: user.email, password: user.password });

		expect(res.statusCode).toBe(200);
		return res;
	});

	it("POST /login - should not login", async () => {
		const res = await request(app)
			.post("/login")
			.send({ email: "user@gmail.com", password: "12345" });

		expect(res.statusCode).toBe(401);
		return res;
	});

	it("POST /login - should not login (invalid credentials)", async () => {
		const res = await request(app)
			.post("/login")
			.send({ email: user.email, password: "wrongpassword" });

		expect(res.statusCode).toBe(401);
		return res;
	});
});

afterAll((done) => {
	done();
});

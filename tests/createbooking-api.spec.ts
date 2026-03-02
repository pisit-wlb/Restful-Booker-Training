import { test, expect, request } from '@playwright/test';

let token: any;
test("เข้าสู่ระบบและ การจองด้วย firstname lastname และ เวลา Checkin Checkout", async ({ request }) => {

	await test.step("เข้าสู่ระบบด้วย Username และ Password", async () => {
		const responseLogin = await request.post("https://restful-booker.herokuapp.com/auth", {
			data: {
				"username" : "admin",
				"password" : "password123"
			}
		})
		expect(responseLogin.ok()).toBeTruthy();
		const responseBody = await responseLogin.json();
		await test.info().attach("API-Token Response", {
			body: JSON.stringify(responseBody, null, 2),
			contentType: "application/json"
		});
		token = responseBody.token;
	});
});
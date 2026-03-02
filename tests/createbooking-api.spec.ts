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

	await test.step("สร้างการจองที่พัก firstname: Pisit และ lastname: Wanakitrungrueng และตรวจสอบผลการจองที่พัก", async () => {
		const responseCreateBooking = await request.post("https://restful-booker.herokuapp.com/booking", {
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			data: {
				"firstname": "Pisit",
				"lastname": "Wanakitrungrueng",
				"totalprice": 111,
				"depositpaid": true,
				"bookingdates": {
					"checkin": "2026-03-07",
					"checkout": "2026-03-10"
				},
				"additionalneeds": "Spare-bed and Dinner"
			}
		});
		expect(responseCreateBooking.ok()).toBeTruthy();
		const responseBody = await responseCreateBooking.json();
		await test.info().attach("API-Booking Response", {
			body: JSON.stringify(responseBody, null, 2),
			contentType: "application/json"
		});
				expect(responseBody.booking).toMatchObject({
			"firstname": "Pisit",
			"lastname": "Wanakitrungrueng",
			"totalprice": 111,
			"depositpaid": true,
			"bookingdates": {
				"checkin": "2026-03-07",
				"checkout": "2026-03-10"
			},
			"additionalneeds": "Spare-bed and Dinner"
		})
	});
});
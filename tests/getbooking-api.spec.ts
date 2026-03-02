import { test, expect, request } from '@playwright/test';

test("ค้นหาข้อมูลการจองที่พัก และตรวจสอบข้อมูลการจอง", async ({ request }) => {
	await test.step("ค้นหาข้อมูลการจองที่พัก", async () => {
		const responseBookingID = await request.get("https://restful-booker.herokuapp.com/booking?firstname=Pisit&lastname=Wanakitrungrueng");
		expect(responseBookingID.ok()).toBeTruthy();
		const responseBody = await responseBookingID.json();
		await test.info().attach("API-BookingID Response", {
			body: JSON.stringify(responseBody),
			contentType: "application/json"
		});
	});

	await test.step("ตรวจสอบข้อมูลการจอง", async () => {
		const responseBooking = await request.get("https://restful-booker.herokuapp.com/booking/1615",{
			headers: {
				"Accept" : "application/json",
			}
		});
		const responseBody = await responseBooking.json();
		expect(responseBody).toMatchObject({
			"firstname": "Pisit",
			"lastname": "Wanakitrungrueng",
			"totalprice": 111,
			"depositpaid": true,
			"bookingdates": {
				"checkin": "2026-03-07",
				"checkout": "2026-03-10"
			},
			"additionalneeds": "Spare-bed and Dinner"
	});
});
});
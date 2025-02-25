import { test } from "../fixture";


test.describe("Login page", () => {
    test("should login to home page", async ({
        page,
        loginPage
    }) => {
        await page.goto("https://neeto-form-web-playwright.neetodeployapp.com/")

        await loginPage.loginAndVerifyUser({
            email: "oliver@example.com",
            password: "welcome",
            username: "Oliver Smith"
        });

    });
})
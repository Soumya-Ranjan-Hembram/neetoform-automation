import { expect } from "@playwright/test";
import { test } from "../fixture";

test.describe("Form page", () => {
    test("should create a form from scratch and publish it.", async ({
        page,
        context,
        loginPage,
        formPage
    }) => {
        await page.goto("https://neeto-form-web-playwright.neetodeployapp.com/");

        await loginPage.loginAndVerifyUser({
            email: "oliver@example.com",
            password: "welcome",
            username: "Oliver Smith"
        });

        await formPage.createNewForm();
        await formPage.addFormFields();
        await formPage.publishForm();

        const previewPage = await formPage.openPublishedForm(context);

        await formPage.verifyFields(previewPage);

        await formPage.validateFieldErrors(previewPage);
    })
})
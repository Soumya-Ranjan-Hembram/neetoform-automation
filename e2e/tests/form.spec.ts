import { expect } from "@playwright/test";
import { test } from "../fixture";

test.describe("Form page", () => {

    test.beforeEach(async ({ page, formPage }, testInfo) => {

        if (testInfo.title.includes("[SKIP_SETUP]")) return;
        await page.goto("/")
    })


    test("should create a form from scratch and publish it. [SKIP_SETUP]", async ({
        page,
        context,
        loginPage,
        formPage
    }) => {
        await page.goto("/");

        // await loginPage.loginAndVerifyUser({
        //     email: "oliver@example.com",
        //     password: "welcome",
        //     username: "Oliver Smith"
        // });

        await formPage.createNewForm();
        await formPage.addFormFields();
        await formPage.publishForm();

        const previewPage = await formPage.openPublishedForm(context);

        await formPage.verifyFields(previewPage);

        await formPage.validateFieldErrors(previewPage);

        await formPage.fillAndSubmitForm(previewPage);

    })
})
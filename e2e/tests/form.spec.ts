import { expect } from "@playwright/test";
import { test } from "../fixture";
import { faker } from "@faker-js/faker";
test.describe("Form page", () => {
    let formName: string;
    let firstName: string;
    let lastName: string;
    let email: string;
    let phoneNumber: string;

    test.beforeEach(async ({ page, formPage }, testInfo) => {
        formName = faker.word.sample(10)
        firstName = faker.person.firstName();
        lastName = faker.person.lastName();
        email = faker.internet.email();
        // phoneNumber = faker.phone.number({ style: "international" }).substring(1, 11)
        phoneNumber = "2025550123";

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
        await formPage.addFormFieldsAndUpdateFormName({ formName });
        await formPage.publishForm();

        const previewPage = await formPage.openPublishedForm(context);

        await formPage.verifyFields(previewPage);

        await formPage.validateFieldErrors(previewPage);

        await formPage.fillAndSubmitForm(previewPage, {
            firstName,
            lastName,
            email,
            phoneNumber
        });


        await formPage.validateTheSubmissionFields({
            formName
        }, {
            firstName,
            lastName,
            email,
            // phoneNumber
        })

    })
})
import { expect } from "@playwright/test";
import { test } from "../fixture";
import { faker } from "@faker-js/faker";
import FormPage from "../poms/form";
import { publicDecrypt } from "crypto";

test.describe("Form page", () => {
    let formName: string;
    let firstName: string;
    let lastName: string;
    let email: string;
    let phoneNumber: string;

    test.beforeEach(async ({ page }, testInfo) => {
        formName = faker.word.sample(10);
        firstName = faker.person.firstName();
        lastName = faker.person.lastName();
        email = faker.internet.email();
        phoneNumber = "2025550123";

        if (testInfo.title.includes("[SKIP_SETUP]")) return;
        await page.goto("/");
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });


    /*
        test("should create and submit a form", async ({ page, context, formPage }) => {
            let previewPage;
    
            await test.step("Step 1: Clicked on add new form", async () => {
                await formPage.createNewForm();
            });
    
            await test.step("Step 2: Update form name", async () => {
                await formPage.updateFormName({ formName });
            });
    
            await test.step("Step 3: Add full name and phone number fields", async () => {
                await formPage.addFormFields();
            });
    
            await test.step("Step 4: Publish the form", async () => {
                await formPage.publishForm();
    
                previewPage = await formPage.openPublishedForm(context);
    
                await formPage.verifyFields(previewPage);
            });
    
            await test.step("Step 5: Validate field errors", async () => {
                await formPage.validateFieldErrors(previewPage);
            });
    
            await test.step("Step 6: Fill and submit the form", async () => {
                await formPage.fillAndSubmitForm(previewPage, {
                    firstName,
                    lastName,
                    email,
                    phoneNumber
                });
            });
    
            await test.step("Step 7: Validate submission fields", async () => {
                await formPage.validateTheSubmissionFields(
                    { formName },
                    { firstName, lastName, email }
                );
            });
        });
    
    
        test("should customize form's field elements", async ({ page, context, formPage }) => {
            await test.step("Step 1: Create a new form and update name", async () => {
                await formPage.createNewForm();
                await formPage.updateFormName({ formName });
            });
    
            await test.step("Step 2: Add single and multi-choice elements", async () => {
                await formPage.addSingleChoiceElement();
                await formPage.addMultiChoiceElement();
            });
    
            await test.step("Step 3: Add six more options and randomize single choice", async () => {
                await formPage.addBulkOptionsToElements();
                await formPage.addRandomizationToSingleChoice();
            });
    
            await test.step("Step 4: Hide multi-choice element and publish form", async () => {
                await formPage.hideMultiChoiceElement();
                await formPage.publishForm();
            });
    
            await test.step("Step 5: Verify hidden and randomized elements", async () => {
                const previewPage1 = await formPage.openPublishedForm(context);
                await formPage.validateMultipleIsHiddenAndSingleIsVisible(previewPage1);
            });
    
            await test.step("Step 6: Unhide multi-choice element and republish", async () => {
                await formPage.unhideMultiChoiceElement();
                await formPage.publishForm();
            });
    
            await test.step("Step 7: Verify both fields are visible in published form", async () => {
                const previewPage2 = await formPage.openPublishedForm(context);
                await formPage.validateBothMultipleAndSingleIsVisible(previewPage2);
            });
        });
    
    
        test("should verfy form insights", async ({
            page,
            context,
            formPage
        }) => {
            let previewPage;
    
            await test.step("Step 1: Create a new form and update name", async () => {
                await formPage.createNewForm();
                await formPage.updateFormName({ formName });
            });
            await test.step("Step 2: Publish form and goto analytics page", async () => {
                await formPage.publishFormForVerifyInsight();
    
            });
    
            await test.step("Step 3: visit preview page and check the visits count", async () => {
                await formPage.verifyInitialInsights()
    
                previewPage = await formPage.openPublishedForm(context);
    
                await formPage.visitPreviewPageAndVerifyEmailField(previewPage);
            });
    
            await test.step("Step 4: verify count increments", async () => {
                await formPage.verifyVisitCountIncrease(context);
    
                await formPage.verifyStartCountIncrease(context)
            });
    
            await test.step("Step 5: verify submission count increment", async () => {
                await formPage.verifySubmissionCountIncrease(context);
            })
        });
    
    
        test('should test access control feature of the form', async ({
            page,
            context,
            browser,
            formPage
        }) => {
            let previewPage;
    
            await test.step('Step 1: Creat a new form and publish it.', async () => {
                await formPage.createNewForm();
                await formPage.publishForm();
            })
    
            await test.step("Step 2: navigate to the configure tab and click on access control.", async () => {
                await formPage.gotoSettingTab();
                await formPage.clickOnAccessControl();
            })
            await test.step("Step 3: Select and check the password option.", async () => {
                await formPage.choosePasswordOption();
                await formPage.checkAccessPasswordWorkingProperly();
            })
            await test.step("Step 4: Enter password an save change", async () => {
                await formPage.enterAccessPasswordAndSaveChange();
            })
            await test.step('Step 5: Open Form in incognito, verify the form is password protected and submit response', async () => {
                const incognitoUserContext = await browser.newContext({
                    storageState: { cookies: [], origins: [] },
                });
    
                const incognitoUserPage = await incognitoUserContext.newPage();
    
                await formPage.gotoShareTab();
    
                await formPage.getTheShareLink(context);
    
                await formPage.verifyThePasswordProtectedForm(incognitoUserPage);
                await formPage.submitAndVerifyTheResponse(incognitoUserPage);
            })
        })
    */


    test('should have unique submission', async ({
        page,
        context,
        browser,
        formPage
    }) => {

        let previewPage;

        await test.step('Step 1: Creat a new form and publish it.', async () => {
            await formPage.createNewForm();
            await formPage.publishForm();
        });

        await test.step("Step 2: navigate to the configure tab and click on unique submission.", async () => {
            await formPage.gotoSettingTab();
            await formPage.clickOnPreventDuplicateSubmission();
        });

        await test.step("Step 3: Check use cookies option", async () => {
            await formPage.choosePreventDuplicateSubmission()
        })

        await test.step("Step 4: Check use cookies option", async () => {
            const preventDuplicateSubmissionPreviewPage = await formPage.openPublishedForm(context);

            await formPage.validateThatOneCannotSubmitResponseTwice(preventDuplicateSubmissionPreviewPage, context)
        });

        await test.step("Step 5: Check can we able to visit the site using different cookie.", async () => {

            const incognitoUserContext = await browser.newContext({
                storageState: { cookies: [], origins: [] },
            });

            const incognitoUserPage = await incognitoUserContext.newPage();

            await formPage.gotoShareTab();
            await formPage.getTheShareLink(context);
            await formPage.openFormWithDifferentCookie(incognitoUserPage);
        });

        await test.step("Step 6: Check no check option and ensure multiple submission using same cookie.", async () => {
            await formPage.chooseNoCheckOption()
            const allowDuplicateSubmissionPreviewPage = await formPage.openPublishedForm(context);
            await formPage.validateThatOneCanSubmitMultipleResponse(allowDuplicateSubmissionPreviewPage, context);
            const allowDuplicateSubmissionPreviewPage2 = await formPage.openPublishedForm(context);
            await formPage.validateThatOneCanSubmitMultipleResponse(allowDuplicateSubmissionPreviewPage2, context);
        });

    });
});

import { BrowserContext, Page, expect } from "@playwright/test";
interface FormName {
    formName: string;
}
export default class FormPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    createNewForm = async () => {
        await this.page.getByRole('button', { name: 'Add new form' }).click();
        await expect(this.page.getByText(/Start from scratchA blank/i)).toBeVisible({ timeout: 5000 });
        await this.page.getByText(/Start from scratchA blank/i).click();
    }


    updateFormName = async ({ formName }: FormName) => {
        await expect(this.page.getByTestId('elements-container')).toBeVisible({ timeout: 30000 });
        await expect(this.page.getByTestId('publish-button')).toBeVisible({ timeout: 30000 });
        await this.page.getByTestId('neeto-molecules-value-display').click();

        await expect(this.page.getByTestId('neeto-molecules-name-input')).toBeVisible();

        const nameInput = this.page.getByTestId('neeto-molecules-name-input');
        await nameInput.fill("");

        await nameInput.fill(formName);
        await this.page.getByTestId('neeto-molecules-rename-button').click()

        await expect(this.page.getByText(formName)).toBeVisible({ timeout: 5000 });
    }


    addFormFields = async () => {
        await expect(this.page.getByTestId('elements-container')).toBeVisible({ timeout: 30000 });
        await expect(this.page.getByTestId('publish-button')).toBeVisible({ timeout: 30000 });

        await this.page.getByTestId('elements-container').getByRole('button', { name: 'Full name' }).click();
        await this.page.getByTestId('elements-container').getByRole('button', { name: 'Phone number' }).click();
    }

    publishForm = async () => {
        await this.page.getByTestId("publish-button").click();
    }

    /**
     * @Refer : https://playwright.dev/docs/pages#handling-new-pages
     * How to handle new page.
     * */

    openPublishedForm = async (context: BrowserContext) => {
        const pagePromise = context.waitForEvent("page");
        await this.page.getByTestId("publish-preview-button").click();

        const previewPage = await pagePromise;
        // await previewPage.waitForLoadState("domcontentloaded");
        await previewPage.waitForLoadState("domcontentloaded", { timeout: 60000 });


        return previewPage;
    };



    verifyFields = async (previewPage: Page) => {
        const emailInputField = previewPage.locator("[data-cy='email-text-field']");
        await expect(emailInputField).toBeVisible();

        const firstNameInputField = previewPage.locator("[data-cy='full-name-fields']").locator("input").nth(0);
        await expect(firstNameInputField).toBeVisible();

        const lastNameInputField = previewPage.locator("[data-cy='full-name-fields']").locator("input").nth(1);
        await expect(lastNameInputField).toBeVisible();

        const numberInputField = previewPage.locator("[data-cy='phone-number-input-field']");
        await expect(numberInputField).toBeVisible();

        // Uncomment the below lines if you want to fill in the fields
        // await emailInputField.fill('test@example.com');
        // await firstNameInputField.fill('John');
        // await lastNameInputField.fill('Doe');
        // await numberInputField.fill('9827392493');
    };


    validateFieldErrors = async (previewPage: Page) => {

        await previewPage.getByRole("button", { name: "Submit" }).click();


        await expect(previewPage.getByText(/Email address is required/i)).toBeVisible();
        await expect(previewPage.getByText(/First name is required/i)).toBeVisible();
        await expect(previewPage.getByText(/Last name is required/i)).toBeVisible();
        await expect(previewPage.getByText(/Phone number is invalid/i)).toBeVisible();


        await previewPage.locator("[data-cy='email-text-field']").fill("soumya");
        await previewPage.locator("[data-cy='phone-number-input-field']").fill("1");


        await previewPage.getByRole("button", { name: "Submit" }).click();


        await expect(previewPage.getByText(/Email address is invalid/i)).toBeVisible();
        await expect(previewPage.getByText(/US numbers cannot start with a one./i)).toBeVisible();

        await previewPage.locator("[data-cy='email-text-field']").fill("");
        await previewPage.locator("[data-cy='phone-number-input-field']").fill("");
    };

    fillAndSubmitForm = async (previewPage: Page, {
        firstName,
        lastName,
        email,
        phoneNumber
    }) => {
        await previewPage.locator("[data-cy='first-name-text-field']").fill(firstName);
        await previewPage.locator("[data-cy='last-name-text-field']").fill(lastName);
        await previewPage.locator("[data-cy='email-text-field']").fill(email);
        await previewPage.locator("[data-cy='phone-number-input-field']").fill(phoneNumber); // US Number

        await Promise.all([
            previewPage.waitForURL(/thank-you/),
            previewPage.getByRole("button", { name: "Submit" }).click()
        ]);

        await expect(previewPage.locator("[data-cy='thank-you-page-message']")).toBeVisible();
        await expect(previewPage.getByText("Thank You.")).toBeVisible();
        await expect(previewPage.getByText("Your response has been received.")).toBeVisible();

        await previewPage.close();

    }

    validateTheSubmissionFields = async ({ formName }: FormName, {
        firstName,
        lastName,
        email,
        // phoneNumber
    }) => {
        await this.page.goto("/")

        await expect(this.page.getByRole('button', { name: formName })).toBeVisible({ timeout: 30000 });
        await this.page.getByRole('button', { name: formName }).click();
        await expect(this.page.getByRole('link', { name: 'Submissions' })).toBeVisible();

        await this.page.getByRole('link', { name: 'Submissions' }).click();

        const fullName = `${firstName} ${lastName}`;
        // const fullPhone = "+1 " + phoneNumber

        await expect(this.page.getByText(fullName)).toBeVisible();
        await expect(this.page.getByText(email)).toBeVisible();
        // await expect(this.page.getByText(fullPhone)).toBeVisible();

        await this.page.close();

    }

    addSingleAndMultiChoiceElement = async () => {

        await expect(this.page.getByTestId('elements-container')).toBeVisible({ timeout: 30000 });
        await expect(this.page.getByTestId('publish-button')).toBeVisible({ timeout: 30000 });

        await this.page.getByRole('button', { name: 'Single choice' }).click();
        await this.page.getByRole('button', { name: 'Multi choice' }).click();


    }

    addBulkOptionsToElements = async () => {

        const singleChoiceEle = this.page.getByRole('button', { name: 'Question' }).nth(1);
        const multiChoiceEle = this.page.getByRole('button', { name: 'Question' }).nth(2);

        await expect(singleChoiceEle).toBeVisible();
        await expect(multiChoiceEle).toBeVisible();

        await singleChoiceEle.click();
        await this.page.getByRole('textbox', { name: 'Question' }).fill("Single - demo field name");
        await this.page.getByTestId('add-bulk-option-link').click();

        await expect(this.page.getByTestId('bulk-add-options-textarea')).toBeVisible();
        await expect(this.page.locator("[data-testid='bulk-add-options-done-button']")).toBeVisible();


        await this.page.getByTestId('bulk-add-options-textarea').fill("Option 5, Option 6, Option 7, Option 8, Option 9, Option 10");
        // await this.page.getByTestId('bulk-add-options-done-button').click();
        await this.page.locator("[data-testid='bulk-add-options-done-button']").click();
        await this.page.waitForTimeout(2000);

        // In future separate this randomzie option from this block.

        await this.page.getByText("Randomize").click()
        await expect(this.page.getByText("Options will be displayed in random order")).toBeVisible();



        await multiChoiceEle.click();
        await this.page.getByRole('textbox', { name: 'Question' }).fill("Multiple - demo field name");
        await this.page.getByTestId('add-bulk-option-link').click()

        await expect(this.page.getByTestId('bulk-add-options-textarea')).toBeVisible();
        await expect(this.page.locator("[data-testid='bulk-add-options-done-button']")).toBeVisible();

        await this.page.getByTestId('bulk-add-options-textarea').fill("Option 5, Option 6, Option 7, Option 8, Option 9, Option 10");
        await this.page.locator("[data-testid='bulk-add-options-done-button']").click();
        await this.page.waitForTimeout(2000);


        // const optionsCount = await this.page.locator("[data-rfd-droppable-id='neeto-molecules-option-fields-options']").c;
        // console.log(`Options count: ${optionsCount}`);

        // await expect(optionsCount).toBe(10);

        // getByText('Hide question')
        // This field is hidden to the public. However, you can still edit it
    }


    hideMultiChoiceElement = async () => {
        const multiChoiceEle = this.page.getByRole('button', { name: 'Question' }).nth(2);
        await multiChoiceEle.click();
        await this.page.getByText('Hide question').click();
        await expect(this.page.getByText("This field is hidden to the public. However, you can still edit it")).toBeVisible();
    };

    unhideMultiChoiceElement = async () => {
        const multiChoiceEle = this.page.getByRole('button', { name: 'Question' }).nth(2);
        await multiChoiceEle.click();
        await this.page.getByText('Hide question').click();
    };

    validateMultipleIsHiddenAndSingleIsVisible = async (previewPage: Page) => {

        await expect(previewPage.getByText('Single - demo field name*')).toBeVisible();

        await expect(previewPage.getByText('Multiple - demo field name*')).not.toBeVisible();

        await previewPage.close()
    }

    validateBothMultipleAndSingleIsVisible = async (previewPage) => {

        await expect(previewPage.getByText('Single - demo field name*')).toBeVisible();

        await expect(previewPage.getByText('Multiple - demo field name*')).toBeVisible();

        await previewPage.close()
    }
};
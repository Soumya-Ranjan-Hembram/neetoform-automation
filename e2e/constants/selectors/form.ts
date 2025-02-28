export const FORM_SELECTORS = {
    // Form creation and management
    addFormButton: "add-form-button",
    startFromScratch: "start-from-scratch-button",
    elementContainer: "elements-container",
    publishButton: "publish-button",
    publishPreviewButton: "publish-preview-button",

    // Form title
    neetoFormTitle: "form-title",
    neetoFormTitleField: "form-rename-text-field",
    neetoFormTitleFieldSubmitButton: "form-rename-submit-button",

    // Form elements
    fullNameElement: "add-full-name-element",
    fullNamePreview: "full-name-preview-group",
    phoneNumberElement: "add-phone-number-element",
    phoneNumberPreview: "phone-preview-group",
    singleChoiceElement: "add-single-choice-element",
    multiChoiceElement: "add-multi-choice-element",

    // Preview fields
    previewEmailTextField: "email-text-field",
    previewFirstNameTextField: "first-name-text-field",
    previewLastNameTextField: "last-name-text-field",
    previewPhoneNumberInputField: "phone-number-input-field",
    previewSubmitButton: "start-or-submit-button",
    previewThankYouMessage: 'thank-you-page-message',

    // Choice options
    bulkOptionsTextArea: "bulk-add-options-textarea",
    bulkOptionsDoneButton: "bulk-add-options-done-button",
    addBulkOptionLink: "add-bulk-option-link",
    randomizeSwitchLabel: "randomize-switch-label",
    contentTextField: "content-text-field",
    choicePreviewGroup: "multiple-choice-preview-group",
    singleChoiceContainer: "single-choice-options-container",
    multiChoiceContainer: "multi-choice-options-container",

    // Feedback and notifications
    thankYouMessage: "thank-you-page-message",
    toastContainer: "toastr-success-container",
    randomizeWarningError: "randomized-warning-error-text",
    questionHideToggle: "hide-question-toggle-label",
    questionHideWarning: "hide-question-error-text",

    // Navigation and tabs
    submissionTab: "submissions-tab",
    moreDropdownIcon: "more-dropdown-icon",
    analyticsTab: "analytics-more-tab",
    buildTab: "build-tab",
    settingTab: "settings-tab",
    shareTab: 'share-tab',

    // share
    shareNeetoHeading: 'share-your-neeto-form-heading',
    linkCopyButton: 'link-copy-button',
    passwordProtedPageHeading: 'password-protected-heading',
    passwordTextField: 'password-text-field',
    continueButton: 'continue-button',

    //duplicate submission
    preventDuplicateSubmission: 'settings-item-prevent-duplicate-submissions',
    cookieRadio: 'cookie-track-radio-item',
    preventDuplicateSaveChangeButton: 'save-changes-button',
    noTrackRadio: 'no-track-radio-item',


    // Analytics and insights
    insightCount: "insights-count",
    submissionInsightTitle: "submissions-insights-title",
    visitMetric: "visits-metric",
    startMetric: "starts-metric",
    submissionMetric: "submissions-metric",
    completionRateMetric: "completion-rate-metric",

    // Settings
    accessControl: "settings-item-access-control",
    accessPasswordRadioInput: 'access-control-password-protected-radio-input',
    accessPasswordInputField: 'password-input-field',
    accessPasswordInputWarning: 'password-input-error',
    accessPasswordSaveButton: 'save-changes-button',

};

export const FORM_TEXTS = {
    // Test data
    falseEmail: "soumya",
    unUseNumber: "1",
    passwordChecker: "qwe",
    simpleEmail: "soumya@example.com",
    simpleEmail2: "sanat@example.com",
    accessingPassword: "123456",

    // Error messages
    requiredEmailFieldErrorMessage: /Email address is required/i,
    requiredFirstNameFieldErrorMessage: /First name is required/i,
    requiredLastNameFieldErrorMessage: /Last name is required/i,
    requiredPhoneNumberFieldErrorMessage: /Phone number is invalid/i,
    emailInvalidErrorMessage: /Email address is invalid/i,
    USNumberFormatErrorMessage: /US numbers cannot start with a one./i,

    // Thank you page
    thankYouURL: /thank-you/,
    thankYou: "Thank You.",
    responseReceived: "Your response has been received.",

    // Field labels
    singleDemoFieldName: "Single - demo field name",
    multiDemoFieldName: "Multiple - demo field name",
    singleDemoFieldImportant: "Single - demo field name*",
    multiDemoFieldImportant: "Multiple - demo field name*",

    // Warning messages
    waringTextRandomization: "Options will be displayed in random order",
    questionHideWaringMessage: "This field is hidden to the public. However, you can still edit it.",

    // Success messages
    theFormPublishedSuccessfully: "The form is successfully published"
};
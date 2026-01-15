/**
 * Form Validation Utilities
 * Provides validation functions for CV form fields
 */

/**
 * Email validation regex pattern
 * Matches most common email formats
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone number validation regex pattern
 * Matches various phone formats including international
 */
const PHONE_REGEX = /^[\d\s\-+()]+$/;

/**
 * URL validation regex pattern
 * Matches http, https, and basic URL formats
 */
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;

/**
 * Date validation regex pattern
 * Matches common date formats (MM/YYYY, YYYY-MM, YYYY, etc.)
 */
const DATE_REGEX = /^(\d{4}|\d{1,2}\/\d{4}|\d{4}-\d{2}|\w+\s\d{4})$/;

/**
 * Validation result structure
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether the validation passed
 * @property {string} [error] - Error message if validation failed
 */

/**
 * Validate email address
 * @param {string} email - Email address to validate
 * @param {boolean} required - Whether the field is required
 * @returns {ValidationResult} Validation result
 */
export const validateEmail = (email, required = false) => {
    if (!email || email.trim() === '') {
        if (required) {
            return {
                isValid: false,
                error: 'Email is required'
            };
        }
        return { isValid: true };
    }

    const trimmedEmail = email.trim();

    if (!EMAIL_REGEX.test(trimmedEmail)) {
        return {
            isValid: false,
            error: 'Please enter a valid email address (e.g., name@example.com)'
        };
    }

    if (trimmedEmail.length > 254) {
        return {
            isValid: false,
            error: 'Email address is too long (max 254 characters)'
        };
    }

    return { isValid: true };
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @param {boolean} required - Whether the field is required
 * @returns {ValidationResult} Validation result
 */
export const validatePhone = (phone, required = false) => {
    if (!phone || phone.trim() === '') {
        if (required) {
            return {
                isValid: false,
                error: 'Phone number is required'
            };
        }
        return { isValid: true };
    }

    const trimmedPhone = phone.trim();

    if (!PHONE_REGEX.test(trimmedPhone)) {
        return {
            isValid: false,
            error: 'Please enter a valid phone number (digits, spaces, +, -, () allowed)'
        };
    }

    // Remove non-digit characters for length check
    const digitsOnly = trimmedPhone.replace(/\D/g, '');

    if (digitsOnly.length < 7) {
        return {
            isValid: false,
            error: 'Phone number is too short (minimum 7 digits)'
        };
    }

    if (digitsOnly.length > 15) {
        return {
            isValid: false,
            error: 'Phone number is too long (maximum 15 digits)'
        };
    }

    return { isValid: true };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @param {boolean} required - Whether the field is required
 * @returns {ValidationResult} Validation result
 */
export const validateURL = (url, required = false) => {
    if (!url || url.trim() === '') {
        if (required) {
            return {
                isValid: false,
                error: 'URL is required'
            };
        }
        return { isValid: true };
    }

    const trimmedUrl = url.trim();

    if (!URL_REGEX.test(trimmedUrl)) {
        return {
            isValid: false,
            error: 'Please enter a valid URL (e.g., https://example.com)'
        };
    }

    if (trimmedUrl.length > 2048) {
        return {
            isValid: false,
            error: 'URL is too long (max 2048 characters)'
        };
    }

    return { isValid: true };
};

/**
 * Validate date string
 * @param {string} date - Date string to validate
 * @param {boolean} required - Whether the field is required
 * @returns {ValidationResult} Validation result
 */
export const validateDate = (date, required = false) => {
    if (!date || date.trim() === '') {
        if (required) {
            return {
                isValid: false,
                error: 'Date is required'
            };
        }
        return { isValid: true };
    }

    const trimmedDate = date.trim();

    if (!DATE_REGEX.test(trimmedDate)) {
        return {
            isValid: false,
            error: 'Please enter a valid date (e.g., 2023, 01/2023, Jan 2023)'
        };
    }

    return { isValid: true };
};

/**
 * Validate required text field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field (for error message)
 * @param {number} minLength - Minimum length (default: 1)
 * @param {number} maxLength - Maximum length (default: 1000)
 * @returns {ValidationResult} Validation result
 */
export const validateRequired = (value, fieldName, minLength = 1, maxLength = 1000) => {
    if (!value || value.trim() === '') {
        return {
            isValid: false,
            error: `${fieldName} is required`
        };
    }

    const trimmedValue = value.trim();

    if (trimmedValue.length < minLength) {
        return {
            isValid: false,
            error: `${fieldName} must be at least ${minLength} characters`
        };
    }

    if (trimmedValue.length > maxLength) {
        return {
            isValid: false,
            error: `${fieldName} must be no more than ${maxLength} characters`
        };
    }

    return { isValid: true };
};

/**
 * Validate text field (optional)
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field (for error message)
 * @param {number} maxLength - Maximum length (default: 1000)
 * @returns {ValidationResult} Validation result
 */
export const validateText = (value, fieldName, maxLength = 1000) => {
    if (!value || value.trim() === '') {
        return { isValid: true };
    }

    const trimmedValue = value.trim();

    if (trimmedValue.length > maxLength) {
        return {
            isValid: false,
            error: `${fieldName} must be no more than ${maxLength} characters`
        };
    }

    return { isValid: true };
};

/**
 * Validate personal info form
 * @param {Object} personalInfo - Personal info data
 * @returns {Object} Validation errors by field name
 */
export const validatePersonalInfo = (personalInfo) => {
    const errors = {};

    // Name is required
    const nameValidation = validateRequired(personalInfo.name, 'Name', 2, 100);
    if (!nameValidation.isValid) {
        errors.name = nameValidation.error;
    }

    // Email validation
    const emailValidation = validateEmail(personalInfo.email, false);
    if (!emailValidation.isValid) {
        errors.email = emailValidation.error;
    }

    // Phone validation
    const phoneValidation = validatePhone(personalInfo.phone, false);
    if (!phoneValidation.isValid) {
        errors.phone = phoneValidation.error;
    }

    // Address validation
    const addressValidation = validateText(personalInfo.address, 'Address', 200);
    if (!addressValidation.isValid) {
        errors.address = addressValidation.error;
    }

    // Avatar URL validation
    if (personalInfo.avatar) {
        const avatarValidation = validateURL(personalInfo.avatar, false);
        if (!avatarValidation.isValid) {
            errors.avatar = avatarValidation.error;
        }
    }

    return errors;
};

/**
 * Validate work history item
 * @param {Object} workItem - Work history item
 * @returns {Object} Validation errors by field name
 */
export const validateWorkHistory = (workItem) => {
    const errors = {};

    const positionValidation = validateRequired(workItem.position, 'Position', 2, 100);
    if (!positionValidation.isValid) {
        errors.position = positionValidation.error;
    }

    const companyValidation = validateRequired(workItem.companyName, 'Company Name', 2, 100);
    if (!companyValidation.isValid) {
        errors.companyName = companyValidation.error;
    }

    const dateFromValidation = validateDate(workItem.dateFrom, true);
    if (!dateFromValidation.isValid) {
        errors.dateFrom = dateFromValidation.error;
    }

    const dateToValidation = validateDate(workItem.dateTo, false);
    if (!dateToValidation.isValid) {
        errors.dateTo = dateToValidation.error;
    }

    const descriptionValidation = validateText(workItem.description, 'Description', 2000);
    if (!descriptionValidation.isValid) {
        errors.description = descriptionValidation.error;
    }

    return errors;
};

/**
 * Validate education item
 * @param {Object} eduItem - Education item
 * @returns {Object} Validation errors by field name
 */
export const validateEducation = (eduItem) => {
    const errors = {};

    const professionValidation = validateRequired(eduItem.profession, 'Degree/Profession', 2, 150);
    if (!professionValidation.isValid) {
        errors.profession = professionValidation.error;
    }

    const schoolValidation = validateRequired(eduItem.schoolName, 'School Name', 2, 150);
    if (!schoolValidation.isValid) {
        errors.schoolName = schoolValidation.error;
    }

    const studyFromValidation = validateDate(eduItem.studyFrom, true);
    if (!studyFromValidation.isValid) {
        errors.studyFrom = studyFromValidation.error;
    }

    const studyToValidation = validateDate(eduItem.studyTo, false);
    if (!studyToValidation.isValid) {
        errors.studyTo = studyToValidation.error;
    }

    return errors;
};

/**
 * Validate certification item
 * @param {Object} certItem - Certification item
 * @returns {Object} Validation errors by field name
 */
export const validateCertification = (certItem) => {
    const errors = {};

    const certNameValidation = validateRequired(certItem.certName, 'Certification Name', 2, 150);
    if (!certNameValidation.isValid) {
        errors.certName = certNameValidation.error;
    }

    const orgValidation = validateRequired(certItem.organization, 'Organization', 2, 150);
    if (!orgValidation.isValid) {
        errors.organization = orgValidation.error;
    }

    const expirationValidation = validateDate(certItem.certExpiration, false);
    if (!expirationValidation.isValid) {
        errors.certExpiration = expirationValidation.error;
    }

    if (certItem.certLink) {
        const linkValidation = validateURL(certItem.certLink, false);
        if (!linkValidation.isValid) {
            errors.certLink = linkValidation.error;
        }
    }

    return errors;
};

/**
 * Validate activity item
 * @param {Object} activityItem - Activity item
 * @returns {Object} Validation errors by field name
 */
export const validateActivity = (activityItem) => {
    const errors = {};

    const nameValidation = validateRequired(activityItem.activityName, 'Activity Name', 2, 150);
    if (!nameValidation.isValid) {
        errors.activityName = nameValidation.error;
    }

    const dateValidation = validateDate(activityItem.activityDate, false);
    if (!dateValidation.isValid) {
        errors.activityDate = dateValidation.error;
    }

    const descValidation = validateText(activityItem.description, 'Description', 2000);
    if (!descValidation.isValid) {
        errors.description = descValidation.error;
    }

    return errors;
};

/**
 * Validate professional skill item
 * @param {Object} skillItem - Skill item
 * @returns {Object} Validation errors by field name
 */
export const validateProfessionalSkill = (skillItem) => {
    const errors = {};

    const nameValidation = validateRequired(skillItem.skillName, 'Skill Name', 2, 100);
    if (!nameValidation.isValid) {
        errors.skillName = nameValidation.error;
    }

    const proficiencyValidation = validateText(skillItem.proficiency, 'Proficiency', 50);
    if (!proficiencyValidation.isValid) {
        errors.proficiency = proficiencyValidation.error;
    }

    return errors;
};

/**
 * Validate language competency item
 * @param {Object} langItem - Language item
 * @returns {Object} Validation errors by field name
 */
export const validateLanguageCompetency = (langItem) => {
    const errors = {};

    const nameValidation = validateRequired(langItem.languageName, 'Language Name', 2, 100);
    if (!nameValidation.isValid) {
        errors.languageName = nameValidation.error;
    }

    const proficiencyValidation = validateText(langItem.proficiency, 'Proficiency', 50);
    if (!proficiencyValidation.isValid) {
        errors.proficiency = proficiencyValidation.error;
    }

    return errors;
};

/**
 * Check if there are any validation errors
 * @param {Object} errors - Errors object
 * @returns {boolean} True if there are errors
 */
export const hasErrors = (errors) => {
    return Object.keys(errors).length > 0;
};

/**
 * Get first error message from errors object
 * @param {Object} errors - Errors object
 * @returns {string|null} First error message or null
 */
export const getFirstError = (errors) => {
    const keys = Object.keys(errors);
    if (keys.length === 0) return null;
    return errors[keys[0]];
};

/**
 * Validate entire CV data before saving
 * @param {Object} cvData - Complete CV data
 * @returns {Object} Validation result with errors by section
 */
export const validateCVData = (cvData) => {
    const sectionErrors = {};

    // Validate personal info
    const personalInfoErrors = validatePersonalInfo(cvData.personalInfo || {});
    if (hasErrors(personalInfoErrors)) {
        sectionErrors.personalInfo = personalInfoErrors;
    }

    // Validate work history items
    if (cvData.workHistory?.items) {
        const workErrors = {};
        cvData.workHistory.items.forEach((item, index) => {
            const itemErrors = validateWorkHistory(item);
            if (hasErrors(itemErrors)) {
                workErrors[index] = itemErrors;
            }
        });
        if (hasErrors(workErrors)) {
            sectionErrors.workHistory = workErrors;
        }
    }

    // Validate education items
    if (cvData.educations?.items) {
        const eduErrors = {};
        cvData.educations.items.forEach((item, index) => {
            const itemErrors = validateEducation(item);
            if (hasErrors(itemErrors)) {
                eduErrors[index] = itemErrors;
            }
        });
        if (hasErrors(eduErrors)) {
            sectionErrors.educations = eduErrors;
        }
    }

    // Validate certification items
    if (cvData.certifications?.items) {
        const certErrors = {};
        cvData.certifications.items.forEach((item, index) => {
            const itemErrors = validateCertification(item);
            if (hasErrors(itemErrors)) {
                certErrors[index] = itemErrors;
            }
        });
        if (hasErrors(certErrors)) {
            sectionErrors.certifications = certErrors;
        }
    }

    // Validate activity items
    if (cvData.activities?.items) {
        const activityErrors = {};
        cvData.activities.items.forEach((item, index) => {
            const itemErrors = validateActivity(item);
            if (hasErrors(itemErrors)) {
                activityErrors[index] = itemErrors;
            }
        });
        if (hasErrors(activityErrors)) {
            sectionErrors.activities = activityErrors;
        }
    }

    // Validate professional skill items
    if (cvData.professionalSkills?.items) {
        const skillErrors = {};
        cvData.professionalSkills.items.forEach((item, index) => {
            const itemErrors = validateProfessionalSkill(item);
            if (hasErrors(itemErrors)) {
                skillErrors[index] = itemErrors;
            }
        });
        if (hasErrors(skillErrors)) {
            sectionErrors.professionalSkills = skillErrors;
        }
    }

    // Validate language competency items
    if (cvData.languageCompetencies?.items) {
        const langErrors = {};
        cvData.languageCompetencies.items.forEach((item, index) => {
            const itemErrors = validateLanguageCompetency(item);
            if (hasErrors(itemErrors)) {
                langErrors[index] = itemErrors;
            }
        });
        if (hasErrors(langErrors)) {
            sectionErrors.languageCompetencies = langErrors;
        }
    }

    return {
        isValid: !hasErrors(sectionErrors),
        errors: sectionErrors
    };
};

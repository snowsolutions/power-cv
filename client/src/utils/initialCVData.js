import { DEFAULT_SECTION_TITLES } from "./constants";

/**
 * Get initial CV data structure with all sections
 * @returns {Object} Initial CV data object
 */
export const getInitialCVData = () => ({
    personalInfo: {
        sectionTitle: DEFAULT_SECTION_TITLES.personalInfo,
        name: "",
        email: "",
        phone: "",
        address: "",
        avatar: "",
    },
    introduction: {
        sectionTitle: DEFAULT_SECTION_TITLES.introduction,
        content: "",
    },
    workHistory: {
        sectionTitle: DEFAULT_SECTION_TITLES.workHistory,
        items: [],
    },
    certifications: {
        sectionTitle: DEFAULT_SECTION_TITLES.certifications,
        items: [],
    },
    educations: {
        sectionTitle: DEFAULT_SECTION_TITLES.educations,
        items: [],
    },
    activities: {
        sectionTitle: DEFAULT_SECTION_TITLES.activities,
        items: [],
    },
    professionalSkills: {
        sectionTitle: DEFAULT_SECTION_TITLES.professionalSkills,
        showLevel: true,
        items: [],
    },
    languageCompetencies: {
        sectionTitle: DEFAULT_SECTION_TITLES.languageCompetencies,
        showLevel: true,
        items: [],
    },
});

/**
 * Generate a unique ID for items
 * @returns {string} Unique identifier
 */
const generateId = () => {
    // Use crypto.randomUUID if available, otherwise fallback
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback for older browsers
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get empty work history item
 * @returns {Object} Empty work history item
 */
export const getEmptyWorkHistoryItem = () => ({
    id: generateId(),
    dateFrom: "",
    dateTo: "",
    companyName: "",
    position: "",
    description: "",
});

/**
 * Get empty certification item
 * @returns {Object} Empty certification item
 */
export const getEmptyCertificationItem = () => ({
    id: generateId(),
    certName: "",
    organization: "",
    certLink: "",
    certExpiration: "",
});

/**
 * Get empty education item
 * @returns {Object} Empty education item
 */
export const getEmptyEducationItem = () => ({
    id: generateId(),
    schoolName: "",
    studyFrom: "",
    studyTo: "",
    profession: "",
});

/**
 * Get empty activity item
 * @returns {Object} Empty activity item
 */
export const getEmptyActivityItem = () => ({
    id: generateId(),
    title: "",
    description: "",
    date: "",
});

/**
 * Get empty professional skill item
 * @returns {Object} Empty skill item
 */
export const getEmptySkillItem = () => ({
    id: generateId(),
    skillName: "",
    level: "",
    description: "",
});

/**
 * Get empty language competency item
 * @returns {Object} Empty language item
 */
export const getEmptyLanguageItem = () => ({
    id: generateId(),
    language: "",
    proficiency: "",
});

/**
 * Validate CV data structure
 * @param {Object} data - CV data to validate
 * @returns {boolean} True if valid
 */
export const isValidCVData = (data) => {
    if (!data || typeof data !== "object") return false;

    const requiredSections = [
        "personalInfo",
        "introduction",
        "workHistory",
        "certifications",
        "educations",
        "activities",
        "professionalSkills",
        "languageCompetencies",
    ];

    return requiredSections.every((section) => section in data);
};

/**
 * Deep clone CV data
 * @param {Object} data - CV data to clone
 * @returns {Object} Cloned CV data
 */
export const cloneCVData = (data) => {
    return JSON.parse(JSON.stringify(data));
};

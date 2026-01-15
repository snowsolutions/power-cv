/**
 * JSON Import Utility
 *
 * Handles importing and validating CV data from JSON files
 */

/**
 * Validate CV data structure
 * @param {Object} data - The data to validate
 * @returns {Object} - Validation result { valid: boolean, errors: string[] }
 */
export const validateCVData = (data) => {
    const errors = [];

    // Check if data exists
    if (!data) {
        errors.push("No data provided");
        return { valid: false, errors };
    }

    // Check for cv object
    if (!data.cv) {
        errors.push("Missing 'cv' object in JSON");
        return { valid: false, errors };
    }

    const cv = data.cv;

    // Validate required fields
    if (!cv.name || typeof cv.name !== "string") {
        errors.push("Missing or invalid 'name' field");
    }

    if (!cv.template || typeof cv.template !== "string") {
        errors.push("Missing or invalid 'template' field");
    }

    if (!cv.data || typeof cv.data !== "object") {
        errors.push("Missing or invalid 'data' field");
        return { valid: false, errors };
    }

    // Validate data structure
    const requiredSections = [
        "personalInfo",
        "introduction",
        "workHistory",
        "certifications",
        "educations",
    ];

    for (const section of requiredSections) {
        if (!cv.data[section]) {
            errors.push(`Missing section: ${section}`);
        }
    }

    // Validate personalInfo structure
    if (cv.data.personalInfo) {
        const requiredPersonalFields = ["name", "email", "phone", "address"];
        for (const field of requiredPersonalFields) {
            if (
                cv.data.personalInfo[field] === undefined ||
                cv.data.personalInfo[field] === null
            ) {
                errors.push(`Missing personalInfo field: ${field}`);
            }
        }
    }

    // Validate array sections
    const arraySections = ["workHistory", "certifications", "educations"];
    for (const section of arraySections) {
        if (cv.data[section] && !Array.isArray(cv.data[section].items)) {
            errors.push(
                `Section '${section}' must have an 'items' array property`,
            );
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

/**
 * Parse JSON file content
 * @param {string} jsonString - The JSON string to parse
 * @returns {Object} - Parsed result { success: boolean, data: Object, error: string }
 */
export const parseJSONFile = (jsonString) => {
    try {
        const data = JSON.parse(jsonString);
        return {
            success: true,
            data,
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            error: `Invalid JSON format: ${error.message}`,
        };
    }
};

/**
 * Import CV from JSON file
 * @param {File} file - The file object to import
 * @returns {Promise<Object>} - Import result { success: boolean, cv: Object, error: string }
 */
export const importCVFromFile = (file) => {
    return new Promise((resolve, reject) => {
        // Validate file type
        if (!file.type.includes("json") && !file.name.endsWith(".json")) {
            resolve({
                success: false,
                cv: null,
                error: "Please select a valid JSON file",
            });
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            resolve({
                success: false,
                cv: null,
                error: "File size exceeds 10MB limit",
            });
            return;
        }

        // Read file
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const jsonString = e.target.result;

                // Parse JSON
                const parseResult = parseJSONFile(jsonString);
                if (!parseResult.success) {
                    resolve({
                        success: false,
                        cv: null,
                        error: parseResult.error,
                    });
                    return;
                }

                // Validate data structure
                const validation = validateCVData(parseResult.data);
                if (!validation.valid) {
                    resolve({
                        success: false,
                        cv: null,
                        error: `Invalid CV data: ${validation.errors.join(", ")}`,
                    });
                    return;
                }

                // Extract CV data
                const cv = parseResult.data.cv;

                // Success
                resolve({
                    success: true,
                    cv: {
                        id: null, // Clear ID for imported CV (will be new)
                        name: cv.name,
                        template: cv.template,
                        data: cv.data,
                        createdAt: null, // Will be set on save
                        updatedAt: null,
                    },
                    error: null,
                });
            } catch (error) {
                resolve({
                    success: false,
                    cv: null,
                    error: `Error reading file: ${error.message}`,
                });
            }
        };

        reader.onerror = () => {
            resolve({
                success: false,
                cv: null,
                error: "Error reading file",
            });
        };

        reader.readAsText(file);
    });
};

/**
 * Import CV from JSON string
 * @param {string} jsonString - The JSON string to import
 * @returns {Object} - Import result { success: boolean, cv: Object, error: string }
 */
export const importCVFromString = (jsonString) => {
    try {
        // Parse JSON
        const parseResult = parseJSONFile(jsonString);
        if (!parseResult.success) {
            return {
                success: false,
                cv: null,
                error: parseResult.error,
            };
        }

        // Validate data structure
        const validation = validateCVData(parseResult.data);
        if (!validation.valid) {
            return {
                success: false,
                cv: null,
                error: `Invalid CV data: ${validation.errors.join(", ")}`,
            };
        }

        // Extract CV data
        const cv = parseResult.data.cv;

        return {
            success: true,
            cv: {
                id: null,
                name: cv.name,
                template: cv.template,
                data: cv.data,
                createdAt: null,
                updatedAt: null,
            },
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            cv: null,
            error: `Error importing CV: ${error.message}`,
        };
    }
};

/**
 * Sanitize imported CV data (remove any potentially harmful content)
 * @param {Object} cv - The CV object to sanitize
 * @returns {Object} - Sanitized CV object
 */
export const sanitizeCVData = (cv) => {
    // Create a deep copy
    const sanitized = JSON.parse(JSON.stringify(cv));

    // Remove any script tags from text content
    const sanitizeString = (str) => {
        if (typeof str !== "string") return str;
        return str
            .replace(/<script[^>]*>.*?<\/script>/gi, "")
            .replace(/on\w+="[^"]*"/gi, "")
            .replace(/javascript:/gi, "");
    };

    // Recursively sanitize all string values
    const sanitizeObject = (obj) => {
        if (typeof obj === "string") {
            return sanitizeString(obj);
        }
        if (Array.isArray(obj)) {
            return obj.map(sanitizeObject);
        }
        if (obj && typeof obj === "object") {
            const sanitizedObj = {};
            for (const key in obj) {
                sanitizedObj[key] = sanitizeObject(obj[key]);
            }
            return sanitizedObj;
        }
        return obj;
    };

    sanitized.data = sanitizeObject(sanitized.data);

    return sanitized;
};

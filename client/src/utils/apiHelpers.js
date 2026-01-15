import cvService from "../services/cvService";

/**
 * Handle API errors consistently
 * @param {Error} error - The error object from API call
 * @returns {string} - User-friendly error message
 */
export const handleAPIError = (error) => {
    if (error.message) {
        return error.message;
    }

    switch (error.status) {
        case 400:
            return "Invalid request. Please check your input.";
        case 401:
            return "Unauthorized. Please log in.";
        case 403:
            return "Access denied.";
        case 404:
            return "Resource not found.";
        case 500:
            return "Server error. Please try again later.";
        default:
            return "An unexpected error occurred.";
    }
};

/**
 * Check if backend is reachable
 * @returns {Promise<boolean>}
 */
export const checkBackendConnection = async () => {
    try {
        await cvService.healthCheck();
        return true;
    } catch (error) {
        console.error("Backend connection failed:", error);
        return false;
    }
};

/**
 * Format CV data for API
 * @param {Object} cv - CV object from store
 * @returns {Object} - Formatted CV for API
 */
export const formatCVForAPI = (cv) => {
    return {
        name: cv.name,
        template: cv.template,
        data: cv.data,
    };
};

/**
 * Parse CV response from API
 * @param {Object} apiResponse - Response from API
 * @returns {Object} - Formatted CV for store
 */
export const parseCVFromAPI = (apiResponse) => {
    return {
        id: apiResponse.data.id || apiResponse.data._id,
        name: apiResponse.data.name,
        template: apiResponse.data.template,
        data: apiResponse.data.data,
        createdAt: apiResponse.data.createdAt,
        updatedAt: apiResponse.data.updatedAt,
    };
};

/**
 * JSON Export Utility
 *
 * Handles exporting CV data to JSON file
 */

/**
 * Export CV data as JSON file
 * @param {Object} cvData - The CV data object to export
 * @param {string} fileName - Optional custom file name (without extension)
 * @returns {boolean} - Success status
 */
export const exportCVAsJSON = (cvData, fileName = null) => {
    try {
        // Create a clean copy of CV data for export
        const exportData = {
            version: "1.0.0",
            exportDate: new Date().toISOString(),
            cv: {
                id: cvData.id || null,
                name: cvData.name || "Untitled CV",
                template: cvData.template || "modern",
                data: cvData.data,
                createdAt: cvData.createdAt || null,
                updatedAt: cvData.updatedAt || null,
            },
        };

        // Convert to formatted JSON string
        const jsonString = JSON.stringify(exportData, null, 2);

        // Create blob
        const blob = new Blob([jsonString], { type: "application/json" });

        // Generate file name
        const sanitizedName = (fileName || cvData.name || "cv")
            .replace(/[^a-z0-9]/gi, "_")
            .toLowerCase();
        const timestamp = new Date()
            .toISOString()
            .split("T")[0]
            .replace(/-/g, "");
        const fullFileName = `${sanitizedName}_${timestamp}.json`;

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fullFileName;

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log("CV exported successfully:", fullFileName);
        return true;
    } catch (error) {
        console.error("Error exporting CV:", error);
        return false;
    }
};

/**
 * Export CV data as formatted JSON string (for preview)
 * @param {Object} cvData - The CV data object
 * @returns {string} - Formatted JSON string
 */
export const getCVAsJSONString = (cvData) => {
    try {
        const exportData = {
            version: "1.0.0",
            exportDate: new Date().toISOString(),
            cv: {
                id: cvData.id || null,
                name: cvData.name || "Untitled CV",
                template: cvData.template || "modern",
                data: cvData.data,
                createdAt: cvData.createdAt || null,
                updatedAt: cvData.updatedAt || null,
            },
        };

        return JSON.stringify(exportData, null, 2);
    } catch (error) {
        console.error("Error converting CV to JSON:", error);
        return "";
    }
};

/**
 * Copy CV JSON to clipboard
 * @param {Object} cvData - The CV data object
 * @returns {Promise<boolean>} - Success status
 */
export const copyCVJSONToClipboard = async (cvData) => {
    try {
        const jsonString = getCVAsJSONString(cvData);

        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(jsonString);
            console.log("CV JSON copied to clipboard");
            return true;
        } else {
            // Fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = jsonString;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            const success = document.execCommand("copy");
            document.body.removeChild(textarea);
            return success;
        }
    } catch (error) {
        console.error("Error copying to clipboard:", error);
        return false;
    }
};

/**
 * PDF Export Service
 * Converts CV preview to downloadable PDF using html2canvas and jsPDF
 */

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Export CV preview as PDF
 * @param {HTMLElement} element - The DOM element to convert to PDF
 * @param {string} filename - The name for the PDF file (without extension)
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export const exportToPDF = async (element, filename = "CV") => {
    if (!element) {
        return {
            success: false,
            error: "No element provided for PDF export",
        };
    }

    try {
        // Show loading state (caller should handle UI)
        console.log("Starting PDF generation...");

        // Configure html2canvas options
        const canvas = await html2canvas(element, {
            scale: 2, // Higher scale for better quality
            useCORS: true, // Handle cross-origin images
            logging: false, // Disable console logs
            backgroundColor: "#ffffff",
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            scrollY: -window.scrollY,
            scrollX: -window.scrollX,
        });

        // Get canvas dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Convert canvas to image
        const imgData = canvas.toDataURL("image/png");

        // Create PDF document (A4 size)
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true,
        });

        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if content is longer than one page
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Generate filename with timestamp if not unique
        const sanitizedFilename = sanitizeFilename(filename);
        const finalFilename = `${sanitizedFilename}.pdf`;

        // Save the PDF
        pdf.save(finalFilename);

        console.log("PDF generated successfully:", finalFilename);

        return {
            success: true,
            message: `PDF exported successfully as ${finalFilename}`,
        };
    } catch (error) {
        console.error("Error generating PDF:", error);
        return {
            success: false,
            error: `Failed to generate PDF: ${error.message}`,
        };
    }
};

/**
 * Sanitize filename to remove invalid characters
 * @param {string} filename - Original filename
 * @returns {string} Sanitized filename
 */
const sanitizeFilename = (filename) => {
    // Remove invalid filename characters
    // eslint-disable-next-line no-control-regex
    let sanitized = filename.replace(/[<>:"/\\|?*\x00-\x1F]/g, "");

    // Replace spaces with underscores
    sanitized = sanitized.replace(/\s+/g, "_");

    // Limit length
    if (sanitized.length > 100) {
        sanitized = sanitized.substring(0, 100);
    }

    // If empty after sanitization, use default
    if (!sanitized) {
        sanitized = "CV";
    }

    return sanitized;
};

/**
 * Export CV with custom options
 * @param {HTMLElement} element - The DOM element to convert to PDF
 * @param {Object} options - Export options
 * @param {string} options.filename - Custom filename
 * @param {number} options.quality - Image quality (1-3, default 2)
 * @param {string} options.format - Page format ('a4', 'letter', etc.)
 * @param {string} options.orientation - Page orientation ('portrait', 'landscape')
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export const exportToPDFWithOptions = async (element, options = {}) => {
    if (!element) {
        return {
            success: false,
            error: "No element provided for PDF export",
        };
    }

    const {
        filename = "CV",
        quality = 2,
        format = "a4",
        orientation = "portrait",
    } = options;

    try {
        console.log("Starting PDF generation with custom options...");

        // Configure html2canvas with custom quality
        const canvas = await html2canvas(element, {
            scale: quality,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            scrollY: -window.scrollY,
            scrollX: -window.scrollX,
        });

        // Get PDF dimensions based on format
        const pdf = new jsPDF({
            orientation: orientation,
            unit: "mm",
            format: format,
            compress: true,
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * pageWidth) / canvas.width;

        const imgData = canvas.toDataURL("image/png");

        let heightLeft = imgHeight;
        let position = 0;

        // Add pages
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        const sanitizedFilename = sanitizeFilename(filename);
        const finalFilename = `${sanitizedFilename}.pdf`;

        pdf.save(finalFilename);

        console.log("PDF generated successfully:", finalFilename);

        return {
            success: true,
            message: `PDF exported successfully as ${finalFilename}`,
        };
    } catch (error) {
        console.error("Error generating PDF:", error);
        return {
            success: false,
            error: `Failed to generate PDF: ${error.message}`,
        };
    }
};

/**
 * Get PDF blob instead of downloading
 * Useful for preview or server upload
 * @param {HTMLElement} element - The DOM element to convert to PDF
 * @returns {Promise<{success: boolean, blob?: Blob, error?: string}>}
 */
export const getPDFBlob = async (element) => {
    if (!element) {
        return {
            success: false,
            error: "No element provided for PDF export",
        };
    }

    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
        });

        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true,
        });

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        const blob = pdf.output("blob");

        return {
            success: true,
            blob: blob,
        };
    } catch (error) {
        console.error("Error generating PDF blob:", error);
        return {
            success: false,
            error: `Failed to generate PDF: ${error.message}`,
        };
    }
};

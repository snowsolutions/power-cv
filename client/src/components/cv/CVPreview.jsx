import { useState, memo, useRef } from "react";
import PropTypes from "prop-types";
import {
    ModernTemplate,
    ClassicTemplate,
    CreativeTemplate,
    MinimalTemplate,
} from "../templates";
import { exportToPDF } from "../../utils/pdfExport";

/**
 * CV Preview Component - Displays CV template with controls
 * @param {Object} props - Component props
 * @param {Object} props.data - CV data to display
 * @param {string} props.template - Template name to use
 * @param {boolean} props.isVisible - Whether preview is visible
 * @param {Function} props.onToggleVisibility - Callback to toggle visibility
 * @returns {JSX.Element} CV Preview component
 */
const CVPreview = memo(
    ({
        data,
        template = "modern",
        isVisible = true,
        onToggleVisibility,
        onTemplateChange,
    }) => {
        const [zoom, setZoom] = useState(100);
        const [isExporting, setIsExporting] = useState(false);
        const [showTemplateSelector, setShowTemplateSelector] = useState(false);
        const [pageCount, setPageCount] = useState(1);
        const [currentPage, setCurrentPage] = useState(1);
        const previewRef = useRef(null);

        const handleZoomIn = () => {
            setZoom((prev) => Math.min(prev + 10, 150));
        };

        const handleZoomOut = () => {
            setZoom((prev) => Math.max(prev - 10, 50));
        };

        const handleResetZoom = () => {
            setZoom(100);
        };

        const handlePrint = () => {
            window.print();
        };

        const handleExportPDF = async () => {
            if (!previewRef.current) {
                console.error("Preview element not found");
                return;
            }

            setIsExporting(true);

            try {
                // Get the template element (first child of preview container)
                const templateElement =
                    previewRef.current.querySelector("[data-template]");
                const elementToExport = templateElement || previewRef.current;

                // Generate filename from CV data
                const cvName = data.personalInfo?.name || data.name || "CV";
                const filename = `${cvName}_CV`;

                const result = await exportToPDF(elementToExport, filename);

                if (!result.success) {
                    console.error("PDF export failed:", result.error);
                    alert(`Failed to export PDF: ${result.error}`);
                }
            } catch (error) {
                console.error("Error exporting PDF:", error);
                alert("An error occurred while exporting PDF");
            } finally {
                setIsExporting(false);
            }
        };

        // Handle page count updates from template
        const handlePageCountChange = (count) => {
            setPageCount(count);
            // Reset to page 1 if current page is beyond new page count
            if (currentPage > count) {
                setCurrentPage(1);
            }
        };

        // Template mapping
        const getTemplate = () => {
            switch (template.toLowerCase()) {
                case "modern":
                    return <ModernTemplate data={data} />;
                case "classic":
                    return (
                        <ClassicTemplate
                            data={data}
                            currentPage={currentPage}
                            onPageCountChange={handlePageCountChange}
                        />
                    );
                case "creative":
                    return <CreativeTemplate data={data} />;
                case "minimal":
                    return <MinimalTemplate data={data} />;
                default:
                    return <ModernTemplate data={data} />;
            }
        };

        // Available templates
        const templates = [
            {
                id: "modern",
                name: "Modern",
                description: "Professional two-column layout",
            },
            {
                id: "classic",
                name: "Classic",
                description: "Traditional single-column",
            },
            {
                id: "creative",
                name: "Creative",
                description: "Colorful sidebar design",
            },
            {
                id: "minimal",
                name: "Minimal",
                description: "Clean minimalist style",
            },
        ];

        const handleTemplateChange = (templateId) => {
            if (onTemplateChange) {
                onTemplateChange(templateId);
            }
            setShowTemplateSelector(false);
        };

        if (!isVisible) {
            return (
                <div className="bg-gray-50 rounded-lg shadow-md p-6 print:hidden">
                    <div className="text-center py-8">
                        <svg
                            className="w-16 h-16 mx-auto text-gray-400 mb-4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                        <p className="text-gray-600 mb-4">Preview is hidden</p>
                        <button
                            onClick={onToggleVisibility}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Show Preview
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-gray-50 rounded-lg shadow-md p-6 print:hidden">
                {/* Preview Controls */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Live Preview
                    </h2>

                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Template Selector Button */}
                        {onTemplateChange && (
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowTemplateSelector(
                                            !showTemplateSelector,
                                        )
                                    }
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    title="Change Template"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                                    </svg>
                                    <span className="hidden sm:inline capitalize">
                                        {template}
                                    </span>
                                </button>

                                {/* Template Selector Dropdown */}
                                {showTemplateSelector && (
                                    <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-xl z-10 min-w-[280px]">
                                        <div className="p-2">
                                            <div className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
                                                Select Template
                                            </div>
                                            {templates.map((t) => (
                                                <button
                                                    key={t.id}
                                                    onClick={() =>
                                                        handleTemplateChange(
                                                            t.id,
                                                        )
                                                    }
                                                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                                        template === t.id
                                                            ? "bg-blue-50 text-blue-700"
                                                            : "hover:bg-gray-50 text-gray-700"
                                                    }`}
                                                >
                                                    <div className="font-medium">
                                                        {t.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {t.description}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Zoom Controls */}
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                            <button
                                onClick={handleZoomOut}
                                disabled={zoom <= 50}
                                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Zoom Out"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                                </svg>
                            </button>
                            <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-center">
                                {zoom}%
                            </span>
                            <button
                                onClick={handleZoomIn}
                                disabled={zoom >= 150}
                                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                title="Zoom In"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                </svg>
                            </button>
                            {zoom !== 100 && (
                                <button
                                    onClick={handleResetZoom}
                                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                                    title="Reset Zoom"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        {/* Export PDF Button */}
                        <button
                            onClick={handleExportPDF}
                            disabled={isExporting}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                isExporting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                            } text-white`}
                            title="Export as PDF"
                        >
                            {isExporting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span className="hidden sm:inline">
                                        Exporting...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="hidden sm:inline">
                                        PDF
                                    </span>
                                </>
                            )}
                        </button>

                        {/* Print Button */}
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            title="Print CV"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            <span className="hidden sm:inline">Print</span>
                        </button>

                        {/* Toggle Visibility Button */}
                        {onToggleVisibility && (
                            <button
                                onClick={onToggleVisibility}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                title="Hide Preview"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                                <span className="hidden sm:inline">Hide</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Template Preview Area with A4 Page Visualization */}
                <div className="bg-gray-100 rounded-lg p-6 relative">
                    {/* Template Container with Zoom */}
                    <div
                        ref={previewRef}
                        className="mx-auto"
                        style={{
                            transform: `scale(${zoom / 100})`,
                            transformOrigin: "top center",
                            transition: "transform 0.2s ease-in-out",
                        }}
                    >
                        <div data-template>{getTemplate()}</div>
                    </div>

                    {/* Pagination Counter */}
                    {pageCount > 1 && (
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-3">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(1, prev - 1),
                                    )
                                }
                                disabled={currentPage === 1}
                                className="hover:bg-gray-700 p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <span className="text-sm font-medium">
                                {currentPage} / {pageCount}
                            </span>
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(pageCount, prev + 1),
                                    )
                                }
                                disabled={currentPage === pageCount}
                                className="hover:bg-gray-700 p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Preview Info */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 flex-wrap gap-2">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span>
                                Template:{" "}
                                <span className="font-medium capitalize">
                                    {template}
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>
                                <span className="font-medium">{pageCount}</span>{" "}
                                {pageCount === 1 ? "page" : "pages"} (A4)
                            </span>
                        </div>
                    </div>
                    <span className="text-xs">
                        ✨ Preview updates automatically • Renders as PDF export
                    </span>
                </div>
            </div>
        );
    },
);

CVPreview.propTypes = {
    data: PropTypes.object.isRequired,
    template: PropTypes.string,
    isVisible: PropTypes.bool,
    onToggleVisibility: PropTypes.func,
    onTemplateChange: PropTypes.func,
};

CVPreview.displayName = "CVPreview";

export default CVPreview;

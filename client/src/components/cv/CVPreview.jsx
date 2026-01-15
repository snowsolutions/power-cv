import { useState, memo } from "react";
import PropTypes from "prop-types";
import { ModernTemplate } from "../templates";

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
    ({ data, template = "modern", isVisible = true, onToggleVisibility }) => {
        const [zoom, setZoom] = useState(100);

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

        // Template mapping - add more templates as they're created
        const getTemplate = () => {
            switch (template.toLowerCase()) {
                case "modern":
                    return <ModernTemplate data={data} />;
                case "classic":
                    // Will be implemented in future tasks
                    return (
                        <div className="p-8 text-center text-gray-500">
                            Classic template coming soon...
                        </div>
                    );
                case "creative":
                    // Will be implemented in future tasks
                    return (
                        <div className="p-8 text-center text-gray-500">
                            Creative template coming soon...
                        </div>
                    );
                case "minimal":
                    // Will be implemented in future tasks
                    return (
                        <div className="p-8 text-center text-gray-500">
                            Minimal template coming soon...
                        </div>
                    );
                default:
                    return <ModernTemplate data={data} />;
            }
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

                {/* Template Preview Area */}
                <div
                    className="bg-white rounded-lg shadow-lg overflow-auto max-h-[800px]"
                    style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: "top center",
                        transition: "transform 0.2s ease-in-out",
                    }}
                >
                    <div
                        style={{
                            minHeight:
                                zoom < 100 ? `${100 / (zoom / 100)}%` : "auto",
                        }}
                    >
                        {getTemplate()}
                    </div>
                </div>

                {/* Preview Info */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
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
                            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            Template:{" "}
                            <span className="font-medium capitalize">
                                {template}
                            </span>
                        </span>
                    </div>
                    <span>Preview updates automatically as you type</span>
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
};

CVPreview.displayName = "CVPreview";

export default CVPreview;

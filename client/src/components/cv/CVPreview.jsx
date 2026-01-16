import {
    useState,
    memo,
    useRef,
    forwardRef,
    useImperativeHandle,
    useEffect,
    useLayoutEffect,
    useCallback,
} from "react";
import PropTypes from "prop-types";
import { ClassicTemplate } from "../templates";
import { exportToPDF } from "../../utils/pdfExport";

/**
 * CV Preview Component - Displays CV template with controls
 * @param {Object} props - Component props
 * @param {Object} props.data - CV data to display
 * @param {string} props.template - Template name to use
 * @param {boolean} props.isVisible - Whether preview is visible
 * @param {Function} props.onToggleVisibility - Callback to toggle visibility
 * @param {number} props.zoom - Zoom level percentage
 * @returns {JSX.Element} CV Preview component
 */
const CVPreview = memo(
    forwardRef(
        (
            {
                data,
                template = "classic",
                isVisible = true,
                onToggleVisibility,
                zoom = 90,
            },
            ref,
        ) => {
            const [isExporting, setIsExporting] = useState(false);
            const [pageCount, setPageCount] = useState(1);
            const [currentPage, setCurrentPage] = useState(1);
            const previewRef = useRef(null);
            const containerRef = useRef(null);
            const [autoScale, setAutoScale] = useState(1);

            // Calculate scale to fit height
            useLayoutEffect(() => {
                const calculateScale = () => {
                    if (containerRef.current) {
                        const containerHeight =
                            containerRef.current.offsetHeight;
                        const containerWidth = containerRef.current.offsetWidth;

                        // A4 height is roughly 1123px at 96dpi
                        // Minimal padding (e.g., 10px total) to use maximum space
                        const padding = 10;
                        const a4Height = 1123;
                        const a4Width = 794;

                        const heightScale =
                            (containerHeight - padding) / a4Height;
                        const widthScale = (containerWidth - padding) / a4Width;

                        // Use the smaller scale to ensure it fits both ways,
                        // but primarily height as requested.
                        const finalScale = Math.min(heightScale, widthScale);
                        setAutoScale(finalScale);
                    }
                };

                calculateScale();
                window.addEventListener("resize", calculateScale);
                return () =>
                    window.removeEventListener("resize", calculateScale);
            }, [isVisible]);

            // Expose functions to parent via ref
            useImperativeHandle(ref, () => ({
                exportPDF: handleExportPDF,
                print: () => window.print(),
            }));

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
                    const elementToExport =
                        templateElement || previewRef.current;

                    // Temporarily remove transform from parent for clean capture
                    const originalTransform =
                        previewRef.current.style.transform;
                    const originalTransition =
                        previewRef.current.style.transition;
                    previewRef.current.style.transform = "none";
                    previewRef.current.style.transition = "none";

                    // Find and temporarily modify the page viewport to show all content
                    const pageViewport =
                        elementToExport.querySelector(".page-viewport");
                    const slidingContent =
                        elementToExport.querySelector(".sliding-content");

                    let originalViewportHeight = null;
                    let originalViewportOverflow = null;
                    let originalSlidingTransform = null;
                    let originalSlidingTransition = null;

                    if (pageViewport) {
                        originalViewportHeight = pageViewport.style.height;
                        originalViewportOverflow = pageViewport.style.overflow;
                        // Set height to auto to show all content
                        pageViewport.style.height = "auto";
                        pageViewport.style.overflow = "visible";
                    }

                    if (slidingContent) {
                        originalSlidingTransform =
                            slidingContent.style.transform;
                        originalSlidingTransition =
                            slidingContent.style.transition;
                        // Reset translation to show from the beginning
                        slidingContent.style.transform = "none";
                        slidingContent.style.transition = "none";
                    }

                    // Generate filename from CV data
                    const cvName = data.personalInfo?.name || data.name || "CV";
                    const filename = `${cvName}_CV`;

                    const result = await exportToPDF(elementToExport, filename);

                    // Restore all original styles
                    previewRef.current.style.transform = originalTransform;
                    previewRef.current.style.transition = originalTransition;

                    if (pageViewport) {
                        pageViewport.style.height = originalViewportHeight;
                        pageViewport.style.overflow = originalViewportOverflow;
                    }

                    if (slidingContent) {
                        slidingContent.style.transform =
                            originalSlidingTransform;
                        slidingContent.style.transition =
                            originalSlidingTransition;
                    }

                    if (!result.success) {
                        console.error("PDF export failed:", result.error);
                        alert(`Failed to export PDF: ${result.error}`);
                    }
                } catch (error) {
                    console.error("Error exporting PDF:", error);
                    alert("An error occurred while exporting PDF");
                    // Restore transform on error too
                    if (previewRef.current) {
                        previewRef.current.style.transform = `scale(${autoScale * (zoom / 100)})`;
                        previewRef.current.style.transition =
                            "transform 0.2s ease-in-out";
                    }
                } finally {
                    setIsExporting(false);
                }
            };

            // Handle page count updates from template
            const handlePageCountChange = useCallback(
                (count) => {
                    setPageCount(count);
                    // Reset to page 1 if current page is beyond new page count
                    if (currentPage > count) {
                        setCurrentPage(1);
                    }
                },
                [currentPage],
            );

            // Template mapping
            const getTemplate = () => {
                return (
                    <ClassicTemplate
                        data={data}
                        currentPage={currentPage}
                        onPageCountChange={handlePageCountChange}
                    />
                );
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
                            <p className="text-gray-600 mb-4">
                                Preview is hidden
                            </p>
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
                <div
                    className="h-full print:hidden flex flex-col"
                    ref={containerRef}
                >
                    {/* Transparent overlay for the whole area to handle centering */}
                    <div className="bg-gray-100/50 flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Compact Pagination Counter - Moved to Top Right and Smaller */}
                        {pageCount > 1 && (
                            <div className="absolute top-4 right-4 z-20 flex justify-end pointer-events-none">
                                <div className="bg-gray-900/60 backdrop-blur-md text-white px-2 py-1 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto border border-white/5">
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.max(1, prev - 1),
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className="hover:bg-gray-700 p-0.5 rounded-full disabled:opacity-20 transition-all active:scale-90"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <span className="text-[9px] font-bold tabular-nums tracking-tighter uppercase opacity-80">
                                        {currentPage}/{pageCount}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.min(pageCount, prev + 1),
                                            )
                                        }
                                        disabled={currentPage === pageCount}
                                        className="hover:bg-gray-700 p-0.5 rounded-full disabled:opacity-20 transition-all active:scale-90"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Template Container with Zoom */}
                        <div
                            ref={previewRef}
                            className="flex items-center justify-center"
                            style={{
                                transform: `scale(${autoScale * (zoom / 100)})`,
                                transformOrigin: "center center",
                                transition: "transform 0.2s ease-in-out",
                            }}
                        >
                            <div data-template className="shadow-2xl">
                                {getTemplate()}
                            </div>
                        </div>
                    </div>

                    {/* Preview Info Removed to maximize space */}
                </div>
            );
        },
    ),
);

CVPreview.propTypes = {
    data: PropTypes.object.isRequired,
    template: PropTypes.string,
    isVisible: PropTypes.bool,
    onToggleVisibility: PropTypes.func,
    zoom: PropTypes.number,
};

CVPreview.displayName = "CVPreview";

export default CVPreview;

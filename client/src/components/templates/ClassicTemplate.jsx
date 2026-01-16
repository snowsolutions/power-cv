import { memo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FormattedDescription } from "../common";

/**
 * Classic CV Template - Traditional single-column layout with intelligent page breaks
 * @param {Object} props - Component props
 * @param {Object} props.data - Complete CV data object
 * @param {number} props.currentPage - Current page number to display
 * @param {Function} props.onPageCountChange - Callback when total page count changes
 * @returns {JSX.Element} Classic template component
 */
const ClassicTemplate = memo(({ data, currentPage = 1, onPageCountChange }) => {
    const {
        personalInfo,
        introduction,
        workHistory,
        certifications,
        educations,
        activities,
        professionalSkills,
        languageCompetencies,
    } = data;

    const contentRef = useRef(null);

    // Helper function to check if a section has content
    const hasContent = (section) => {
        if (!section) return false;
        if (section.items) return section.items.length > 0;
        if (section.content) return section.content.trim() !== "";
        return false;
    };

    // Intelligent page break calculation
    useEffect(() => {
        if (contentRef.current) {
            // Get the actual viewport height in pixels from the DOM
            const viewport = contentRef.current.closest(".page-viewport");
            const A4_HEIGHT_PX = viewport ? viewport.offsetHeight : 1122.51;
            const BUFFER = 20; // Buffer to prevent cutting content at page bottom
            const HEADER_MIN_SPACE = 200; // Minimum space needed after a header before page break
            const SECTION_TITLE_MIN_SPACE = 250; // Minimum space needed for section titles (h2)

            // Get the scale factor (due to zoom) to normalize coordinates
            const rootRect = contentRef.current.getBoundingClientRect();
            const scale = rootRect.width / contentRef.current.offsetWidth;

            // Helper to get normalized offsetTop relative to content root
            const getOffsetTop = (el) => {
                const elRect = el.getBoundingClientRect();
                return (elRect.top - rootRect.top) / scale;
            };

            // Get all items that should avoid being split by a page break
            const h2Headers = Array.from(
                contentRef.current.querySelectorAll("h2.section-title"),
            );
            const h3Headers = Array.from(
                contentRef.current.querySelectorAll("h3"),
            );
            const pageItems = Array.from(
                contentRef.current.querySelectorAll(".page-item"),
            );
            const avoidBreaks = Array.from(
                contentRef.current.querySelectorAll(".avoid-page-break"),
            );
            const listItems = Array.from(
                contentRef.current.querySelectorAll("li"),
            );
            const sections = Array.from(
                contentRef.current.querySelectorAll(".page-section"),
            );

            // Combine all potential break points
            const allItems = Array.from(
                new Set([
                    ...h2Headers,
                    ...h3Headers,
                    ...pageItems,
                    ...avoidBreaks,
                    ...listItems,
                    ...sections,
                ]),
            ).sort((a, b) => {
                // Sort by position in DOM to ensure we process top-to-bottom
                return a.compareDocumentPosition(b) &
                    Node.DOCUMENT_POSITION_FOLLOWING
                    ? -1
                    : 1;
            });

            console.log(
                `[ClassicTemplate] Found ${allItems.length} breakable items. A4_HEIGHT=${A4_HEIGHT_PX}px`,
            );

            // Reset all previous breaks
            allItems.forEach((item) => {
                item.style.marginTop = "";
                item.classList.remove("force-page-break");
            });

            let pageCount = 1;

            // Iterate through items and apply breaks
            allItems.forEach((item, index) => {
                // Re-measure item top because previous items' marginTop might have shifted this one
                const itemTop = getOffsetTop(item);
                const itemHeight = item.offsetHeight;
                const itemBottom = itemTop + itemHeight;

                const currentPage =
                    Math.floor((itemTop + 0.5) / A4_HEIGHT_PX) + 1;
                const pageBottom = currentPage * A4_HEIGHT_PX;

                // Determine if this is a header or a unit that shouldn't be split
                const isSectionTitle =
                    item.tagName === "H2" ||
                    item.classList.contains("section-title");
                const isHeader =
                    isSectionTitle ||
                    item.tagName === "H3" ||
                    item.classList.contains("job-title");
                const isAvoidBreak =
                    item.classList.contains("avoid-page-break") ||
                    item.classList.contains("page-item");

                // Check if this is a parent container with headers inside
                const hasHeaderChild =
                    item.querySelector("h2") ||
                    item.querySelector("h3") ||
                    item.querySelector(".job-title");

                const spaceLeft = pageBottom - itemTop;
                const spaceAfter = pageBottom - itemBottom;

                // Check if item crosses page boundary OR if it's a header too close to page bottom
                const crossesPageBoundary =
                    itemTop < pageBottom - BUFFER &&
                    itemBottom > pageBottom - BUFFER;

                // Special check for section titles (h2) - need even more space
                // Check if section title is anywhere in the bottom portion of the page
                const distanceFromPageTop = itemTop % A4_HEIGHT_PX;
                const sectionTitleInBottomThird =
                    isSectionTitle &&
                    distanceFromPageTop > (A4_HEIGHT_PX * 2) / 3;

                const sectionTitleTooCloseToBottom =
                    isSectionTitle &&
                    spaceAfter < SECTION_TITLE_MIN_SPACE &&
                    spaceAfter > 0;

                const headerTooCloseToBottom =
                    (isHeader || hasHeaderChild) &&
                    spaceAfter < HEADER_MIN_SPACE &&
                    spaceAfter > 0;

                const containerWithHeaderNearBottom =
                    hasHeaderChild && spaceLeft < HEADER_MIN_SPACE;

                if (
                    crossesPageBoundary ||
                    sectionTitleInBottomThird ||
                    sectionTitleTooCloseToBottom ||
                    headerTooCloseToBottom ||
                    containerWithHeaderNearBottom
                ) {
                    // Logic for pushing:
                    // Always push headers, avoid-break items, containers with headers, or items with very little space left
                    if (
                        isHeader ||
                        isAvoidBreak ||
                        hasHeaderChild ||
                        spaceLeft < 100 ||
                        sectionTitleInBottomThird ||
                        sectionTitleTooCloseToBottom ||
                        headerTooCloseToBottom ||
                        containerWithHeaderNearBottom
                    ) {
                        const pushDistance = pageBottom - itemTop;
                        item.style.marginTop = `${pushDistance}px`;
                        item.classList.add("force-page-break");

                        console.log(
                            `[PageBreak] Pushing item ${index} ("${item.textContent?.substring(0, 30)}...") by ${pushDistance.toFixed(1)}px (reasons: sectionTitle=${isSectionTitle}, inBottomThird=${sectionTitleInBottomThird}, header=${isHeader}, hasChild=${hasHeaderChild}, nearBottom=${headerTooCloseToBottom}, sectionNearBottom=${sectionTitleTooCloseToBottom}, container=${containerWithHeaderNearBottom})`,
                        );
                    }
                }
            });

            // Final check of total height to update page count
            const totalHeight = contentRef.current.scrollHeight;
            const finalPageCount = Math.max(
                pageCount,
                Math.ceil(totalHeight / A4_HEIGHT_PX),
            );

            console.log(
                `[ClassicTemplate] Final: totalHeight=${totalHeight}px, pageCount=${finalPageCount}`,
            );

            if (onPageCountChange) {
                onPageCountChange(finalPageCount);
            }
        }
    }, [data, onPageCountChange]);

    return (
        <div className="classic-template-container relative w-[210mm] mx-auto">
            {/* Page viewport - shows only one page at a time */}
            <div className="page-viewport h-[297mm] overflow-hidden relative bg-white shadow-lg rounded-lg print:shadow-none print:rounded-none">
                {/* Sliding content wrapper */}
                <div
                    ref={contentRef}
                    className="sliding-content transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateY(-${(currentPage - 1) * 297}mm)`,
                    }}
                >
                    {/* Header Section - Centered Traditional Style */}
                    <div className="border-b-4 border-gray-800 px-8 py-6 print:px-12 print:py-8 text-center page-section-header">
                        <h1 className="text-2xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                            {personalInfo.name || "Your Name"}
                        </h1>

                        {/* Contact Information - Horizontal Layout */}
                        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-700">
                            {personalInfo.email && (
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold">
                                        Email:
                                    </span>
                                    <span>{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <>
                                    {personalInfo.email && <span>|</span>}
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold">
                                            Phone:
                                        </span>
                                        <span>{personalInfo.phone}</span>
                                    </div>
                                </>
                            )}
                            {personalInfo.address && (
                                <>
                                    {(personalInfo.email ||
                                        personalInfo.phone) && <span>|</span>}
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold">
                                            Address:
                                        </span>
                                        <span>{personalInfo.address}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Main Content - Single Column */}
                    <div className="px-8 py-6 print:px-12 print:py-8 space-y-6">
                        {/* Introduction Section */}
                        {hasContent(introduction) && (
                            <section className="mb-6 page-section avoid-page-break">
                                <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {introduction.sectionTitle ||
                                        "Professional Summary"}
                                </h2>
                                <div
                                    className="prose prose-xs max-w-none text-gray-700 leading-relaxed text-justify text-xs"
                                    dangerouslySetInnerHTML={{
                                        __html: introduction.content,
                                    }}
                                />
                            </section>
                        )}

                        {/* Professional Skills Section */}
                        {hasContent(professionalSkills) && (
                            <section className="mb-6 page-section avoid-page-break">
                                <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {professionalSkills.sectionTitle ||
                                        "Professional Skills"}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {professionalSkills.items.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="text-gray-800 font-medium">
                                                •
                                            </span>
                                            <div className="flex-grow">
                                                <span className="text-gray-800 font-semibold text-xs">
                                                    {skill.skillName}
                                                </span>
                                                {skill.level && (
                                                    <span className="text-gray-600 text-xs ml-2">
                                                        ({skill.level})
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Work History Section */}
                        {hasContent(workHistory) && (
                            <section className="mb-6 page-section">
                                <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {workHistory.sectionTitle ||
                                        "Professional Experience"}
                                </h2>
                                <div className="space-y-5">
                                    {workHistory.items.map((work) => (
                                        <div
                                            key={work.id}
                                            className="page-item pb-3 avoid-page-break"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <div className="flex-grow">
                                                    <h3 className="text-sm font-bold text-gray-900 job-title">
                                                        {work.position}
                                                    </h3>
                                                    <p className="text-sm font-semibold text-gray-700 italic">
                                                        {work.companyName}
                                                    </p>
                                                </div>
                                                <div className="text-xs text-gray-600 text-right ml-4 flex-shrink-0">
                                                    <p>
                                                        {work.dateFrom} -{" "}
                                                        {work.dateTo ||
                                                            "Present"}
                                                    </p>
                                                </div>
                                            </div>
                                            {work.description && (
                                                <FormattedDescription
                                                    text={work.description}
                                                    className="text-xs text-gray-700 leading-relaxed text-justify mt-2"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education Section */}
                        {hasContent(educations) && (
                            <section className="mb-6 page-section">
                                <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {educations.sectionTitle || "Education"}
                                </h2>
                                <div className="space-y-4">
                                    {educations.items.map((edu) => (
                                        <div
                                            key={edu.id}
                                            className="page-item pb-2 avoid-page-break"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-grow">
                                                    <h3 className="text-sm font-bold text-gray-900">
                                                        {edu.profession}
                                                    </h3>
                                                    <p className="text-sm font-semibold text-gray-700 italic">
                                                        {edu.schoolName}
                                                    </p>
                                                </div>
                                                <div className="text-xs text-gray-600 text-right ml-4 flex-shrink-0">
                                                    <p>
                                                        {edu.studyFrom} -{" "}
                                                        {edu.studyTo ||
                                                            "Present"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications Section */}
                        {hasContent(certifications) && (
                            <section className="mb-6 page-section">
                                <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {certifications.sectionTitle ||
                                        "Certifications"}
                                </h2>
                                <div className="space-y-4">
                                    {certifications.items.map((cert) => (
                                        <div
                                            key={cert.id}
                                            className="flex items-start gap-2 page-item pb-2 avoid-page-break"
                                        >
                                            <span className="text-gray-800 font-medium mt-1">
                                                •
                                            </span>
                                            <div className="flex-grow">
                                                <h3 className="text-sm font-bold text-gray-900">
                                                    {cert.certName}
                                                </h3>
                                                <p className="text-xs text-gray-600">
                                                    {cert.organization}
                                                    {cert.certExpiration && (
                                                        <span className="text-gray-600">
                                                            {" "}
                                                            • Expires:{" "}
                                                            {
                                                                cert.certExpiration
                                                            }
                                                        </span>
                                                    )}
                                                </p>
                                                {cert.certLink && (
                                                    <a
                                                        href={cert.certLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-blue-700 hover:underline"
                                                    >
                                                        {cert.certLink}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Activities Section */}
                        {hasContent(activities) && (
                            <section className="mb-6 page-section">
                                <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {activities.sectionTitle ||
                                        "Activities & Achievements"}
                                </h2>
                                <div className="space-y-4">
                                    {activities.items.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="page-item pb-3 avoid-page-break"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-sm font-bold text-gray-900 flex-grow">
                                                    {activity.activityName}
                                                </h3>
                                                {activity.activityDate && (
                                                    <span className="text-xs text-gray-600 ml-4 flex-shrink-0">
                                                        {activity.activityDate}
                                                    </span>
                                                )}
                                            </div>
                                            {activity.description && (
                                                <FormattedDescription
                                                    text={activity.description}
                                                    className="text-xs text-gray-700 leading-relaxed text-justify mt-2"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Language Competencies Section */}
                        {hasContent(languageCompetencies) && (
                            <section className="mb-6 page-section avoid-page-break">
                                <h2 className="text-base font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {languageCompetencies.sectionTitle ||
                                        "Languages"}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {languageCompetencies.items.map((lang) => (
                                        <div
                                            key={lang.id}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="text-gray-800 font-medium">
                                                •
                                            </span>
                                            <div className="flex-grow">
                                                <span className="text-gray-800 font-semibold text-xs">
                                                    {lang.language}
                                                </span>
                                                {lang.proficiency && (
                                                    <span className="text-gray-600 text-xs ml-2">
                                                        ({lang.proficiency})
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
                .page-viewport {
                    position: relative;
                }

                .sliding-content {
                    will-change: transform;
                }

                .force-page-break {
                    page-break-before: always !important;
                    break-before: page !important;
                }

                .page-section,
                .page-item,
                .page-section-header {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                }

                @media print {
                    .classic-template-container {
                        box-shadow: none !important;
                        border-radius: 0 !important;
                    }

                    .page-viewport {
                        height: auto !important;
                        overflow: visible !important;
                    }

                    .sliding-content {
                        transform: none !important;
                    }

                    .force-page-break {
                        margin-top: 0 !important;
                        page-break-before: always !important;
                        break-before: page !important;
                    }

                    .page-section,
                    .page-item,
                    .page-section-header {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }

                    @page {
                        margin: 0.5in;
                        size: A4;
                    }
                }

                @media screen {
                    .page-section,
                    .page-item {
                        margin-bottom: 1rem;
                    }
                }
            `}</style>
        </div>
    );
});
ClassicTemplate.displayName = "ClassicTemplate";

ClassicTemplate.propTypes = {
    data: PropTypes.shape({
        personalInfo: PropTypes.object,
        introduction: PropTypes.object,
        workHistory: PropTypes.object,
        certifications: PropTypes.object,
        educations: PropTypes.object,
        activities: PropTypes.object,
        professionalSkills: PropTypes.object,
        languageCompetencies: PropTypes.object,
    }).isRequired,
    currentPage: PropTypes.number,
    onPageCountChange: PropTypes.func,
};

export default ClassicTemplate;

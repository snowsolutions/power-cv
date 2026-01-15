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
            const A4_HEIGHT_PX = 1122; // 297mm at 96 DPI
            const MIN_SECTION_SPACE = 60; // Space needed for section headers
            const MIN_ITEM_SPACE = 30; // Space needed for regular items

            // Get all breakable items including section headers
            const items = contentRef.current.querySelectorAll(
                ".page-section, .page-item, .page-section-header, .section-title",
            );

            let currentPageBottom = A4_HEIGHT_PX;
            let pageCount = 1;

            items.forEach((item) => {
                // Remove any previous page break class
                item.classList.remove("force-page-break");
                item.style.marginTop = "";

                const itemTop = item.offsetTop;
                const itemHeight = item.offsetHeight;
                const itemBottom = itemTop + itemHeight;

                // Determine if this is a section header/title
                const isSectionHeader =
                    item.classList.contains("page-section-header") ||
                    item.classList.contains("section-title") ||
                    item.tagName === "H2";
                const minSpace = isSectionHeader
                    ? MIN_SECTION_SPACE
                    : MIN_ITEM_SPACE;

                // Check if item would cross page boundary
                if (
                    itemTop < currentPageBottom &&
                    itemBottom > currentPageBottom
                ) {
                    // Item would be cut - check if we have space for it
                    const spaceLeft = currentPageBottom - itemTop;

                    // For section headers, always push to next page if they would be cut
                    // For items, push if less than minimum space or item is tall
                    if (
                        isSectionHeader ||
                        spaceLeft < minSpace ||
                        itemHeight > minSpace * 2
                    ) {
                        // Push to next page
                        const pushDistance = currentPageBottom - itemTop;
                        item.style.marginTop = `${pushDistance}px`;
                        item.classList.add("force-page-break");

                        // Update page boundary
                        pageCount++;
                        currentPageBottom =
                            itemTop + pushDistance + A4_HEIGHT_PX;
                    }
                } else if (itemTop >= currentPageBottom) {
                    // Item starts on or after current page boundary
                    const pagesSkipped = Math.floor(itemTop / A4_HEIGHT_PX);
                    if (pagesSkipped > pageCount - 1) {
                        pageCount = pagesSkipped + 1;
                        currentPageBottom = pageCount * A4_HEIGHT_PX;
                    }
                }
            });

            // Final page count based on total height
            const totalHeight = contentRef.current.scrollHeight;
            const calculatedPages = Math.ceil(totalHeight / A4_HEIGHT_PX);
            const finalPageCount = Math.max(pageCount, calculatedPages);

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
                        <h1 className="text-3xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                            {personalInfo.name || "Your Name"}
                        </h1>

                        {/* Contact Information - Horizontal Layout */}
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-700">
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
                            <section className="mb-6 page-section">
                                <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {introduction.sectionTitle ||
                                        "Professional Summary"}
                                </h2>
                                <div
                                    className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-justify"
                                    dangerouslySetInnerHTML={{
                                        __html: introduction.content,
                                    }}
                                />
                            </section>
                        )}

                        {/* Professional Skills Section */}
                        {hasContent(professionalSkills) && (
                            <section className="mb-6 page-section">
                                <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
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
                                                <span className="text-gray-800 font-semibold">
                                                    {skill.skillName}
                                                </span>
                                                {skill.proficiency && (
                                                    <span className="text-gray-600 text-sm ml-2">
                                                        ({skill.proficiency})
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
                                <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {workHistory.sectionTitle ||
                                        "Professional Experience"}
                                </h2>
                                <div className="space-y-5">
                                    {workHistory.items.map((work) => (
                                        <div
                                            key={work.id}
                                            className="page-item pb-3"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <div className="flex-grow">
                                                    <h3 className="text-base font-bold text-gray-900">
                                                        {work.position}
                                                    </h3>
                                                    <p className="text-md font-semibold text-gray-700 italic">
                                                        {work.companyName}
                                                    </p>
                                                </div>
                                                <div className="text-sm text-gray-600 text-right ml-4 flex-shrink-0">
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
                                                    className="text-sm text-gray-700 leading-relaxed text-justify mt-2"
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
                                <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {educations.sectionTitle || "Education"}
                                </h2>
                                <div className="space-y-4">
                                    {educations.items.map((edu) => (
                                        <div
                                            key={edu.id}
                                            className="page-item pb-2"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-grow">
                                                    <h3 className="text-base font-bold text-gray-900">
                                                        {edu.profession}
                                                    </h3>
                                                    <p className="text-md font-semibold text-gray-700 italic">
                                                        {edu.schoolName}
                                                    </p>
                                                </div>
                                                <div className="text-sm text-gray-600 text-right ml-4 flex-shrink-0">
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
                                <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {certifications.sectionTitle ||
                                        "Certifications"}
                                </h2>
                                <div className="space-y-4">
                                    {certifications.items.map((cert) => (
                                        <div
                                            key={cert.id}
                                            className="flex items-start gap-2 page-item pb-2"
                                        >
                                            <span className="text-gray-800 font-medium mt-1">
                                                •
                                            </span>
                                            <div className="flex-grow">
                                                <h3 className="text-base font-bold text-gray-900">
                                                    {cert.certName}
                                                </h3>
                                                <p className="text-sm text-gray-600">
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
                                                        className="text-sm text-blue-700 hover:underline"
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
                                <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
                                    {activities.sectionTitle ||
                                        "Activities & Achievements"}
                                </h2>
                                <div className="space-y-4">
                                    {activities.items.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="page-item pb-3"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-base font-bold text-gray-900 flex-grow">
                                                    {activity.activityName}
                                                </h3>
                                                {activity.activityDate && (
                                                    <span className="text-sm text-gray-600 ml-4 flex-shrink-0">
                                                        {activity.activityDate}
                                                    </span>
                                                )}
                                            </div>
                                            {activity.description && (
                                                <FormattedDescription
                                                    text={activity.description}
                                                    className="text-sm text-gray-700 leading-relaxed text-justify mt-2"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Language Competencies Section */}
                        {hasContent(languageCompetencies) && (
                            <section className="mb-6 page-section">
                                <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title">
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
                                                <span className="text-gray-800 font-semibold">
                                                    {lang.languageName}
                                                </span>
                                                {lang.proficiency && (
                                                    <span className="text-gray-600 text-sm ml-2">
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

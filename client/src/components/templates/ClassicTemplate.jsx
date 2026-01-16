import { memo, useEffect, useRef, useState } from "react";
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

    const [pageMargins, setPageMargins] = useState({});
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
            const A4_HEIGHT_PX = 1123; // Use solid pixel value for A4 height
            const BUFFER = 40; // Buffer to prevent cutting content
            const HEADER_MIN_SPACE = 200; // Minimum space needed after a header
            const SECTION_TITLE_MIN_SPACE = 200; // Minimum space needed for section titles (h2)

            const rootRect = contentRef.current.getBoundingClientRect();
            const scale = rootRect.width / contentRef.current.offsetWidth;

            const getOffsetTop = (el) => {
                const elRect = el.getBoundingClientRect();
                return (elRect.top - rootRect.top) / scale;
            };

            // Select only elements that have stable IDs.
            // These IDs must be consistent between the logic loop and the JSX render.
            const allItems = Array.from(contentRef.current.querySelectorAll("[id]"))
                .filter(el => !el.classList.contains('sliding-content') && !el.classList.contains('page-viewport'))
                .sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);

            const newMargins = {};

            // Reset all previous breaks (temporarily for measurement)
            allItems.forEach((item) => {
                item.style.marginTop = "";
            });

            allItems.forEach((item) => {
                const itemTop = getOffsetTop(item);
                const itemHeight = item.offsetHeight;
                const pageNum = Math.floor(itemTop / A4_HEIGHT_PX) + 1;
                const pageBottom = pageNum * A4_HEIGHT_PX;

                const isH2 = item.tagName === "H2" || item.classList.contains("section-title");
                const isHeader = isH2 || item.tagName === "H3" || item.classList.contains("job-title") || item.classList.contains("job-header");
                const isUnit = item.classList.contains("page-item") || item.classList.contains("avoid-page-break") || item.tagName === "LI" || item.tagName === "P";

                const spaceAtBottom = pageBottom - itemTop;

                let shouldPush = false;

                if (isH2) {
                    // Section titles need enough space for header + ~5 lines of text
                    if (spaceAtBottom < 150) shouldPush = true;
                } else if (isHeader) {
                    // Subheaders need space for title + company + ~3 lines
                    if (spaceAtBottom < 80) shouldPush = true;
                } else if (isUnit) {
                    // Small items that shouldn't be cut.
                    if (itemTop + itemHeight > pageBottom - 5) shouldPush = true;
                }

                if (shouldPush) {
                    const pushDistance = pageBottom - itemTop + 60;
                    const id = item.id;
                    if (id) {
                        newMargins[id] = pushDistance;
                        item.style.marginTop = `${pushDistance}px`;
                    }
                }
            });

            setPageMargins(newMargins);

            const totalHeight = contentRef.current.scrollHeight;
            const finalPageCount = Math.ceil(totalHeight / A4_HEIGHT_PX);

            if (onPageCountChange) {
                onPageCountChange(finalPageCount);
            }
        }
    }, [data, onPageCountChange]);

    // Helper component for section titles
    const SectionTitle = ({ title, id }) => (
        <h2
            id={id}
            style={{ marginTop: pageMargins[id] ? `${pageMargins[id]}px` : '' }}
            className={`text-base font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide section-title ${pageMargins[id] ? 'force-page-break' : ''}`}
        >
            {title}
        </h2>
    );

    return (
        <div className="classic-template-container relative w-[210mm] mx-auto">
            {/* Page viewport - shows only one page at a time */}
            <div
                className="page-viewport overflow-hidden relative bg-white shadow-lg rounded-lg print:shadow-none print:rounded-none"
                style={{ height: '1123px' }}
            >
                {/* Sliding content wrapper */}
                <div
                    ref={contentRef}
                    className="sliding-content transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateY(-${(currentPage - 1) * 1123}px)`,
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
                                    <span className="font-semibold text-xs">
                                        Email:
                                    </span>
                                    <span>{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <>
                                    {personalInfo.email && <span>|</span>}
                                    <div className="flex items-center gap-1">
                                        <span className="font-semibold text-xs">
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
                                        <span className="font-semibold text-xs">
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
                                <SectionTitle
                                    title={introduction.sectionTitle || "Professional Summary"}
                                    id="intro-title"
                                />
                                <FormattedDescription
                                    text={introduction.content}
                                    idPrefix="intro"
                                    pageMargins={pageMargins}
                                    className="text-xs text-gray-700 leading-relaxed text-justify"
                                />
                            </section>
                        )}

                        {/* Professional Skills Section */}
                        {hasContent(professionalSkills) && (
                            <section className="mb-6 page-section avoid-page-break">
                                <SectionTitle
                                    title={professionalSkills.sectionTitle || "Professional Skills"}
                                    id="skills-title"
                                />
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
                                <SectionTitle
                                    title={workHistory.sectionTitle || "Professional Experience"}
                                    id="work-title"
                                />
                                <div className="space-y-5">
                                    {workHistory.items.map((work, idx) => (
                                        <div
                                            id={`work-item-${idx}`}
                                            style={{ marginTop: pageMargins[`work-item-${idx}`] ? `${pageMargins[`work-item-${idx}`]}px` : '' }}
                                            className={`page-item pb-3 avoid-page-break ${pageMargins[`work-item-${idx}`] ? 'force-page-break' : ''}`}
                                        >
                                            <div
                                                id={`work-header-${idx}`}
                                                style={{ marginTop: pageMargins[`work-header-${idx}`] ? `${pageMargins[`work-header-${idx}`]}px` : '' }}
                                                className={`flex justify-between items-start mb-1 job-header ${pageMargins[`work-header-${idx}`] ? 'force-page-break' : ''}`}
                                            >
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
                                                    idPrefix={`work-desc-${idx}`}
                                                    pageMargins={pageMargins}
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
                                <SectionTitle
                                    title={educations.sectionTitle || "Education"}
                                    id="edu-title"
                                />
                                <div className="space-y-4">
                                    {educations.items.map((edu, idx) => (
                                        <div
                                            key={edu.id}
                                            id={`edu-item-${idx}`}
                                            style={{ marginTop: pageMargins[`edu-item-${idx}`] ? `${pageMargins[`edu-item-${idx}`]}px` : '' }}
                                            className={`page-item pb-2 avoid-page-break ${pageMargins[`edu-item-${idx}`] ? 'force-page-break' : ''}`}
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
                                <SectionTitle
                                    title={certifications.sectionTitle || "Certifications"}
                                    id="cert-title"
                                />
                                <div className="space-y-4">
                                    {certifications.items.map((cert, idx) => (
                                        <div
                                            key={cert.id}
                                            id={`cert-item-${idx}`}
                                            style={{ marginTop: pageMargins[`cert-item-${idx}`] ? `${pageMargins[`cert-item-${idx}`]}px` : '' }}
                                            className={`flex items-start gap-2 page-item pb-2 avoid-page-break ${pageMargins[`cert-item-${idx}`] ? 'force-page-break' : ''}`}
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
                                <SectionTitle
                                    title={activities.sectionTitle || "Activities & Achievements"}
                                    id="activities-title"
                                />
                                <div className="space-y-4">
                                    {activities.items.map((activity, idx) => (
                                        <div
                                            key={activity.id}
                                            id={`activity-item-${idx}`}
                                            style={{ marginTop: pageMargins[`activity-item-${idx}`] ? `${pageMargins[`activity-item-${idx}`]}px` : '' }}
                                            className={`page-item pb-3 avoid-page-break ${pageMargins[`activity-item-${idx}`] ? 'force-page-break' : ''}`}
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
                                                    idPrefix={`act-desc-${idx}`}
                                                    pageMargins={pageMargins}
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
                                <SectionTitle
                                    title={languageCompetencies.sectionTitle || "Languages"}
                                    id="lang-title"
                                />
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
                        .page-section-header,
                        .job-header,
                        .section-title {
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
                            .page-section-header,
                            .job-header,
                            .section-title {
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
            </div>
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

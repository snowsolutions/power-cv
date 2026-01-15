import { memo } from "react";
import PropTypes from "prop-types";
import { FormattedDescription } from "../common";

/**
 * Classic CV Template - Traditional single-column layout
 * @param {Object} props - Component props
 * @param {Object} props.data - Complete CV data object
 * @returns {JSX.Element} Classic template component
 */
const ClassicTemplate = memo(({ data }) => {
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

    // Helper function to check if a section has content
    const hasContent = (section) => {
        if (!section) return false;
        if (section.items) return section.items.length > 0;
        if (section.content) return section.content.trim() !== "";
        return false;
    };

    return (
        <div className="classic-template bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none max-w-[210mm] mx-auto print:max-w-full">
            {/* A4 Size Container - 210mm x 297mm */}
            <div className="min-h-[297mm] print:min-h-0 p-0">
                {/* Header Section - Centered Traditional Style */}
                <div className="border-b-4 border-gray-800 px-8 py-6 print:px-12 print:py-8 text-center avoid-page-break">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                        {personalInfo.name || "Your Name"}
                    </h1>

                    {/* Contact Information - Horizontal Layout */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-700">
                        {personalInfo.email && (
                            <div className="flex items-center gap-1">
                                <span className="font-semibold">Email:</span>
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
                                {(personalInfo.email || personalInfo.phone) && (
                                    <span>|</span>
                                )}
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
                        <section className="mb-6 avoid-page-break">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide">
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
                        <section className="mb-6 avoid-page-break">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide">
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
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide">
                                {workHistory.sectionTitle ||
                                    "Professional Experience"}
                            </h2>
                            <div className="space-y-5">
                                {workHistory.items.map((work) => (
                                    <div
                                        key={work.id}
                                        className="avoid-page-break pb-3"
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
                                                    {work.dateTo || "Present"}
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
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide">
                                {educations.sectionTitle || "Education"}
                            </h2>
                            <div className="space-y-4">
                                {educations.items.map((edu) => (
                                    <div
                                        key={edu.id}
                                        className="avoid-page-break pb-2"
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
                                                    {edu.studyTo || "Present"}
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
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide">
                                {certifications.sectionTitle ||
                                    "Certifications"}
                            </h2>
                            <div className="space-y-4">
                                {certifications.items.map((cert) => (
                                    <div
                                        key={cert.id}
                                        className="flex items-start gap-2 avoid-page-break pb-2"
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
                                                        {cert.certExpiration}
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
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide">
                                {activities.sectionTitle ||
                                    "Activities & Achievements"}
                            </h2>
                            <div className="space-y-4">
                                {activities.items.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="avoid-page-break pb-3"
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
                        <section className="mb-6 avoid-page-break">
                            <h2 className="text-lg font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-800 uppercase tracking-wide">
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

            {/* Print Styles */}
            <style>{`
                .avoid-page-break {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                }

                @media print {
                    .classic-template {
                        box-shadow: none !important;
                        border-radius: 0 !important;
                    }

                    .avoid-page-break {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }

                    @page {
                        margin: 0.5in;
                        size: A4;
                    }
                }

                @media screen {
                    .avoid-page-break {
                        margin-bottom: 0.5rem;
                    }
                }
            `}</style>
        </div>
    );
});

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
};

ClassicTemplate.displayName = "ClassicTemplate";

export default ClassicTemplate;

import { memo } from "react";
import PropTypes from "prop-types";
import { FormattedDescription } from "../common";

/**
 * Minimal CV Template - Clean minimalist design
 * @param {Object} props - Component props
 * @param {Object} props.data - Complete CV data object
 * @returns {JSX.Element} Minimal template component
 */
const MinimalTemplate = memo(({ data }) => {
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
        <div className="minimal-template bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none max-w-[210mm] min-h-[297mm] mx-auto px-8 py-6 print:px-12 print:py-8">
            <style>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0.5in;
                    }
                    .minimal-template {
                        page-break-after: auto;
                    }
                }
            `}</style>
            {/* Header Section - Clean and Simple */}
            <div className="border-b border-gray-200 pb-5 mb-6">
                <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
                    {personalInfo.name || "Your Name"}
                </h1>

                {/* Contact Information - Inline */}
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
                    {personalInfo.email && (
                        <div className="flex items-center gap-2">
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-2">
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.address && (
                        <div className="flex items-center gap-2">
                            <span>{personalInfo.address}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
                {/* Introduction Section */}
                {hasContent(introduction) && (
                    <section>
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 letterspacing-wide">
                            {introduction.sectionTitle || "Summary"}
                        </h2>
                        <div
                            className="prose prose-sm max-w-none text-gray-800 leading-relaxed font-light"
                            dangerouslySetInnerHTML={{
                                __html: introduction.content,
                            }}
                        />
                    </section>
                )}

                {/* Work History Section */}
                {hasContent(workHistory) && (
                    <section>
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 letterspacing-wide">
                            {workHistory.sectionTitle || "Experience"}
                        </h2>
                        <div className="space-y-5">
                            {workHistory.items.map((work) => (
                                <div key={work.id} className="avoid-page-break">
                                    <div className="flex justify-between items-baseline mb-1 gap-4">
                                        <div className="flex-grow">
                                            <h3 className="text-base font-medium text-gray-900">
                                                {work.position}
                                            </h3>
                                            <p className="text-sm text-gray-700 font-light">
                                                {work.companyName}
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500 font-light flex-shrink-0">
                                            {work.dateFrom} –{" "}
                                            {work.dateTo || "Present"}
                                        </div>
                                    </div>
                                    {work.description && (
                                        <FormattedDescription
                                            text={work.description}
                                            className="text-gray-700 leading-relaxed font-light mt-2"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {hasContent(educations) && (
                    <section>
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 letterspacing-wide">
                            {educations.sectionTitle || "Education"}
                        </h2>
                        <div className="space-y-4">
                            {educations.items.map((edu) => (
                                <div key={edu.id} className="avoid-page-break">
                                    <div className="flex justify-between items-baseline gap-4">
                                        <div className="flex-grow">
                                            <h3 className="text-base font-medium text-gray-900">
                                                {edu.profession}
                                            </h3>
                                            <p className="text-sm text-gray-700 font-light">
                                                {edu.schoolName}
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500 font-light flex-shrink-0">
                                            {edu.studyFrom} –{" "}
                                            {edu.studyTo || "Present"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Skills Section */}
                {hasContent(professionalSkills) && (
                    <section>
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 letterspacing-wide">
                            {professionalSkills.sectionTitle || "Skills"}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {professionalSkills.items.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-sm text-sm font-light"
                                >
                                    {skill.skillName}
                                    {skill.proficiency && (
                                        <span className="text-gray-600 ml-1">
                                            · {skill.proficiency}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications Section */}
                {hasContent(certifications) && (
                    <section>
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 letterspacing-wide">
                            {certifications.sectionTitle || "Certifications"}
                        </h2>
                        <div className="space-y-3">
                            {certifications.items.map((cert) => (
                                <div key={cert.id} className="avoid-page-break">
                                    <h3 className="text-md font-medium text-gray-900">
                                        {cert.certName}
                                    </h3>
                                    <p className="text-sm text-gray-700 font-light">
                                        {cert.organization}
                                        {cert.certExpiration && (
                                            <span className="text-gray-500">
                                                {" "}
                                                · Expires {cert.certExpiration}
                                            </span>
                                        )}
                                    </p>
                                    {cert.certLink && (
                                        <a
                                            href={cert.certLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-gray-600 hover:text-gray-900 font-light"
                                        >
                                            {cert.certLink}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Activities Section */}
                {hasContent(activities) && (
                    <section>
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 letterspacing-wide">
                            {activities.sectionTitle || "Activities"}
                        </h2>
                        <div className="space-y-4">
                            {activities.items.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="avoid-page-break"
                                >
                                    <div className="flex justify-between items-baseline gap-4 mb-1">
                                        <h3 className="text-md font-medium text-gray-900 flex-grow">
                                            {activity.activityName}
                                        </h3>
                                        {activity.activityDate && (
                                            <span className="text-sm text-gray-500 font-light flex-shrink-0">
                                                {activity.activityDate}
                                            </span>
                                        )}
                                    </div>
                                    {activity.description && (
                                        <FormattedDescription
                                            text={activity.description}
                                            className="text-gray-700 leading-relaxed font-light mt-2"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Language Competencies Section */}
                {hasContent(languageCompetencies) && (
                    <section>
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 letterspacing-wide">
                            {languageCompetencies.sectionTitle || "Languages"}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {languageCompetencies.items.map((lang) => (
                                <div
                                    key={lang.id}
                                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-sm text-sm font-light"
                                >
                                    {lang.languageName}
                                    {lang.proficiency && (
                                        <span className="text-gray-600 ml-1">
                                            · {lang.proficiency}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
});

MinimalTemplate.propTypes = {
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

MinimalTemplate.displayName = "MinimalTemplate";

export default MinimalTemplate;

import { memo } from "react";
import PropTypes from "prop-types";
import { FormattedDescription } from "../common";

/**
 * Creative CV Template - Colorful two-column sidebar layout
 * @param {Object} props - Component props
 * @param {Object} props.data - Complete CV data object
 * @returns {JSX.Element} Creative template component
 */
const CreativeTemplate = memo(({ data }) => {
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
        <div className="creative-template bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none max-w-[210mm] min-h-[297mm] mx-auto px-6 py-5 print:px-8 print:py-6">
            <style>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0.5in;
                    }
                    .creative-template {
                        page-break-after: auto;
                    }
                }
            `}</style>
            <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left Sidebar - Colorful */}
                <div className="md:col-span-4 bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 text-white p-6 print:p-5">
                    {/* Avatar */}
                    {personalInfo.avatar && (
                        <div className="mb-4 flex justify-center">
                            <img
                                src={personalInfo.avatar}
                                alt={personalInfo.name}
                                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-2xl"
                            />
                        </div>
                    )}

                    {/* Name */}
                    <div className="mb-5 text-center">
                        <h1 className="text-2xl font-bold mb-2 break-words">
                            {personalInfo.name || "Your Name"}
                        </h1>
                        <div className="h-1 w-20 bg-white mx-auto rounded-full"></div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-5">
                        <h2 className="text-base font-bold mb-3 uppercase tracking-wider">
                            Contact
                        </h2>
                        <div className="space-y-2 text-xs">
                            {personalInfo.email && (
                                <div className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span className="break-all">
                                        {personalInfo.email}
                                    </span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo.address && (
                                <div className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>{personalInfo.address}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Professional Skills */}
                    {hasContent(professionalSkills) && (
                        <div className="mb-5">
                            <h2 className="text-base font-bold mb-3 uppercase tracking-wider">
                                {professionalSkills.sectionTitle || "Skills"}
                            </h2>
                            <div className="space-y-2">
                                {professionalSkills.items.map((skill) => (
                                    <div key={skill.id}>
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className="text-xs font-medium">
                                                {skill.skillName}
                                            </span>
                                            {skill.proficiency && (
                                                <span className="text-xs opacity-90">
                                                    {skill.proficiency}
                                                </span>
                                            )}
                                        </div>
                                        <div className="h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white rounded-full transition-all"
                                                style={{
                                                    width:
                                                        skill.proficiency ===
                                                        "Expert"
                                                            ? "100%"
                                                            : skill.proficiency ===
                                                                "Advanced"
                                                              ? "80%"
                                                              : skill.proficiency ===
                                                                  "Intermediate"
                                                                ? "60%"
                                                                : skill.proficiency ===
                                                                    "Beginner"
                                                                  ? "40%"
                                                                  : "70%",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Language Competencies */}
                    {hasContent(languageCompetencies) && (
                        <div className="mb-5">
                            <h2 className="text-base font-bold mb-3 uppercase tracking-wider">
                                {languageCompetencies.sectionTitle ||
                                    "Languages"}
                            </h2>
                            <div className="space-y-2">
                                {languageCompetencies.items.map((lang) => (
                                    <div key={lang.id}>
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className="text-xs font-medium">
                                                {lang.languageName}
                                            </span>
                                            {lang.proficiency && (
                                                <span className="text-xs opacity-90">
                                                    {lang.proficiency}
                                                </span>
                                            )}
                                        </div>
                                        <div className="h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white rounded-full transition-all"
                                                style={{
                                                    width:
                                                        lang.proficiency ===
                                                        "Native"
                                                            ? "100%"
                                                            : lang.proficiency ===
                                                                "Fluent"
                                                              ? "90%"
                                                              : lang.proficiency ===
                                                                  "Advanced"
                                                                ? "75%"
                                                                : lang.proficiency ===
                                                                    "Intermediate"
                                                                  ? "60%"
                                                                  : lang.proficiency ===
                                                                      "Beginner"
                                                                    ? "40%"
                                                                    : "70%",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Content Area */}
                <div className="md:col-span-8 p-6 print:p-5">
                    {/* Introduction Section */}
                    {hasContent(introduction) && (
                        <section className="mb-5">
                            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b-2 border-purple-500">
                                {introduction.sectionTitle || "About Me"}
                            </h2>
                            <div
                                className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: introduction.content,
                                }}
                            />
                        </section>
                    )}

                    {/* Work History Section */}
                    {hasContent(workHistory) && (
                        <section className="mb-5">
                            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b-2 border-pink-500">
                                {workHistory.sectionTitle || "Experience"}
                            </h2>
                            <div className="space-y-4">
                                {workHistory.items.map((work, index) => (
                                    <div
                                        key={work.id}
                                        className="relative pl-6 avoid-page-break"
                                    >
                                        {/* Timeline dot */}
                                        <div
                                            className={`absolute left-0 top-2 w-4 h-4 rounded-full ${
                                                index % 3 === 0
                                                    ? "bg-purple-500"
                                                    : index % 3 === 1
                                                      ? "bg-pink-500"
                                                      : "bg-red-500"
                                            }`}
                                        ></div>
                                        {/* Timeline line */}
                                        {index !==
                                            workHistory.items.length - 1 && (
                                            <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 to-pink-300"></div>
                                        )}
                                        <div className="mb-1">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {work.position}
                                            </h3>
                                            <p className="text-sm font-semibold text-purple-600">
                                                {work.companyName}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {work.dateFrom} -{" "}
                                                {work.dateTo || "Present"}
                                            </p>
                                        </div>
                                        {work.description && (
                                            <FormattedDescription
                                                text={work.description}
                                                className="text-gray-700 leading-relaxed mt-2"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education Section */}
                    {hasContent(educations) && (
                        <section className="mb-5">
                            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b-2 border-red-500">
                                {educations.sectionTitle || "Education"}
                            </h2>
                            <div className="space-y-3">
                                {educations.items.map((edu) => (
                                    <div
                                        key={edu.id}
                                        className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg avoid-page-break"
                                    >
                                        <h3 className="text-base font-bold text-gray-900">
                                            {edu.profession}
                                        </h3>
                                        <p className="text-sm font-semibold text-purple-600">
                                            {edu.schoolName}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {edu.studyFrom} -{" "}
                                            {edu.studyTo || "Present"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications Section */}
                    {hasContent(certifications) && (
                        <section className="mb-5">
                            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b-2 border-purple-500">
                                {certifications.sectionTitle ||
                                    "Certifications"}
                            </h2>
                            <div className="grid grid-cols-1 gap-3">
                                {certifications.items.map((cert) => (
                                    <div
                                        key={cert.id}
                                        className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg avoid-page-break"
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            <svg
                                                className="w-6 h-6 text-pink-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-sm font-bold text-gray-900">
                                                {cert.certName}
                                            </h3>
                                            <p className="text-sm text-gray-700">
                                                {cert.organization}
                                            </p>
                                            {cert.certExpiration && (
                                                <p className="text-xs text-gray-600 mt-1">
                                                    Expires:{" "}
                                                    {cert.certExpiration}
                                                </p>
                                            )}
                                            {cert.certLink && (
                                                <a
                                                    href={cert.certLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-purple-600 hover:underline inline-flex items-center gap-1 mt-1"
                                                >
                                                    View Credential
                                                    <svg
                                                        className="w-3 h-3"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
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
                        <section className="mb-5">
                            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b-2 border-pink-500">
                                {activities.sectionTitle || "Activities"}
                            </h2>
                            <div className="space-y-4">
                                {activities.items.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="pl-4 border-l-4 border-purple-400 avoid-page-break"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-sm font-bold text-gray-900 flex-grow">
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
                                                className="text-gray-700 leading-relaxed mt-2"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
});

CreativeTemplate.propTypes = {
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

CreativeTemplate.displayName = "CreativeTemplate";

export default CreativeTemplate;

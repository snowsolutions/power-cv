import { memo } from "react";
import PropTypes from "prop-types";
import { FormattedDescription } from "../common";

/**
 * Modern CV Template - Professional two-column layout
 * @param {Object} props - Component props
 * @param {Object} props.data - Complete CV data object
 * @returns {JSX.Element} Modern template component
 */
const ModernTemplate = memo(({ data }) => {
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
        <div className="modern-template bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none max-w-[210mm] mx-auto print:max-w-full">
            {/* A4 Size Container - 210mm x 297mm */}
            <div className="min-h-[297mm] print:min-h-0">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-6 print:px-12 print:py-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Avatar */}
                        {personalInfo.avatar && (
                            <div className="flex-shrink-0">
                                <img
                                    src={personalInfo.avatar}
                                    alt={personalInfo.name}
                                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                                />
                            </div>
                        )}

                        {/* Personal Info */}
                        <div className="flex-grow text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-2">
                                {personalInfo.name || "Your Name"}
                            </h1>
                            <div className="space-y-1 text-blue-100">
                                {personalInfo.email && (
                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>{personalInfo.email}</span>
                                    </div>
                                )}
                                {personalInfo.phone && (
                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>{personalInfo.phone}</span>
                                    </div>
                                )}
                                {personalInfo.address && (
                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{personalInfo.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-8 py-6 print:px-12 print:py-8 space-y-6">
                {/* Introduction Section */}
                {hasContent(introduction) && (
                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                            {introduction.sectionTitle || "Introduction"}
                        </h2>
                        <div
                            className="prose prose-sm max-w-none text-gray-700 leading-relaxed text-justify"
                            dangerouslySetInnerHTML={{
                                __html: introduction.content,
                            }}
                        />
                    </section>
                )}

                {/* Work History Section */}
                {hasContent(workHistory) && (
                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                            {workHistory.sectionTitle || "Work History"}
                        </h2>
                        <div className="space-y-4">
                            {workHistory.items.map((work) => (
                                <div
                                    key={work.id}
                                    className="relative pl-6 border-l-2 border-blue-300 avoid-page-break"
                                >
                                    <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-blue-600"></div>
                                    <div className="mb-2">
                                        <h3 className="text-base font-semibold text-gray-800">
                                            {work.position}
                                        </h3>
                                        <p className="text-sm font-medium text-blue-600">
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
                                            className="text-sm text-gray-700 leading-relaxed mt-2"
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
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                            {educations.sectionTitle || "Education"}
                        </h2>
                        <div className="space-y-3">
                            {educations.items.map((edu) => (
                                <div
                                    key={edu.id}
                                    className="border-l-4 border-blue-600 pl-4 avoid-page-break"
                                >
                                    <h3 className="text-base font-semibold text-gray-800">
                                        {edu.profession}
                                    </h3>
                                    <p className="text-sm font-medium text-blue-600">
                                        {edu.schoolName}
                                    </p>
                                    <p className="text-sm text-gray-500">
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
                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                            {certifications.sectionTitle || "Certifications"}
                        </h2>
                        <div className="space-y-3">
                            {certifications.items.map((cert) => (
                                <div
                                    key={cert.id}
                                    className="flex items-start gap-3 avoid-page-break"
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <svg
                                            className="w-5 h-5 text-blue-600"
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
                                        <h3 className="text-base font-semibold text-gray-800">
                                            {cert.certName}
                                        </h3>
                                        <p className="text-sm text-blue-600">
                                            {cert.organization}
                                        </p>
                                        {cert.certExpiration && (
                                            <p className="text-sm text-gray-500">
                                                Expires: {cert.certExpiration}
                                            </p>
                                        )}
                                        {cert.certLink && (
                                            <a
                                                href={cert.certLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1 mt-1"
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
                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                            {activities.sectionTitle || "Activities"}
                        </h2>
                        <div className="space-y-3">
                            {activities.items.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="avoid-page-break"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {activity.title}
                                    </h3>
                                    {activity.date && (
                                        <p className="text-sm text-gray-500 mb-1">
                                            {activity.date}
                                        </p>
                                    )}
                                    {activity.description && (
                                        <FormattedDescription
                                            text={activity.description}
                                            className="text-sm text-gray-700 leading-relaxed mt-2"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Skills Section */}
                {hasContent(professionalSkills) && (
                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                            {professionalSkills.sectionTitle ||
                                "Professional Skills"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {professionalSkills.items.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="flex items-start gap-3"
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-baseline gap-2">
                                            <h3 className="text-md font-semibold text-gray-800">
                                                {skill.skillName}
                                            </h3>
                                            {skill.level && (
                                                <span className="text-sm text-blue-600">
                                                    • {skill.level}
                                                </span>
                                            )}
                                        </div>
                                        {skill.description && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                {skill.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Language Competencies Section */}
                {hasContent(languageCompetencies) && (
                    <section className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                            {languageCompetencies.sectionTitle ||
                                "Language Competencies"}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {languageCompetencies.items.map((lang) => (
                                <div
                                    key={lang.id}
                                    className="flex flex-col p-3 bg-gray-50 rounded-lg"
                                >
                                    <span className="font-semibold text-gray-800">
                                        {lang.language}
                                    </span>
                                    <span className="text-sm text-blue-600">
                                        {lang.proficiency}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {!hasContent(introduction) &&
                    !hasContent(workHistory) &&
                    !hasContent(educations) &&
                    !hasContent(certifications) &&
                    !hasContent(activities) &&
                    !hasContent(professionalSkills) &&
                    !hasContent(languageCompetencies) && (
                        <div className="text-center py-12">
                            <svg
                                className="w-24 h-24 mx-auto text-gray-300 mb-4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-500 text-lg">
                                Start adding your information to see your CV
                                preview
                            </p>
                        </div>
                    )}
            </div>

            {/* Print Styles */}
            <style>{`
                @media print {
                    .modern-template {
                        box-shadow: none !important;
                        border-radius: 0 !important;
                    }

                    @page {
                        margin: 0.5in;
                        size: A4;
                    }

                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }

                    .modern-template a {
                        color: #2563eb !important;
                        text-decoration: none;
                    }

                    .modern-template svg {
                        display: inline-block;
                    }

                    /* Prevent page breaks inside sections */
                    .modern-template section {
                        page-break-inside: avoid;
                    }

                    /* Prevent page breaks after headings */
                    .modern-template h2,
                    .modern-template h3 {
                        page-break-after: avoid;
                    }
                }
            `}</style>
        </div>
    );
});

ModernTemplate.propTypes = {
    data: PropTypes.shape({
        personalInfo: PropTypes.shape({
            sectionTitle: PropTypes.string,
            name: PropTypes.string,
            email: PropTypes.string,
            phone: PropTypes.string,
            address: PropTypes.string,
            avatar: PropTypes.string,
        }).isRequired,
        introduction: PropTypes.shape({
            sectionTitle: PropTypes.string,
            content: PropTypes.string,
        }),
        workHistory: PropTypes.shape({
            sectionTitle: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    dateFrom: PropTypes.string,
                    dateTo: PropTypes.string,
                    companyName: PropTypes.string,
                    position: PropTypes.string,
                    description: PropTypes.string,
                }),
            ),
        }),
        certifications: PropTypes.shape({
            sectionTitle: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    certName: PropTypes.string,
                    organization: PropTypes.string,
                    certLink: PropTypes.string,
                    certExpiration: PropTypes.string,
                }),
            ),
        }),
        educations: PropTypes.shape({
            sectionTitle: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    schoolName: PropTypes.string,
                    studyFrom: PropTypes.string,
                    studyTo: PropTypes.string,
                    profession: PropTypes.string,
                }),
            ),
        }),
        activities: PropTypes.shape({
            sectionTitle: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    title: PropTypes.string,
                    description: PropTypes.string,
                    date: PropTypes.string,
                }),
            ),
        }),
        professionalSkills: PropTypes.shape({
            sectionTitle: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    skillName: PropTypes.string,
                    level: PropTypes.string,
                    description: PropTypes.string,
                }),
            ),
        }),
        languageCompetencies: PropTypes.shape({
            sectionTitle: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    language: PropTypes.string,
                    proficiency: PropTypes.string,
                }),
            ),
        }),
    }).isRequired,
};

ModernTemplate.displayName = "ModernTemplate";

export default ModernTemplate;

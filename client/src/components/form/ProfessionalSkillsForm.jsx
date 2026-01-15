import { useState } from "react";
import PropTypes from "prop-types";
import { Input, SectionTitleEditor } from "../common";
import { DEFAULT_SECTION_TITLES, SKILL_LEVELS } from "../../utils/constants";
import { getEmptySkillItem } from "../../utils/initialCVData";

const SkillItem = ({ skill, onUpdate, onRemove }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFieldChange = (field, value) => {
        onUpdate(skill.id, { [field]: value });
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:border-blue-300 transition-colors">
            {/* Header - Always Visible */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                        {skill.skillName || "Untitled Skill"}
                    </h4>
                    {skill.level && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {skill.level}
                        </span>
                    )}
                </div>
                <div className="flex gap-2 ml-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        {isExpanded ? "Collapse" : "Expand"}
                    </button>
                    <button
                        onClick={() => onRemove(skill.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                        Remove
                    </button>
                </div>
            </div>

            {/* Expandable Form Fields */}
            {isExpanded && (
                <div className="space-y-4 pt-3 border-t border-gray-100">
                    <Input
                        label="Skill Name"
                        value={skill.skillName}
                        onChange={(e) =>
                            handleFieldChange("skillName", e.target.value)
                        }
                        placeholder="e.g., JavaScript, Python, Project Management"
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Skill Level <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={skill.level}
                            onChange={(e) =>
                                handleFieldChange("level", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select level...</option>
                            {SKILL_LEVELS.map((level) => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (Optional)
                        </label>
                        <textarea
                            value={skill.description}
                            onChange={(e) =>
                                handleFieldChange("description", e.target.value)
                            }
                            placeholder="e.g., 5+ years experience, Built 20+ web applications..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

SkillItem.propTypes = {
    skill: PropTypes.shape({
        id: PropTypes.string.isRequired,
        skillName: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

const ProfessionalSkillsForm = ({
    professionalSkills,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    onUpdateSectionTitle,
}) => {
    const handleAddSkill = () => {
        const newSkill = getEmptySkillItem();
        onAddItem("professionalSkills", newSkill);
    };

    const handleUpdateSkill = (itemId, updatedFields) => {
        onUpdateItem("professionalSkills", itemId, updatedFields);
    };

    const handleRemoveSkill = (itemId) => {
        onRemoveItem("professionalSkills", itemId);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Section Title */}
            <SectionTitleEditor
                sectionKey="professionalSkills"
                currentTitle={professionalSkills.sectionTitle}
                defaultTitle={DEFAULT_SECTION_TITLES.professionalSkills}
                onUpdate={onUpdateSectionTitle}
            />
            <p className="text-sm text-gray-500 -mt-4 mb-6">
                List your professional skills, technical abilities, and
                competencies
            </p>

            {/* Skills List */}
            <div className="mb-6">
                {professionalSkills.items.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">
                            No skills added yet
                        </p>
                        <button
                            onClick={handleAddSkill}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Add Your First Skill
                        </button>
                    </div>
                ) : (
                    <>
                        {professionalSkills.items.map((skill) => (
                            <SkillItem
                                key={skill.id}
                                skill={skill}
                                onUpdate={handleUpdateSkill}
                                onRemove={handleRemoveSkill}
                            />
                        ))}
                        <button
                            onClick={handleAddSkill}
                            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                        >
                            + Add Another Skill
                        </button>
                    </>
                )}
            </div>

            {/* Info Box */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start">
                    <svg
                        className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div className="text-sm text-blue-800">
                        <p className="font-medium">Tips:</p>
                        <ul className="mt-1 list-disc list-inside space-y-1">
                            <li>Include both technical and soft skills</li>
                            <li>Be honest about your skill level</li>
                            <li>
                                Add context in the description (years of
                                experience, projects)
                            </li>
                            <li>Prioritize skills most relevant to your goals</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfessionalSkillsForm.propTypes = {
    professionalSkills: PropTypes.shape({
        sectionTitle: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                skillName: PropTypes.string.isRequired,
                level: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    onAddItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onUpdateSectionTitle: PropTypes.func.isRequired,
};

export default ProfessionalSkillsForm;

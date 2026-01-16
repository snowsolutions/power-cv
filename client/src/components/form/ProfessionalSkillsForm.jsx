import { useState } from "react";
import PropTypes from "prop-types";
import {
    Plus,
    Trash2,
    ChevronDown,
    ChevronUp,
    Info,
    Wand2
} from "lucide-react";
import { Input, SectionTitleEditor } from "../common";
import { DEFAULT_SECTION_TITLES, SKILL_LEVELS } from "../../utils/constants";
import { getEmptySkillItem } from "../../utils/initialCVData";

const SkillItem = ({ skill, onUpdate, onRemove, showLevel }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFieldChange = (field, value) => {
        onUpdate(skill.id, { [field]: value });
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:border-blue-300 transition-colors bg-white">
            {/* Header - Always Visible */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                    <h4 className="font-medium text-gray-900">
                        {skill.skillName || "Untitled Skill"}
                    </h4>
                    {showLevel && skill.level && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {skill.level}
                        </span>
                    )}
                </div>
                <div className="flex gap-2 ml-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-50 transition-colors"
                        title={isExpanded ? "Collapse" : "Expand"}
                    >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={() => onRemove(skill.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                        title="Remove skill"
                    >
                        <Trash2 className="w-5 h-5" />
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
    showLevel: PropTypes.bool.isRequired,
};

const ProfessionalSkillsForm = ({
    professionalSkills,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    onUpdateSectionTitle,
    onUpdateShowLevel,
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

    const handleToggleShowLevel = () => {
        onUpdateShowLevel("professionalSkills", !professionalSkills.showLevel);
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

            {/* Show Level Toggle */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Show Skill Levels
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                            Display proficiency level next to each skill in the
                            CV
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleToggleShowLevel}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${professionalSkills.showLevel
                            ? "bg-blue-600"
                            : "bg-gray-200"
                            }`}
                        role="switch"
                        aria-checked={professionalSkills.showLevel}
                    >
                        <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${professionalSkills.showLevel
                                ? "translate-x-5"
                                : "translate-x-0"
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Skills List */}
            <div className="mb-6">
                {professionalSkills.items.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <Wand2 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 mb-4">
                            No skills added yet
                        </p>
                        <button
                            onClick={handleAddSkill}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                        >
                            <Plus className="w-4 h-4" />
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
                                showLevel={professionalSkills.showLevel}
                            />
                        ))}
                        <button
                            onClick={handleAddSkill}
                            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Add Another Skill
                        </button>
                    </>
                )}
            </div>

            {/* Info Box */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                        <p className="font-medium">Tips:</p>
                        <ul className="mt-1 list-disc list-inside space-y-1">
                            <li>Include both technical and soft skills</li>
                            <li>Be honest about your skill level</li>
                            <li>
                                Add context in the description (years of
                                experience, projects)
                            </li>
                            <li>
                                Prioritize skills most relevant to your goals
                            </li>
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
        showLevel: PropTypes.bool,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                skillName: PropTypes.string.isRequired,
                level: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
    onAddItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onUpdateSectionTitle: PropTypes.func.isRequired,
    onUpdateShowLevel: PropTypes.func.isRequired,
};

export default ProfessionalSkillsForm;

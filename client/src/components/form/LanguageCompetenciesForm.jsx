import { useState } from "react";
import PropTypes from "prop-types";
import { Input, SectionTitleEditor } from "../common";
import {
    DEFAULT_SECTION_TITLES,
    LANGUAGE_PROFICIENCY,
} from "../../utils/constants";
import { getEmptyLanguageItem } from "../../utils/initialCVData";

const LanguageItem = ({ language, onUpdate, onRemove, showLevel }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFieldChange = (field, value) => {
        onUpdate(language.id, { [field]: value });
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:border-blue-300 transition-colors">
            {/* Header - Always Visible */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                        {language.language || "Untitled Language"}
                    </h4>
                    {showLevel && language.proficiency && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {language.proficiency}
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
                        onClick={() => onRemove(language.id)}
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
                        label="Language"
                        value={language.language}
                        onChange={(e) =>
                            handleFieldChange("language", e.target.value)
                        }
                        placeholder="e.g., English, Spanish, Mandarin"
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Proficiency Level{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={language.proficiency}
                            onChange={(e) =>
                                handleFieldChange("proficiency", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select proficiency...</option>
                            {LANGUAGE_PROFICIENCY.map((level) => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

LanguageItem.propTypes = {
    language: PropTypes.shape({
        id: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        proficiency: PropTypes.string.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    showLevel: PropTypes.bool.isRequired,
};

const LanguageCompetenciesForm = ({
    languageCompetencies,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    onUpdateSectionTitle,
    onUpdateShowLevel,
}) => {
    const handleAddLanguage = () => {
        const newLanguage = getEmptyLanguageItem();
        onAddItem("languageCompetencies", newLanguage);
    };

    const handleUpdateLanguage = (itemId, updatedFields) => {
        onUpdateItem("languageCompetencies", itemId, updatedFields);
    };

    const handleRemoveLanguage = (itemId) => {
        onRemoveItem("languageCompetencies", itemId);
    };

    const handleToggleShowLevel = () => {
        onUpdateShowLevel(
            "languageCompetencies",
            !languageCompetencies.showLevel,
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Section Title */}
            <SectionTitleEditor
                sectionKey="languageCompetencies"
                currentTitle={languageCompetencies.sectionTitle}
                defaultTitle={DEFAULT_SECTION_TITLES.languageCompetencies}
                onUpdate={onUpdateSectionTitle}
            />
            <p className="text-sm text-gray-500 -mt-4 mb-6">
                List the languages you speak and your proficiency level
            </p>

            {/* Show Level Toggle */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Show Proficiency Levels
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                            Display proficiency level next to each language in
                            the CV
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleToggleShowLevel}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            languageCompetencies.showLevel
                                ? "bg-blue-600"
                                : "bg-gray-200"
                        }`}
                        role="switch"
                        aria-checked={languageCompetencies.showLevel}
                    >
                        <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                languageCompetencies.showLevel
                                    ? "translate-x-5"
                                    : "translate-x-0"
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Languages List */}
            <div className="mb-6">
                {languageCompetencies.items.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 mb-4">
                            No languages added yet
                        </p>
                        <button
                            onClick={handleAddLanguage}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Add Your First Language
                        </button>
                    </div>
                ) : (
                    <>
                        {languageCompetencies.items.map((language) => (
                            <LanguageItem
                                key={language.id}
                                language={language}
                                onUpdate={handleUpdateLanguage}
                                onRemove={handleRemoveLanguage}
                                showLevel={languageCompetencies.showLevel}
                            />
                        ))}
                        <button
                            onClick={handleAddLanguage}
                            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                        >
                            + Add Another Language
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
                        <p className="font-medium">Proficiency Levels:</p>
                        <ul className="mt-1 list-disc list-inside space-y-1">
                            <li>
                                <strong>Basic:</strong> Can understand and use
                                familiar everyday expressions
                            </li>
                            <li>
                                <strong>Intermediate:</strong> Can communicate
                                in routine tasks
                            </li>
                            <li>
                                <strong>Professional:</strong> Can use language
                                effectively in work settings
                            </li>
                            <li>
                                <strong>Fluent:</strong> Can express ideas
                                fluently and spontaneously
                            </li>
                            <li>
                                <strong>Native:</strong> Native speaker or
                                equivalent proficiency
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

LanguageCompetenciesForm.propTypes = {
    languageCompetencies: PropTypes.shape({
        sectionTitle: PropTypes.string.isRequired,
        showLevel: PropTypes.bool,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                language: PropTypes.string.isRequired,
                proficiency: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
    onAddItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onUpdateSectionTitle: PropTypes.func.isRequired,
    onUpdateShowLevel: PropTypes.func.isRequired,
};

export default LanguageCompetenciesForm;

import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button, SectionTitleEditor } from "../common";
import { DEFAULT_SECTION_TITLES } from "../../utils/constants";

const EducationItem = ({ item, onUpdate, onRemove, isExpanded, onToggle }) => {
    const handleFieldChange = (field, value) => {
        onUpdate("educations", item.id, { [field]: value });
    };

    return (
        <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
            {/* Item Header */}
            <div
                className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={onToggle}
            >
                <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800">
                        {item.profession || "Degree / Program"}
                    </h4>
                    <p className="text-sm text-gray-600">
                        {item.schoolName || "School Name"}
                        {(item.studyFrom || item.studyTo) && (
                            <span className="ml-2">
                                • {item.studyFrom || "Start"} -{" "}
                                {item.studyTo || "Present"}
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove("educations", item.id);
                        }}
                        className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                        title="Remove this education"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                    <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Item Content */}
            {isExpanded && (
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="School / University Name"
                            value={item.schoolName}
                            onChange={(e) =>
                                handleFieldChange("schoolName", e.target.value)
                            }
                            placeholder="Harvard University"
                            required
                        />

                        <Input
                            label="Degree / Major"
                            value={item.profession}
                            onChange={(e) =>
                                handleFieldChange("profession", e.target.value)
                            }
                            placeholder="Bachelor of Science in Computer Science"
                            required
                        />

                        <Input
                            label="Start Date"
                            type="month"
                            value={item.studyFrom}
                            onChange={(e) =>
                                handleFieldChange("studyFrom", e.target.value)
                            }
                            required
                        />

                        <Input
                            label="End Date"
                            type="month"
                            value={item.studyTo}
                            onChange={(e) =>
                                handleFieldChange("studyTo", e.target.value)
                            }
                            helpText="Leave empty if currently studying"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

EducationItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        schoolName: PropTypes.string.isRequired,
        studyFrom: PropTypes.string.isRequired,
        studyTo: PropTypes.string.isRequired,
        profession: PropTypes.string.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

const EducationsForm = ({
    educations,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    onUpdateSectionTitle,
}) => {
    const [expandedItems, setExpandedItems] = useState(new Set());

    const handleAddNew = () => {
        const newItem = {
            id: `edu-${Date.now()}`,
            schoolName: "",
            studyFrom: "",
            studyTo: "",
            profession: "",
        };
        onAddItem("educations", newItem);
        // Expand the newly added item
        setExpandedItems(new Set([...expandedItems, newItem.id]));
    };

    const handleToggleExpand = (itemId) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(itemId)) {
            newExpanded.delete(itemId);
        } else {
            newExpanded.add(itemId);
        }
        setExpandedItems(newExpanded);
    };

    const handleExpandAll = () => {
        if (expandedItems.size === educations.items.length) {
            setExpandedItems(new Set());
        } else {
            setExpandedItems(new Set(educations.items.map((item) => item.id)));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Section Title */}
            <SectionTitleEditor
                sectionKey="educations"
                currentTitle={educations.sectionTitle}
                defaultTitle={DEFAULT_SECTION_TITLES.educations}
                onUpdate={onUpdateSectionTitle}
            />
            <p className="text-sm text-gray-500 -mt-4 mb-6">
                Add your educational background
            </p>

            {/* Controls */}
            <div className="mb-4 flex items-center justify-between">
                <Button variant="primary" onClick={handleAddNew}>
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M12 4v16m8-8H4" />
                    </svg>
                    Add Education
                </Button>

                {educations.items.length > 0 && (
                    <button
                        onClick={handleExpandAll}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        {expandedItems.size === educations.items.length
                            ? "Collapse All"
                            : "Expand All"}
                    </button>
                )}
            </div>

            {/* Education Items */}
            <div className="space-y-0">
                {educations.items.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <svg
                            className="w-16 h-16 mx-auto text-gray-400 mb-4"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                        </svg>
                        <p className="text-gray-600 text-lg font-medium mb-2">
                            No education added yet
                        </p>
                        <p className="text-gray-500 text-sm">
                            Click &quot;Add Education&quot; to get started
                        </p>
                    </div>
                ) : (
                    educations.items.map((item) => (
                        <EducationItem
                            key={item.id}
                            item={item}
                            onUpdate={onUpdateItem}
                            onRemove={onRemoveItem}
                            isExpanded={expandedItems.has(item.id)}
                            onToggle={() => handleToggleExpand(item.id)}
                        />
                    ))
                )}
            </div>

            {/* Info Box */}
            {educations.items.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
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
                                <li>
                                    List most recent or highest degree first
                                </li>
                                <li>
                                    Include relevant coursework or honors if
                                    applicable
                                </li>
                                <li>
                                    Specify your major, minor, or area of
                                    concentration
                                </li>
                                <li>
                                    Include GPA if it strengthens your
                                    application (3.5+)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

EducationsForm.propTypes = {
    educations: PropTypes.shape({
        sectionTitle: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                schoolName: PropTypes.string.isRequired,
                studyFrom: PropTypes.string.isRequired,
                studyTo: PropTypes.string.isRequired,
                profession: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
    onAddItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onUpdateSectionTitle: PropTypes.func.isRequired,
};

export default EducationsForm;

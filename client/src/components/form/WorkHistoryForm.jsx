import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Textarea, Button, SectionTitleEditor } from "../common";
import { DEFAULT_SECTION_TITLES } from "../../utils/constants";

const WorkHistoryItem = ({
    item,
    onUpdate,
    onRemove,
    isExpanded,
    onToggle,
}) => {
    const handleFieldChange = (field, value) => {
        onUpdate("workHistory", item.id, { [field]: value });
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
                        {item.position || "New Position"}
                    </h4>
                    <p className="text-sm text-gray-600">
                        {item.companyName || "Company Name"}
                        {(item.dateFrom || item.dateTo) && (
                            <span className="ml-2">
                                • {item.dateFrom || "Start"} -{" "}
                                {item.dateTo || "Present"}
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove("workHistory", item.id);
                        }}
                        className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                        title="Remove this work experience"
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
                            label="Position / Job Title"
                            value={item.position}
                            onChange={(e) =>
                                handleFieldChange("position", e.target.value)
                            }
                            placeholder="Senior Software Engineer"
                            required
                        />

                        <Input
                            label="Company Name"
                            value={item.companyName}
                            onChange={(e) =>
                                handleFieldChange("companyName", e.target.value)
                            }
                            placeholder="Tech Company Inc."
                            required
                        />

                        <Input
                            label="Start Date"
                            type="month"
                            value={item.dateFrom}
                            onChange={(e) =>
                                handleFieldChange("dateFrom", e.target.value)
                            }
                            required
                        />

                        <Input
                            label="End Date"
                            type="month"
                            value={item.dateTo}
                            onChange={(e) =>
                                handleFieldChange("dateTo", e.target.value)
                            }
                            helpText="Leave empty if currently working here"
                        />
                    </div>

                    <Textarea
                        label="Job Description"
                        value={item.description}
                        onChange={(e) =>
                            handleFieldChange("description", e.target.value)
                        }
                        placeholder="Describe your responsibilities, achievements, and key projects..."
                        rows={6}
                        helpText="Highlight your accomplishments and impact"
                    />
                </div>
            )}
        </div>
    );
};

WorkHistoryItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dateFrom: PropTypes.string.isRequired,
        dateTo: PropTypes.string.isRequired,
        companyName: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

const WorkHistoryForm = ({
    workHistory,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    onUpdateSectionTitle,
}) => {
    const [expandedItems, setExpandedItems] = useState(new Set());

    const handleAddNew = () => {
        const newItem = {
            id: `work-${Date.now()}`,
            dateFrom: "",
            dateTo: "",
            companyName: "",
            position: "",
            description: "",
        };
        onAddItem("workHistory", newItem);
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
        if (expandedItems.size === workHistory.items.length) {
            setExpandedItems(new Set());
        } else {
            setExpandedItems(new Set(workHistory.items.map((item) => item.id)));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Section Title */}
            <SectionTitleEditor
                sectionKey="workHistory"
                currentTitle={workHistory.sectionTitle}
                defaultTitle={DEFAULT_SECTION_TITLES.workHistory}
                onUpdate={onUpdateSectionTitle}
            />
            <p className="text-sm text-gray-500 -mt-4 mb-6">
                Add your work experience in reverse chronological order
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
                    Add Work Experience
                </Button>

                {workHistory.items.length > 0 && (
                    <button
                        onClick={handleExpandAll}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        {expandedItems.size === workHistory.items.length
                            ? "Collapse All"
                            : "Expand All"}
                    </button>
                )}
            </div>

            {/* Work History Items */}
            <div className="space-y-0">
                {workHistory.items.length === 0 ? (
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
                            <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-600 text-lg font-medium mb-2">
                            No work experience added yet
                        </p>
                        <p className="text-gray-500 text-sm">
                            Click &quot;Add Work Experience&quot; to get started
                        </p>
                    </div>
                ) : (
                    workHistory.items.map((item) => (
                        <WorkHistoryItem
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
            {workHistory.items.length > 0 && (
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
                                <li>List most recent positions first</li>
                                <li>
                                    Use action verbs to describe achievements
                                </li>
                                <li>
                                    Quantify results when possible (e.g.,
                                    &quot;Increased sales by 30%&quot;)
                                </li>
                                <li>
                                    Focus on impact and accomplishments, not
                                    just duties
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

WorkHistoryForm.propTypes = {
    workHistory: PropTypes.shape({
        sectionTitle: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                dateFrom: PropTypes.string.isRequired,
                dateTo: PropTypes.string.isRequired,
                companyName: PropTypes.string.isRequired,
                position: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
    onAddItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onUpdateSectionTitle: PropTypes.func.isRequired,
};

export default WorkHistoryForm;

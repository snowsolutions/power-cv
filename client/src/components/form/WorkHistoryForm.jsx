import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    Input,
    Button,
    SectionTitleEditor,
    AIButton,
    AIImproveModal,
} from "../common";
import {
    DEFAULT_SECTION_TITLES,
    sortWorkHistoryByDate,
} from "../../utils/constants";
import useDebounce from "../../hooks/useDebounce";

const WorkHistoryItem = ({
    item,
    onUpdate,
    onRemove,
    isExpanded,
    onToggle,
}) => {
    // Local state for immediate UI updates
    const [localDescription, setLocalDescription] = useState(item.description);
    const [lastPropDescription, setLastPropDescription] = useState(
        item.description,
    );
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);

    // Debounced value that will update the store
    const debouncedDescription = useDebounce(localDescription, 300);

    // Update local state when prop changes (for external updates like import)
    useEffect(() => {
        if (
            item.description !== lastPropDescription &&
            item.description !== localDescription
        ) {
            setLocalDescription(item.description);
            setLastPropDescription(item.description);
        }
    }, [item.description, lastPropDescription, localDescription]);

    // Update store when debounced value changes (from user edits)
    useEffect(() => {
        // Only update if debounced value matches current local state
        // This prevents stale debounced values from overwriting AI-accepted content
        if (
            debouncedDescription !== item.description &&
            debouncedDescription !== lastPropDescription &&
            debouncedDescription === localDescription
        ) {
            onUpdate("workHistory", item.id, {
                description: debouncedDescription,
            });
            setLastPropDescription(debouncedDescription);
        }
    }, [
        debouncedDescription,
        item.description,
        item.id,
        onUpdate,
        lastPropDescription,
        localDescription,
    ]);

    const handleFieldChange = (field, value) => {
        onUpdate("workHistory", item.id, { [field]: value });
    };

    const handleDescriptionChange = (content) => {
        setLocalDescription(content);
    };

    const handleAIAccept = (improvedContent) => {
        // Update all states synchronously to prevent reversion
        setLastPropDescription(improvedContent);
        setLocalDescription(improvedContent);
        // Call onUpdate to persist to store
        onUpdate("workHistory", item.id, { description: improvedContent });
    };

    // Quill toolbar modules configuration
    const modules = {
        toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
        ],
    };

    // Quill editor formats
    const formats = ["bold", "italic", "underline", "list", "bullet"];

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

                    {/* Rich Text Editor for Description */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Job Description
                            </label>
                            <AIButton
                                onClick={() => setIsAIModalOpen(true)}
                                title="Improve with AI"
                            />
                        </div>
                        <div className="quill-wrapper-sm">
                            <ReactQuill
                                theme="snow"
                                value={localDescription}
                                onChange={handleDescriptionChange}
                                modules={modules}
                                formats={formats}
                                placeholder="Describe your responsibilities, achievements, and key projects..."
                                className="bg-white"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Highlight your accomplishments and impact. Use
                            bullet points for better readability.
                        </p>

                        {/* AI Improve Modal */}
                        <AIImproveModal
                            isOpen={isAIModalOpen}
                            onClose={() => setIsAIModalOpen(false)}
                            currentContent={localDescription}
                            sectionType="workHistory"
                            onAccept={handleAIAccept}
                            title={`Improve Job Description - ${item.position || "Work Experience"}`}
                        />
                    </div>

                    {/* Custom Styles for Quill Editor */}
                    <style>{`
                        .quill-wrapper-sm .ql-container {
                            min-height: 150px;
                            font-size: 14px;
                            font-family: inherit;
                        }

                        .quill-wrapper-sm .ql-editor {
                            min-height: 150px;
                        }

                        .quill-wrapper-sm .ql-toolbar {
                            border-top-left-radius: 0.375rem;
                            border-top-right-radius: 0.375rem;
                            background-color: #f9fafb;
                        }

                        .quill-wrapper-sm .ql-container {
                            border-bottom-left-radius: 0.375rem;
                            border-bottom-right-radius: 0.375rem;
                        }

                        .quill-wrapper-sm .ql-editor.ql-blank::before {
                            color: #9ca3af;
                            font-style: normal;
                        }

                        .quill-wrapper-sm .ql-snow .ql-stroke {
                            stroke: #4b5563;
                        }

                        .quill-wrapper-sm .ql-snow .ql-fill {
                            fill: #4b5563;
                        }

                        .quill-wrapper-sm .ql-snow .ql-picker-label {
                            color: #4b5563;
                        }

                        .quill-wrapper-sm .ql-toolbar button:hover,
                        .quill-wrapper-sm .ql-toolbar button:focus {
                            color: #2563eb;
                        }

                        .quill-wrapper-sm .ql-toolbar button:hover .ql-stroke,
                        .quill-wrapper-sm .ql-toolbar button:focus .ql-stroke {
                            stroke: #2563eb;
                        }

                        .quill-wrapper-sm .ql-toolbar button:hover .ql-fill,
                        .quill-wrapper-sm .ql-toolbar button:focus .ql-fill {
                            fill: #2563eb;
                        }

                        .quill-wrapper-sm .ql-snow.ql-toolbar button.ql-active,
                        .quill-wrapper-sm .ql-snow .ql-toolbar button.ql-active {
                            color: #2563eb;
                        }

                        .quill-wrapper-sm .ql-snow.ql-toolbar button.ql-active .ql-stroke,
                        .quill-wrapper-sm .ql-snow .ql-toolbar button.ql-active .ql-stroke {
                            stroke: #2563eb;
                        }

                        .quill-wrapper-sm .ql-snow.ql-toolbar button.ql-active .ql-fill,
                        .quill-wrapper-sm .ql-snow .ql-toolbar button.ql-active .ql-fill {
                            fill: #2563eb;
                        }
                    `}</style>
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

    // Sort work history items by date (latest first)
    const sortedItems = sortWorkHistoryByDate(workHistory.items);

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
                    sortedItems.map((item) => (
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
                                <li>
                                    Use bullet points for better readability
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

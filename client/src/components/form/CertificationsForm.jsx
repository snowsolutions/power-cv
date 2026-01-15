import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button, SectionTitleEditor } from "../common";
import { DEFAULT_SECTION_TITLES } from "../../utils/constants";

const CertificationItem = ({
    item,
    onUpdate,
    onRemove,
    isExpanded,
    onToggle,
}) => {
    const handleFieldChange = (field, value) => {
        onUpdate("certifications", item.id, { [field]: value });
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
                        {item.certName || "New Certification"}
                    </h4>
                    <p className="text-sm text-gray-600">
                        {item.organization || "Organization"}
                        {item.certExpiration && (
                            <span className="ml-2">
                                • Expires: {item.certExpiration}
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove("certifications", item.id);
                        }}
                        className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                        title="Remove this certification"
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
                            label="Certification Name"
                            value={item.certName}
                            onChange={(e) =>
                                handleFieldChange("certName", e.target.value)
                            }
                            placeholder="AWS Certified Solutions Architect"
                            required
                        />

                        <Input
                            label="Issuing Organization"
                            value={item.organization}
                            onChange={(e) =>
                                handleFieldChange(
                                    "organization",
                                    e.target.value,
                                )
                            }
                            placeholder="Amazon Web Services"
                            required
                        />

                        <Input
                            label="Credential URL"
                            type="url"
                            value={item.certLink}
                            onChange={(e) =>
                                handleFieldChange("certLink", e.target.value)
                            }
                            placeholder="https://www.credly.com/badges/..."
                            helpText="Link to verify this certification"
                        />

                        <Input
                            label="Expiration Date"
                            type="date"
                            value={item.certExpiration}
                            onChange={(e) =>
                                handleFieldChange(
                                    "certExpiration",
                                    e.target.value,
                                )
                            }
                            helpText="Leave empty if it doesn't expire"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

CertificationItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        certName: PropTypes.string.isRequired,
        organization: PropTypes.string.isRequired,
        certLink: PropTypes.string.isRequired,
        certExpiration: PropTypes.string.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

const CertificationsForm = ({
    certifications,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    onUpdateSectionTitle,
}) => {
    const [expandedItems, setExpandedItems] = useState(new Set());

    const handleAddNew = () => {
        const newItem = {
            id: `cert-${Date.now()}`,
            certName: "",
            organization: "",
            certLink: "",
            certExpiration: "",
        };
        onAddItem("certifications", newItem);
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
        if (expandedItems.size === certifications.items.length) {
            setExpandedItems(new Set());
        } else {
            setExpandedItems(
                new Set(certifications.items.map((item) => item.id)),
            );
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Section Title */}
            <SectionTitleEditor
                sectionKey="certifications"
                currentTitle={certifications.sectionTitle}
                defaultTitle={DEFAULT_SECTION_TITLES.certifications}
                onUpdate={onUpdateSectionTitle}
            />
            <p className="text-sm text-gray-500 -mt-4 mb-6">
                Add professional certifications and credentials
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
                    Add Certification
                </Button>

                {certifications.items.length > 0 && (
                    <button
                        onClick={handleExpandAll}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        {expandedItems.size === certifications.items.length
                            ? "Collapse All"
                            : "Expand All"}
                    </button>
                )}
            </div>

            {/* Certification Items */}
            <div className="space-y-0">
                {certifications.items.length === 0 ? (
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
                            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <p className="text-gray-600 text-lg font-medium mb-2">
                            No certifications added yet
                        </p>
                        <p className="text-gray-500 text-sm">
                            Click &quot;Add Certification&quot; to get started
                        </p>
                    </div>
                ) : (
                    certifications.items.map((item) => (
                        <CertificationItem
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
            {certifications.items.length > 0 && (
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
                                    Include only relevant and current
                                    certifications
                                </li>
                                <li>
                                    Add credential URLs for verification when
                                    possible
                                </li>
                                <li>
                                    List certifications from most recent or most
                                    relevant
                                </li>
                                <li>
                                    Include expiration dates to show active
                                    status
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

CertificationsForm.propTypes = {
    certifications: PropTypes.shape({
        sectionTitle: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                certName: PropTypes.string.isRequired,
                organization: PropTypes.string.isRequired,
                certLink: PropTypes.string.isRequired,
                certExpiration: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
    onAddItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onUpdateSectionTitle: PropTypes.func.isRequired,
};

export default CertificationsForm;

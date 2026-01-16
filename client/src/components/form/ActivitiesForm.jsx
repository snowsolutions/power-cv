import { useState } from "react";
import PropTypes from "prop-types";
import {
    Trash2,
    ChevronDown,
    ChevronUp,
    Plus,
    Info,
    Heart
} from "lucide-react";
import { Input, SectionTitleEditor } from "../common";
import { DEFAULT_SECTION_TITLES } from "../../utils/constants";
import { getEmptyActivityItem } from "../../utils/initialCVData";

const ActivityItem = ({ activity, onUpdate, onRemove }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFieldChange = (field, value) => {
        onUpdate(activity.id, { [field]: value });
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:border-blue-300 transition-colors bg-white">
            {/* Header - Always Visible */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                    <h4 className="font-medium text-gray-900">
                        {activity.title || "Untitled Activity"}
                    </h4>
                    {activity.date && (
                        <p className="text-sm text-gray-500 mt-1">
                            {activity.date}
                        </p>
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
                        onClick={() => onRemove(activity.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                        title="Remove activity"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Expandable Form Fields */}
            {isExpanded && (
                <div className="space-y-4 pt-3 border-t border-gray-100">
                    <Input
                        label="Activity Title"
                        value={activity.title}
                        onChange={(e) =>
                            handleFieldChange("title", e.target.value)
                        }
                        placeholder="e.g., Volunteer at Local Food Bank"
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={activity.description}
                            onChange={(e) =>
                                handleFieldChange("description", e.target.value)
                            }
                            placeholder="Describe your role, responsibilities, and achievements..."
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <Input
                        label="Date / Period"
                        type="month"
                        value={activity.date}
                        onChange={(e) =>
                            handleFieldChange("date", e.target.value)
                        }
                    />
                </div>
            )}
        </div>
    );
};

ActivityItem.propTypes = {
    activity: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
};

const ActivitiesForm = ({
    activities,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    onUpdateSectionTitle,
}) => {
    const handleAddActivity = () => {
        const newActivity = getEmptyActivityItem();
        onAddItem("activities", newActivity);
    };

    const handleUpdateActivity = (itemId, updatedFields) => {
        onUpdateItem("activities", itemId, updatedFields);
    };

    const handleRemoveActivity = (itemId) => {
        onRemoveItem("activities", itemId);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Section Title */}
            <SectionTitleEditor
                sectionKey="activities"
                currentTitle={activities.sectionTitle}
                defaultTitle={DEFAULT_SECTION_TITLES.activities}
                onUpdate={onUpdateSectionTitle}
            />
            <p className="text-sm text-gray-500 -mt-4 mb-6">
                Add extracurricular activities, volunteer work, clubs, and
                other involvement
            </p>

            {/* Activities List */}
            <div className="mb-6">
                {activities.items.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <Heart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500 mb-4">
                            No activities added yet
                        </p>
                        <button
                            onClick={handleAddActivity}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                        >
                            <Plus className="w-4 h-4" />
                            Add Your First Activity
                        </button>
                    </div>
                ) : (
                    <>
                        {activities.items.map((activity) => (
                            <ActivityItem
                                key={activity.id}
                                activity={activity}
                                onUpdate={handleUpdateActivity}
                                onRemove={handleRemoveActivity}
                            />
                        ))}
                        <button
                            onClick={handleAddActivity}
                            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Add Another Activity
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
                            <li>Include volunteer work and community service</li>
                            <li>
                                Add clubs, organizations, or team memberships
                            </li>
                            <li>Mention leadership roles and achievements</li>
                            <li>Focus on activities relevant to your career</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

ActivitiesForm.propTypes = {
    activities: PropTypes.shape({
        sectionTitle: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    onAddItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onUpdateSectionTitle: PropTypes.func.isRequired,
};

export default ActivitiesForm;

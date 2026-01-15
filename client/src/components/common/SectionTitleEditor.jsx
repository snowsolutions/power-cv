import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable component for editing section titles with reset to default functionality
 * @param {Object} props - Component props
 * @param {string} props.sectionKey - The section key (e.g., 'personalInfo', 'workHistory')
 * @param {string} props.currentTitle - Current section title value
 * @param {string} props.defaultTitle - Default section title to reset to
 * @param {Function} props.onUpdate - Callback function when title is updated
 * @returns {JSX.Element} Section title editor component
 */
const SectionTitleEditor = ({ sectionKey, currentTitle, defaultTitle, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleTitleChange = (e) => {
        onUpdate(sectionKey, e.target.value);
    };

    const handleReset = () => {
        onUpdate(sectionKey, defaultTitle);
    };

    const isCustomTitle = currentTitle !== defaultTitle;

    return (
        <div className="mb-6">
            {isEditing ? (
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={currentTitle}
                            onChange={handleTitleChange}
                            className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none flex-grow"
                            autoFocus
                            placeholder={defaultTitle}
                        />
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                            title="Finish editing"
                        >
                            Done
                        </button>
                    </div>
                    {isCustomTitle && (
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                            title={`Reset to default: ${defaultTitle}`}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset to default
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {currentTitle}
                    </h2>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit section title"
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
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    {isCustomTitle && (
                        <button
                            onClick={handleReset}
                            className="text-gray-400 hover:text-orange-600 transition-colors"
                            title={`Reset to default: ${defaultTitle}`}
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
                                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

SectionTitleEditor.propTypes = {
    sectionKey: PropTypes.string.isRequired,
    currentTitle: PropTypes.string.isRequired,
    defaultTitle: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default SectionTitleEditor;

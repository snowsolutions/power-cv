import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SectionTitleEditor, AIButton, AIImproveModal } from "../common";
import { DEFAULT_SECTION_TITLES } from "../../utils/constants";
import useDebounce from "../../hooks/useDebounce";

const IntroductionForm = ({ introduction, onUpdate, onUpdateSectionTitle }) => {
    // Local state for immediate UI updates
    const [localContent, setLocalContent] = useState(introduction.content);
    const [lastPropContent, setLastPropContent] = useState(
        introduction.content,
    );
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);

    // Debounced value that will update the store
    const debouncedContent = useDebounce(localContent, 300);

    // Update local state when prop changes (for external updates like import)
    useEffect(() => {
        // Only update if the prop actually changed from an external source
        if (
            introduction.content !== lastPropContent &&
            introduction.content !== localContent
        ) {
            console.log(
                "[IntroductionForm] External update detected, syncing local state",
            );
            setLocalContent(introduction.content);
            setLastPropContent(introduction.content);
        }
    }, [introduction.content, lastPropContent, localContent]);

    // Update store when debounced value changes (from user edits)
    useEffect(() => {
        // Only update if debounced value matches current local state
        // This prevents stale debounced values from overwriting AI-accepted content
        if (
            debouncedContent !== introduction.content &&
            debouncedContent !== lastPropContent &&
            debouncedContent === localContent
        ) {
            console.log("[IntroductionForm] Updating store with user changes");
            onUpdate(debouncedContent);
            setLastPropContent(debouncedContent);
        }
    }, [
        debouncedContent,
        introduction.content,
        onUpdate,
        lastPropContent,
        localContent,
    ]);

    const handleContentChange = (content) => {
        setLocalContent(content);
    };

    const handleAIAccept = (improvedContent) => {
        // Update all states synchronously to prevent reversion
        setLastPropContent(improvedContent);
        setLocalContent(improvedContent);
        // Call onUpdate to persist to store
        onUpdate(improvedContent);
    };

    // Quill toolbar modules configuration
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["link"],
            ["clean"],
        ],
    };

    // Quill editor formats
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "indent",
        "link",
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Section Title */}
            <SectionTitleEditor
                sectionKey="introduction"
                currentTitle={introduction.sectionTitle}
                defaultTitle={DEFAULT_SECTION_TITLES.introduction}
                onUpdate={onUpdateSectionTitle}
            />
            <p className="text-sm text-gray-500 -mt-4 mb-6">
                Write a brief introduction or professional summary
            </p>

            {/* Rich Text Editor */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <AIButton
                        onClick={() => setIsAIModalOpen(true)}
                        title="Improve with AI"
                    />
                </div>
                <div className="quill-wrapper">
                    <ReactQuill
                        theme="snow"
                        value={localContent}
                        onChange={handleContentChange}
                        modules={modules}
                        formats={formats}
                        placeholder="Write your introduction here... You can use formatting tools above."
                        className="bg-white"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Characters: {localContent.replace(/<[^>]*>/g, "").length}
                </p>
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
                            <li>
                                Keep your introduction concise (3-5 sentences)
                            </li>
                            <li>Highlight your key skills and experience</li>
                            <li>Use formatting sparingly for emphasis</li>
                            <li>Focus on what makes you unique</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* AI Improve Modal */}
            <AIImproveModal
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                currentContent={localContent}
                sectionType="introduction"
                onAccept={handleAIAccept}
                title="Improve Professional Profile"
            />

            {/* Custom Styles for Quill Editor */}
            <style>{`
                .quill-wrapper .ql-container {
                    min-height: 200px;
                    font-size: 14px;
                    font-family: inherit;
                }

                .quill-wrapper .ql-editor {
                    min-height: 200px;
                }

                .quill-wrapper .ql-toolbar {
                    border-top-left-radius: 0.375rem;
                    border-top-right-radius: 0.375rem;
                    background-color: #f9fafb;
                }

                .quill-wrapper .ql-container {
                    border-bottom-left-radius: 0.375rem;
                    border-bottom-right-radius: 0.375rem;
                }

                .quill-wrapper .ql-editor.ql-blank::before {
                    color: #9ca3af;
                    font-style: normal;
                }

                .quill-wrapper .ql-snow .ql-stroke {
                    stroke: #4b5563;
                }

                .quill-wrapper .ql-snow .ql-fill {
                    fill: #4b5563;
                }

                .quill-wrapper .ql-snow .ql-picker-label {
                    color: #4b5563;
                }

                .quill-wrapper .ql-toolbar button:hover,
                .quill-wrapper .ql-toolbar button:focus {
                    color: #2563eb;
                }

                .quill-wrapper .ql-toolbar button:hover .ql-stroke,
                .quill-wrapper .ql-toolbar button:focus .ql-stroke {
                    stroke: #2563eb;
                }

                .quill-wrapper .ql-toolbar button:hover .ql-fill,
                .quill-wrapper .ql-toolbar button:focus .ql-fill {
                    fill: #2563eb;
                }

                .quill-wrapper .ql-snow.ql-toolbar button.ql-active,
                .quill-wrapper .ql-snow .ql-toolbar button.ql-active {
                    color: #2563eb;
                }

                .quill-wrapper .ql-snow.ql-toolbar button.ql-active .ql-stroke,
                .quill-wrapper .ql-snow .ql-toolbar button.ql-active .ql-stroke {
                    stroke: #2563eb;
                }

                .quill-wrapper .ql-snow.ql-toolbar button.ql-active .ql-fill,
                .quill-wrapper .ql-snow .ql-toolbar button.ql-active .ql-fill {
                    fill: #2563eb;
                }
            `}</style>
        </div>
    );
};

IntroductionForm.propTypes = {
    introduction: PropTypes.shape({
        sectionTitle: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onUpdateSectionTitle: PropTypes.func.isRequired,
};

export default IntroductionForm;

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Info } from "lucide-react";
import {
    SectionTitleEditor,
    AIButton,
    AIImproveModal,
    TiptapEditor,
} from "../common";
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
                <TiptapEditor
                    content={localContent}
                    onChange={handleContentChange}
                    placeholder="Write your introduction here... You can use formatting tools above."
                    showHeadings={true}
                    minHeight="200px"
                />
                <p className="text-xs text-gray-500 mt-2">
                    Characters: {localContent.replace(/<[^>]*>/g, "").length}
                </p>
            </div>

            {/* Info Box */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
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

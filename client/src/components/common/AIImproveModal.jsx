import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Clock, Loader2, Info } from "lucide-react";
import { Modal, Button } from "./index";
import { improveContent, textToHtml } from "../../services/aiService";

// Local storage key for recent prompts
const RECENT_PROMPTS_KEY = "power-cv-ai-recent-prompts";
const MAX_RECENT_PROMPTS = 5;

/**
 * Get recent prompts from local storage
 */
const getRecentPrompts = () => {
    try {
        const stored = localStorage.getItem(RECENT_PROMPTS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error loading recent prompts:", error);
        return [];
    }
};

/**
 * Save a new prompt to recent prompts (max 5, most recent first)
 */
const saveRecentPrompt = (prompt) => {
    try {
        const trimmedPrompt = prompt.trim();
        if (!trimmedPrompt) return;

        let recentPrompts = getRecentPrompts();

        // Remove if already exists (to avoid duplicates)
        recentPrompts = recentPrompts.filter((p) => p !== trimmedPrompt);

        // Add to beginning
        recentPrompts.unshift(trimmedPrompt);

        // Keep only last 5
        recentPrompts = recentPrompts.slice(0, MAX_RECENT_PROMPTS);

        localStorage.setItem(RECENT_PROMPTS_KEY, JSON.stringify(recentPrompts));
    } catch (error) {
        console.error("Error saving recent prompt:", error);
    }
};

/**
 * AI Improve Modal Component
 * Shows current content vs AI-improved content side by side
 * Allows user to enter a prompt and review/accept changes
 */
function AIImproveModal({
    isOpen,
    onClose,
    currentContent,
    sectionType = "general",
    onAccept,
    title = "Improve with AI",
}) {
    const [prompt, setPrompt] = useState("");
    const [improvedContent, setImprovedContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasGenerated, setHasGenerated] = useState(false);
    const [recentPrompts, setRecentPrompts] = useState([]);

    // Load recent prompts when modal opens
    useEffect(() => {
        if (isOpen) {
            setRecentPrompts(getRecentPrompts());
        }
    }, [isOpen]);

    // Strip HTML for display purposes
    const plainCurrentContent = currentContent.replace(/<[^>]*>/g, "");

    const handleSubmit = async () => {
        if (!prompt.trim()) {
            setError(
                "Please enter a prompt describing how you want to improve the content.",
            );
            return;
        }

        setIsLoading(true);
        setError("");
        setImprovedContent("");

        const result = await improveContent(
            currentContent,
            prompt,
            sectionType,
        );

        setIsLoading(false);

        if (result.success) {
            setImprovedContent(result.content);
            setHasGenerated(true);
            // Save prompt to recent prompts
            saveRecentPrompt(prompt);
            setRecentPrompts(getRecentPrompts());
        } else {
            setError(
                result.error || "Failed to improve content. Please try again.",
            );
        }
    };

    const handleAccept = () => {
        // Convert plain text to HTML if needed for rich text editors
        const htmlContent = textToHtml(improvedContent);
        onAccept(htmlContent);
        handleClose();
    };

    const handleClose = () => {
        setPrompt("");
        setImprovedContent("");
        setError("");
        setHasGenerated(false);
        setIsLoading(false);
        onClose();
    };

    const suggestedPrompts = {
        introduction: [
            "Make it more professional and impactful",
            "Highlight leadership and technical skills",
            "Make it more concise",
            "Add more keywords for ATS optimization",
            "Use format: open paragraph -> bullet points -> main paragraph -> bullet points -> close paragraph. ",
        ],
        workHistory: [
            "Add quantifiable achievements and metrics",
            "Use stronger action verbs",
            "Make bullet points more impactful",
            "Focus on results and accomplishments",
            "Use format: open paragraph -> bullet points -> main paragraph -> bullet points -> close paragraph. ",
        ],
        general: [
            "Make it more professional",
            "Improve clarity and conciseness",
            "Add more detail",
            "Make it more engaging",
            "Use format: open paragraph -> bullet points -> main paragraph -> bullet points -> close paragraph. ",
        ],
    };

    const prompts = suggestedPrompts[sectionType] || suggestedPrompts.general;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={title}
            size="xl"
            closeOnOverlay={!isLoading}
            footer={
                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    {hasGenerated && improvedContent && (
                        <Button
                            variant="primary"
                            onClick={handleAccept}
                            disabled={isLoading}
                        >
                            Accept Changes
                        </Button>
                    )}
                </div>
            }
        >
            <div className="space-y-4">
                {/* Prompt Input Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        What would you like AI to help you with?
                    </label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="E.g., Make it more professional, add quantifiable achievements, improve clarity..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows={3}
                        disabled={isLoading}
                    />

                    {/* Suggested Prompts */}
                    {/* Recent Prompts */}
                    {recentPrompts.length > 0 && (
                        <div className="mt-3">
                            <p className="text-xs font-medium text-gray-600 mb-1.5">
                                Recent prompts:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {recentPrompts.map((recentPrompt, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setPrompt(recentPrompt)}
                                        disabled={isLoading}
                                        className="text-xs px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full transition-colors disabled:opacity-50 border border-purple-200"
                                        title={recentPrompt}
                                    >
                                        <span className="inline-flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span className="max-w-[200px] truncate">
                                                {recentPrompt}
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Suggested Prompts */}
                    <div className="mt-2">
                        {recentPrompts.length > 0 && (
                            <p className="text-xs font-medium text-gray-600 mb-1.5">
                                Suggestions:
                            </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {prompts.map((suggestedPrompt, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setPrompt(suggestedPrompt)}
                                    disabled={isLoading}
                                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors disabled:opacity-50"
                                >
                                    {suggestedPrompt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center">
                    <Button
                        onClick={handleSubmit}
                        loading={isLoading}
                        disabled={!prompt.trim() || isLoading}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                    >
                        {isLoading
                            ? "Generating..."
                            : hasGenerated
                                ? "Regenerate"
                                : "Generate Improvement"}
                    </Button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {/* Content Comparison */}
                {(hasGenerated || plainCurrentContent) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Current Content */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                                <h4 className="font-medium text-gray-700 text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Current Content
                                </h4>
                            </div>
                            <div className="p-4 bg-gray-50 max-h-64 overflow-y-auto">
                                <div className="text-sm text-gray-600 whitespace-pre-wrap">
                                    {plainCurrentContent || (
                                        <em className="text-gray-400">
                                            No content yet
                                        </em>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Improved Content */}
                        <div className="border border-purple-200 rounded-lg overflow-hidden">
                            <div className="bg-purple-50 px-4 py-2 border-b border-purple-200">
                                <h4 className="font-medium text-purple-700 text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                    AI Improved
                                </h4>
                            </div>
                            <div className="p-4 bg-white max-h-64 overflow-y-auto">
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loader2 className="animate-spin h-8 w-8 text-purple-500" />
                                            <span className="text-sm text-gray-500">
                                                AI is working on it...
                                            </span>
                                        </div>
                                    </div>
                                ) : improvedContent ? (
                                    <div className="text-sm text-gray-800 whitespace-pre-wrap">
                                        {improvedContent}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center py-8 text-gray-400 text-sm">
                                        <em>
                                            Enter a prompt and click generate to
                                            see AI improvements
                                        </em>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Box */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-700">
                            Review the AI-generated content carefully before
                            accepting. You can regenerate with different prompts
                            until you are satisfied.
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

AIImproveModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    currentContent: PropTypes.string.isRequired,
    sectionType: PropTypes.oneOf(["introduction", "workHistory", "general"]),
    onAccept: PropTypes.func.isRequired,
    title: PropTypes.string,
};

export default AIImproveModal;

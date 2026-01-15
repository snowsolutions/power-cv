import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader } from "../components/common";

function TaskStatus() {
    const [markdown, setMarkdown] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMarkdown();
    }, []);

    const fetchMarkdown = async () => {
        try {
            setLoading(true);
            // Fetch the markdown file from backend API
            const response = await fetch(
                `${import.meta.env.VITE_API_URL || "http://localhost:5001/api"}/tasks/status`,
            );

            if (!response.ok) {
                throw new Error("Failed to load task management file");
            }

            const result = await response.json();

            if (result.success && result.data && result.data.content) {
                setMarkdown(result.data.content);
                setError(null);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            setError(err.message);
            console.error("Error loading markdown:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader size="lg" text="Loading task status..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="alert alert-danger">
                        <h2 className="text-xl font-bold mb-2">
                            Error Loading Task Status
                        </h2>
                        <p>{error}</p>
                        <button
                            onClick={fetchMarkdown}
                            className="btn btn-primary mt-4"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            📋 Task Management & Progress
                        </h1>
                        <p className="text-gray-600">
                            Real-time project status and task tracking
                        </p>
                    </div>
                    <button
                        onClick={fetchMarkdown}
                        className="btn btn-secondary"
                    >
                        🔄 Refresh
                    </button>
                </div>

                {/* Markdown Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <article className="markdown-body prose prose-slate max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                // Custom heading styles
                                h1: ({ ...props }) => (
                                    <h1
                                        className="text-4xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500"
                                        {...props}
                                    />
                                ),
                                h2: ({ ...props }) => (
                                    <h2
                                        className="text-3xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-300"
                                        {...props}
                                    />
                                ),
                                h3: ({ ...props }) => (
                                    <h3
                                        className="text-2xl font-semibold text-gray-800 mt-6 mb-3"
                                        {...props}
                                    />
                                ),
                                h4: ({ ...props }) => (
                                    <h4
                                        className="text-xl font-semibold text-gray-700 mt-4 mb-2"
                                        {...props}
                                    />
                                ),
                                // Paragraph
                                p: ({ ...props }) => (
                                    <p
                                        className="text-gray-700 leading-relaxed mb-4"
                                        {...props}
                                    />
                                ),
                                // Lists
                                ul: ({ ...props }) => (
                                    <ul
                                        className="list-disc list-inside space-y-2 mb-4 ml-4"
                                        {...props}
                                    />
                                ),
                                ol: ({ ...props }) => (
                                    <ol
                                        className="list-decimal list-inside space-y-2 mb-4 ml-4"
                                        {...props}
                                    />
                                ),
                                li: ({ ...props }) => (
                                    <li className="text-gray-700" {...props} />
                                ),
                                // Links
                                a: ({ ...props }) => (
                                    <a
                                        className="text-primary-600 hover:text-primary-700 underline"
                                        {...props}
                                    />
                                ),
                                // Code blocks
                                code: ({ inline, ...props }) =>
                                    inline ? (
                                        <code
                                            className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono"
                                            {...props}
                                        />
                                    ) : (
                                        <code
                                            className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4"
                                            {...props}
                                        />
                                    ),
                                pre: ({ ...props }) => (
                                    <pre
                                        className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4"
                                        {...props}
                                    />
                                ),
                                // Tables
                                table: ({ ...props }) => (
                                    <div className="overflow-x-auto mb-6">
                                        <table
                                            className="min-w-full divide-y divide-gray-300 border border-gray-300"
                                            {...props}
                                        />
                                    </div>
                                ),
                                thead: ({ ...props }) => (
                                    <thead className="bg-gray-100" {...props} />
                                ),
                                tbody: ({ ...props }) => (
                                    <tbody
                                        className="divide-y divide-gray-200 bg-white"
                                        {...props}
                                    />
                                ),
                                tr: ({ ...props }) => (
                                    <tr
                                        className="hover:bg-gray-50"
                                        {...props}
                                    />
                                ),
                                th: ({ ...props }) => (
                                    <th
                                        className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-300 last:border-r-0"
                                        {...props}
                                    />
                                ),
                                td: ({ ...props }) => (
                                    <td
                                        className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200 last:border-r-0"
                                        {...props}
                                    />
                                ),
                                // Blockquotes
                                blockquote: ({ ...props }) => (
                                    <blockquote
                                        className="border-l-4 border-primary-500 pl-4 py-2 my-4 bg-gray-50 italic text-gray-700"
                                        {...props}
                                    />
                                ),
                                // Horizontal rule
                                hr: ({ ...props }) => (
                                    <hr
                                        className="my-8 border-t-2 border-gray-300"
                                        {...props}
                                    />
                                ),
                                // Strong/Bold
                                strong: ({ ...props }) => (
                                    <strong
                                        className="font-bold text-gray-900"
                                        {...props}
                                    />
                                ),
                                // Emphasis/Italic
                                em: ({ ...props }) => (
                                    <em
                                        className="italic text-gray-800"
                                        {...props}
                                    />
                                ),
                            }}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </article>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        Source:{" "}
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            .ai/task-management.md
                        </code>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TaskStatus;

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCV } from "../hooks/useCV";
import { exportCVAsJSON } from "../utils/jsonExport";
import cvService from "../services/cvService";

function Dashboard() {
    const navigate = useNavigate();
    const {
        savedCVs,
        loadAllCVs,
        deleteCVFromBackend,
        createNewCV,
        isLoading,
        error,
        clearError,
    } = useCV();

    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTemplate, setFilterTemplate] = useState("all");

    useEffect(() => {
        loadAllCVs();
    }, [loadAllCVs]);

    const handleCreateNew = () => {
        createNewCV();
        navigate("/editor");
    };

    const handleEdit = (cvId) => {
        navigate(`/editor/${cvId}`);
    };

    const handleDeleteClick = (cv) => {
        setDeleteConfirm(cv);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteConfirm) return;

        const result = await deleteCVFromBackend(deleteConfirm.id);

        if (result.success) {
            setStatusMessage({
                type: "success",
                text: `"${deleteConfirm.name}" deleted successfully!`,
            });
            setDeleteConfirm(null);
            setTimeout(() => setStatusMessage(null), 3000);
        } else {
            setStatusMessage({
                type: "error",
                text: result.error || "Failed to delete CV",
            });
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleExportCV = async (cvId) => {
        try {
            // Load full CV data from backend
            const response = await cvService.getCVById(cvId);
            if (response.success) {
                const success = exportCVAsJSON(response.data);
                if (success) {
                    setStatusMessage({
                        type: "success",
                        text: "CV exported successfully!",
                    });
                    setTimeout(() => setStatusMessage(null), 3000);
                }
            }
        } catch (error) {
            setStatusMessage({
                type: "error",
                text: "Failed to export CV",
            });
        }
    };

    const handleDuplicateCV = async (cv) => {
        try {
            // Load full CV data from backend
            const response = await cvService.getCVById(cv.id);
            if (response.success) {
                const cvData = response.data;
                // Create new CV with duplicated data
                const newCVData = {
                    ...cvData,
                    name: `${cvData.name} (Copy)`,
                    id: undefined, // Remove ID so backend creates new one
                };

                // Save the duplicated CV
                const saveResult = await cvService.saveCV(newCVData);
                if (saveResult.success) {
                    setStatusMessage({
                        type: "success",
                        text: `CV duplicated successfully!`,
                    });
                    setTimeout(() => setStatusMessage(null), 3000);
                    // Reload CVs to show the new one
                    loadAllCVs();
                } else {
                    throw new Error(saveResult.error);
                }
            }
        } catch (error) {
            setStatusMessage({
                type: "error",
                text: "Failed to duplicate CV",
            });
        }
    };

    // Filter CVs based on search and template filter
    const filteredCVs = savedCVs.filter((cv) => {
        const matchesSearch = cv.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesTemplate =
            filterTemplate === "all" || cv.template === filterTemplate;
        return matchesSearch && matchesTemplate;
    });

    // Get unique templates for filter
    const availableTemplates = [...new Set(savedCVs.map((cv) => cv.template))];

    return (
        <div className="min-h-screen bg-purple-50/30 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-xl text-gray-600 mt-2">
                        Manage Your CVs
                    </p>
                </div>

                {/* Status Messages */}
                {statusMessage && (
                    <div
                        className={`mb-4 p-4 rounded-lg ${
                            statusMessage.type === "success"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                    >
                        <p className="font-medium">{statusMessage.text}</p>
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-800 border border-red-200">
                        <p className="font-medium">Error: {error}</p>
                        <button
                            onClick={clearError}
                            className="mt-2 text-sm underline"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mb-6 flex flex-wrap gap-4">
                    <button
                        onClick={handleCreateNew}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
                    >
                        + Create New CV
                    </button>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                    >
                        Back to Home
                    </Link>
                </div>

                {/* Search and Filter */}
                {!isLoading && savedCVs.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-4">
                        <div className="flex-grow max-w-md">
                            <input
                                type="text"
                                placeholder="Search CVs by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <select
                                value={filterTemplate}
                                onChange={(e) =>
                                    setFilterTemplate(e.target.value)
                                }
                                className="px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="all">All Templates</option>
                                {availableTemplates.map((template) => (
                                    <option key={template} value={template}>
                                        {template.charAt(0).toUpperCase() +
                                            template.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* Filtered Results Count */}
                {!isLoading &&
                    savedCVs.length > 0 &&
                    filteredCVs.length !== savedCVs.length && (
                        <div className="mb-4 text-gray-600">
                            Showing {filteredCVs.length} of {savedCVs.length}{" "}
                            CVs
                        </div>
                    )}

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                )}

                {/* CV List */}
                {!isLoading && savedCVs.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-2xl text-gray-600 mb-4">
                            📋 No CVs yet
                        </p>
                        <p className="text-gray-500 mb-6">
                            Create your first CV to get started!
                        </p>
                        <button
                            onClick={handleCreateNew}
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
                        >
                            Create Your First CV
                        </button>
                    </div>
                )}

                {!isLoading &&
                    savedCVs.length > 0 &&
                    filteredCVs.length === 0 && (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <p className="text-2xl text-gray-600 mb-4">
                                🔍 No CVs found
                            </p>
                            <p className="text-gray-500 mb-6">
                                Try adjusting your search or filter criteria
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setFilterTemplate("all");
                                }}
                                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                {!isLoading && filteredCVs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCVs.map((cv) => (
                            <div
                                key={cv.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-purple-100"
                            >
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
                                        {cv.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Template:{" "}
                                        <span className="capitalize">
                                            {cv.template}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Updated: {formatDate(cv.updatedAt)}
                                    </p>

                                    <div className="flex gap-2 mb-2">
                                        <button
                                            onClick={() => handleEdit(cv.id)}
                                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium shadow-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDuplicateCV(cv)
                                            }
                                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium shadow-sm"
                                            title="Duplicate CV"
                                        >
                                            📋
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleExportCV(cv.id)
                                            }
                                            className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium shadow-sm"
                                            title="Export as JSON"
                                        >
                                            📥
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteClick(cv)
                                            }
                                            className="px-4 py-2 bg-purple-300 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium shadow-sm"
                                            title="Delete CV"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 bg-purple-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-purple-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Confirm Delete
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete &quot;
                                <span className="font-medium">
                                    {deleteConfirm.name}
                                </span>
                                &quot;? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;

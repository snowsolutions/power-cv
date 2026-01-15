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
        loadCVFromBackend,
        isLoading,
        error,
        clearError,
    } = useCV();

    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null);

    useEffect(() => {
        loadAllCVs();
    }, []);

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

    return (
        <div className="min-h-screen bg-gray-50 py-8">
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
                <div className="mb-6 flex gap-4">
                    <button
                        onClick={handleCreateNew}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        + Create New CV
                    </button>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                        Back to Home
                    </Link>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Create Your First CV
                        </button>
                    </div>
                )}

                {!isLoading && savedCVs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedCVs.map((cv) => (
                            <div
                                key={cv.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
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
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleExportCV(cv.id)
                                            }
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                            title="Export as JSON"
                                        >
                                            📥
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteClick(cv)
                                            }
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
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
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Confirm Delete
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete "
                                <span className="font-medium">
                                    {deleteConfirm.name}
                                </span>
                                "? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
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

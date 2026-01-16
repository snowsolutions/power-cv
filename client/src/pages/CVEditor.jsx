import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useCV } from "../hooks/useCV";
import {
    PersonalInfoForm,
    IntroductionForm,
    WorkHistoryForm,
    CertificationsForm,
    EducationsForm,
    ActivitiesForm,
    ProfessionalSkillsForm,
    LanguageCompetenciesForm,
} from "../components/form";
import { CVPreview } from "../components/cv";
import { ClassicTemplate } from "../components/templates";

function CVEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const [saveMessage, setSaveMessage] = useState(null);
    const [showImportModal, setShowImportModal] = useState(false);
    const fileInputRef = useRef(null);

    const {
        currentCV,
        updatePersonalInfo,
        updateSectionTitle,
        updateIntroduction,
        addItem,
        updateItem,
        removeItem,
        setCVName,
        isDirty,
        isPreviewVisible,
        togglePreview,
        selectedTemplate,
        saveCV,
        loadCVFromBackend,
        isLoading,
        error,
        clearError,
        exportCV,
        importCV,
    } = useCV();

    // Load CV from backend if in edit mode
    useEffect(() => {
        if (id && id !== currentCV.id) {
            loadCVFromBackend(id);
        }
    }, [id]);

    // Handle save CV
    const handleSave = async () => {
        setSaveMessage(null);
        clearError();

        const result = await saveCV();

        if (result.success) {
            setSaveMessage({
                type: "success",
                text: "CV saved successfully!",
            });

            // If it's a new CV, navigate to edit mode with the new ID
            if (!isEditMode && result.data.id) {
                setTimeout(() => {
                    navigate(`/editor/${result.data.id}`, { replace: true });
                }, 1500);
            }

            // Clear success message after 3 seconds
            setTimeout(() => setSaveMessage(null), 3000);
        } else {
            setSaveMessage({
                type: "error",
                text: result.error || "Failed to save CV",
            });
        }
    };

    // Handle export CV
    const handleExport = () => {
        const result = exportCV();
        if (result.success) {
            setSaveMessage({
                type: "success",
                text: result.message,
            });
            setTimeout(() => setSaveMessage(null), 3000);
        } else {
            setSaveMessage({
                type: "error",
                text: result.error,
            });
        }
    };

    // Handle import CV click
    const handleImportClick = () => {
        if (isDirty) {
            setShowImportModal(true);
        } else {
            fileInputRef.current?.click();
        }
    };

    // Handle import confirmation
    const handleImportConfirm = () => {
        setShowImportModal(false);
        fileInputRef.current?.click();
    };

    // Handle file selection
    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSaveMessage(null);
        clearError();

        const result = await importCV(file);

        if (result.success) {
            setSaveMessage({
                type: "success",
                text: result.message,
            });
            setTimeout(() => setSaveMessage(null), 3000);
        } else {
            setSaveMessage({
                type: "error",
                text: result.error,
            });
        }

        // Reset file input
        e.target.value = "";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditMode ? "Edit CV" : "Create New CV"}
                            </h1>
                            {isEditMode && (
                                <p className="text-sm text-gray-500 mt-1">
                                    ID: {id}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={currentCV.name}
                                onChange={(e) => setCVName(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                                placeholder="Enter CV name"
                            />
                            {isDirty && (
                                <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                                    Unsaved
                                </span>
                            )}
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className={`px-5 py-2 rounded-lg font-medium transition-colors text-sm ${
                                    isLoading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                            >
                                {isLoading ? "Saving..." : "Save"}
                            </button>
                            <button
                                onClick={handleExport}
                                disabled={isLoading}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 text-sm"
                                title="Export as JSON"
                            >
                                📥 Export
                            </button>
                            <button
                                onClick={handleImportClick}
                                disabled={isLoading}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:bg-gray-400 text-sm"
                                title="Import from JSON"
                            >
                                📤 Import
                            </button>
                            <Link
                                to="/dashboard"
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json,application/json"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>

                {/* Status Messages - Fixed Position */}
                {saveMessage && (
                    <div className="fixed top-20 right-6 z-30 animate-slide-in">
                        <div
                            className={`px-4 py-3 rounded-lg shadow-lg ${
                                saveMessage.type === "success"
                                    ? "bg-green-100 text-green-800 border border-green-200"
                                    : "bg-red-100 text-red-800 border border-red-200"
                            }`}
                        >
                            <p className="font-medium text-sm">
                                {saveMessage.text}
                            </p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="fixed top-20 right-6 z-30">
                        <div className="px-4 py-3 rounded-lg bg-red-100 text-red-800 border border-red-200 shadow-lg">
                            <p className="font-medium text-sm">
                                Error: {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 shadow-xl">
                            <div className="flex items-center space-x-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <p className="text-lg font-medium text-gray-900">
                                    Loading...
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Editor Layout - Full Width Two Column */}
                <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-80px)]">
                    {/* Left Column - Form - Scrollable */}
                    <div className="overflow-y-auto px-6 py-6 space-y-6 bg-white border-r border-gray-200">
                        <PersonalInfoForm
                            personalInfo={currentCV.data.personalInfo}
                            onUpdate={updatePersonalInfo}
                            onUpdateSectionTitle={updateSectionTitle}
                        />

                        <IntroductionForm
                            key={`${currentCV.id}-${currentCV.updatedAt}`}
                            introduction={currentCV.data.introduction}
                            onUpdate={updateIntroduction}
                            onUpdateSectionTitle={updateSectionTitle}
                        />

                        <WorkHistoryForm
                            workHistory={currentCV.data.workHistory}
                            onAddItem={addItem}
                            onUpdateItem={updateItem}
                            onRemoveItem={removeItem}
                            onUpdateSectionTitle={updateSectionTitle}
                        />

                        <CertificationsForm
                            certifications={currentCV.data.certifications}
                            onAddItem={addItem}
                            onUpdateItem={updateItem}
                            onRemoveItem={removeItem}
                            onUpdateSectionTitle={updateSectionTitle}
                        />

                        <EducationsForm
                            educations={currentCV.data.educations}
                            onAddItem={addItem}
                            onUpdateItem={updateItem}
                            onRemoveItem={removeItem}
                            onUpdateSectionTitle={updateSectionTitle}
                        />

                        <ActivitiesForm
                            activities={currentCV.data.activities}
                            onAddItem={addItem}
                            onUpdateItem={updateItem}
                            onRemoveItem={removeItem}
                            onUpdateSectionTitle={updateSectionTitle}
                        />

                        <ProfessionalSkillsForm
                            professionalSkills={
                                currentCV.data.professionalSkills
                            }
                            onAddItem={addItem}
                            onUpdateItem={updateItem}
                            onRemoveItem={removeItem}
                            onUpdateSectionTitle={updateSectionTitle}
                        />

                        <LanguageCompetenciesForm
                            languageCompetencies={
                                currentCV.data.languageCompetencies
                            }
                            onAddItem={addItem}
                            onUpdateItem={updateItem}
                            onRemoveItem={removeItem}
                            onUpdateSectionTitle={updateSectionTitle}
                        />
                    </div>

                    {/* Right Column - Preview - Sticky and Scrollable */}
                    <div className="overflow-y-auto bg-gray-50 print:hidden">
                        <div className="h-full">
                            <CVPreview
                                data={currentCV.data}
                                template={selectedTemplate}
                                isVisible={isPreviewVisible}
                                onToggleVisibility={togglePreview}
                            />
                        </div>
                    </div>
                </div>

                {/* Print-only view */}
                <div className="hidden print:block">
                    <ClassicTemplate data={currentCV.data} />
                </div>

                {/* Import Confirmation Modal */}
                {showImportModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Import CV
                            </h3>
                            <p className="text-gray-600 mb-6">
                                You have unsaved changes. Importing a new CV
                                will replace your current data. Do you want to
                                continue?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowImportModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleImportConfirm}
                                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                                >
                                    Import Anyway
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CVEditor;

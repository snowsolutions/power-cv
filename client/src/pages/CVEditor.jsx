import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
    Save,
    Download,
    Upload,
    FileDown,
    Plus,
    Minus,
    Eye,
    EyeOff,
    Home,
    Loader2
} from "lucide-react";
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
        updateShowLevel,
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

    const [zoom, setZoom] = useState(90);
    const previewRef = useRef(null);

    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 150));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));
    const handleResetZoom = () => setZoom(100);

    const handleExportPDF = () => {
        if (previewRef.current) {
            previewRef.current.exportPDF();
        }
    };

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
        <div className="min-h-screen bg-purple-50/30">
            <div className="w-full">
                {/* Header Section Removed */}

                {/* Status Messages - Fixed Position */}
                {saveMessage && (
                    <div className="fixed top-6 right-6 z-30 animate-slide-in">
                        <div
                            className={`px-4 py-3 rounded-lg shadow-lg ${saveMessage.type === "success"
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
                    <div className="fixed top-6 right-6 z-30">
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
                                <Loader2 className="animate-spin h-8 w-8 text-purple-600" />
                                <p className="text-lg font-medium text-gray-900">
                                    Loading...
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area with Sidebar and Two-Column Layout */}
                <div className="flex h-screen overflow-hidden">
                    {/* Left Fixed Sidebar - Action Buttons */}
                    <div className="w-20 bg-white border-r border-purple-100 flex flex-col items-center py-6 gap-6 z-10 shadow-sm print:hidden">
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className={`flex flex-col items-center gap-1 group disabled:opacity-50`}
                            title="Save CV"
                        >
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                                <Save className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter group-hover:text-purple-600">
                                Save
                            </span>
                        </button>

                        <button
                            onClick={handleExport}
                            disabled={isLoading}
                            className={`flex flex-col items-center gap-1 group disabled:opacity-50`}
                            title="Export to JSON"
                        >
                            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all shadow-sm">
                                <Download className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter group-hover:text-purple-500">
                                Export
                            </span>
                        </button>

                        <button
                            onClick={handleImportClick}
                            disabled={isLoading}
                            className={`flex flex-col items-center gap-1 group disabled:opacity-50`}
                            title="Import from JSON"
                        >
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                                <Upload className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter group-hover:text-purple-600">
                                Import
                            </span>
                        </button>

                        <button
                            onClick={handleExportPDF}
                            disabled={isLoading}
                            className={`flex flex-col items-center gap-1 group disabled:opacity-50`}
                            title="Export to PDF"
                        >
                            <div className="w-12 h-12 bg-purple-50 text-purple-400 rounded-xl flex items-center justify-center group-hover:bg-purple-400 group-hover:text-white transition-all shadow-sm">
                                <FileDown className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter group-hover:text-purple-400">
                                PDF
                            </span>
                        </button>

                        <div className="w-10 h-px bg-purple-100 mx-auto"></div>

                        {/* Zoom Controls */}
                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={handleZoomIn}
                                className="w-8 h-8 flex items-center justify-center bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-200 transition-all shadow-sm"
                                title="Zoom In"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleResetZoom}
                                className="text-[10px] font-bold text-purple-400 hover:text-purple-900 transition-colors"
                                title="Reset Zoom"
                            >
                                {zoom}%
                            </button>
                            <button
                                onClick={handleZoomOut}
                                className="w-8 h-8 flex items-center justify-center bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-200 transition-all shadow-sm"
                                title="Zoom Out"
                            >
                                <Minus className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="w-10 h-px bg-purple-100 mx-auto"></div>

                        <button
                            onClick={togglePreview}
                            className="flex flex-col items-center gap-1 group"
                            title={
                                isPreviewVisible
                                    ? "Hide Preview"
                                    : "Show Preview"
                            }
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-sm ${isPreviewVisible ? "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white" : "bg-purple-100 text-purple-600 group-hover:bg-purple-800 group-hover:text-white"}`}
                            >
                                {isPreviewVisible ? (
                                    <EyeOff className="w-6 h-6" />
                                ) : (
                                    <Eye className="w-6 h-6" />
                                )}
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter group-hover:text-gray-800">
                                {isPreviewVisible ? "Hide" : "Show"}
                            </span>
                        </button>

                        <div className="w-10 h-px bg-purple-100 mx-auto"></div>

                        <Link
                            to="/dashboard"
                            className="flex flex-col items-center gap-1 group"
                            title="Back to Dashboard"
                        >
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center group-hover:bg-purple-800 group-hover:text-white transition-all shadow-sm">
                                <Home className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter group-hover:text-purple-800">
                                Home
                            </span>
                        </Link>
                    </div>

                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Column - Form - Scrollable */}
                        <div className="overflow-y-auto px-8 py-8 space-y-8 bg-white border-r border-purple-100 scroll-smooth">
                            {/* CV Header Info - Integrated into Form Area since Top Nav is gone */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-purple-50">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-xl font-bold text-gray-800">
                                        {isEditMode ? "Edit CV" : "New CV"}
                                    </h1>
                                    <div className="h-4 w-px bg-purple-300"></div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={currentCV.name}
                                            onChange={(e) =>
                                                setCVName(e.target.value)
                                            }
                                            className="px-2 py-1 text-sm font-medium text-gray-600 border-none focus:ring-0 hover:bg-purple-50 rounded-md w-48"
                                            placeholder="Untitiled CV"
                                        />
                                        {isDirty && (
                                            <div
                                                className="w-1.5 h-1.5 rounded-full bg-purple-400"
                                                title="Unsaved changes"
                                            ></div>
                                        )}
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

                            <ProfessionalSkillsForm
                                professionalSkills={
                                    currentCV.data.professionalSkills
                                }
                                onAddItem={addItem}
                                onUpdateItem={updateItem}
                                onRemoveItem={removeItem}
                                onUpdateSectionTitle={updateSectionTitle}
                                onUpdateShowLevel={updateShowLevel}
                            />

                            <EducationsForm
                                educations={currentCV.data.educations}
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

                            <ActivitiesForm
                                activities={currentCV.data.activities}
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
                                onUpdateShowLevel={updateShowLevel}
                            />
                        </div>

                        {/* Right Column - Preview - Sticky and Non-Scrollable */}
                        <div className="bg-purple-50/30 print:hidden relative flex items-center justify-center overflow-hidden h-screen">
                            <div className="w-full h-full">
                                <CVPreview
                                    ref={previewRef}
                                    data={currentCV.data}
                                    template={selectedTemplate}
                                    isVisible={isPreviewVisible}
                                    onToggleVisibility={togglePreview}
                                    zoom={zoom}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Print-only view */}
                <div className="hidden print:block">
                    <ClassicTemplate data={currentCV.data} />
                </div>

                {/* Import Confirmation Modal */}
                {showImportModal && (
                    <div className="fixed inset-0 bg-purple-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border border-purple-200">
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
                                    className="flex-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleImportConfirm}
                                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
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

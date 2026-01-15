import useCVStore from "../store/useCVStore";

/**
 * Custom hook for accessing CV store
 * Provides easy access to CV state and actions
 * @returns {Object} CV state and actions
 */
export const useCV = () => {
    // State selectors
    const currentCV = useCVStore((state) => state.currentCV);
    const savedCVs = useCVStore((state) => state.savedCVs);
    const isPreviewVisible = useCVStore((state) => state.isPreviewVisible);
    const selectedTemplate = useCVStore((state) => state.selectedTemplate);
    const isDirty = useCVStore((state) => state.isDirty);

    // Action selectors
    const updatePersonalInfo = useCVStore((state) => state.updatePersonalInfo);
    const updateIntroduction = useCVStore((state) => state.updateIntroduction);
    const updateSectionTitle = useCVStore((state) => state.updateSectionTitle);
    const addItem = useCVStore((state) => state.addItem);
    const updateItem = useCVStore((state) => state.updateItem);
    const removeItem = useCVStore((state) => state.removeItem);
    const reorderItems = useCVStore((state) => state.reorderItems);
    const setTemplate = useCVStore((state) => state.setTemplate);
    const setCVName = useCVStore((state) => state.setCVName);
    const loadCV = useCVStore((state) => state.loadCV);
    const createNewCV = useCVStore((state) => state.createNewCV);
    const importCVData = useCVStore((state) => state.importCVData);
    const updateCVData = useCVStore((state) => state.updateCVData);
    const togglePreview = useCVStore((state) => state.togglePreview);
    const resetCV = useCVStore((state) => state.resetCV);
    const markAsSaved = useCVStore((state) => state.markAsSaved);
    const setDirty = useCVStore((state) => state.setDirty);
    const getCVAsJSON = useCVStore((state) => state.getCVAsJSON);
    const setSavedCVs = useCVStore((state) => state.setSavedCVs);
    const addSavedCV = useCVStore((state) => state.addSavedCV);
    const removeSavedCV = useCVStore((state) => state.removeSavedCV);
    const updateSavedCV = useCVStore((state) => state.updateSavedCV);

    // Backend integration actions
    const saveCV = useCVStore((state) => state.saveCV);
    const loadCVFromBackend = useCVStore((state) => state.loadCVFromBackend);
    const loadAllCVs = useCVStore((state) => state.loadAllCVs);
    const deleteCVFromBackend = useCVStore(
        (state) => state.deleteCVFromBackend,
    );
    const isLoading = useCVStore((state) => state.isLoading);
    const error = useCVStore((state) => state.error);
    const clearError = useCVStore((state) => state.clearError);

    // Export/Import actions
    const exportCV = useCVStore((state) => state.exportCV);
    const importCV = useCVStore((state) => state.importCV);

    return {
        // State
        currentCV,
        savedCVs,
        isPreviewVisible,
        selectedTemplate,
        isDirty,
        isLoading,
        error,

        // Actions
        updatePersonalInfo,
        updateIntroduction,
        updateSectionTitle,
        addItem,
        updateItem,
        removeItem,
        reorderItems,
        setTemplate,
        setCVName,
        loadCV,
        createNewCV,
        importCVData,
        updateCVData,
        togglePreview,
        resetCV,
        markAsSaved,
        setDirty,
        getCVAsJSON,
        setSavedCVs,
        addSavedCV,
        removeSavedCV,
        updateSavedCV,

        // Backend integration actions
        saveCV,
        loadCVFromBackend,
        loadAllCVs,
        deleteCVFromBackend,
        clearError,

        // Export/Import actions
        exportCV,
        importCV,
    };
};

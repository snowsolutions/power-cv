import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getInitialCVData } from "../utils/initialCVData";
import { TEMPLATES } from "../utils/constants";
import cvService from "../services/cvService";
import { exportCVAsJSON } from "../utils/jsonExport";
import { importCVFromFile } from "../utils/jsonImport";

const useCVStore = create(
    persist(
        (set, get) => ({
            // Current CV state
            currentCV: {
                id: null,
                name: "Untitled CV",
                template: TEMPLATES.CLASSIC,
                data: getInitialCVData(),
                createdAt: null,
                updatedAt: null,
            },

            // List of saved CVs (for future use with backend)
            savedCVs: [],

            // UI state
            isPreviewVisible: true,
            selectedTemplate: TEMPLATES.CLASSIC,
            isDirty: false,
            isLoading: false,
            error: null,

            // Actions for Personal Info
            updatePersonalInfo: (field, value) =>
                set((state) => ({
                    currentCV: {
                        ...state.currentCV,
                        data: {
                            ...state.currentCV.data,
                            personalInfo: {
                                ...state.currentCV.data.personalInfo,
                                [field]: value,
                            },
                        },
                        updatedAt: new Date().toISOString(),
                    },
                    isDirty: true,
                })),

            // Actions for Introduction
            updateIntroduction: (content) =>
                set((state) => ({
                    currentCV: {
                        ...state.currentCV,
                        data: {
                            ...state.currentCV.data,
                            introduction: {
                                ...state.currentCV.data.introduction,
                                content,
                            },
                        },
                        updatedAt: new Date().toISOString(),
                    },
                    isDirty: true,
                })),

            // Actions for Section Titles
            updateSectionTitle: (section, title) =>
                set((state) => ({
                    currentCV: {
                        ...state.currentCV,
                        data: {
                            ...state.currentCV.data,
                            [section]: {
                                ...state.currentCV.data[section],
                                sectionTitle: title,
                            },
                        },
                        updatedAt: new Date().toISOString(),
                    },
                    isDirty: true,
                })),

            // Actions for List Items (work history, certifications, etc.)
            addItem: (section, item) =>
                set((state) => ({
                    currentCV: {
                        ...state.currentCV,
                        data: {
                            ...state.currentCV.data,
                            [section]: {
                                ...state.currentCV.data[section],
                                items: [
                                    ...state.currentCV.data[section].items,
                                    item,
                                ],
                            },
                        },
                        updatedAt: new Date().toISOString(),
                    },
                    isDirty: true,
                })),

            updateItem: (section, itemId, updatedFields) =>
                set((state) => ({
                    currentCV: {
                        ...state.currentCV,
                        data: {
                            ...state.currentCV.data,
                            [section]: {
                                ...state.currentCV.data[section],
                                items: state.currentCV.data[section].items.map(
                                    (item) =>
                                        item.id === itemId
                                            ? { ...item, ...updatedFields }
                                            : item,
                                ),
                            },
                        },
                        updatedAt: new Date().toISOString(),
                    },
                    isDirty: true,
                })),

            removeItem: (section, itemId) =>
                set((state) => ({
                    currentCV: {
                        ...state.currentCV,
                        data: {
                            ...state.currentCV.data,
                            [section]: {
                                ...state.currentCV.data[section],
                                items: state.currentCV.data[
                                    section
                                ].items.filter((item) => item.id !== itemId),
                            },
                        },
                        updatedAt: new Date().toISOString(),
                    },
                    isDirty: true,
                })),

            // Reorder items in a section
            reorderItems: (section, startIndex, endIndex) =>
                set((state) => {
                    const items = [...state.currentCV.data[section].items];
                    const [removed] = items.splice(startIndex, 1);
                    items.splice(endIndex, 0, removed);

                    return {
                        currentCV: {
                            ...state.currentCV,
                            data: {
                                ...state.currentCV.data,
                                [section]: {
                                    ...state.currentCV.data[section],
                                    items,
                                },
                            },
                            updatedAt: new Date().toISOString(),
                        },
                        isDirty: true,
                    };
                }),

            // Template actions
            setTemplate: (template) =>
                set((state) => ({
                    currentCV: {
                        ...state.currentCV,
                        template,
                    },
                    selectedTemplate: template,
                    isDirty: true,
                })),

            // CV metadata actions
            setCVName: (name) =>
                set((state) => ({
                    currentCV: {
                        ...state.currentCV,
                        name,
                        updatedAt: new Date().toISOString(),
                    },
                    isDirty: true,
                })),

            // Load existing CV
            loadCV: (cv) =>
                set({
                    currentCV: {
                        ...cv,
                        updatedAt: new Date().toISOString(),
                    },
                    selectedTemplate: cv.template || TEMPLATES.MODERN,
                    isDirty: false,
                }),

            // Create new CV
            createNewCV: () =>
                set({
                    currentCV: {
                        id: null,
                        name: "Untitled CV",
                        template: TEMPLATES.CLASSIC,
                        data: getInitialCVData(),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    selectedTemplate: TEMPLATES.CLASSIC,
                    isDirty: false,
                }),

            // Import CV data from JSON
            importCVData: (data) =>
                set({
                    currentCV: {
                        ...data,
                        id: null, // Clear ID for new import
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    selectedTemplate: data.template || TEMPLATES.CLASSIC,
                    isDirty: true,
                }),

            // Update entire CV data (for bulk updates)
            updateCVData: (data) =>
                set((state) => ({
                    currentCV: {
                        ...state.currentCV,
                        data,
                        updatedAt: new Date().toISOString(),
                    },
                    isDirty: true,
                })),

            // Toggle preview visibility
            togglePreview: () =>
                set((state) => ({
                    isPreviewVisible: !state.isPreviewVisible,
                })),

            // Reset CV to initial state
            resetCV: () =>
                set({
                    currentCV: {
                        id: null,
                        name: "Untitled CV",
                        template: TEMPLATES.CLASSIC,
                        data: getInitialCVData(),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                    selectedTemplate: TEMPLATES.CLASSIC,
                    isDirty: false,
                }),

            // Mark as saved (after successful backend save)
            markAsSaved: (id) =>
                set((state) => ({
                    currentCV: {
                        ...state.currentCV,
                        id,
                        updatedAt: new Date().toISOString(),
                    },
                    isDirty: false,
                })),

            // Set dirty state manually
            setDirty: (isDirty) =>
                set({
                    isDirty,
                }),

            // Get CV data as JSON (for export)
            getCVAsJSON: () => {
                const state = get();
                return JSON.stringify(state.currentCV, null, 2);
            },

            // Saved CVs management (for dashboard)
            setSavedCVs: (cvs) =>
                set({
                    savedCVs: cvs,
                }),

            addSavedCV: (cv) =>
                set((state) => ({
                    savedCVs: [...state.savedCVs, cv],
                })),

            removeSavedCV: (cvId) =>
                set((state) => ({
                    savedCVs: state.savedCVs.filter((cv) => cv.id !== cvId),
                })),

            updateSavedCV: (cvId, updatedCV) =>
                set((state) => ({
                    savedCVs: state.savedCVs.map((cv) =>
                        cv.id === cvId ? { ...cv, ...updatedCV } : cv,
                    ),
                })),

            // Backend integration actions
            // Save CV to backend (create or update)
            saveCV: async () => {
                const state = get();
                set({ isLoading: true, error: null });

                try {
                    const cvData = {
                        name: state.currentCV.name,
                        template: state.currentCV.template,
                        data: state.currentCV.data,
                    };

                    let response;
                    if (state.currentCV.id) {
                        // Update existing CV
                        response = await cvService.updateCV(
                            state.currentCV.id,
                            cvData,
                        );
                    } else {
                        // Create new CV
                        response = await cvService.createCV(cvData);
                    }

                    if (response.success) {
                        set((state) => ({
                            currentCV: {
                                ...state.currentCV,
                                id: response.data.id,
                                createdAt: response.data.createdAt,
                                updatedAt: response.data.updatedAt,
                            },
                            isDirty: false,
                            isLoading: false,
                        }));

                        // Update or add to saved CVs list
                        const savedCVEntry = {
                            id: response.data.id,
                            name: response.data.name,
                            template: response.data.template,
                            createdAt: response.data.createdAt,
                            updatedAt: response.data.updatedAt,
                        };

                        set((state) => {
                            const existingIndex = state.savedCVs.findIndex(
                                (cv) => cv.id === response.data.id,
                            );

                            if (existingIndex >= 0) {
                                // Update existing
                                const newSavedCVs = [...state.savedCVs];
                                newSavedCVs[existingIndex] = savedCVEntry;
                                return { savedCVs: newSavedCVs };
                            } else {
                                // Add new
                                return {
                                    savedCVs: [...state.savedCVs, savedCVEntry],
                                };
                            }
                        });

                        return { success: true, data: response.data };
                    } else {
                        throw new Error(
                            response.message || "Failed to save CV",
                        );
                    }
                } catch (error) {
                    const errorMessage =
                        error.message || "Failed to save CV. Please try again.";
                    set({ error: errorMessage, isLoading: false });
                    return { success: false, error: errorMessage };
                }
            },

            // Load CV from backend
            loadCVFromBackend: async (cvId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await cvService.getCVById(cvId);

                    if (response.success) {
                        set({
                            currentCV: {
                                id: response.data.id,
                                name: response.data.name,
                                template: response.data.template,
                                data: response.data.data,
                                createdAt: response.data.createdAt,
                                updatedAt: response.data.updatedAt,
                            },
                            selectedTemplate:
                                response.data.template || TEMPLATES.MODERN,
                            isDirty: false,
                            isLoading: false,
                        });

                        return { success: true, data: response.data };
                    } else {
                        throw new Error(
                            response.message || "Failed to load CV",
                        );
                    }
                } catch (error) {
                    const errorMessage =
                        error.message || "Failed to load CV. Please try again.";
                    set({ error: errorMessage, isLoading: false });
                    return { success: false, error: errorMessage };
                }
            },

            // Load all CVs from backend
            loadAllCVs: async () => {
                set({ isLoading: true, error: null });

                try {
                    const response = await cvService.getAllCVs();

                    if (response.success) {
                        set({
                            savedCVs: response.data,
                            isLoading: false,
                        });

                        return { success: true, data: response.data };
                    } else {
                        throw new Error(
                            response.message || "Failed to load CVs",
                        );
                    }
                } catch (error) {
                    const errorMessage =
                        error.message ||
                        "Failed to load CVs. Please try again.";
                    set({ error: errorMessage, isLoading: false });
                    return { success: false, error: errorMessage };
                }
            },

            // Delete CV from backend
            deleteCVFromBackend: async (cvId) => {
                set({ isLoading: true, error: null });

                try {
                    const response = await cvService.deleteCV(cvId);

                    if (response.success) {
                        set((state) => ({
                            savedCVs: state.savedCVs.filter(
                                (cv) => cv.id !== cvId,
                            ),
                            isLoading: false,
                        }));

                        // If current CV is deleted, reset
                        const currentState = get();
                        if (currentState.currentCV.id === cvId) {
                            get().createNewCV();
                        }

                        return { success: true };
                    } else {
                        throw new Error(
                            response.message || "Failed to delete CV",
                        );
                    }
                } catch (error) {
                    const errorMessage =
                        error.message ||
                        "Failed to delete CV. Please try again.";
                    set({ error: errorMessage, isLoading: false });
                    return { success: false, error: errorMessage };
                }
            },

            // Clear error
            clearError: () => set({ error: null }),

            // Export CV as JSON
            exportCV: () => {
                const state = get();
                const success = exportCVAsJSON(state.currentCV);

                if (success) {
                    return {
                        success: true,
                        message: "CV exported successfully!",
                    };
                } else {
                    return {
                        success: false,
                        error: "Failed to export CV",
                    };
                }
            },

            // Import CV from JSON file
            importCV: async (file) => {
                set({ isLoading: true, error: null });

                try {
                    const result = await importCVFromFile(file);

                    console.log(
                        "[Import] Result from importCVFromFile:",
                        result,
                    );

                    if (result.success) {
                        // Deep clone to ensure all references change
                        const importedData = JSON.parse(
                            JSON.stringify(result.cv.data),
                        );

                        console.log(
                            "[Import] Introduction content:",
                            importedData.introduction?.content?.substring(
                                0,
                                100,
                            ),
                        );
                        console.log(
                            "[Import] Full introduction object:",
                            importedData.introduction,
                        );

                        // Load imported CV data
                        set({
                            currentCV: {
                                id: null,
                                name: result.cv.name,
                                template: TEMPLATES.CLASSIC,
                                data: importedData,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                            },
                            selectedTemplate: TEMPLATES.CLASSIC,
                            isDirty: true,
                            isLoading: false,
                        });

                        console.log(
                            "[Import] State updated with new currentCV",
                        );

                        return {
                            success: true,
                            message: "CV imported successfully!",
                        };
                    } else {
                        console.error("[Import] Import failed:", result.error);
                        set({ isLoading: false });
                        return {
                            success: false,
                            error: result.error || "Failed to import CV",
                        };
                    }
                } catch (error) {
                    const errorMessage =
                        error.message ||
                        "Failed to import CV. Please try again.";
                    set({ error: errorMessage, isLoading: false });
                    return { success: false, error: errorMessage };
                }
            },
        }),
        {
            name: "power-cv-storage",
            // Only persist essential data, not UI state
            partialize: (state) => ({
                currentCV: state.currentCV,
                savedCVs: state.savedCVs,
            }),
        },
    ),
);

export default useCVStore;

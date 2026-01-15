import api from "./api";

const cvService = {
    // Get all CVs
    getAllCVs: async () => {
        const response = await api.get("/cvs");
        return response.data;
    },

    // Get CV by ID
    getCVById: async (id) => {
        const response = await api.get(`/cvs/${id}`);
        return response.data;
    },

    // Create new CV
    createCV: async (cvData) => {
        const response = await api.post("/cvs", cvData);
        return response.data;
    },

    // Update CV
    updateCV: async (id, cvData) => {
        const response = await api.put(`/cvs/${id}`, cvData);
        return response.data;
    },

    // Delete CV
    deleteCV: async (id) => {
        const response = await api.delete(`/cvs/${id}`);
        return response.data;
    },

    // Import CV from JSON
    importCV: async (jsonData) => {
        const response = await api.post("/cvs/import", jsonData);
        return response.data;
    },

    // Export CV as JSON
    exportCV: async (id) => {
        const response = await api.get(`/cvs/${id}/export`);
        return response.data;
    },

    // Health check
    healthCheck: async () => {
        const response = await api.get("/health");
        return response.data;
    },
};

export default cvService;

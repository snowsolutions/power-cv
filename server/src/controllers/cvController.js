/**
 * CV Controller
 *
 * Handles all CRUD operations for CV management
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all CVs
 * GET /api/cvs
 */
const getAllCVs = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const where = userId ? { userId } : {};

        const cvs = await prisma.cV.findMany({
            where,
            orderBy: {
                updatedAt: 'desc'
            },
            select: {
                id: true,
                name: true,
                template: true,
                userId: true,
                createdAt: true,
                updatedAt: true,
                // Don't send full data in list view for performance
            }
        });

        res.status(200).json({
            success: true,
            count: cvs.length,
            data: cvs
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get single CV by ID
 * GET /api/cvs/:id
 */
const getCVById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cv = await prisma.cV.findUnique({
            where: { id }
        });

        if (!cv) {
            return res.status(404).json({
                success: false,
                message: 'CV not found'
            });
        }

        res.status(200).json({
            success: true,
            data: cv
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Create new CV
 * POST /api/cvs
 */
const createCV = async (req, res, next) => {
    try {
        const { name, template, data, userId } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'CV name is required'
            });
        }

        if (!data) {
            return res.status(400).json({
                success: false,
                message: 'CV data is required'
            });
        }

        // Create CV with default structure if data is incomplete
        const cvData = {
            name,
            template: template || 'modern',
            data: data,
            userId: userId || null
        };

        const cv = await prisma.cV.create({
            data: cvData
        });

        res.status(201).json({
            success: true,
            message: 'CV created successfully',
            data: cv
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update CV
 * PUT /api/cvs/:id
 */
const updateCV = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, template, data, userId } = req.body;

        // Check if CV exists
        const existingCV = await prisma.cV.findUnique({
            where: { id }
        });

        if (!existingCV) {
            return res.status(404).json({
                success: false,
                message: 'CV not found'
            });
        }

        // Build update data object (only include provided fields)
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (template !== undefined) updateData.template = template;
        if (data !== undefined) updateData.data = data;
        if (userId !== undefined) updateData.userId = userId;

        const cv = await prisma.cV.update({
            where: { id },
            data: updateData
        });

        res.status(200).json({
            success: true,
            message: 'CV updated successfully',
            data: cv
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete CV
 * DELETE /api/cvs/:id
 */
const deleteCV = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if CV exists
        const existingCV = await prisma.cV.findUnique({
            where: { id }
        });

        if (!existingCV) {
            return res.status(404).json({
                success: false,
                message: 'CV not found'
            });
        }

        await prisma.cV.delete({
            where: { id }
        });

        res.status(200).json({
            success: true,
            message: 'CV deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCVs,
    getCVById,
    createCV,
    updateCV,
    deleteCV
};

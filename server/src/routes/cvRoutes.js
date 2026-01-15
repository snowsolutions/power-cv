/**
 * CV Routes
 *
 * Defines all API endpoints for CV management
 */

const express = require('express');
const router = express.Router();
const {
    getAllCVs,
    getCVById,
    createCV,
    updateCV,
    deleteCV
} = require('../controllers/cvController');

// @route   GET /api/cvs
// @desc    Get all CVs (optionally filter by userId via query param)
// @access  Public
router.get('/', getAllCVs);

// @route   GET /api/cvs/:id
// @desc    Get single CV by ID
// @access  Public
router.get('/:id', getCVById);

// @route   POST /api/cvs
// @desc    Create new CV
// @access  Public
router.post('/', createCV);

// @route   PUT /api/cvs/:id
// @desc    Update CV
// @access  Public
router.put('/:id', updateCV);

// @route   DELETE /api/cvs/:id
// @desc    Delete CV
// @access  Public
router.delete('/:id', deleteCV);

module.exports = router;

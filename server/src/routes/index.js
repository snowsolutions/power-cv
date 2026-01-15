/**
 * Main Router
 *
 * Aggregates all application routes and exports a single router
 */

const express = require("express");
const taskRoutes = require("./taskRoutes");
const cvRoutes = require("./cvRoutes");

const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Power CV Server is running",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
    });
});

// Task management routes
router.use("/tasks", taskRoutes);

// CV routes
router.use("/cvs", cvRoutes);

// Root API route
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Power CV API",
        version: "1.0.0",
        endpoints: {
            health: "/api/health",
            tasks: "/api/tasks/status",
            cvs: "/api/cvs",
        },
    });
});

module.exports = router;

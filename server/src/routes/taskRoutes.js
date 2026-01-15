const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const { sendSuccess, sendError } = require("../utils/response");

const router = express.Router();

/**
 * GET /api/tasks/status
 * Fetch the task-management.md file from .ai directory
 */
router.get("/status", async (req, res) => {
    try {
        // Path to task-management.md file (go up from server/src/routes to project root)
        const taskFilePath = path.join(
            __dirname,
            "../../../.ai/task-management.md",
        );

        // Read the file
        const content = await fs.readFile(taskFilePath, "utf-8");

        // Get file stats for last modified time
        const stats = await fs.stat(taskFilePath);

        // Return the markdown content
        return sendSuccess(
            res,
            {
                content,
                filename: "task-management.md",
                path: ".ai/task-management.md",
                lastModified: stats.mtime,
            },
            200,
            "Task management file retrieved successfully",
        );
    } catch (error) {
        console.error("Error reading task-management.md:", error);

        if (error.code === "ENOENT") {
            return sendError(res, "Task management file not found", 404);
        }

        return sendError(res, "Failed to read task management file", 500);
    }
});

module.exports = router;

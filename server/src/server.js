const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Import custom middleware and routes
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");
const routes = require("./routes");
const { connectDB, setupGracefulShutdown } = require("./config/database");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (only in development)
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("combined"));
}

// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Power CV API",
        version: "1.0.0",
        documentation: "/api",
    });
});

// API routes
app.use("/api", routes);

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handling middleware (must be last)
app.use(errorHandler);

// Start server with database connection
const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        // Connect to database
        await connectDB();

        // Setup graceful shutdown handlers
        setupGracefulShutdown();

        // Start Express server
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(
                `📍 Environment: ${process.env.NODE_ENV || "development"}`,
            );
            console.log(`🌐 API available at http://localhost:${PORT}/api`);
            console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
        });

        // Graceful shutdown for HTTP server
        process.on("SIGTERM", () => {
            console.log("SIGTERM signal received: closing HTTP server");
            server.close(() => {
                console.log("HTTP server closed");
            });
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

// Start the server
startServer();

module.exports = app;

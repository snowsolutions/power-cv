import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cvService from "../services/cvService";
import { handleAPIError } from "../utils/apiHelpers";

function Home() {
    const [apiStatus, setApiStatus] = useState("checking...");
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAPI();
    }, []);

    const checkAPI = async () => {
        try {
            const response = await cvService.healthCheck();
            setApiStatus("Connected ✅");
            setError(null);
            console.log("Health check response:", response);
        } catch (err) {
            setApiStatus("Disconnected ❌");
            setError(handleAPIError(err));
            console.error("Health check failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="page-container">
                <div className="home-content">
                    <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
                        Welcome to Power CV
                    </h1>
                    <p className="subtitle text-2xl text-gray-600 mb-8">
                        Your Professional CV Builder
                    </p>

                    <div className="card max-w-md mx-auto mb-8">
                        <div className="card-body">
                            <h2 className="text-xl font-semibold mb-2">
                                Backend Status
                            </h2>
                            <p className="text-lg mb-2">{apiStatus}</p>
                            {error && (
                                <p className="text-red-600 text-sm mb-3">
                                    Error: {error}
                                </p>
                            )}
                            <button
                                onClick={checkAPI}
                                className="btn btn-secondary btn-sm"
                            >
                                Retry Connection
                            </button>
                        </div>
                    </div>

                    <div className="my-12">
                        <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                            Create, customize, and export professional CVs with
                            ease. Power CV helps you build stunning resumes that
                            stand out.
                        </p>
                    </div>

                    <div className="home-content features">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                            Features
                        </h2>
                        <ul>
                            <li>
                                <span className="text-2xl">✨</span>
                                <span>Multiple professional templates</span>
                            </li>
                            <li>
                                <span className="text-2xl">📝</span>
                                <span>Rich text editing for introductions</span>
                            </li>
                            <li>
                                <span className="text-2xl">🎨</span>
                                <span>Customizable section titles</span>
                            </li>
                            <li>
                                <span className="text-2xl">💾</span>
                                <span>Save and manage multiple CVs</span>
                            </li>
                            <li>
                                <span className="text-2xl">📄</span>
                                <span>Export to PDF and JSON</span>
                            </li>
                            <li>
                                <span className="text-2xl">👁️</span>
                                <span>Real-time preview</span>
                            </li>
                        </ul>
                    </div>

                    <div className="cta-buttons">
                        <Link to="/editor" className="btn btn-primary btn-lg">
                            Create New CV
                        </Link>
                        <Link
                            to="/dashboard"
                            className="btn btn-outline btn-lg"
                        >
                            View My CVs
                        </Link>
                        <Link
                            to="/components"
                            className="btn btn-secondary btn-lg"
                        >
                            🧪 Test Components
                        </Link>
                        <Link
                            to="/task-status"
                            className="btn btn-secondary btn-lg"
                        >
                            📋 Task Status
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

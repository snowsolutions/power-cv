import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="page-container">
                <div className="not-found-content">
                    <h1 className="error-code">404</h1>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">
                        Oops! The page you&apos;re looking for doesn&apos;t
                        exist.
                    </p>
                    <p className="info-text text-gray-500 mb-8">
                        It might have been moved or deleted, or you may have
                        typed the URL incorrectly.
                    </p>

                    <div className="action-buttons">
                        <Link to="/" className="btn btn-primary">
                            Go to Home
                        </Link>
                        <Link to="/dashboard" className="btn btn-secondary">
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;

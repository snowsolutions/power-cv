import { Link } from "react-router-dom";
import { Home, LayoutDashboard, AlertCircle } from "lucide-react";

function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <div className="bg-red-50 p-4 rounded-full">
                            <AlertCircle className="w-16 h-16 text-red-500" />
                        </div>
                    </div>
                    <h1 className="text-8xl font-black text-gray-200 mb-2">404</h1>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Oops! The page you&apos;re looking for doesn&apos;t
                        exist or has been moved.
                    </p>

                    <div className="flex flex-col gap-3">
                        <Link to="/" className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-bold shadow-lg shadow-purple-100">
                            <Home className="w-5 h-5" />
                            Go to Home
                        </Link>
                        <Link to="/dashboard" className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-bold">
                            <LayoutDashboard className="w-5 h-5" />
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;

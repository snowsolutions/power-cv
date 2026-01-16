import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Sparkles,
    FileText,
    Palette,
    Save,
    FileDown,
    Eye,
    RefreshCcw,
    Plus,
    LayoutDashboard,
    TestTube2,
    ClipboardList,
    CheckCircle2,
    XCircle
} from "lucide-react";
import cvService from "../services/cvService";
import { handleAPIError } from "../utils/apiHelpers";

function Home() {
    const [apiStatus, setApiStatus] = useState("checking...");
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        checkAPI();
    }, []);

    const checkAPI = async () => {
        try {
            setApiStatus("checking...");
            setIsConnected(false);
            const response = await cvService.healthCheck();
            setApiStatus("Connected");
            setIsConnected(true);
            setError(null);
            console.log("Health check response:", response);
        } catch (err) {
            setApiStatus("Disconnected");
            setIsConnected(false);
            setError(handleAPIError(err));
            console.error("Health check failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="page-container">
                <div className="home-content py-12">
                    <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4 text-center">
                        Welcome to Power CV
                    </h1>
                    <p className="subtitle text-2xl text-gray-600 mb-12 text-center">
                        Your Professional CV Builder
                    </p>

                    <div className="max-w-md mx-auto mb-12">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 transition-all hover:shadow-2xl">
                            <div className="bg-purple-600 text-white px-6 py-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <RefreshCcw className="w-5 h-5" />
                                    Backend Status
                                </h2>
                                {isConnected ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-300" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-red-300" />
                                )}
                            </div>
                            <div className="p-6">
                                <p className={`text-2xl font-bold mb-4 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                                    {apiStatus}
                                </p>
                                {error && (
                                    <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
                                        <p className="text-red-600 text-sm">
                                            {error}
                                        </p>
                                    </div>
                                )}
                                <button
                                    onClick={checkAPI}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                                >
                                    <RefreshCcw className="w-4 h-4" />
                                    Retry Connection
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="my-16 text-center">
                        <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto italic">
                            &quot;Create, customize, and export professional CVs with
                            ease. Power CV helps you build stunning resumes that
                            stand out.&quot;
                        </p>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            Powerful Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {[
                                { icon: <Sparkles className="w-8 h-8 text-yellow-500" />, title: "Templates", desc: "Multiple professional designs" },
                                { icon: <FileText className="w-8 h-8 text-blue-500" />, title: "Rich Text", desc: "Professional formatting tools" },
                                { icon: <Palette className="w-8 h-8 text-pink-500" />, title: "Customization", desc: "Tailor every section title" },
                                { icon: <Save className="w-8 h-8 text-green-500" />, title: "Storage", desc: "Manage multiple CV versions" },
                                { icon: <FileDown className="w-8 h-8 text-purple-500" />, title: "Exports", desc: "Export to PDF and JSON" },
                                { icon: <Eye className="w-8 h-8 text-indigo-500" />, title: "Live Preview", desc: "See changes in real-time" }
                            ].map((feature, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-300 hover:shadow-lg transition-all group">
                                    <div className="mb-4 bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-purple-50 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 py-8">
                        <Link to="/editor" className="flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-200 font-bold text-lg">
                            <Plus className="w-6 h-6" />
                            Create New CV
                        </Link>
                        <Link to="/dashboard" className="flex items-center gap-2 px-8 py-4 bg-white text-purple-600 border-2 border-purple-600 rounded-xl hover:bg-purple-50 transition-all font-bold text-lg">
                            <LayoutDashboard className="w-6 h-6" />
                            My Dashboard
                        </Link>
                    </div>

                    <div className="flex justify-center gap-4 mt-8 pb-12">
                        <Link to="/components" className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all text-sm font-medium">
                            <TestTube2 className="w-4 h-4" />
                            Test Components
                        </Link>
                        <Link to="/task-status" className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all text-sm font-medium">
                            <ClipboardList className="w-4 h-4" />
                            Task Status
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

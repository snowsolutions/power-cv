import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CVEditor from "./pages/CVEditor";
import ComponentTest from "./pages/ComponentTest";
import TaskStatus from "./pages/TaskStatus";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/editor" element={<CVEditor />} />
                    <Route path="/editor/:id" element={<CVEditor />} />
                    <Route path="/components" element={<ComponentTest />} />
                    <Route path="/task-status" element={<TaskStatus />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

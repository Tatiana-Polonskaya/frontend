import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DiaryPage from "./pages/DiaryPage";
import ImprovisationPage from "./pages/ImprovisationPage";
import LearningPage from "./pages/LearningPage";
import RepetitionPage from "./pages/RepetitionPage";
import SettingsPage from "./pages/SettingsPage";

import LoginPage from "./pages/EntryPage/LoginPage";
import RegisterPage from "./pages/EntryPage/RegisterPage";
import PasswordRestorePage from "./pages/EntryPage/PasswordRestorePage";
import ActivationPage from "./pages/EntryPage/ActivationPage";
import LandingPage from "./pages/LandingPage";
import AuthorizedRoute from "./components/tools/AuthorizedRoute";
import UnauthorizedRoute from "./components/tools/UnauthorizedRoute";

export default function App() {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="/landing" element={<LandingPage />} />
                <Route element={<UnauthorizedRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/activation" element={<ActivationPage />} />
                    <Route path="/restore" element={<PasswordRestorePage />} />
                </Route>

                <Route element={process.env.NODE_ENV === "production" ? <AuthorizedRoute /> : <Outlet />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/diary" element={<DiaryPage />} />
                    <Route path="/improvisation" element={<ImprovisationPage />} />
                    <Route path="/learning" element={<LearningPage />} />
                    <Route path="/repetition" element={<RepetitionPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

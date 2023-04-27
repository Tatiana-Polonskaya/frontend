import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DiaryPage from "./pages/DiaryPage";
import ImprovisationPage from "./pages/ImprovisationPage";
import LearningPage from "./pages/LearningPage";
import RepetitionPage from "./pages/RepetitionPage";
import SettingsPage from "./pages/SettingsPage";

import LoginPage from "./pages/EntryPage/LoginPage";
import RegisterPage from "./pages/EntryPage/RegisterPage";
import PasswordRestorePage from "./pages/EntryPage/PasswordRestorePage";

export default function App() {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/restore" element={<PasswordRestorePage />} />

                <Route path="/home" element={<HomePage />} />
                <Route path="/diary" element={<DiaryPage />} />
                <Route path="/improvisation" element={<ImprovisationPage />} />
                <Route path="/learning" element={<LearningPage />} />
                <Route path="/repetition" element={<RepetitionPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </div>
    );
}

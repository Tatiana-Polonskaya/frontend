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
import RoutesEnum from "./models/routes";
import SurveyPage from "./pages/SurveyPage";

export default function App() {
    return (
        <div className="wrapper">
            <Routes>
                <Route path={RoutesEnum.LANDING} element={<LandingPage />} />
                <Route element={<UnauthorizedRoute />}>
                    <Route path={RoutesEnum.LOGIN} element={<LoginPage />} />
                    <Route
                        path={RoutesEnum.REGISTER}
                        element={<RegisterPage />}
                    />
                    <Route
                        path={RoutesEnum.ACTIVATION}
                        element={<ActivationPage />}
                    />
                    <Route
                        path={RoutesEnum.RESTORE}
                        element={<PasswordRestorePage />}
                    />
                </Route>

                <Route
                    element={
                        // process.env.NODE_ENV === "production" ? (
                        <AuthorizedRoute />
                        // ) : (
                        //     <Outlet />
                        // )
                    }
                >
                    <Route path={RoutesEnum.ROOT} element={<HomePage />} />
                    <Route path={RoutesEnum.HOME} element={<HomePage />} />
                    <Route path={RoutesEnum.DIARY} element={<DiaryPage />} />
                    <Route
                        path={RoutesEnum.IMPROVISATION}
                        element={<ImprovisationPage />}
                    />
                    <Route
                        path={RoutesEnum.LEARNING}
                        element={<LearningPage />}
                    />
                    <Route
                        path={RoutesEnum.REPETITION}
                        element={<RepetitionPage />}
                    />
                    <Route
                        path={RoutesEnum.SETTINGS}
                        element={<SettingsPage />}
                    />
                </Route>

                <Route
                    path={RoutesEnum.ALL}
                    element={<Navigate to={RoutesEnum.ROOT} />}
                />
                <Route path={RoutesEnum.SURVEY} element={<SurveyPage />} />
            </Routes>
        </div>
    );
}

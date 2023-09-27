import { Routes, Route, Navigate } from "react-router-dom";

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

import TestPage from "./pages/TestPage";

import SurveyPage from "./pages/SurveyPage";
import RepetitionStart from "./components/RepetitionComponents/RepetitionStart";
import About from "./components/About";
import RecodingSetup from "./components/RepetitionComponents/Setup";
import RecodingPage from "./pages/RecodingPage";
import DiaryStart from "./components/DiaryStart";
import AnalysisReport from "./components/Report";
import SettingsStart from "./components/SettingsStart";
import ScrollToTop from "./tools/ScrollToTop";
import PayPage from "./pages/PayPage";
import QuestionnaireRoute from "./components/tools/QuestionnaireRoute";

export default function App() {
    return (
        <div className="wrapper">
            <ScrollToTop />
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
                    <Route element={<QuestionnaireRoute />}>
                        <Route
                            path={RoutesEnum.SURVEY}
                            element={<SurveyPage />}
                        />
                    </Route>

                    <Route path={RoutesEnum.HOME} element={<HomePage />} />
                    <Route path={RoutesEnum.ROOT} element={<HomePage />} />

                    <Route path={RoutesEnum.PAY} element={<PayPage />} />

                    <Route path={RoutesEnum.DIARY} element={<DiaryPage />}>
                        <Route index={true} element={<DiaryStart />} />
                        <Route
                            index={false}
                            path=":id"
                            element={<AnalysisReport />}
                        />
                    </Route>
                    <Route
                        path={RoutesEnum.IMPROVISATION}
                        element={<ImprovisationPage />}
                    />
                    <Route
                        path={RoutesEnum.LEARNING}
                        element={<LearningPage />}
                    />

                    <Route
                        path={RoutesEnum.RECODING}
                        element={<RecodingPage />}
                    />

                    <Route
                        path={RoutesEnum.REPETITION}
                        element={<RepetitionPage />}
                    >
                        <Route index={true} element={<RepetitionStart />} />
                        <Route index={false} path="about" element={<About />} />
                        <Route
                            index={false}
                            path="setup"
                            element={<RecodingSetup />}
                        />
                    </Route>
                    <Route
                        path={RoutesEnum.SETTINGS}
                        element={<SettingsPage />}
                    >
                        <Route index={true} element={<SettingsStart />} />
                        {/* <Route index={false} element={<SettingsStart />} /> */}
                    </Route>
                </Route>

                <Route
                    path={RoutesEnum.ALL}
                    element={<Navigate to={RoutesEnum.ROOT} />}
                />

                <Route path={RoutesEnum.TEST_GRAPH} element={<TestPage />} />
            </Routes>
        </div>
    );
}

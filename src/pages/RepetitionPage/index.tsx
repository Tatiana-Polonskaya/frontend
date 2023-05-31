import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import RepetitionStart from "../../components/RepetitionComponents/RepetitionStart";
import About from "../../components/About";



export default function RepetitionPage() {
    const navigate= useNavigate();
    return (
        <MainLayout>
            <nav>
                <Link to="about">About</Link>
            </nav>
            <Outlet />
        </MainLayout>
    );
}

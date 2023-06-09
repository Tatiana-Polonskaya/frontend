import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";




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

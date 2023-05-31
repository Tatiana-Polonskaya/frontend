import { Link, Outlet, Route, Routes } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Rep from "../../components/Rep";
import About from "../../components/About";



export default function RepetitionPage() {
    return (
        <MainLayout>
            <nav>
                <Link to="about">About</Link>
            </nav>
            <Outlet />
        </MainLayout>
    );
}

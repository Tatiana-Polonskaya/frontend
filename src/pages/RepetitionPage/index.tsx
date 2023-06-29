
import { Outlet } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";


import { Link, Outlet } from "react-router-dom";

export default function RepetitionPage() {

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}


import { Outlet } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

export default function RepetitionPage() {

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}

import MainLayout from "../../layouts/MainLayout";
import { Outlet } from "react-router-dom";


export default function SettingsPage() {

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}

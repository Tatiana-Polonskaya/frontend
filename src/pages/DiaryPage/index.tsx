import MainLayout from "../../layouts/MainLayout";
import { Outlet } from "react-router";

export default function DiaryPage() {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}

import { useAppSelector } from "../../hooks/redux";
import MainLayout from "../../layouts/MainLayout";
import { Outlet } from "react-router-dom";
import { useGetUserAvatarQuery } from "../../store/api/user";
import { useEffect } from "react";

export default function SettingsPage() {

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}

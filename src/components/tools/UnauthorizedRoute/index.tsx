import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";

export default function UnauthorizedRoute() {
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const location = useLocation();

    return accessToken ? (
        <Navigate to="/" state={{ from: location }} replace />
    ) : (
        <Outlet />
    );
}

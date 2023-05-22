import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../../../store/api/user";

export default function AuthorizedRoute() {
    const location = useLocation();

    const { isLoading, isFetching, data } = useGetMeQuery(null, {
        skip: false,
        refetchOnMountOrArgChange: true,
    });

    if (isLoading || isFetching) {
        return <>require user</>; // some loading splashscreen
    }

    return data ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}

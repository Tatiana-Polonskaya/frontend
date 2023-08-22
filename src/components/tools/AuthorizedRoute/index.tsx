import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../../../store/api/user";
import RoutesEnum from "../../../models/routes";
import UserStatus from "../../../models/userStatus";
import "./style.scss";

export default function AuthorizedRoute() {
    const location = useLocation();

    const { isLoading, isFetching, data } = useGetMeQuery(null, {
        skip: false,
        refetchOnMountOrArgChange: true,
    });

    if (isLoading || isFetching) {
        return (
            <>
                {" "}
                <svg className="spinner" viewBox="0 0 50 50">
                    <circle
                        className="path"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth="5"
                    ></circle>
                </svg>
                {/* require user */}
            </>
        ); // some loading splashscreen
    }

    // if (data!.data!.status === UserStatus.NO_QUESTIONNAIRE) {
    //     return (<Navigate to={RoutesEnum.SURVEY} state={{ from: location }} replace />);
    // }else{

    return data ? (
        <Outlet />
    ) : (
        <Navigate to={RoutesEnum.LOGIN} state={{ from: location }} replace />
    );
    //
    // }
}

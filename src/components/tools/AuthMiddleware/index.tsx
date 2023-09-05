import { FC, ReactElement } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { useGetMeQuery } from "../../../store/api/user";
import "./style.scss";
import LoaderLogo from "../../Loader";

type IAuthMiddleware = {
    children: ReactElement;
};

const AuthMiddleware: FC<IAuthMiddleware> = ({ children }) => {
    /// этот компонент используется для того, чтобы при каждом обновлении
    /// страницы дергать защищенный роут getMe и проверять, что токен не протух
    const { accessToken } = useAppSelector((state) => state.user);

    const { isLoading } = useGetMeQuery(null, {
        skip: !accessToken,
    });

    if (isLoading) {
        return (
            <>
                <div className="preloader">
                    <LoaderLogo />
                </div>
                {/* auth middleware */}
            </>
        ); /// some loading splashscreen
    }

    return children;
};

export default AuthMiddleware;

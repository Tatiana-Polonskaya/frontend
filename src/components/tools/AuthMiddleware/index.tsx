import { FC, ReactElement } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { useGetMeQuery } from "../../../store/api/user";
import "./style.scss";

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
                {/* auth middleware */}
            </>
        ); /// some loading splashscreen
    }

    return children;
};

export default AuthMiddleware;

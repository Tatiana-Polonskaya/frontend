import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../../hooks/redux";
import UserStatus from "../../../models/userStatus";
import RoutesEnum from "../../../models/routes";

export default function QuestionnaireRoute() {
    const status = useAppSelector((state) => state.profile.user.status);

    return status === UserStatus.NO_QUESTIONNAIRE ? (
        <Outlet />
    ) : (
        <Navigate to={RoutesEnum.HOME} />
    );
}

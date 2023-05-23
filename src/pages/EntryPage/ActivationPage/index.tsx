import { ReactSVG } from "react-svg";
import EntryLayout from "../../../layouts/EntryLayout";
import FinishPersonal from "../RegisterPage/FinishPersonal";
import RegisterPersonalImg from "../RegisterPage/assets/reg-image-personal.svg";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { useConfirmQuery } from "../../../store/api/register";
import RegisterErrorPage from "../RegisterPage/ErrorPage";
import RoutesEnum from "../../../models/routes";

export default function ActivationPage() {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const token = searchParams.get("token");

    const response = useConfirmQuery(token!, { skip: !token });

    return (
        <EntryLayout image={<ReactSVG src={RegisterPersonalImg} />}>
            {token ? (
                response.data?.success ? (
                    <FinishPersonal />
                ) : (
                    <RegisterErrorPage />
                )
            ) : (
                <Navigate to={RoutesEnum.LOGIN} />
            )}
        </EntryLayout>
    );
}

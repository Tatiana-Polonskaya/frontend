import { ReactSVG } from "react-svg";
import EntryLayout from "../../../layouts/EntryLayout";
import ActivationPageSuccess from "./-Success";
import RegisterPersonalImg from "../RegisterPage/assets/reg-image-personal.svg";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { useConfirmQuery } from "../../../store/api/register";
import ActivationErrorPage from "./-Error";
import RoutesEnum from "../../../models/routes";

export default function ActivationPage() {
    const [searchParams, _] = useSearchParams();
    const token = searchParams.get("token");

    const response = useConfirmQuery(token!, { skip: !token });

    return (
        <EntryLayout image={<ReactSVG src={RegisterPersonalImg} />}>
            {token ? (
                response.data?.success ? (
                    <ActivationPageSuccess />
                ) : (
                    <ActivationErrorPage />
                )
            ) : (
                <Navigate to={RoutesEnum.LOGIN} />
            )}
        </EntryLayout>
    );
}

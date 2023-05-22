import { ReactSVG } from "react-svg";
import EntryLayout from "../../../layouts/EntryLayout";
import FinishPersonal from "../RegisterPage/FinishPersonal";
import RegisterPersonalImg from "../RegisterPage/assets/reg-image-personal.svg";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";

export default function ActivationPage() {
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();
    const token = searchParams.get("token");

    return (
        <EntryLayout image={<ReactSVG src={RegisterPersonalImg} />}>
            {token ? <FinishPersonal token={token} /> : <Navigate to="/" />}
        </EntryLayout>
    );
}

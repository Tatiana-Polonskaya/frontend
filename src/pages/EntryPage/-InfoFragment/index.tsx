import { cn } from "@bem-react/classname";

import "./style.scss";
import Link from "../../../components/ui-kit/Link";
import { useNavigate } from "react-router";
import RoutesEnum from "../../../models/routes";

const cnLoginFragment = cn("login-fragment");

interface InfoFragmentProps {
    phrase: string;
    subphrase: string;
}

export default function InfoFragment(props: InfoFragmentProps) {
    const navigate = useNavigate();
    return (
        <div className={cnLoginFragment()}>
            <p className={cnLoginFragment("phrase")}>{props.phrase}</p>
            <p className={cnLoginFragment("subphrase")}>{props.subphrase}</p>
            <Link
                className={cnLoginFragment("subphrase")}
                arrow="right"
                onClick={() => navigate(RoutesEnum.LANDING)}
            >
                Узнать подробнее о сервисе
            </Link>
        </div>
    );
}

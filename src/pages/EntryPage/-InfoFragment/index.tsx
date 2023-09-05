import { cn } from "@bem-react/classname";

import "./style.scss";
import Link from "../../../components/ui-kit/Link";


const cnLoginFragment = cn("login-fragment");

interface InfoFragmentProps {
    phrase: string;
    subphrase: string;
}

export default function InfoFragment(props: InfoFragmentProps) {

    return (
        <div className={cnLoginFragment()}>
            <p className={cnLoginFragment("phrase")}>{props.phrase}</p>
            <p className={cnLoginFragment("subphrase")}>{props.subphrase}</p>
            <div className={cnLoginFragment("block")}>
                <Link
                    className={cnLoginFragment("link")}
                    arrow="right"
                    href="/"
                    target="_blank"
                >
                    Узнать подробнее о сервисе
                </Link>
            </div>
        </div>
    );
}

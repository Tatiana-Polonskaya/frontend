import { cn } from "@bem-react/classname";

import "./style.scss";
import TextInput from "../../../components/ui-kit/TextInput";
import Button from "../../../components/ui-kit/Button";
import { UserType } from "../types";

const cnLoginFragment = cn("login-fragment");


interface InfoFragmentProps {
    phrase: string;
    subphrase: string;
}

export default function InfoFragment(props: InfoFragmentProps) {
    return (
        <>
            <p className={cnLoginFragment("phrase")}>{props.phrase}</p>
            <p className={cnLoginFragment("subphrase")}>{props.subphrase}</p>
        </>
    );
}

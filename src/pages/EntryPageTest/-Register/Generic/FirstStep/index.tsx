import { cn } from "@bem-react/classname";

import Button from "../../../../../components/ui-kit/Button";
import Link from "../../../../../components/ui-kit/Link";
import TextInput from "../../../../../components/ui-kit/TextInput";

import "./style.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cnFirstStep = cn("first-step");

type FirstStepProps = {
    phrase: string;
    subphrase: string;
};

export default function FirstStep(props: FirstStepProps) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    return (
        <section className={cnFirstStep()}>
            <div className={cnFirstStep("header")}>
                <span>Уже есть аккаунт?</span>
                <Link href="/?mode=login">Войти</Link>
            </div>
            <span className={cnFirstStep("phrase")}>{props.phrase}</span>
            <span className={cnFirstStep("subphrase")}>{props.subphrase}</span>
            <Link href="/" className={cnFirstStep("details-link")}>
                Узнать подробнее о сервисе ▶
            </Link>

            <div className={cnFirstStep("inputs")}>
                <TextInput
                    label="Имя"
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextInput
                    label="Фамилия"
                    placeholder="Введите фамилию"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextInput
                    label="Почта"
                    placeholder="Укажите почту"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <Button className={cnFirstStep("button")} disabled={!(name && lastName && email)}>Продолжить</Button>
            <span className={cnFirstStep("footer")}>
                Нажимая «продолжить», я соглашаюсь...
            </span>
        </section>
    );
}

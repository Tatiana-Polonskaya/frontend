import { cn } from "@bem-react/classname";
import Button from "../../../../components/ui-kit/Button";
import Link from "../../../../components/ui-kit/Link";
import TextInput from "../../../../components/ui-kit/TextInput";
import { RegisterStep } from "../../types";

import "./style.scss";
import { useContext, useState } from "react";
import { RegisterContext } from "..";
import DateInput from "../../../../components/ui-kit/DateInput";

const cnSecondaryInfoPersonal = cn("secondary-info-personal");

export default function SecondaryInfoPersonal({
    setStep,
}: {
    setStep: Function;
}) {
    const { primaryInfo } = useContext(RegisterContext);

    const [city, setCity] = useState("");
    const [birthday, setBirthday] = useState(new Date(2023, 5, 3));
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    return (
        <>
            <Link
                className={cnSecondaryInfoPersonal("back-link")}
                onClick={() => setStep(RegisterStep.PrimaryInfo)}
                arrow="left"
            >
                Вернуться
            </Link>
            <p className={cnSecondaryInfoPersonal("title")}>
                Приветствуем,{" "}
                <span
                    className={cnSecondaryInfoPersonal("title", { name: true })}
                >
                    {primaryInfo.name}
                </span>
                !
            </p>
            <div className={cnSecondaryInfoPersonal("inputs")}>
                <DateInput label="Дата рождения"/>
                <TextInput
                    label="Город"
                    placeholder="Введите свой город"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <TextInput
                    label="Пароль"
                    placeholder="Придумайте пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    password
                />
                <TextInput
                    label="Подтверждение пароля"
                    placeholder="Повторите пароль"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                    password
                />
            </div>
            <Button
                className={cnSecondaryInfoPersonal("next-button")}
                onClick={() => setStep(RegisterStep.EmailVerification)}
            >
                Продолжить
            </Button>
        </>
    );
}

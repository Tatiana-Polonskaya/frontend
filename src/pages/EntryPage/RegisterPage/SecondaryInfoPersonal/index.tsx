import { cn } from "@bem-react/classname";
import Button from "../../../../components/ui-kit/Button";
import Link from "../../../../components/ui-kit/Link";
import TextInput from "../../../../components/ui-kit/TextInput";
import { RegisterStep } from "../../types";

import "./style.scss";

const cnSecondaryInfoPersonal = cn("secondary-info-personal");

export default function SecondaryInfoPersonal({
    setStep,
}: {
    setStep: Function;
}) {
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
                    {"Anna"}
                </span>
                !
            </p>
            <div className={cnSecondaryInfoPersonal("inputs")}>
                <TextInput
                    label="Дата рождения"
                    placeholder="Поменять на другой инпут"
                />
                <TextInput label="Город" placeholder="Введите свой город" />
                <TextInput
                    label="Пароль"
                    placeholder="Придумайте пароль"
                    password
                />
                <TextInput
                    label="Подтверждение пароля"
                    placeholder="Повторите пароль"
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

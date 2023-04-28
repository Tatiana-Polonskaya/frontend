import { cn } from "@bem-react/classname";
import Button from "../../../../components/ui-kit/Button";
import TextInput from "../../../../components/ui-kit/TextInput";
import { RegisterStep } from "../../types";

import "./style.scss";
import Link from "../../../../components/ui-kit/Link";
import { useNavigate } from "react-router-dom";

const cnSecondaryInfoBusiness = cn("secondary-info-business");

export default function SecondaryInfoBusiness({
    setStep,
}: {
    setStep: Function;
}) {
    const navigate = useNavigate();
    return (
        <>
            <Link
                className={cnSecondaryInfoBusiness("back-link")}
                arrow="left"
                onClick={() => navigate(-1)}
            >
                Вернуться
            </Link>
            <p className={cnSecondaryInfoBusiness("title")}>
                Приветствуем,{" "}
                <span
                    className={cnSecondaryInfoBusiness("title", { name: true })}
                >
                    {"Anna"}
                </span>
                !
            </p>
            <p className={cnSecondaryInfoBusiness("subtitle")}>
                Завяка на корпоративное использование
            </p>
            <p className={cnSecondaryInfoBusiness("description")}>
                Пожалуйста, добавьте информацию о вашей компании. Не
                переживайте, мы запрашиваем её исключительно в целях
                безопасности.
            </p>
            <div className={cnSecondaryInfoBusiness("inputs")}>
                <TextInput
                    label="Название компании"
                    placeholder="Введите название"
                />
                <TextInput label="ИНН" placeholder="Введите ИНН" />
                <TextInput
                    label="Ваша должность"
                    placeholder="Укажите вашу должность"
                />
            </div>
            <Button
                className={cnSecondaryInfoBusiness("next-button")}
                onClick={() => setStep(RegisterStep.FinishRegister)}
            >
                Отправить заявку
            </Button>
        </>
    );
}

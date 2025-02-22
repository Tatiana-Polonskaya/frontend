import { cn } from "@bem-react/classname";
import { RegisterStep } from "../../../../models/entry";

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
    setCompanyName,
    setTIN,
    setWorkPosition,
} from "../../../../store/slices/register/business";
import { setStep } from "../../../../store/slices/entry";

import Button from "../../../../components/ui-kit/Button";
import Link from "../../../../components/ui-kit/Link";
import InputHeader from "../../../../components/ui-kit/InputHeader";
import Input from "../../../../components/ui-kit/Input";

import "./style.scss";

const cnSecondaryInfoBusiness = cn("secondary-info-business");

export default function SecondaryInfoBusiness() {
    const { name, companyName, TIN, workPosition } = useAppSelector(
        (state) => state.register.business
    );
    const dispatch = useAppDispatch();

    return (
        <>
            <Link
                className={cnSecondaryInfoBusiness("back-link")}
                arrow="left"
                onClick={() => dispatch(setStep(RegisterStep.PrimaryInfo))}
            >
                Вернуться
            </Link>
            <p className={cnSecondaryInfoBusiness("title")}>
                Приветствуем,{" "}
                <span
                    className={cnSecondaryInfoBusiness("title", { name: true })}
                >
                    {name}
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
                <label>
                    <InputHeader text="Название компании" />
                    <Input
                        placeholder="Введите название"
                        value={companyName}
                        onChange={(e) =>
                            dispatch(setCompanyName(e.target.value))
                        }
                    />
                </label>
                <label>
                    <InputHeader text="ИНН" />
                    <Input
                        placeholder="Введите ИНН"
                        value={TIN}
                        onChange={(e) => dispatch(setTIN(e.target.value))}
                    />
                </label>
                <label>
                    <InputHeader text="Ваша должность" />
                    <Input
                        placeholder="Укажите вашу должность"
                        value={workPosition}
                        onChange={(e) =>
                            dispatch(setWorkPosition(e.target.value))
                        }
                    />
                </label>
            </div>
            <Button
                className={cnSecondaryInfoBusiness("next-button")}
                // onClick={() => {
                //     setStep(RegisterStep.FinishRegister);
                // }}
            >
                Отправить заявку
            </Button>
        </>
    );
}

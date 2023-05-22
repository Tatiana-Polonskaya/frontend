import { cn } from "@bem-react/classname";

import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import Link from "../../../../components/ui-kit/Link";
import { useNavigate } from "react-router-dom";
import RoutesEnum from "../../../../models/routes";
import { setStep } from "../../../../store/slices/entry/register";
import { RegisterStep } from "../../../../models/entry";
import { resetPrimaryInfo } from "../../../../store/slices/entry/register/primaryInfo";
import { resetSecondaryInfoPersonal } from "../../../../store/slices/entry/register/secondaryInfo/personal";

const cnEmailVerification = cn("email-verification");

export default function EmailVerification() {
    const email = useAppSelector((state) => state.entry.register.primary.email);
    const dispatch = useAppDispatch();

    return (
        <>
            <Link
                arrow="left"
                className={cnEmailVerification("register-link")}
                onClick={() => {
                    dispatch(setStep(RegisterStep.PrimaryInfo));
                    dispatch(resetPrimaryInfo());
                    dispatch(resetSecondaryInfoPersonal());
                }}
            >
                Вернуться к началу регистрации
            </Link>
            <p className={cnEmailVerification("title")}>
                Мы отправили письмо со ссылкой для подтверждения регистрации
                аккаунта на <Link href={`mailto:${email}`}>{email}</Link>
            </p>
            <p className={cnEmailVerification("description")}>
                Пожалуйста, перейдите по ней, чтобы завершить регистрацию.
            </p>

            <p className={cnEmailVerification("resend-text")}>
                Не пришло письмо?
                <Link className={cnEmailVerification("resend-link")}>
                    Отправить еще раз
                </Link>
            </p>
            <Link arrow="right" className={cnEmailVerification("info-link")}>
                Изучить возможности сервиса
            </Link>
        </>
    );
}

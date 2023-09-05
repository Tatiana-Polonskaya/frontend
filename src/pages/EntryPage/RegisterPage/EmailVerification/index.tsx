import { cn } from "@bem-react/classname";

import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import Link from "../../../../components/ui-kit/Link";
import { useNavigate } from "react-router-dom";
import RoutesEnum from "../../../../models/routes";
import { setStep } from "../../../../store/slices/entry";
import { RegisterStep } from "../../../../models/entry";
import { clearPersonalRegister } from "../../../../store/slices/register/personal";
import { useResendEmailMutation } from "../../../../store/api/register";

const cnEmailVerification = cn("email-verification");

export default function EmailVerification() {
    const email = useAppSelector((state) => state.register.personal.email);
    const dispatch = useAppDispatch();
    const [request, response] = useResendEmailMutation();
    return (
        <div className={cnEmailVerification()}>
            <Link
                arrow="left"
                className={cnEmailVerification("register-link")}
                onClick={() => {
                    dispatch(setStep(RegisterStep.PrimaryInfo));
                    dispatch(clearPersonalRegister());
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
                <Link
                    className={cnEmailVerification("resend-link")}
                    onClick={() => request(email)}
                >
                    Отправить еще раз
                </Link>
            </p>
            <Link arrow="right" className={cnEmailVerification("info-link")}>
                Изучить возможности сервиса
            </Link>
        </div>
    );
}

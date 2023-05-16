import { cn } from "@bem-react/classname";

import "./style.scss";

const cnEmailVerification = cn("email-verification");

export default function EmailVerification() {
    return (
        <>
            <p className={cnEmailVerification("title")}>
                Мы отправили письмо со ссылкой для подтверждения регистрации
                аккаунта на указанный почтовый адрес
            </p>
            <p className={cnEmailVerification("description")}>
                Пожалуйста, перейдите по ней, чтобы завершить регистрацию.
            </p>
        </>
    );
}

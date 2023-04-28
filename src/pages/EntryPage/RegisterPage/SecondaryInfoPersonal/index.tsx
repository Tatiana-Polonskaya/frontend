import Button from "../../../../components/ui-kit/Button";
import Link from "../../../../components/ui-kit/Link";
import TextInput from "../../../../components/ui-kit/TextInput";
import { RegisterStep } from "../../types";

export default function SecondaryInfoPersonal({setStep}: {setStep: Function}) {
    return (
        <>
            <Link
                onClick={() => setStep(RegisterStep.PrimaryInfo)}
                arrow="left"
            >
                Вернуться
            </Link>
            <p>Приветствуем, {"Anna"}!</p>
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
            <Button onClick={() => setStep(RegisterStep.EmailVerification)}>
                Продолжить
            </Button>
        </>
    );
}

import Button from "../../../../components/ui-kit/Button";
import TextInput from "../../../../components/ui-kit/TextInput";
import { RegisterStep } from "../../types";

export default function SecondaryInfoBusiness({ setStep } : { setStep: Function }) {
    return (
        <>
            <p>Приветствуем, {"Anna"}!</p>
            <p>Завяка на корпоративное использование</p>
            <p>
                Пожалуйста, добавьте информацию о вашей компании. Не
                переживайте, мы запрашиваем её исключительно в целях
                безопасности.
            </p>

            <TextInput
                label="Название компании"
                placeholder="Введите название"
            />
            <TextInput label="ИНН" placeholder="Введите ИНН" />
            <TextInput
                label="Ваша должность"
                placeholder="Укажите вашу должность"
            />
            <Button onClick={() => setStep(RegisterStep.FinishRegister)}>
                Отправить заявку
            </Button>
        </>
    );
}

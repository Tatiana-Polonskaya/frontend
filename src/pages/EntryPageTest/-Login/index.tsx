import { GenericProps, UserType } from "..";
import Button from "../../../components/ui-kit/Button";
import TextInput from "../../../components/ui-kit/TextInput";

export default function LoginPage(props: GenericProps) {
    return (
        <div>
            <div>Еще нет аккаунта? Зарегистрироваться</div>
            <span>
                {props.userType === UserType.Personal ? (
                    <>Готовы всех поразить?</>
                ) : (
                    <>Путь к лучшему коллективу</>
                )}
            </span>
            <span>
                {props.userType === UserType.Personal ? (
                    <>Каждое ваше выступление может быть лучшим.</>
                ) : (
                    <>Поможем сделать правильный выбор.</>
                )}
            </span>
            <TextInput label="Логин" placeholder="+7 XXX XXX XX XX" />
            <TextInput label="Пароль" placeholder="Введите пароль" password />
            <Button>Продолжить</Button>
        </div>
    );
}

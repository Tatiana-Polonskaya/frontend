import { cn } from "@bem-react/classname";

import Button from "../../../components/ui-kit/Button";

import "./style.scss";

const cnEntryPagePersonal = cn("entry-page-personal");

export default function EntryPagePersonal() {
    return (
        <section className={cnEntryPagePersonal()}>
            <div className={cnEntryPagePersonal("header")}>
                <span>Уже есть аккаунт?</span>
                <a href="/">Войти</a>
            </div>
            <span className={cnEntryPagePersonal("phrase")}>Станьте успешнее и увереннее в себе</span>
            <span className={cnEntryPagePersonal("subphrase")}>
                Совершенствуйте навыки выступлений, репетируя наедине с собой
                без какого-либо смущения.
            </span>
            <a href="/">Узнать подробнее о сервисе ▶</a>

            <div className={cnEntryPagePersonal("labels")}>
                <label className={cnEntryPagePersonal("label")}>
                    <span>Имя</span>
                    <input type="text" placeholder="Введите имя" />
                </label>
                <label className={cnEntryPagePersonal("label")}>
                    <span>Фамилия</span>
                    <input type="text" placeholder="Введите фамилию" />
                </label>
                <label className={cnEntryPagePersonal("label")}>
                    <span>Почта</span>
                    <input type="text" placeholder="Введите почту" />
                </label>
                <Button>Продолжить</Button>
                <span className={cnEntryPagePersonal("footer")}>Нажимая «продолжить», я соглашаюсь...</span>
            </div>
        </section>
    );
}

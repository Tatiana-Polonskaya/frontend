import { cn } from "@bem-react/classname";

import Button from "../../../components/ui-kit/Button";
import Link from "../../../components/ui-kit/Link";
import TextInput from "../../../components/ui-kit/TextInput";

import "./style.scss";
import { useEffect, useState } from "react";

const cnEntryPagePersonal = cn("entry-page-personal");

export default function EntryPagePersonal() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    return (
        <section className={cnEntryPagePersonal()}>
            <div className={cnEntryPagePersonal("header")}>
                <span>Уже есть аккаунт?</span>
                <Link href="/">Войти</Link>
            </div>
            <span className={cnEntryPagePersonal("phrase")}>
                Станьте успешнее и увереннее в себе
            </span>
            <span className={cnEntryPagePersonal("subphrase")}>
                Совершенствуйте навыки выступлений, репетируя наедине с собой
                без какого-либо смущения.
            </span>
            <Link href="/" className={cnEntryPagePersonal("details-link")}>
                Узнать подробнее о сервисе ▶
            </Link>

            <div className={cnEntryPagePersonal("labels")}>
                <TextInput
                    label="Имя"
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextInput
                    label="Фамилия"
                    placeholder="Введите фамилию"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextInput
                    label="Почта"
                    placeholder="Укажите почту"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Button>Продолжить</Button>
                <span className={cnEntryPagePersonal("footer")}>
                    Нажимая «продолжить», я соглашаюсь...
                </span>
            </div>
        </section>
    );
}

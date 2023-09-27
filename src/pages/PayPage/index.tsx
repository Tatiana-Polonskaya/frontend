/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Button from "../../components/ui-kit/Button";
import { ForwardedInput } from "../../components/ui-kit/Input";
import InputHeader from "../../components/ui-kit/InputHeader";
import {
    useActionFormMutation,
    useGetUserTraiffQuery,
} from "../../store/api/tariff";
import { useNavigate } from "react-router";
import RoutesEnum from "../../models/routes";
import { cn } from "@bem-react/classname";

import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UUID } from "crypto";
import { IUser } from "../../models/entry/user";

export default function PayPage() {
    const navigate = useNavigate();
    const CN = cn("PayPage");

    const user: IUser = useAppSelector((state) => state.profile.user);
    const tariffUser = useAppSelector((state) => state.tariff);

    const tariff = useGetUserTraiffQuery();
    const [price, setPrice] = useState(0);
    const [idTariff, setIdTariff] = useState<string>();

    useEffect(() => {
        if (tariff.data && tariff.isSuccess && tariff.data.data) {
            setPrice(tariff.data.data[0].price);
            setIdTariff(tariff.data.data[0].id);
        }
    }, [tariff]);

    const emailRef = useRef<HTMLInputElement>(null);

    return (
        <form
            className={CN("container")}
            method="POST"
            action="https://speechup.server.paykeeper.ru/create/"
        >
            <span className={CN("text")}>Подтвердите данные перед оплатой</span>
            <div className={CN("block")}>
                <InputHeader
                    text="Почта"
                    wrong={false}
                    wrongText="почта неккоректна"
                />
                <ForwardedInput
                    type="email"
                    ref={emailRef}
                    name="client_email"
                    defaultValue={user.email}
                    readOnly
                />
            </div>
            <div className={CN("block")}>
                <InputHeader
                    text="Сумма"
                    wrong={false}
                    wrongText="Сумма неккоректна"
                />
                <ForwardedInput
                    name="sum"
                    type="number"
                    value={tariffUser.price}
                    readOnly
                />
            </div>
            <div className={CN("block")}>
                <input
                    type="submit"
                    value="Перейти к оплате"
                    className={CN("btn")}
                />
            </div>
        </form>
    );
}

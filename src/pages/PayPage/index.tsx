/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Button from "../../components/ui-kit/Button";
import { ForwardedInput } from "../../components/ui-kit/Input";
import InputHeader from "../../components/ui-kit/InputHeader";
import {
    useActionFormMutation,
    useGetUserTraiffQuery,
} from "../../store/api/tariff";

import { cn } from "@bem-react/classname";

import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UUID } from "crypto";
import { IUser } from "../../models/entry/user";
import type { SubmitHandler } from "react-hook-form";
import { Form, useForm } from "react-hook-form";

type Inputs = {
    client_email: string;
    orderid: string;
    sum: string;
    clientid: string;
};

type SendData = {
    sum: string;
    client_email: string;
    clientid: string;
    orderid: string;
    cart?: string;
    pstype?: string;
};

const formOptions = {
    client_email: { required: "Email is required" },
};

export default function PayPage() {
    const CN = cn("PayPage");

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        mode: "onChange",
    });

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
        <>
            <form
                method="POST"
                action="https://speechup.server.paykeeper.ru/create/"
                className={CN("container")}
            >
                <span className={CN("text")}>
                    Подтвердите данные перед оплатой
                </span>
                <div className={CN("block")}>
                    <InputHeader text="Номер заказа:" />
                    <input
                        {...register("orderid", { required: true })}
                        readOnly={true}
                        defaultValue={idTariff}
                    />
                </div>

                <div className={CN("block")}>
                    <InputHeader text="Адрес электронной почты" />
                    <input
                        {...register("client_email", formOptions.client_email)}
                        defaultValue={user.email}
                    />
                    <small className="text-danger">
                        {errors?.client_email && errors.client_email.message}
                    </small>
                </div>
                <div className={CN("block")}>
                    <InputHeader text="Сумма оплаты" />
                    <input
                        {...register("sum", { required: true })}
                        value={price}
                        type="text"
                        readOnly={true}
                    />
                </div>
                <input
                    {...register("clientid", { required: true })}
                    readOnly={true}
                    defaultValue={user.id}
                    hidden
                />
                <div className={CN("block")}>
                    <input
                        type="submit"
                        value="Перейти к оплате"
                        className={CN("btn")}
                    />
                </div>
            </form>
        </>
    );
}

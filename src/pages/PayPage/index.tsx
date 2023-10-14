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
import { ReactSVG } from "react-svg";
import icon from "./icon/payIcon.svg";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

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
        <div className={CN("background")}>
            <div className={CN()}>
                <form
                    method="POST"
                    action="https://speechup.server.paykeeper.ru/create/"
                    className={CN("container")}
                >
                    <span className={CN("text")}>Оплата</span>
                    <span className={CN("text2")}>
                        Для оплаты заказа, пожалуйста, подтвердите правильность
                        введенных личных данных.
                        <br />
                        При необходимости, отредактируйте.
                    </span>
                    <div className={CN("blockInputs")}>
                        <div className={CN("block")}>
                            {/*                             <InputHeader text="Номер заказа:" /> */}
                            <input
                                className={CN("input")}
                                {...register("orderid", { required: true })}
                                readOnly={true}
                                defaultValue={idTariff}
                                hidden
                            />
                        </div>
                        <div className={CN("block")}>
                            <InputHeader text="Адрес электронной почты" />
                            <input
                                className={CN("input")}
                                {...register(
                                    "client_email",
                                    formOptions.client_email
                                )}
                                defaultValue={user.email}
                            />
                            <small className="text-danger">
                                {errors?.client_email &&
                                    errors.client_email.message}
                            </small>
                        </div>
                        <div className={CN("block")}>
                            <InputHeader text="Сумма оплаты" />
                            <input
                                className={CN("input")}
                                style={{
                                    background: "#F0F6FF",
                                    color: "#7C8EB5",
                                }}
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
                    </div>
                    <ReactSVG src={icon} className={CN("Img")} />
                    <div className={CN("blockBtn")}>
                        <input
                            type="submit"
                            value="Назад"
                            className={CN("btnback")}
                            onClick={() => navigate(-1)}
                        />
                        <input
                            type="submit"
                            value="Перейти к оплате"
                            className={CN("btn")}
                        />
                    </div>
                </form>
                <span className={CN("textEnd")}>
                    Для возврата уплаченных денежных средств за услугу, которая
                    не соответствует заявленному описанию, изложенному на сайте,
                    необходимо отправить электронное письмо по адресу:
                    support@speechup.ru.
                    <br />
                    Возврат производится исключительно на ту же банковскую
                    карту, с которой была произведена оплата.
                </span>
            </div>
        </div>
    );
}

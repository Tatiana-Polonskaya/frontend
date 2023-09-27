import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@bem-react/classname";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import { useNavigate } from "react-router-dom";
import RoutesEnum from "../../../models/routes";

import "./style.scss";

import Link from "../../../components/ui-kit/Link";

import Button from "../../../components/ui-kit/Button";
import {
    useGetTraiffsQuery,
    useSendPaidTariffMutation,
    useSetTrialtariffMutation,
} from "../../../store/api/tariff";
import { ITariff } from "../../../models/tariff";

import { UUID } from "crypto";
import TarifCard from "../../../components/TarifCard";
import { updateTariffAnswers } from "../../../store/slices/tariff";

// TODO:  добавить обработку промокодов

export default function TarifPage() {
    const navigate = useNavigate();
    const cnTarif = cn("TarifPage");
    const dispatch = useAppDispatch();

    //* -------------------------------- GETTING TARIFFS --------------------------------  */

    const tariffs = useGetTraiffsQuery();
    const [basicTariffs, setBasicTariffs] = useState<ITariff[]>([]);

    useEffect(() => {
        if (tariffs.data && tariffs.data.data && tariffs.isSuccess) {
            setBasicTariffs(
                [...tariffs.data!.data].sort((x, y) => x.price - y.price)
            );
        }
    }, [tariffs]);

    //* -------------------------------- TARIFF SELECTION --------------------------------  */

    const [checkedTarif, setCheckedTarif] = useState("");

    const trialTariff = useMemo(() => {
        if (basicTariffs && basicTariffs.length > 0) {
            const trialElem = basicTariffs.filter((x) => x.price === 0);
            return trialElem.length > 0 ? trialElem[0].id : "";
        } else return "";
    }, [basicTariffs]);

    const clickOnCard = (id: string) => {
        setCheckedTarif(id);
    };

    //* -------------------------------- PROMO CODE --------------------------------  */

    const promocodeRef = useRef<HTMLInputElement>(null);
    const [isPromocodeValid, setPromocodeValid] = useState(true);

    //* -------------------------------- SENDING TARIFF --------------------------------  */

    const userId: UUID = useAppSelector((state) => state.profile.user.id);

    const [sendTrialtariffRequest, sendTrialtariffResponse] =
        useSetTrialtariffMutation();

    const { isSuccess, isError } = sendTrialtariffResponse;

    const [sendPaidTarifffRequest, sendPaidTariffResponse] =
        useSendPaidTariffMutation();

    const clickOnButton = async () => {
        if (checkedTarif !== "") {
            if (checkedTarif === trialTariff && trialTariff !== "") {
                await sendTrialtariffRequest(userId);
            } else {
                const priceCheckedTariff =
                    basicTariffs.length > 0
                        ? basicTariffs
                              ?.filter((x) => x.id == checkedTarif)
                              .at(0)?.price
                        : 0;

                await sendPaidTarifffRequest({
                    price: priceCheckedTariff ? priceCheckedTariff : 0,
                    user_id: userId,
                    tarif_id: checkedTarif,
                    key: "",
                });

                dispatch(
                    updateTariffAnswers({
                        id: checkedTarif,
                        price: priceCheckedTariff ? priceCheckedTariff : 0,
                    })
                );
            }
        }
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(RoutesEnum.HOME);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (sendPaidTariffResponse.isSuccess) {
            if (sendPaidTariffResponse.data.success) {
                navigate(RoutesEnum.PAY);
            } else {
                console.log(sendPaidTariffResponse);
            }
        }
    }, [sendPaidTariffResponse]);

    useEffect(() => {
        if (isError) {
            alert("Что-то пошло не так, попробуйте еще раз.");
        }
    }, [isError]);

    useEffect(() => {
        if (isError) {
            alert("Что-то пошло не так, попробуйте еще раз.");
        }
    }, [sendPaidTariffResponse.isError]);

    //* -------------------------------- CODE --------------------------------  */

    return (
        <div className={cnTarif()}>
            <div className={cnTarif("header")}>
                <div className={cnTarif("header-thanks")}>
                    Спасибо за ваши ответы!
                </div>
                Пора начинать подготовку!
                <div className={cnTarif("header-bold")}>
                    Выберите подходящий тариф и используйте все возможности
                    подготовки к выступлениям со Speech Up.
                </div>
                <Link arrow="right" className={cnTarif("header-link")}>
                    Узнать подробнее о сервисе
                </Link>
            </div>
            <div className={cnTarif("cards")}>
                {basicTariffs &&
                    basicTariffs.map((el, index) => (
                        <TarifCard
                            key={index}
                            {...el}
                            checked={checkedTarif === el.id}
                            onClick={() => clickOnCard(el.id)}
                        />
                    ))}
            </div>
            <div className={cnTarif("row")}>
                <div className={cnTarif("row-text")}>Промокод :</div>
                <div className={cnTarif("row-block")}>
                    <div className={cnTarif("row-block-content")}>
                        <input
                            type="text"
                            placeholder={"Введите промокод"}
                            className={cnTarif("row-block-input")}
                            maxLength={50}
                            onBlur={(e) =>
                                setPromocodeValid(e.target.checkValidity())
                            }
                            ref={promocodeRef}
                        />
                        {!isPromocodeValid && (
                            <span className={cnTarif("row-block-warning")}>
                                Такого промокода нет. Проверьте, всё ли верно,
                                или введите другой.
                            </span>
                        )}
                    </div>
                </div>

                <Button className={cnTarif("row-btn")}>Применить</Button>
            </div>
            <div className={cnTarif("footer")}>
                <button
                    className={cnTarif("footer-btn", {
                        canClicked: checkedTarif !== "",
                    })}
                    onClick={clickOnButton}
                >
                    {checkedTarif === trialTariff && checkedTarif !== ""
                        ? "Начать"
                        : "Оплатить"}
                </button>
                <span>
                    Обратите внимание, что при оплате выбранного тарифа, вы не
                    сможете прекратить его действие до использования всех
                    оплаченных попыток либо окончания указанного периода.
                </span>
            </div>
        </div>
    );
}

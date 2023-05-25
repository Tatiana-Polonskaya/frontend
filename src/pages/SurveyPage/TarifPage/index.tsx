import { useState } from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";
import firstTarifNotChecked from "./firstTarifNotChecked.png";
import firstTarifChecked from "./firstTarifChechedd.png";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import userSlice from "../../../store/slices/user";
import { IUser } from "../../../models/entry/user";
import { useNavigate } from "react-router-dom";
import RoutesEnum from "../../../models/routes";

export default function TarifPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [checkedTarif, setCheckedTarif] = useState(-1);

    const tarifs = [
        {
            id: 0,
            name: "Trial",
            money: 0,
            moneyInMonth: "неделя бесплатно",
        },
        {
            id: 1,
            name: "1 месяц",
            money: 790,
            moneyInMonth: "",
        },
        {
            id: 2,
            name: "3 месяца",
            money: 2190,
            moneyInMonth: "730 руб/мес",
        },
        {
            id: 3,
            name: "6 месяцев",
            money: 3990,
            moneyInMonth: "665 руб/мес",
        },
    ];
    let trialIndex = tarifs.filter((el) => el.name === "Trial")[0].id;

    const user = useAppSelector((state) => state.user.user?.id);

    const clickOnButton = () => {
        if (checkedTarif !== -1) {
            console.log("тариф выбран");

            // отправка выбранного тарифа на бэк
            // переход на сторонние сервисы и переход на главную страницу после оплаты

            if (checkedTarif === trialIndex) navigate(RoutesEnum.HOME);
        }
    };

    const clickOnCard = (id: number) => {
        setCheckedTarif(id);
    };

    const cnMain = cn("tarifPage");

    return (
        <div className={cnMain()}>
            <div className={cnMain("header")}>
                <div className={cnMain("header-thanks")}>
                    Спасибо за ваши ответы!
                </div>
                Пора начинать подготовку!
                <div className={cnMain("header-bold")}>
                    Выберите подходящий тариф и используйте все возможности
                    подготовки к выступлениям со Speech Up.
                </div>
                Первую неделю вы можете репетировать абсолютно бесплатно и без
                ограничений.
                <div className={cnMain("header-link")}>
                    Узнать подробнее о сервисе{" "}
                </div>
            </div>
            <div className={cnMain("cards")}>
                {tarifs.map((el, index) => (
                    <div key={index}>
                        {el.id === trialIndex && (
                            <div
                                key={el.id}
                                className={cnMain("cards-trial", {
                                    checked: checkedTarif === el.id,
                                })}
                                onClick={() => clickOnCard(el.id)}
                            >
                                <img
                                    className={cnMain("cards-trial-img")}
                                    src={
                                        checkedTarif === el.id
                                            ? firstTarifChecked
                                            : firstTarifNotChecked
                                    }
                                />
                            </div>
                        )}
                        {el.id !== trialIndex && (
                            <div
                                key={el.id}
                                className={cnMain("cards-tarif", {
                                    checked: checkedTarif === el.id,
                                })}
                                onClick={() => clickOnCard(el.id)}
                            >
                                <div className={cnMain("cards-tarif-period")}>
                                    {el.name}
                                </div>
                                {el.money !== 0 && (
                                    <div
                                        className={cnMain("cards-tarif-money")}
                                    >
                                        <span>{el.money}</span>
                                        <span
                                            className={cnMain(
                                                "cards-tarif-money-text"
                                            )}
                                        >
                                            рублей
                                        </span>
                                    </div>
                                )}

                                <div
                                    className={cnMain(
                                        "cards-tarif-money-for-period"
                                    )}
                                >
                                    {el.moneyInMonth && <>{el.moneyInMonth}</>}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className={cnMain("footer")}>
                <button
                    className={cnMain("footer-btn", {
                        canClicked: checkedTarif !== -1,
                    })}
                    onClick={clickOnButton}
                >
                    {checkedTarif === trialIndex ? "Начать" : "Оплатить"}
                </button>
                <span>
                    Обратите внимание, что при оплате выбранного тарифа, вы не
                    сможете прекратить его действие до окончания указанного
                    периода.
                </span>
            </div>
        </div>
    );
}

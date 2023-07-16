import { useState } from "react";
import { cn } from "@bem-react/classname";
import firstTarifNotChecked from "./firstTarifNotChecked.png";
import firstTarifChecked from "./firstTarifChechedd.png";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import { useNavigate } from "react-router-dom";
import RoutesEnum from "../../../models/routes";

import "./style.scss";

export default function TarifPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [checkedTarif, setCheckedTarif] = useState(-1);

    const tarifs = new Array(5).fill({
        id: 0,
        title: "Mini",
        count_rep: 5,
        money: 599,
        moneyForOneRep: "119,80 руб",
    }).map((el,i)=>{return {...el, id:el.id+i}});


    // console.log(tarifs)
    let trialIndex = tarifs.filter((el) => el.title === "Trial")[0] ? tarifs.filter((el) => el.title === "Trial")[0].id : -1;

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

    const cnTarif = cn("TarifPage");

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
                Первую неделю вы можете репетировать абсолютно бесплатно и без
                ограничений.
                <div className={cnTarif("header-link")}>
                    Узнать подробнее о сервисе{" "}
                </div>
            </div>
            <div className={cnTarif("cards")}>
                {tarifs.map((el, index) => (
                    <div key={index} className={cnTarif("cards-item")}>
                        {el.id === trialIndex && (
                            <div
                                key={el.id}
                                className={cnTarif("cards-trial", {
                                    checked: checkedTarif === el.id,
                                })}
                                onClick={() => clickOnCard(el.id)}
                            >
                                <img className={cnTarif("cards-trial-img")} src={firstTarifNotChecked}/>
                            </div>
                        )}
                        {el.id !== trialIndex && (
                            <div
                                key={el.id}
                                className={cnTarif("cards-tarif", {
                                    checked: checkedTarif === el.id,
                                })}
                                onClick={() => clickOnCard(el.id)}
                            >
                                <div className={cnTarif("cards-tarif-title")}>
                                    {el.title}
                                </div>
                                <div className={cnTarif("cards-tarif-counts")}>
                                    <span className={cnTarif("cards-tarif-counts-bold")}>{el.count_rep}</span>{" "+" репетиций"}
                                </div>
                                {el.money !== 0 && (
                                    <div
                                        className={cnTarif("cards-tarif-money")}
                                    >
                                        <span>{el.money}</span>
                                        <span
                                            className={cnTarif(
                                                "cards-tarif-money-text"
                                            )}
                                        >
                                            рублей
                                        </span>
                                    </div>
                                )}

                                <div
                                    className={cnTarif(
                                        "cards-tarif-money-for-period"
                                    )}
                                >
                                    {el.moneyForOneRep && <>{el.moneyForOneRep}</>}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className={cnTarif("footer")}>
                <button
                    className={cnTarif("footer-btn", {
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

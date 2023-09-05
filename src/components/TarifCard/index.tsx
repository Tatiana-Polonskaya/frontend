import { cn } from "@bem-react/classname";
import Background from "./assets/background.svg";
import BackgroundBlue from "./assets/backgroundBlue.svg";
import Cover from "./assets/cover.svg";
import Box from "./assets/box.svg";

import "./style.scss";
import { ReactSVG } from "react-svg";
import { addDaysToDate } from "../../@adapters/Time/convertDays";


function priceForOneRepetition(countRepetition: number, price: number): string {
    return (price / countRepetition).toFixed(2).replace(".", ",");
}

type Props = {
    title: string;
    price: number;
    duration: number;
    loads_limit: number;
    checked: boolean;
    onClick: Function;
};

export default function TarifCard(props: Props) {
    const cnCard = cn("TarifCard");
    const isTrial = props.price === 0;

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    };

    const now = new Date();
    const nowString = now.toLocaleDateString("ru", options);

    return (
        <div
            className={cnCard({
                checked: props.checked,
            })}
        >
            {isTrial && (
                <div
                    className={cnCard("trial")}
                    onClick={() => props.onClick()}
                    style={{
                        backgroundImage: `url(${
                            !props.checked ? Background : BackgroundBlue
                        })`,
                    }}
                >
                    <div className={cnCard("title")}>{props.title}</div>
                    <ReactSVG src={Cover} />
                    <div className={cnCard("trial-desc")}>
                        {"бесплатная репетиция"}
                    </div>
                    <ReactSVG src={Box} />
                </div>
            )}
            {!isTrial && (
                <div
                    className={cnCard("tarif")}
                    onClick={() => props.onClick()}
                >
                    <div className={cnCard("title")}>{props.title}</div>
                    {props.loads_limit > 0 ? (
                        <div className={cnCard("tarif-counts")}>
                            <div className={cnCard("tarif-counts-text-bold")}>
                                {props.loads_limit}
                            </div>
                            <div className={cnCard("tarif-counts-text")}>
                                {" репетиций"}
                            </div>
                        </div>
                    ) : (
                        <div className={cnCard("tarif-counts-col")}>
                            <div className={cnCard("tarif-counts-text-bold")}>
                                {"Месячный"}
                            </div>
                            <div className={cnCard("tarif-counts-text")}>
                                {" безлимит"}
                            </div>
                        </div>
                    )}

                    <div className={cnCard("tarif-money")}>
                        <div className={cnCard("tarif-money-bold")}>
                            {props.price}
                        </div>
                        <div className={cnCard("tarif-money-text")}>
                            {"рублей"}
                        </div>
                    </div>

                    <div className={cnCard("tarif-money-period")}>
                        {props.duration === 0 ? (
                            <>
                                <div
                                    className={cnCard(
                                        "tarif-money-period-text",
                                    )}
                                >
                                    {" "}
                                    {"одна репетиция"}
                                </div>
                                <div
                                    className={cnCard(
                                        "tarif-money-period-text-bold",
                                    )}
                                >
                                    {priceForOneRepetition(
                                        props.loads_limit,
                                        props.price,
                                    ) + " руб"}
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className={cnCard(
                                        "tarif-money-period-text",
                                    )}
                                >
                                    {"с "}
                                    {nowString}
                                </div>
                                <div
                                    className={cnCard(
                                        "tarif-money-period-text",
                                    )}
                                >
                                    {"до "}
                                    {addDaysToDate(
                                        props.duration,
                                    ).toLocaleDateString("ru", options)}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

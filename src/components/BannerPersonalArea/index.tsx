import React from "react";
import { cn } from "@bem-react/classname";
import Img from "./img/картинка.svg";
import { ReactSVG } from "react-svg";
import arrow_down from "./img/arrow-down.svg";
import "./style.scss";

const CN = cn("BannerPersonalAreaBlock");

type Props = {
    tariff: string;
    countRep?: number;
    data?: string;
};
export default function BannerPersonalArea(props: Props) {
    let inf = "";
    if (props.countRep == null) {
        inf = "Действует до" + props.data;
    } else {
        inf = "Осталось " + props.countRep + " репетиций";
    }

    return (
        <>
            <div className={CN()}>
                <div className={CN("imgText")}>
                    <div className={CN("image")}>
                        <div className={CN("circle")}>
                            <ReactSVG src={Img} />
                        </div>
                    </div>
                    <div className={CN("text")}>
                        <div className={CN("textTariff")}>Текущий тариф</div>
                        <div className={CN("tariff")}>{props.tariff}</div>
                        <div className={CN("inf")}>{inf}</div>
                    </div>
                </div>
                <button className={CN("btn")}>
                    <div className={CN("textBtn")}>Пополнить</div>
                    <ReactSVG src={arrow_down} />
                </button>
            </div>
        </>
    );
}

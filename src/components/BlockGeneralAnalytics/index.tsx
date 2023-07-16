import React from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import Speaker from "./img/оратор.svg";
import Chrysostom from "./img/слиток.svg";
import Talker from "./img/говорун.svg";
import Thorough from "./img/облако.svg";
import Eloquent from "./img/облако (1).svg";
import Serial from "./img/следы.svg";

const CN = cn("blockGeneralAnalytics");

type Props = {
    rank: string;
    previous_rank: string;
    text: string;
};

// TO DO: добавить такую же функцию для поиска картинки для переданного существительного
function checkRank(adjective: string) {
    if ([`последовательный`, `информативный`, `закономерный`].includes(adjective))
    {
        return Serial;
    } else if ([`оригинальный`, `обоснованный`, `логичный`].includes(adjective))
    {
        return Thorough;
    } else if ([`доходчивый`, `продуманный`, `уверенный`].includes(adjective))
    {
        return Eloquent;
    } else
    {
        return "";
    }
}

function checkAdjective(adjective:string){
    if ([`оратор`].includes(adjective))
    {
        return Speaker;
    } else if ([`златоуст`].includes(adjective))
    {
        return Chrysostom;
    } else if ([`говорун`].includes(adjective))
    {
        return Talker;
    } else
    {
        return "";
    }
}

export default function BlockGeneralAnalytics(props: Props) {
    
    const rank_words = props.rank
        .split(" ")
        .map((el) => el.toLocaleLowerCase());

    const image_for_adjective = checkRank(rank_words[0]);
    const image_for_noun = checkAdjective(rank_words[1]);

    return (
        <>
            <div className={CN()}>
                <div className={CN("text")}>
                    <div className={CN("rank")}>Текущее звание</div>
                    <div className={CN("degree")}>{props.rank}</div>
                    <div className={CN("previous")}>
                        Предыдущее: {props.previous_rank}
                    </div>
                    <div className={"tagline"}>{props.text}</div>
                </div>
                <div className={CN("img")}>
                    {image_for_adjective && (
                        <ReactSVG src={image_for_adjective} />
                    )}
                    {image_for_noun && (
                        <ReactSVG src={image_for_noun} />
                    )}
                </div>
            </div>
        </>
    );
}

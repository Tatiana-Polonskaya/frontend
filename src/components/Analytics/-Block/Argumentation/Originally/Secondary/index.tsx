/* eslint-disable jsx-a11y/anchor-is-valid */
import { cn } from "@bem-react/classname";

import "./style.scss";

import { IСitation } from "../../../models/ICitation";
import { convertTime } from "../../../../helpers";

type Props = {
    breakdown: IBreakdown[];
    state: string;
};

interface IBreakdown {
    seq_number: number;
    time_start: string;
    text: string;
    value: number;
    link: string;
    allocated: string;
}

const cnBreakdown = cn("breakdown_block");
const cnCitation = cn("citation");

type propsCitation = {
    typeCitation: IСitation[];
};
let citations: propsCitation = {
    typeCitation: [
        {
            type: "заимствования",
            color: "linear-gradient(32.08deg, #2477F4 0%, #3A86FA 100%)",
        },
        {
            type: "цитирование",
            color: "linear-gradient(45deg, #FFB800 0%, #FF9900 100%)",
        },
        {
            type: "самоцитирование",
            color: "linear-gradient(45deg, #8540FD 0%, #AF1FF2 100%)",
        },
    ],
};

export default function SecondaryOriginally(props: Props) {
    function determ(el: IBreakdown, str: string, s: string) {
        if (str.includes(s) && s.length > 0) {
            let t = str.split(s);
            return (
                <>
                    {t[0]}
                    {/* нужно подкинуть класс на ссылку */}
                    <a href={el.link} className="link">
                        {s}
                    </a>
                    {t[1]}
                </>
            );
        } else {
            return str;
        }
    }

    return (
        <>
            <div className={cnCitation()}>
                {citations.typeCitation.map((el, index) => (
                    <div key={index} className={cnCitation("marker")}>
                        <div style={{ background: el.color }}></div>
                        <div className={cnCitation("title")}>{el.type}</div>
                    </div>
                ))}
            </div>
            <div className={cnBreakdown()}>
                {props.breakdown?.map((el: IBreakdown, index: number) => (
                    <div key={index} className={cnCitation("item")}>
                        <div
                            className={cnCitation(
                                "time",
                                cnCitation(
                                    `${
                                        el.value === 1
                                            ? "borrowing"
                                            : el.value === 2
                                            ? "citation"
                                            : el.value === 3
                                            ? "selfCitation"
                                            : "original"
                                    }`
                                )
                            )}
                        >
                            {el.time_start}
                        </div>
                        <div
                            className={`${cnCitation(
                                "description"
                            )} ${cnCitation(
                                `${
                                    el.value === 1
                                        ? "borrowing"
                                        : el.value === 2
                                        ? "citation"
                                        : el.value === 3
                                        ? "selfCitation"
                                        : "original"
                                }`
                            )}_text`}
                        >
                            {/* подкинуть строку для сравнения el.modification.str */}
                            {determ(el, el.text, el.allocated)}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

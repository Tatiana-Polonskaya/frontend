/* eslint-disable jsx-a11y/anchor-is-valid */
import { cn } from "@bem-react/classname";

import "./style.scss";

import GraphColor from "../../../../../../models/graph/_colors";
import { VideoTimeContext } from "../../../../../Context/helpers";
import { useContext } from "react";
import convertSecondsIntoTime from "../../../../../../@adapters/Time/convertSeconds";

type Props = {
    breakdown: IBreakdown[];
    state: string;
};

interface IBreakdown {
    seq_number: number;
    time_start: string;
    text: string;
    value: Priority;
}
type Priority = {
    "0": string[];
    "1": string[];
    "2": string[];
};
interface IDefeat {
    type: string;
    color: string;
}

const cnBreakdown = cn("breakdown_block");
const cnDefeat = cn("defeat");

type propsDefeat = {
    typeDefeat: IDefeat[];
};
let citations: propsDefeat = {
    typeDefeat: [
        {
            type: "слова-паразиты",
            color: "linear-gradient(32.08deg, #2477F4 0%, #3A86FA 100%)",
        },
        {
            type: "когнитивные икажения",
            color: "linear-gradient(45deg, #FFB800 0%, #FF9900 100%)",
        },
        {
            type: "агрессивность",
            color: "linear-gradient(45deg, #E23339 0%, #F35B60 100%)",
        },
    ],
};

type Param = {
    type: string[];
    color: string[];
    description: string[];
};
export default function SecondaryDefeat(props: Props) {
    const { setCurrentTime } = useContext(VideoTimeContext);

    const choiseBlock = (event: React.MouseEvent<HTMLDivElement>) => {
        const dataValue = +event.currentTarget.dataset.time! as number;
        if (dataValue || dataValue === 0) {
            setCurrentTime(dataValue);
        }
    };

    function determ(str: string, arrS: Priority, index: number) {
        let arrParam: Param[] = [];
        let strArr = str.split(" ");
        const copyStrArr = strArr.map((el) => el.toLowerCase());

        strArr.forEach((el) => {
            arrParam.push({
                type: [],
                color: [],
                description: [],
            });
        });

        Object.entries(arrS).forEach((e) => {
            e[1].forEach((subStr) => {
                subStr = subStr.trim();

                // сюда надо вставить перебор по массиву входящих
                if (!subStr.includes(" ")) {
                    let sexIndex =
                        copyStrArr.indexOf(`${subStr}.`.toLowerCase()) !== -1
                            ? copyStrArr.indexOf(`${subStr}.`.toLowerCase())
                            : copyStrArr.indexOf(`${subStr},`.toLowerCase()) !==
                              -1
                            ? copyStrArr.indexOf(`${subStr},`.toLowerCase())
                            : copyStrArr.indexOf(subStr.toLowerCase()) !== -1
                            ? copyStrArr.indexOf(subStr.toLowerCase())
                            : -1;

                    if (sexIndex !== -1) {
                        arrParam[sexIndex].type.push(
                            e[0] === "0"
                                ? "filler"
                                : e[0] === "1"
                                ? "cognitive"
                                : e[0] === "2"
                                ? "agression"
                                : "original"
                        );
                        arrParam[sexIndex].color.push(
                            e[0] === "0"
                                ? GraphColor.BLUE
                                : e[0] === "1"
                                ? GraphColor.ORANGE
                                : e[0] === "2"
                                ? GraphColor.RED
                                : GraphColor.DARKGRAY
                        );
                        if (
                            !arrParam[sexIndex].description.includes(
                                "слова-паразиты"
                            ) &&
                            e[0] === "0"
                        ) {
                            arrParam[sexIndex].description.push(
                                "слова-паразиты"
                            );
                        } else if (
                            !arrParam[sexIndex].description.includes(
                                "когнитивные искажения"
                            ) &&
                            e[0] === "1"
                        ) {
                            arrParam[sexIndex].description.push(
                                "когнитивные искажения"
                            );
                        } else if (
                            !arrParam[sexIndex].description.includes(
                                "агрессивность"
                            ) &&
                            e[0] === "2"
                        ) {
                            arrParam[sexIndex].description.push(
                                "агрессивность"
                            );
                        }
                    }
                } else if (subStr.includes(" ")) {
                    // если подстрока
                    let subStrArr = subStr.split(" ");
                    const copySubStrArr = subStrArr.map((el) =>
                        el.toLowerCase()
                    );
                    for (let i = 0; i < copyStrArr.length; i++) {
                        let flag: boolean = false;
                        for (let j = 0; j < copySubStrArr.length; j++) {
                            if (j === copySubStrArr.length - 1) {
                            }
                            if (
                                (j === copySubStrArr.length - 1 &&
                                    copyStrArr[i + j] === copySubStrArr[j]) ||
                                (j === copySubStrArr.length - 1 &&
                                    copyStrArr[i + j] ===
                                        `${copySubStrArr[j]},`) ||
                                (j === copySubStrArr.length - 1 &&
                                    copyStrArr[i + j] ===
                                        `${copySubStrArr[j]}.`)
                            ) {
                                flag = !flag;
                                break;
                            } else if (copyStrArr[i + j] !== copySubStrArr[j]) {
                                break;
                            }
                        }
                        if (flag) {
                            for (let k = 0; k < copySubStrArr.length; k++) {
                                arrParam[i + k].type.push(
                                    e[0] === "0"
                                        ? "filler"
                                        : e[0] === "1"
                                        ? "cognitive"
                                        : e[0] === "2"
                                        ? "agression"
                                        : "original"
                                );
                                arrParam[i + k].color.push(
                                    e[0] === "0"
                                        ? GraphColor.BLUE
                                        : e[0] === "1"
                                        ? GraphColor.ORANGE
                                        : e[0] === "2"
                                        ? GraphColor.RED
                                        : GraphColor.DARKGRAY
                                );
                                if (
                                    !arrParam[i + k].description.includes(
                                        "слова-паразиты"
                                    ) &&
                                    e[0] === "0"
                                ) {
                                    arrParam[i + k].description.push(
                                        "слова-паразиты"
                                    );
                                } else if (
                                    !arrParam[i + k].description.includes(
                                        "когнитивные искажения"
                                    ) &&
                                    e[0] === "1"
                                ) {
                                    arrParam[i + k].description.push(
                                        "когнитивные искажения"
                                    );
                                } else if (
                                    !arrParam[i + k].description.includes(
                                        "агрессивность"
                                    ) &&
                                    e[0] === "2"
                                ) {
                                    arrParam[i + k].description.push(
                                        "агрессивность"
                                    );
                                }
                            }
                        }
                    }
                }
            });
        });

        return (
            <div className={cnDefeat("description")}>
                {arrParam.map((el, ind) => (
                    <span key={ind} className={`${cnDefeat(el.type[0])}_text`}>
                        {` ${strArr[ind]}`}
                        {el.description.length !== 0 ? (
                            <div
                                className={cnDefeat("help-content")}
                                style={{
                                    borderColor: el.color[0],
                                    top:
                                        index === props.breakdown?.length - 1
                                            ? "-40px"
                                            : "20px",
                                    left: "0px",
                                }}
                            >
                                {el.description.join(" ")}
                            </div>
                        ) : (
                            <></>
                        )}
                    </span>
                ))}
            </div>
        );
    }

    return (
        <>
            <div className={cnDefeat()}>
                <p className={cnDefeat("descript")}>
                    <span>
                        {"Нарушением  "}
                        <b className={cnDefeat("descript-bold")}>
                            {"коммуникативной нормы"}
                        </b>{" "}
                        {
                            "является наличие в речи не несущих смысла слов-паразитов, систематических ошибок (отклонений) в мышлении (когнитивных искажений), признаков агрессивного поведения."
                        }
                    </span>
                </p>
                <div className={cnDefeat("marker-list")}>
                    {citations.typeDefeat.map((el, index) => (
                        <div key={index} className={cnDefeat("marker")}>
                            <div style={{ background: el.color }}></div>
                            <div className={cnDefeat("title")}>{el.type}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cnBreakdown()}>
                {props.breakdown?.map((el, index) => (
                    <div
                        key={index}
                        className={cnDefeat("item")}
                        onClick={choiseBlock}
                        data-time={el.time_start}
                    >
                        <div
                            className={cnDefeat(
                                "time",
                                cnDefeat(
                                    `${
                                        el.value[0].length !== 0
                                            ? "filler"
                                            : el.value[1].length !== 0
                                            ? "cognitive"
                                            : el.value[2].length !== 0
                                            ? "agression"
                                            : "original"
                                    }`
                                )
                            )}
                        >
                            {convertSecondsIntoTime(Number(el.time_start))}
                        </div>
                        {determ(el.text, el.value, index)}
                    </div>
                ))}
            </div>
        </>
    );
}

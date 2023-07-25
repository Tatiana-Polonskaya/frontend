/* eslint-disable react-hooks/rules-of-hooks */
import ProgressBar from "../../Graphs/Progressbar";
import { cn } from "@bem-react/classname";

import Speedometer, {
    Background,
    Arc,
    Needle,
    Progress,
} from "react-speedometer";

import "./style.scss";

import mirco from "../assets/mircophon.svg";
import legend from "../assets/legend.svg";
import face from "../assets/face.svg";
import talant from "../assets/talant.svg";
import speaker from "../assets/speaker.svg";

import noteSvg from "../assets/note.svg";

import { ReactSVG } from "react-svg";

import { getTotalResult, getTotalTitle } from "../helpers";
import convertTotalData from "../../../@adapters/Graphs/total";
import { useGetTotalByIdQuery } from "../../../store/api/report";
import { useEffect, useState } from "react";
import { TotalDataItem, TotalType } from "../../../models/graph/total";
import { useGetTotalByIdTestQuery } from "../../../store/api/reportTest";

function getPictureByConclussion(conclussion: string) {
    switch (conclussion) {
        case "Новичок на сцене":
            return face;
        case "Постепенно преодолевающий себя оратор":
            return mirco;
        case "Растущий талант выступлений":
            return talant;
        case "Уверенный спикер":
            return speaker;
        case "Легенда выступлений":
            return legend;
        default:
            return mirco;
    }
}

const DECIMAL = 2;
type Props = {
    idVideo: string;
};

export default function CommonAnalitics(props: Props) {
    const cnCommon = cn("CommonAnalitics");

    const { data } =
        props.idVideo === "89dd1171-d9e9-4d65-9730-4a36596a0e84"
            ? useGetTotalByIdTestQuery(props.idVideo)
            : useGetTotalByIdQuery(props.idVideo);

    const [speedArr, setSpeedArr] = useState<TotalType[]>();
    const [allValues, setAllValues] = useState<TotalDataItem>();

    useEffect(() => {
        if (data) {
            console.log("CommonAnalitics",data!.data!.values)
            setSpeedArr(convertTotalData(data!.data!.values));
            setAllValues(data!.data!.values);
        }
    }, [data]);

    return (
        <div className={cnCommon("col")}>
            <div className={cnCommon("row")}>
                <span className={cnCommon("title")}>
                    <ReactSVG
                        src={noteSvg}
                        className={cnCommon("title-icon")}
                    />
                    Общая аналитика
                </span>
            </div>
            <div className={cnCommon("row-justify")}>
                <div>
                    {allValues && (
                        <ReactSVG
                            src={getPictureByConclussion(
                                allValues.big_conclussion
                            )}
                        />
                    )}
                </div>
                <div className={cnCommon("col-grow")}>
                    <span className={cnCommon("blue-bold")}>
                        {allValues && allValues.big_conclussion}
                    </span>
                    <span className={cnCommon("gray-txt")}>
                        {allValues && allValues.conclussion}
                    </span>
                </div>
                <div className={cnCommon("common-result")}>
                    <span className={cnCommon("common-result-title")}>
                        Общий результат:
                    </span>
                    <span className={cnCommon("common-result-value")}>{`${
                        allValues ? allValues.total_result.toFixed(DECIMAL) : 0
                    }%`}</span>
                </div>
            </div>
            <div className={cnCommon("row")}>
                <ProgressBar
                    bgcolor={"#2477F4"}
                    completed={allValues ? allValues.total_result : 0}
                />
            </div>
            <div className={cnCommon("panel")}>
                {speedArr &&
                    allValues &&
                    speedArr.map((element, ind) => (
                        <div key={ind} className={cnCommon("item")}>
                            <Speedometer
                                value={allValues[element]}
                                width={165}
                                height={110}
                                // height={165}
                                min={0}
                                max={100}
                                angle={180}
                            >
                                {/* фон */}
                                <Background angle={180} color="#FFF" />
                                {/* шкала от 0 до последнего значение */}
                                <Arc
                                    color={"#D9E0EF"}
                                    opacity={1}
                                    arcWidth={25}
                                    // lineCap={}
                                />
                                {/* шкала заполнения */}
                                <Progress
                                    color={
                                        getTotalResult(allValues[element])[0]
                                    }
                                    arcWidth={25}
                                />
                                <svg width="230" height="165">
                                    <line
                                        x1="142"
                                        y1="0"
                                        x2="82.5"
                                        y2="82.5"
                                        stroke="#FFF"
                                        strokeWidth="1"
                                    />
                                    <line
                                        x1="165"
                                        y1="56"
                                        x2="82.5"
                                        y2="82.5"
                                        stroke="#FFF"
                                        strokeWidth="1"
                                    />
                                    <line
                                        x1="165"
                                        y1="109"
                                        x2="82.5"
                                        y2="82.5"
                                        stroke="#FFF"
                                        strokeWidth="1"
                                    />
                                    <line
                                        x1="142"
                                        y1="165"
                                        x2="82.5"
                                        y2="82.5"
                                        stroke="#FFF"
                                        strokeWidth="1"
                                    />
                                    {/* стрелка */}
                                    <Needle
                                        offset={35}
                                        baseWidth={12}
                                        // baseOffset={-30}
                                        baseOffset={0}
                                        color={"#7C8EB5"}
                                        circleRadius={0}
                                    />
                                </svg>
                            </Speedometer>
                            <div className={cnCommon("icon")}>
                                <ReactSVG
                                    src={getTotalResult(allValues[element])[1]}
                                />
                            </div>
                            <div className={cnCommon("smile-title")}>
                                {getTotalTitle(element)}
                            </div>
                            <div
                                className={cnCommon("percent")}
                                style={{
                                    color: getTotalResult(
                                        allValues[element]
                                    )[0],
                                }}
                            >{`${allValues ? allValues[element].toFixed(2) : 0}%`}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

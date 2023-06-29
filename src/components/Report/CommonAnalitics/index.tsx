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
import noteSvg from "../assets/note.svg";

import { ReactSVG } from "react-svg";

import { getTotalResult, getTotalTitle } from "../helpers";
import convertTotalData from "../../../@adapters/Graphs/total";
import { useGetTotalByIdQuery } from "../../../store/api/report";
import { useEffect, useState } from "react";
import { TotalDataItem, TotalType } from "../../../models/graph/total";

type Props = {
    idVideo: string;
}

const DECIMAL = 2;

export default function CommonAnalitics(props: Props) {

    const cnCommon = cn("CommonAnalitics");

    const {data} = useGetTotalByIdQuery(props.idVideo);

    const [speedArr, setSpeedArr] = useState<TotalType[]>();
    const [allValues, setAllValues] = useState<TotalDataItem>();
    
    useEffect(()=>{
        if(data){ 
            setSpeedArr(convertTotalData(data!.data!.values));
            setAllValues(data!.data!.values);
        }
    },[data]);

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
                    <ReactSVG src={mirco} />
                </div>
                <div className={cnCommon("col-grow")}>
                    <span className={cnCommon("blue-bold")}>
                        {allValues && allValues.big_conclusion}
                    </span>
                    <span className={cnCommon("gray-txt")}>
                        {allValues && allValues.conclusion}
                    </span>
                </div>
                <div className={cnCommon("common-result")}>
                    <span className={cnCommon("common-result-title")}>
                        Общий результат:
                    </span>
                    <span
                        className={cnCommon("common-result-value")}
                    >{`${allValues ? allValues.total_result.toFixed(DECIMAL) : 0}%`}</span>
                </div>
            </div>
            <div className={cnCommon("row")}>
                <ProgressBar
                    bgcolor={"#2477F4"}
                    completed={allValues ? allValues.total_result : 0}
                />
            </div>
            <div className={cnCommon("panel")}>
                {speedArr && allValues && speedArr.map((element, ind) => (
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
                            {/* стрелка */}
                            <Needle
                                offset={35}
                                baseWidth={12}
                                // baseOffset={-30}
                                baseOffset={0}
                                color={"#7C8EB5"}
                                circleRadius={0}
                            />
                            {/* шкала заполнения */}
                            <Progress
                                color={
                                    getTotalResult(
                                        allValues[element]
                                    )[0]
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
                            </svg>
                        </Speedometer>
                        <div className={cnCommon("icon")}>
                            <ReactSVG
                                src={
                                    getTotalResult(
                                        allValues[element]
                                    )[1]
                                }
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
                        >{`${allValues ? allValues[element] : 0}%`}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

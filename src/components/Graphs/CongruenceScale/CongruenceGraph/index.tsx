// import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { CongruenceItem } from "../../../../models/graph/congruence";
import ColumnChart from "../../СolumnСhart";
import "./style.scss";
import { cn } from "@bem-react/classname";
import convertSecondsIntoTime from "../../../../@adapters/Time/convertSeconds";
import ColumnChart2 from "../../LineGraphVideo";

const CN = cn("CongruenceGraph");

type Props = {
    elements: CongruenceItem[];
    endTime: number;
};

// TODO TO DO: подумать, что сделать с ползунком времени, т.к. время должно быстрее меняться

export default function CongruenceGraph(props: Props) {
    const startTime = props.elements.at(0)!.time_start;
    // const endTime = props.elements.at(-1)!.time_end;

    return (
        <div className={CN()}>
            <span className={CN("text")}>
                {convertSecondsIntoTime(startTime)}
            </span>
            {/* <ColumnChart elements={props.elements} /> */}
            <ColumnChart2 elements={props.elements} endTime={props.endTime} />
            <span className={CN("text")}>
                {convertSecondsIntoTime(props.endTime)}
                {/* {convertSecondsIntoTime(endTime)} */}
            </span>
        </div>
    );
}

import { cn } from "@bem-react/classname";

import "./style.scss";

import { ConfidenceDataItem } from "../../../../../../models/graph/confidence";
import ConfidenceGraph from "../../../../../Graphs/Confidence";

type Props = {
    data: ConfidenceDataItem[];
    state: string;
    average: number;
};

interface IConfidence {
    type: string;
    color: string;
}

const cnConfidence = cn("confidence");

type propsConfidence = {
    typeConfidence: IConfidence[];
};
let confidence: propsConfidence = {
    typeConfidence: [
        {
            type: "зона высокой уверенности",
            color: "#24F19B",
        },
        {
            type: "зона средней уверенности",
            color: "#FFE817",
        },
        {
            type: "зона низкой уверенности",
            color: "#FF4E78",
        },
    ],
};

export default function SecondaryConfidence(props: Props) {
    return (
        <>
            <div className={cnConfidence()}>
                <p className={cnConfidence("description")}>
                    <b className={cnConfidence("description-bold")}>
                        {"Уверенность"}
                    </b>{" "}
                    {
                        "определяется таким внутренним состоянием человека, в котором он выражает согласие произносимым высказываниям без боязни возможности ошибки."
                    }
                </p>
                <div className={cnConfidence("list")}>
                    {confidence.typeConfidence.map((el, index) => (
                        <div key={index} className={cnConfidence("marker")}>
                            <div style={{ background: el.color }}></div>
                            <div className={cnConfidence("title")}>
                                {el.type}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ConfidenceGraph data={props.data} average={props.average} />
        </>
    );
}

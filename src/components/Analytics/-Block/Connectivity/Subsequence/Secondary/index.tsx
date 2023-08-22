import { cn } from "@bem-react/classname";

import "./style.scss";

import Invisible from "../../../../../Dropdown/-Invisible";
import ConnectivityGraph from "../../../../../Graphs/Connectivity";
import { ConnectivityDataItem } from "../../../../../../models/graph/connectivity";

type Props = {
    data: ConnectivityDataItem[];
    state: string;
};

interface ISubsequence {
    type: string;
    color: string;
}

const cnSubsequence = cn("subsequence");

type propsSubsequence = {
    typeSubsequence: ISubsequence[];
};
let subsequence: propsSubsequence = {
    typeSubsequence: [
        {
            type: "высказывания логически не связаны",
            color: "#ADB9D4",
        },
        {
            type: "высказывание логически связано с предыдущим высказыванием",
            color: "linear-gradient(32.08deg, #24F19B 0%, #51F976 100%)",
        },
        {
            type: "высказывание противоречит предыдущему",
            color: "linear-gradient(78.41deg, #FE6972 0%, #FF4E78 100%)",
        },
    ],
};

export default function SecondarySubsequence(props: Props) {
    return (
        <>
            {/* <ConnectivityGraph items={[]} /> */}
            <div className={cnSubsequence()}>
                <p className={cnSubsequence("description")}>
                    <b className={cnSubsequence("description-bold")}>
                        {"Последовательная"}
                    </b>{" "}
                    {
                        "речь характеризуется упорядоченным представлением аргументов, при котором высказывания логически не противоречат друг другу."
                    }
                </p>
                <div className={cnSubsequence("list")}>
                    {subsequence.typeSubsequence.map((el, index) => (
                        <div key={index} className={cnSubsequence("marker")}>
                            <div style={{ background: el.color }}></div>
                            <div className={cnSubsequence("title")}>
                                {el.type}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ConnectivityGraph items={props.data} />
        </>
    );
}

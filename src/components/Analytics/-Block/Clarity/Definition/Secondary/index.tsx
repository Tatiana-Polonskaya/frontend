import { cn } from "@bem-react/classname";

import "./style.scss";

import ClarityGraph from "../../../../../Graphs/Clarity";
import { ClarityDataItem } from "../../../../../../models/graph/clarity";

type Props = {
    data: ClarityDataItem[];
    state: string;
    counts: number[];
};

interface IDefinition {
    type: string;
    color: string;
}

const cnDefinition = cn("definition-description");

type propsDefinition = {
    typeDefinition: IDefinition[];
};
const definition: propsDefinition = {
    typeDefinition: [
        {
            type: "основная речь",
            color: "#ADB9D4",
        },
        {
            type: "неречевые звуки",
            color: "linear-gradient(78.41deg, #FE6972 0%, #FF4E78 100%)",
        },
        {
            type: "дрожание голоса",
            color: "linear-gradient(32.08deg, #2477F4 0%, #3A86FA 100%)",
        },
    ],
};

export default function SecondaryDefinition(props: Props) {
    return (
        <>
            <div className={cnDefinition()}>
                <p className={cnDefinition("description")}>
                    <b className={cnDefinition("description-bold")}>Четкость</b>{" "}
                    речи снижают нарушения фонетических стандартов (неречевые
                    звуки, дрожание голоса) и резкие (на 20 и более процентов)
                    изменения темпа речи.
                </p>
                <div className={cnDefinition("list")}>
                    {definition.typeDefinition.map((el, index) => (
                        <div key={index} className={cnDefinition("marker")}>
                            <div style={{ background: el.color }}></div>
                            <div className={cnDefinition("title")}>
                                {el.type}
                            </div>
                            <div className={cnDefinition("title-count")}>
                                {props.counts[index]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ClarityGraph data={props.data} />
        </>
    );
}

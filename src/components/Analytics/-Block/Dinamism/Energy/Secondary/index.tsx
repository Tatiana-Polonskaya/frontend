/* eslint-disable jsx-a11y/anchor-is-valid */
import { cn } from "@bem-react/classname";

import "./style.scss";

import GraphColor from "../../../../../../models/graph/_colors";
import {
    EnergyDataItem,
    EnergyType,
} from "../../../../../../models/graph/energy";
import EnergyGraph from "../../../../../Graphs/Energy";

type Props = {
    data: EnergyDataItem[];
    graphs?: string;
    average: number;
};

const cnEnergy = cn("energy");

type Line = {
    type: string;
    color: string;
};
type propsLine = {
    typeLine: Line[];
};

export default function SecondaryEnergy(props: Props) {
    // это лучше через useEffect сделать?

    let EnergyLine: propsLine = {
        typeLine: [
            {
                type: "Мгновенная энергия",
                color: GraphColor.BLUE,
            },
        ],
    };
    return (
        <>
            <div className={cnEnergy("marker")}>
                <p className={cnEnergy("description")}>
                    <b className={cnEnergy("description-bold")}>
                        {"Энергичность"}
                    </b>{" "}
                    {
                        "речи определяет её силу, необходимую для донесения смысла произносимой речи до аудитории."
                    }
                </p>
                <div className={cnEnergy("list")}>
                    {/* вот тут надо решить вопрос с блоками цветов */}
                    {EnergyLine.typeLine.map((el, ind) => (
                        <div key={ind} className={cnEnergy("color")}>
                            <div
                                className={cnEnergy("color-item")}
                                style={{
                                    background: el.color,
                                }}
                            ></div>
                            <div className={cnEnergy("text")}>{el.type}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cnEnergy("graph")}>
                {/* сюда передавать state для того тчобы отображать 1 график */}
                <EnergyGraph
                    data={props.data}
                    param={EnergyType.ENERGY}
                    average={props.average * 100}
                />
            </div>
        </>
    );
}

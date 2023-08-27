import "./Informative.css";
import Scale from "../Scale";
import { cn } from "@bem-react/classname";
import GraphColor from "../../../models/graph/_colors";

const CN = cn("inf");

type Props = {
    informative: number;
    parasite: number;
    sounds: number;
    empty: number;
};

export default function InformativScale(props: Props) {
    return (
        <div className={CN("inf")}>
            <Scale
                fractions={[
                    {
                        title: "Слова-паразиты",
                        value: props.parasite < 0 ? 0 : props.parasite * 100,
                        color: GraphColor.PURPLE,
                    },
                    {
                        title: "Неречевые звуки",
                        value: props.sounds < 0 ? 0 : props.sounds * 100,
                        color: GraphColor.IRED,
                    },
                    {
                        title: "Пустые паузы",
                        value: props.empty < 0 ? 0 : props.empty * 100,
                        color: GraphColor.ORANGE,
                    },
                    {
                        title: "Информативная часть",
                        value:
                            props.informative < 0 ? 0 : props.informative * 100,
                        color: GraphColor.GRAY,
                    },
                ]}
            />
        </div>
    );
}

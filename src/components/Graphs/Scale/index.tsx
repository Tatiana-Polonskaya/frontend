import "./style.scss";
import { cn } from "@bem-react/classname";
import GraphColor from "../../../models/graph/_colors";
import { IDescriptionScale } from "../../../models/graph/inteface/IDescriptionScale";

const CN = cn("Scale");
interface IComponentProps {
    fractions: IDescriptionScale[];
}

export default function Scale({ fractions }: IComponentProps) {
    return (
        <div className={CN()}>
            {fractions.map((number, idx) => (
                <div
                    key={idx}
                    className={CN("content")}
                    style={{
                        backgroundColor: number.color,
                        color:
                            number.color === GraphColor.GRAY
                                ? "#7C8EB5"
                                : GraphColor.WHITE,
                        width: number.value + "%",
                    }}
                >
                    <div
                        className={CN("text",{unvisible: number.value < 15})}
                    >
                        {number.title}
                    </div>
                </div>
            ))}
        </div>
    );
}

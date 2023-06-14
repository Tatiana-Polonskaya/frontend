import { cn } from "@bem-react/classname";
import GraphColor from "../../../models/graph/_colors";
import "./style.scss";

type Props = {
    maxValue: number;
    value: number;
    color?: string;
};

// для двух блоков
{
    /* <EnergyLine maxValue={50} value={value} /> */
}
{
    /* <EnergyLine maxValue={100} value={value} /> */
}

const cnEnergyLIne = cn("energy-line");
export default function EnergyLine({
    maxValue,
    value,
    color = GraphColor.BLUE,
}: Props) {
    return (
        <div className={cnEnergyLIne()}>
            <div
                className={cnEnergyLIne("fill")}
                style={{
                    width: `${
                        maxValue <= value
                            ? 100
                            : maxValue === 50
                            ? value * 2
                            : maxValue - 50 <= value
                            ? (value - 50) * 2
                            : 0
                    }%`,
                    background: color,
                    borderRadius:
                        maxValue - value > 0.3 ? "40px 0 0 40px" : "40px",
                }}
            ></div>
        </div>
    );
}

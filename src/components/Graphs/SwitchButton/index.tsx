import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";
import "./style.scss";

const CN = cn("SwitchButton");

type Props = {
    title: string;
    icon?: string;
    onClick: Function;
    isActive: boolean;
};

export default function SwitchButton(props: Props) {
    return (
        <div
            className={CN("switch", { active: props.isActive })}
            onClick={() => props.onClick()}
        >
            {props.icon && <ReactSVG src={props.icon} />}
            {props.title}
        </div>
    );
}

import { cn } from "@bem-react/classname";
import "./style.scss";

import { ReactSVG } from "react-svg";

import DeleteIcon from "./icon/trash.svg";
import ChooseIcon from "./icon/archive-add.svg";

type Props = { state: string };

export default function ArchivePopup({ state }: Props) {
    const cnArchivePopup = cn("archive-popup");

    const valuesPopup = [
        {
            icon: ChooseIcon,
            title: "Не учитывать в статистике",
            color: "#7C8EB5",
        },
        {
            icon: DeleteIcon,
            title: "Удалить",
            color: "#E73D42",
        },
    ];

    return (
        <div className={cnArchivePopup("", cnArchivePopup(state))}>
            {valuesPopup.map((el, index) => (
                <div key={index} className={cnArchivePopup("item")}>
                    <ReactSVG
                        className={cnArchivePopup("icon")}
                        src={el.icon}
                    />
                    <p
                        className={cnArchivePopup("title")}
                        style={{ color: `${el.color}` }}
                    >
                        {el.title}
                    </p>
                </div>
            ))}
        </div>
    );
}

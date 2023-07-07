import { cn } from "@bem-react/classname";
import { UUID } from "crypto";
import "./style.scss";

import { ReactSVG } from "react-svg";

import DeleteIcon from "./icon/trash.svg";
import ChooseIcon from "./icon/archive-add.svg";

type Props = {
    ind: number;
    id: UUID;
    changeTickVideo: Function;
    state: string;
    handleClick: Function;
};

export default function ArchivePopup({
    ind,
    id,
    changeTickVideo,
    handleClick,
    state,
}: Props) {
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

    const getTick = (id: number) => {
        changeTickVideo(id);
    };

    const delVideo = (id: string) => {
        handleClick(id);
    };

    return (
        // разделить  методы
        <div key={ind} className={cnArchivePopup("", cnArchivePopup(state))}>
            {valuesPopup.map((el, index) => (
                <div
                    key={index}
                    className={cnArchivePopup("item")}
                    onClick={() => (index === 0 ? getTick(ind) : delVideo(id))}
                >
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

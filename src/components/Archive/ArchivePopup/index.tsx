import { cn } from "@bem-react/classname";
import "./style.scss";

import { ReactSVG } from "react-svg";

import DeleteIcon from "./icon/trash.svg";
import ChooseIcon from "./icon/archive-add.svg";

type Props = {
    id: number;
    changeTickVideo: any;
    getDeleteArchiveVideo: any;
    state: string;
};

export default function ArchivePopup({
    id,
    changeTickVideo,

    getDeleteArchiveVideo,
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

    const getIdVideo = (id: number) => {
        getDeleteArchiveVideo(id);
    };

    const getTick = (id: number) => {
        changeTickVideo(id);
    };

    return (
        // разделить  методы
        <div key={id} className={cnArchivePopup("", cnArchivePopup(state))}>
            {valuesPopup.map((el, index) => (
                <div
                    key={index}
                    className={cnArchivePopup("item")}
                    onClick={() => (index === 0 ? getTick(id) : getIdVideo(id))}
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

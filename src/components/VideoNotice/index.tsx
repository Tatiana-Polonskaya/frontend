import { UUID } from "crypto";
import React, { useState } from "react";
import { cn } from "@bem-react/classname";
import Button from "../ui-kit/Button";

import "./style.scss";
import { ReactSVG } from "react-svg";

import editIcon from "./assets/edit.svg";
import receiveIcon from "./assets/receive-square.svg";

type Props = {
    idVideo?: UUID;
    description: string;
};

export default function VideoNotice({ idVideo, description }: Props) {
    const cnVideoNotice = cn("VideoNotice");
    const [isEditable, setIsEditable] = useState(false);

    const saveDescription = () => {
        // какой то запрос на обновления текса заметки на сервер
        setIsEditable(false);
    };

    return (
        <div className={cnVideoNotice()}>
            {description.length === 0 && !isEditable && (
                <div className={cnVideoNotice("info-block")}>
                    <div className={cnVideoNotice("info")}>
                        Оставьте заметку с важными деталями, которые заметили
                        после просмотра, чтобы вернуться к ним позже во время
                        рефлексии.
                    </div>
                    <Button
                        className={cnVideoNotice("btn")}
                        onClick={() => setIsEditable(true)}
                    >
                        <ReactSVG
                            className={cnVideoNotice("icon")}
                            src={editIcon}
                        />
                        Добавить заметку
                    </Button>
                </div>
            )}
            {isEditable && (
                <div className={cnVideoNotice("edit-block")}>
                    <div className={cnVideoNotice("edit-block-textarea-block")}>
                        <textarea
                            className={cnVideoNotice("edit-block-textarea")}
                            value={description.length === 0 ? "" : description}
                            placeholder="Текст заметки"
                        ></textarea>
                    </div>
                    <div className={cnVideoNotice("edit-block-btn-block")}>
                        <Button
                            className={cnVideoNotice("btn")}
                            onClick={saveDescription}
                        >
                            <ReactSVG
                                className={cnVideoNotice("icon")}
                                src={receiveIcon}
                            />
                            Сохранить
                        </Button>
                    </div>
                </div>
            )}
            {description.length > 0 && !isEditable && (
                <div className={cnVideoNotice("edit-block")}>
                    <div className={cnVideoNotice("edit-block-textarea-block")}>
                        <textarea
                            className={cnVideoNotice("edit-block-textarea")}
                            value={description}
                            disabled
                        ></textarea>
                    </div>
                    <div className={cnVideoNotice("edit-block-btn-block")}>
                        <Button
                            className={cnVideoNotice("btn")}
                            onClick={()=>setIsEditable(true)}
                        >
                            <ReactSVG
                                className={cnVideoNotice("icon")}
                                src={editIcon}
                            />
                            Редактировать
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

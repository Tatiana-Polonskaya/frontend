import { useEffect, useRef, useState } from "react";
import { cn } from "@bem-react/classname";
import Button from "../ui-kit/Button";

import "./style.scss";
import { ReactSVG } from "react-svg";

import editIcon from "./assets/edit.svg";
import receiveIcon from "./assets/receive-square.svg";
import { useUpdateVideoInfoByIdMutation } from "../../store/api/userVideo";

type Props = {
    idVideo: string;
    title: string;
    description: string;
};

export default function VideoNotice({ idVideo, title, description }: Props) {
    const cnVideoNotice = cn("VideoNotice");

    const [isEditable, setIsEditable] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [stateDescription, setStateDescription] = useState(description);

    const [updateVideoInfo, responseUpdate] = useUpdateVideoInfoByIdMutation();
    const { isSuccess, isError } = responseUpdate;

    const saveDescription = async () => {
        // console.log(textareaRef.current!.value);
        if (textareaRef.current!.value) {
            const newDescription = textareaRef.current!.value;
            console.log({
                id: idVideo,
                title: title,
                description: newDescription,
            });
            await updateVideoInfo({
                id: idVideo,
                title: title,
                description: newDescription,
            });
            setStateDescription(newDescription);
        }

        setIsEditable(false);
    };

    useEffect(() => {
        if (isSuccess) console.log(responseUpdate);
    }, [isSuccess]);

    useEffect(() => {
        if (isError) console.log(responseUpdate);
    }, [isError]);

    return (
        <div className={cnVideoNotice()}>
            {stateDescription.length === 0 && !isEditable && (
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
                            // value={description.length === 0 ? "" : description}
                            defaultValue={stateDescription}
                            placeholder="Текст заметки"
                            ref={textareaRef}
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
            {stateDescription.length > 0 && !isEditable && (
                <div className={cnVideoNotice("edit-block")}>
                    <div className={cnVideoNotice("edit-block-textarea-block")}>
                        <textarea
                            className={cnVideoNotice("edit-block-textarea")}
                            value={stateDescription}
                            disabled
                        ></textarea>
                    </div>
                    <div className={cnVideoNotice("edit-block-btn-block")}>
                        <Button
                            className={cnVideoNotice("btn")}
                            onClick={() => setIsEditable(true)}
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

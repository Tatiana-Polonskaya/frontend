import { useState, useEffect } from "react";
import { IVideoFromBack } from "../../../models/video";
import ArchiveVideoItem from "../ArchiveVideoItem";
import "./style.scss";
import { useDeleteVideoByIdMutation } from "../../../store/api/userVideo";
import { UUID } from "crypto";

type Props = {
    video: IVideoFromBack[];
};

export default function ArchiveVideo({ video }: Props) {
    const [deleteRequest, deleteResponse] = useDeleteVideoByIdMutation();
    const { isLoading, isSuccess, isError } = deleteResponse;

    const func = async (id: string) => await deleteRequest(id);

    useEffect(() => {
        if (isSuccess) console.log("video was deleted");
    }, [isSuccess]);

    useEffect(() => {
        if (isError) alert("Something was wrong!");
    }, [isError]);

    const [state, setState] = useState(video);

    const removeItem = (id: string) => {
        setState((prevState) => prevState.filter((el) => el.id !== id));
        func(id);
    };

    useEffect(() => {
        if (video) {
            console.log("video", video);
        }
    }, [state]);

    return video && video.length !== 0 ? (
        <>
            {state.map((el, ind) => (
                <ArchiveVideoItem
                    handleClick={removeItem}
                    key={el.id}
                    el={el}
                    ind={ind}
                    visible={el.status_video === "ERROR" ? false : true}
                />
            ))}
        </>
    ) : (
        // <>{"Упс, что-то пошло не по плану"}</>
        <>{"Не удалось выполнить операцию, попробуйте обновить страницу"}</>
    );
}

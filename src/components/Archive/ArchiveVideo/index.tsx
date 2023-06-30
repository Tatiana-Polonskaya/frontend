import { IVideoFromBack } from "../../../models/video";
import ArchiveVideoItem from "../ArchiveVideoItem";
import "./style.scss";

type Props = {
    video: IVideoFromBack[];
};

export default function ArchiveVideo({ video }: Props) {
    return video && video.length !== 0 ? (
        <>
            {video.map((el, ind) => (
                <ArchiveVideoItem key={ind} el={el} ind={ind} />
            ))}
        </>
    ) : (
        // <>{"Упс, что-то пошло не по плану"}</>
        <>{"Не удалось выполнить операцию, попробуйте обновить страницу"}</>
    );
}

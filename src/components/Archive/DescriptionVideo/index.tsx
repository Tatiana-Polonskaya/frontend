import { cn } from "@bem-react/classname";
import "./style.scss";

import Arrow from "./icon/arrow-down.svg";
import { ReactSVG } from "react-svg";

type Props = {
    title: string;
    time: string;
    date: string;
};

export default function DescriptionArchiveVideo({ title, date, time }: Props) {
    const cnDescriptionArchiveVideo = cn("archive-video-description");

    return (
        <div className={cnDescriptionArchiveVideo()}>
            <div>
                <p className={cnDescriptionArchiveVideo("title")}>{title}</p>

                <div className={cnDescriptionArchiveVideo("time-block")}>
                    <span className={cnDescriptionArchiveVideo("date")}>
                        {date}
                    </span>
                    <span className={cnDescriptionArchiveVideo("time")}>
                        {time}
                    </span>
                </div>
            </div>
            <div className={cnDescriptionArchiveVideo("btn")}>
                <div className={cnDescriptionArchiveVideo("btn-descr")}>
                    {"Перейти"}
                </div>
                <ReactSVG
                    className={cnDescriptionArchiveVideo("btn-icon")}
                    src={Arrow}
                />
            </div>
        </div>
    );
}

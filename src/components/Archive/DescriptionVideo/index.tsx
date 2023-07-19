import { cn } from "@bem-react/classname";
import "./style.scss";

import Arrow from "./icon/arrow-down.svg";
import { ReactSVG } from "react-svg";
import { UUID } from "crypto";
import RoutesEnum from "../../../models/routes";
import { Link, useNavigate } from "react-router-dom";
import { Background } from "react-speedometer/dist";

type Props = {
    id: UUID;
    title: string;
    time: string;
    date: string;
    isAllow: boolean;
};

export default function DescriptionArchiveVideo({
    id,
    title,
    date,
    time,
    isAllow,
}: Props) {
    const cnDescriptionArchiveVideo = cn("archive-video-description");
    const navigate = useNavigate();

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
            <div
                className={cnDescriptionArchiveVideo("btn")}
                style={{
                    backgroundColor: isAllow
                        ? "#ffb800"
                        : "rgba(124, 142, 181, 0.2)",
                    cursor: isAllow ? "pointer" : "default",
                }}
                onClick={
                    isAllow
                        ? () => {
                              navigate(RoutesEnum.DIARY + "/" + id);
                          }
                        : () => {}
                }
            >
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

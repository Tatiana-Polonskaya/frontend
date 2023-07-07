import React, { useContext, useEffect, useState } from "react";
import VideoPlayer, { getPrettyDataTime } from "../../VideoPlayer";
import { cn } from "@bem-react/classname";
import { IVideoFromBack } from "../../../models/video";
import NoPhoto from "../../ProfilePreview/assets/no-photo.png";

import "./style.scss";
import { useGetTotalByIdQuery } from "../../../store/api/report";

import RoutesEnum from "../../../models/routes";
import { useNavigate } from "react-router-dom";
import { ModalWindowContext } from "..";
import { ReactSVG } from "react-svg";

import arrowIcon from "../assets/arrow-down.svg";

type Props = {
    modalVideo:IVideoFromBack
}

export default function VideoModalContent({modalVideo}: Props) {

    const navigate = useNavigate(); 

    const {setModal} = useContext(ModalWindowContext);

    const {data} = useGetTotalByIdQuery(modalVideo.id);
    const [totalVideoInfo, setTotalVideoInfo] = useState<number[]>();
    
    let criteria =  [
        {
            title: "связность",
        },
        {
            title: "убедительность",
        },
        {
            title: "аргументированность",
        },
        {
            title: "ясность",
        },
        {
            title: "динамизм",
        },
        {
            title: "привлечение внимания аудитории",
        },
    ];

    useEffect(() => {
        if (data && data.data) {
            setTotalVideoInfo([
                data.data!.values!.connectedness,
                data.data!.values!.argumentativeness,
                data.data!.values!.clarity,
                data.data!.values!.dynamism,
                data.data!.values!.persuasiveness,
                data.data!.values!.communicative,
            ]);
        }
    }, [data]);

    const clickDetailedBtn = () =>{
        // localStorage.setItem("main-page", "true");
        navigate(RoutesEnum.DIARY + "/" + modalVideo.id,{state: {"main":true}});
    };

    const cnModalContent = cn("VideoModalContent");

    return (
        <div className={cnModalContent()}>

            <div className={cnModalContent("video-row")}>
                <div className={cnModalContent("video-row-videoplayer")}>
                    <VideoPlayer url={`/api/video/${modalVideo.id}`} controls={true} muted={true}/>
                </div>
                <div className={cnModalContent("video-row-description")}>
                    <div
                        className={cnModalContent(
                            "video-row-description-title-row"
                        )}
                    >
                        <p
                            className={cnModalContent(
                                "video-row-description-title-row-text"
                            )}
                        >
                            {modalVideo.title}
                        </p>

                        <p>
                            <img
                                src="/images/button-close.svg"
                                className={cnModalContent(
                                    "video-row-description-title-row-closebutton"
                                )}
                                onClick={()=>setModal(false)}
                                alt="close"
                            />
                        </p>
                    </div>
                    <div
                        className={cnModalContent(
                            "video-row-description-times"
                        )}
                    >
                        {getPrettyDataTime(modalVideo.upload_date)}
                    </div>
                    <div
                        className={cnModalContent(
                            "video-row-description-author-block"
                        )}
                    >
                        <div
                            className={cnModalContent(
                                "video-row-description-author-block-logo"
                            )}
                        >
                            <img
                                className={cnModalContent(
                                    "video-row-description-author-block-logo-img"
                                )}
                                src={NoPhoto}
                                alt=""
                            />
                        </div>
                        <p
                            className={cnModalContent(
                                "video-row-description-author-block-name"
                            )}
                        >
                            {modalVideo.channel_title
                                ? modalVideo.channel_title
                                : "Источник"}
                        </p>
                    </div>

                    <div
                        className={cnModalContent(
                            "video-row-description-annotation-title"
                        )}
                    >
                        Аннотация
                    </div>
                    <div
                        className={cnModalContent(
                            "video-row-description-annotation-text"
                        )}
                    >
                        {modalVideo.description}
                    </div>

                    <button
                        className={cnModalContent(
                            "video-row-description-btn-info"
                        )}
                        onClick={clickDetailedBtn}
                    >
                        Подробные результаты анализа 
                        <ReactSVG src={arrowIcon} wrapper="span" className={cnModalContent(
                            "video-row-description-btn-info-icon"
                        )}/>
                    </button>
                </div>
            </div>

            <div className={cnModalContent("analyze-row")}>
                {totalVideoInfo && (
                    <>
                        {criteria.map((item,idx) => (
                             <div
                                 key={idx}
                                 className={cnModalContent("analyze-row-item")}
                             >
                                 <div
                                     className="pie animate"
                                     style={
                                        {
                                            "--p": totalVideoInfo[idx],
                                        } as React.CSSProperties
                                    }
                                >
                                    {totalVideoInfo[idx]}%
                                </div>
                                <p>{item.title}</p>
                            </div>
                        ))}   
                        </>
                )}
            </div>
        </div>
    );
}

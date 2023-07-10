import React, { useContext } from 'react'
import { ModalWindowContext } from '../../VideoBlock';
import { cn } from '@bem-react/classname';
import VideoPlayer, { getPrettyDataTime } from '../../VideoPlayer';
import NoPhoto from "../../ProfilePreview/assets/no-photo.png";
import { IVideoFromBack } from '../../../models/video';

import "./style.scss";

type Props = {
    modalVideo:IVideoFromBack
}

export default function CarouselModalContent({modalVideo}: Props) {

    const {setModal} = useContext(ModalWindowContext);

    const cnModalContent = cn("CarouselModalContent");

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
                </div>
            </div>

            {/* <div className={cnModalContent("analyze-row")}>
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
            </div> */}
        </div>
    );
}

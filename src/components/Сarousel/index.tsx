import { cn } from "@bem-react/classname";
import CarouselItem from "./CarouselItem";
import { ReactSVG } from "react-svg";

import arrow_left from "./arrows/arrow-left.svg";
import arrow_right from "./arrows/arrow-right.svg";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "./slick-theme.scss";

import "./style.scss";
import { useGetMainVideoQuery } from "../../store/api/userVideo";
import { useEffect, useState } from "react";
import { IVideoFromBack } from "../../models/video";
import ModalWindow from "../ModalWindow/ModalWindow";
import { ModalWindowContext } from "../VideoBlock";
import VideoModalContent from "../VideoBlock/VideoModalContent";
import CarouselModalContent from "./CarouselModalContent";

type ArrowProps = {
    className?: string;
    onClick?: any;
};

function SampleNextArrow(props: ArrowProps) {
    const { className,onClick } = props;
    return (
        <div className={className}>
            <ReactSVG
                src={arrow_right}    
                onClick={onClick}
            />
        </div>
        
    );
}

function SamplePrevArrow(props: ArrowProps) {
    const { className, onClick } = props;
    return (
        <div className={className}>
            <ReactSVG
                src={arrow_left}
                onClick={onClick}
            />
        </div>
    );
}

const cnСarouse = cn("Carousel");//className={cnСarouse()}

export default function Carousel() {

    /* --------------------------- GETTING VIDEOS ---------------------------*/

    const [currentVideos, setCurrentVideos] = useState<IVideoFromBack[]>([]);
    
    const { data } = useGetMainVideoQuery({
        page:0,
        limit:6,
        tutorial:true
    });

    useEffect(() => {
        if (data && data?.data) {
            setCurrentVideos(data!.data!.videos);
        }
    }, [data]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    /* --------------------------- MODAL WINDOW ---------------------------*/
    const [isModal, setModal] = useState(false);
    const [modalVideo, setModalVideo] = useState<IVideoFromBack>();

    /* --------------------------- OPEN MODAL ---------------------------*/

    const clickOnVideo = async (el: IVideoFromBack) => {
        setModalVideo(el);
        setModal(true);
    };

    /* --------------------------- CODE ---------------------------*/

    return (
        <div>
            <Slider {...settings} className={cnСarouse("main-container")}>
                {currentVideos && currentVideos.length>0 && (
                    <CarouselItem {...currentVideos[0]} key={currentVideos[0].id} onClick={()=>clickOnVideo(currentVideos[0])}/>
                )}
            </Slider>

            <ModalWindow isVisible={isModal} onClose={() => setModal(false)}>
                <ModalWindowContext.Provider value={{ isModal, setModal }}>
                    {modalVideo && (
                        <CarouselModalContent modalVideo={modalVideo} />
                    )}
                </ModalWindowContext.Provider>
            </ModalWindow>
        </div>
    );
}

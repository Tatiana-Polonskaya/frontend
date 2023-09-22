import Carousel from "../../components/Сarousel";
import { cn } from "@bem-react/classname";

import MainLayout from "../../layouts/MainLayout";
import Chat from "../../components/Chat";

import ElementEqual from "./icons/element-equal.svg";
import "./style.scss";
import { ReactSVG } from "react-svg";
import VideoBlock from "../../components/VideoBlock";

const cnHome = cn("home");

export default function HomePage() {
    return (
        <MainLayout>
            <div className={cnHome()}>
                <div className={cnHome("chat")}>
                    <Chat />
                </div>
                <div className={cnHome("header")}>
                    <ReactSVG src={ElementEqual} />
                    <div>Лучшие выступления</div>
                </div>
                <div className={cnHome("content")}></div>

                <VideoBlock></VideoBlock>
                <Carousel />
            </div>
        </MainLayout>
    );
}

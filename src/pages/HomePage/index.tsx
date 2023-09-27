import Carousel from "../../components/Сarousel";
import { cn } from "@bem-react/classname";

import MainLayout from "../../layouts/MainLayout";
import Chat from "../../components/Chat";

import ElementEqual from "./icons/element-equal.svg";
import "./style.scss";
import { ReactSVG } from "react-svg";
import VideoBlock from "../../components/VideoBlock";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../hooks/redux";
import UserStatus from "../../models/userStatus";
import { useEffect, useMemo } from "react";
import RoutesEnum from "../../models/routes";

const cnHome = cn("home");

export default function HomePage() {
    const navigate = useNavigate();
    const status = useAppSelector((state) => state.profile.user.status);

    const userLocalStatus = useMemo(() => {
        return status === UserStatus.NO_QUESTIONNAIRE;
    }, [status]);

    useEffect(() => {
        if (userLocalStatus) navigate(RoutesEnum.SURVEY);
    }, [userLocalStatus]);

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

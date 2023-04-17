import { cn } from "@bem-react/classname";
import { useEffect, useState, useCallback } from "react";

import MainLayout from "../../layouts/MainLayout";
import Chat from "../../components/Chat";

import "./style.scss";

const cnHome = cn("home");

export default function HomePage() {
    return (
        <MainLayout>
            <div className={cnHome()}>
                <div className={cnHome("header")}>
                    <div>Лучшие выступления</div>
                    <div className={cnHome("chat-wrapper")}>
                        <div className={cnHome("chat-wrapper-wrapper")}>
                            <Chat />
                        </div>
                    </div>
                </div>
                <p style={{ overflowWrap: "break-word", width: "100%" }}>
                    {" "}
                    {/*main content*/}
                    Lorem ipsum dolor sit amet consecteturblanditiis facilis
                    sunt laudantium earum beatae, in nesciunt. Sed placeat fugit
                    vel repellat!
                </p>
            </div>
        </MainLayout>
    );
}

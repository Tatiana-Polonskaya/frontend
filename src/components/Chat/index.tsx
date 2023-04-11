import { cn } from "@bem-react/classname";

import "./style.scss";
import { useState } from "react";
import ChatFooter from "./-Footer";

const cnChat = cn("chat");

export default function Chat() {
    const [isOpened, setIsOpened] = useState(true);

    return (
        <div className={cnChat()}>
            <div className={cnChat("header")}>
                <button onClick={() => setIsOpened(prev => !prev)}>v</button>
                <span>Чат поддержки</span>
            </div>
            {isOpened && <>
                <div className={cnChat("content")}></div>
                <ChatFooter />
            </>}
        </div>
    );
}

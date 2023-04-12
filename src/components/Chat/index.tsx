import { cn } from "@bem-react/classname";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { createContext } from "react";

import ChatFooter from "./-Footer";
import ChatHeader from "./-Header";

import "./style.scss";

export const ChatContext = createContext({
    isExpanded: true,
    setIsExpanded: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

const cnChat = cn("chat");

export default function Chat() {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <ChatContext.Provider value={{ isExpanded, setIsExpanded }}>
            <div className={cnChat()}>
                <ChatHeader />
                {isExpanded && (
                    <>
                        <div className={cnChat("content")}></div>
                        <ChatFooter />
                    </>
                )}
            </div>
        </ChatContext.Provider>
    );
}

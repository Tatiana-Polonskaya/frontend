import { cn } from "@bem-react/classname";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { createContext } from "react";

import ChatFooter from "./-Footer";
import ChatHeader from "./-Header";
import ChatMessage from "./-Message";

import "./style.scss";

const messagesMock = [
    {
        senderName: "Команда поддержки SpeechUp",
        senderDescription: "Специалист Юлия",
        time: "12:34",
        message: "Какая у тебя цель выступления?",
        mine: false,
    },
    {
        senderName: "Анна Эгамова",
        time: "12:35",
        message:
            "Я хочу выступить с докладом сначала перед одногруппниками, а затем на конференции. Какие основные советы?",
        mine: true,
    },
    {
        senderName: "Команда поддержки SpeechUp",
        senderDescription: "Специалист Юлия",
        time: "12:34",
        message: "Какая у тебя цель выступления?",
        mine: false,
    },
    {
        senderName: "Анна Эгамова",
        time: "12:35",
        message:
            "Я хочу выступить с докладом сначала перед одногруппниками, а затем на конференции. Какие основные советы?",
        mine: true,
    },
    {
        senderName: "Команда поддержки SpeechUp",
        senderDescription: "Специалист Юлия",
        time: "12:34",
        message: "Какая у тебя цель выступления?",
        mine: false,
    },
    {
        senderName: "Анна Эгамова",
        time: "12:35",
        message:
            "Я хочу выступить с докладом сначала перед одногруппниками, а затем на конференции. Какие основные советы?",
        mine: true,
    },
    {
        senderName: "Команда поддержки SpeechUp",
        senderDescription: "Специалист Юлия",
        time: "12:34",
        message: "Какая у тебя цель выступления?",
        mine: false,
    },
    {
        senderName: "Анна Эгамова",
        time: "12:35",
        message:
            "Я хочу выступить с докладом сначала перед одногруппниками, а затем на конференции. Какие основные советы?",
        mine: true,
    },
];

export const ChatContext = createContext({
    isExpanded: true,
    setIsExpanded: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

const cnChat = cn("chat");

export default function Chat() {
    const [isExpanded, setIsExpanded] = useState(true);

    const [messages, setMessages] = useState([...messagesMock]);
    // для сообщений, наверное, лучше использовать useMemo


    return (
        <ChatContext.Provider value={{ isExpanded, setIsExpanded }}>
            <div className={cnChat()}>
                <ChatHeader />
                {isExpanded && (
                    <>
                        <div className={cnChat("content")}>
                            {messages.reverse().map((msg, idx) => (
                                <ChatMessage key={idx} {...msg} />
                            ))}
                        </div>
                        <ChatFooter />
                    </>
                )}
            </div>
        </ChatContext.Provider>
    );
}

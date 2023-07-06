import { cn } from "@bem-react/classname";
import { Dispatch, Fragment, SetStateAction, useContext, useState } from "react";
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
    addMessage: (message: any) => {},
});

const cnChat = cn("chat");

type Props = {
    isExpanded?: boolean;
};

export default function Chat(props: Props) {
    const [isExpanded, setIsExpanded] = useState(Boolean(props.isExpanded));

    const [messages, setMessages] = useState([...messagesMock]);
    const addMessage = (message: any) => setMessages([message, ...messages]);
    // для сообщений, наверное, лучше использовать useMemo

    return (
        <ChatContext.Provider value={{ isExpanded, setIsExpanded, addMessage }}>
            <div className={cnChat({expanded: isExpanded})}>
                <ChatHeader />
                {isExpanded && (
                    <Fragment>
                        <div className={cnChat("content",{expanded: !isExpanded})}>
                            {messages.reverse().map((msg, idx) => (
                                <ChatMessage key={idx} {...msg} />
                            ))}
                        </div>
                        <ChatFooter />
                    </Fragment>
                )}
            </div>
        </ChatContext.Provider>
    );
}

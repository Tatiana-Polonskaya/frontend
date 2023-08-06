import { cn } from "@bem-react/classname";
import { Dispatch, Fragment, SetStateAction, useMemo, useState } from "react";
import { createContext } from "react";

import ChatFooter from "./-Footer";
import ChatHeader from "./-Header";
import ChatMessage from "./-Message";

import "./style.scss";
import { useGetMessagesQuery } from "../../store/api/chat";
import { IMessageItem } from "../../models/chat";

export const ChatContext = createContext({
    isExpanded: true,
    setIsExpanded: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

const cnChat = cn("chat");

type Props = {
    isExpanded?: boolean;
};

const INTERVAL_PULLING = 5000;
const TITLE_NOT_MESSAGES = "Вы не задали ни одного вопроса";

export default function Chat(props: Props) {
    const { data } = useGetMessagesQuery(null, {
        pollingInterval: INTERVAL_PULLING,
    });

    const sortDate = (data: IMessageItem[]) => {
        const dataSort = [...data];
        return dataSort.sort((a, b) => a.id - b.id);
    };

    const replayHelper = (reply: number | null): string => {
        const message = allMessagesUser!.filter((msg) => msg.id === reply);
        return message.length > 0 ? message[0].text : "";
    };

    const allMessagesUser = useMemo(() => {
        if (data && data!.data) {
            return sortDate(data.data).reverse();
        }
    }, [data]);

    const [isExpanded, setIsExpanded] = useState(Boolean(props.isExpanded));

    const firstMsg: IMessageItem = {
        created_at: new Date().toLocaleString("ru"),
        from_user: "Специалист",
        id: 0,
        is_mine: false,
        reply_to: null,
        text: "",
        to_user: null,
    };

    return (
        <ChatContext.Provider value={{ isExpanded, setIsExpanded }}>
            <div className={cnChat({ expanded: isExpanded })}>
                <ChatHeader />
                {isExpanded && (
                    <Fragment>
                        <div
                            className={cnChat("content", {
                                expanded: !isExpanded,
                            })}
                        >
                            {allMessagesUser &&
                                allMessagesUser.map((msg, idx) => (
                                    <ChatMessage
                                        key={msg.id}
                                        replay={replayHelper(msg.reply_to)}
                                        {...msg}
                                    />
                                ))}
                            {!allMessagesUser && (
                                <ChatMessage {...firstMsg} is_first={true} />
                            )}
                            {/* {!allMessagesUser && (
                                <div className={cnChat("not_messages")}>
                                    {TITLE_NOT_MESSAGES}
                                </div>
                            )} */}
                        </div>
                        <ChatFooter />
                    </Fragment>
                )}
            </div>
        </ChatContext.Provider>
    );
}

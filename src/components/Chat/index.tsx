import { cn } from "@bem-react/classname";
import {
    Dispatch,
    Fragment,
    SetStateAction,
    useMemo,
    useState,
} from "react";
import { createContext } from "react";

import ChatFooter from "./-Footer";
import ChatHeader from "./-Header";
import ChatMessage from "./-Message";

import "./style.scss";
import {
    useGetMessagesQuery,
} from "../../store/api/chat";



export const ChatContext = createContext({
    isExpanded: true,
    setIsExpanded: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

const cnChat = cn("chat");

type Props = {
    isExpanded?: boolean;
};

const INTERVAL_PULLING = 10000;
const TITLE_NOT_MESSAGES = "Вы не задали ни одного вопроса";

export default function Chat(props: Props) {

    const { data } = useGetMessagesQuery(null, {
        pollingInterval: INTERVAL_PULLING,
    });

    const allMessagesUser = useMemo(() => {
        if (data && data!.data) {
            return [...data.data!].reverse();
        }
    }, [data]);

    const [isExpanded, setIsExpanded] = useState(Boolean(props.isExpanded));

    return (
        <ChatContext.Provider
            value={{ isExpanded, setIsExpanded }}
        >
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
                                    <ChatMessage key={msg.id} {...msg} />
                                ))}
                                {!allMessagesUser && (<div className={cnChat("not_messages")}>{TITLE_NOT_MESSAGES}</div>)}
                        </div>
                        <ChatFooter />
                    </Fragment>
                )}
            </div>
        </ChatContext.Provider>
    );
}

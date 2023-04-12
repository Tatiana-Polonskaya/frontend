import { cn } from "@bem-react/classname";

import "./style.scss";
import { useContext } from "react";
import { ChatContext } from "..";

const cnChatHeader = cn("chat-header");

export default function ChatHeader() {
    const { isExpanded, setIsExpanded } = useContext(ChatContext);

    return (
        <div className={cnChatHeader()}>
            <button onClick={() => setIsExpanded((prev) => !prev)}>v</button>
            <span>Чат поддержки</span>
        </div>
    );
}

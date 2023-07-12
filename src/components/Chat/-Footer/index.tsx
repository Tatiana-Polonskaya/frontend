import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import SendIcon from "./icons/send.svg";

import "./style.scss";
import { useCallback, useEffect, useRef, useContext, useState } from "react";
import { ChatContext } from "..";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

const cnFooter = cn("chat-footer");

export default function ChatFooter() {
    const [message, setMessage] = useState(String());
    const { addMessage } = useContext(ChatContext);

    const lastName = useSelector((state: RootState) => state.profile.user.firstname);
    const name = useSelector((state: RootState) => state.profile.user.lastname);

    const textAreaRef = useRef(null);

    const onKeyUp: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
        const target = event.target as HTMLDivElement;
        if (!target.innerText.replace(/\n/g, "")) {
            target.innerText = "";
        }
        if (event.key === "Enter") {
            if (event.ctrlKey) {
                newMessageHandler();
            }
        }
        setMessage(target.innerText);
    };

    const newMessageHandler = () => {
        if (!message) return;
        addMessage({
            message,
            mine: true,
            senderName: `${name} ${lastName}`,
            time: "XX:YY",
        });
        setMessage("");
        if (textAreaRef.current)
            (textAreaRef.current as HTMLDivElement).innerText = "";
    };

    return (
        <div className={cnFooter()}>
            <div className={cnFooter("send-area")}>
                <div
                    contentEditable
                    onKeyUp={onKeyUp}
                    placeholder="Задай свой вопрос..."
                    className={cnFooter("textarea")}
                    suppressContentEditableWarning={true}
                    ref={textAreaRef}
                ></div>
            </div>
            <ReactSVG
                beforeInjection={(svg) =>
                    svg.addEventListener("click", newMessageHandler)
                }
                src={SendIcon}
                className={cnFooter("send-btn")}
            />
        </div>
    );
}

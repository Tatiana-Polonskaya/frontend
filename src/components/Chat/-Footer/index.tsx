import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import SendIcon from "./icons/send.svg";

import "./style.scss";
import { useRef, useState } from "react";
import { useSendMessageMutation } from "../../../store/api/chat";

const cnFooter = cn("chat-footer");

export default function ChatFooter() {
    const [message, setMessage] = useState(String());

    const textAreaRef = useRef(null);

    const [sendRequest, sendResponse] = useSendMessageMutation();
    const { isLoading } = sendResponse;

    const newMessageHandler = async () => {
        if (!message) return;
        const current_message = message;
        setMessage("");
        if (textAreaRef.current)
            (textAreaRef.current as HTMLDivElement).innerText = "";

        await sendRequest(current_message);
    };

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

    return (
        <>
            <div className={cnFooter()}>
                <div className={cnFooter("row")}>
                    <div className={cnFooter("send-area")}>
                        <div
                            contentEditable
                            onKeyUp={onKeyUp}
                            placeholder="Задай свой вопрос..."
                            className={cnFooter("textarea")}
                            suppressContentEditableWarning={true}
                            ref={textAreaRef}
                        ></div>
                        <ReactSVG
                            beforeInjection={(svg) =>
                                svg.addEventListener("click", newMessageHandler)
                            }
                            src={SendIcon}
                            className={cnFooter("send-btn")}
                        />
                    </div>
                </div>
                {isLoading && (
                    <div className={cnFooter("loading")}>
                        Отправление
                        <span className={cnFooter("loading-animate")}>
                            {" "}
                            . . .
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}

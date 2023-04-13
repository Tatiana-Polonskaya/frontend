import { cn } from "@bem-react/classname";
import "./style.scss";

type MessageProps = {
    senderName: string;
    senderDescription?: string;
    time: string;
    message: string;
    mine: boolean;
};

const cnMessage = cn("chat-message");

export default function ChatMessage(props: MessageProps) {
    return (
        <div className={cnMessage("wrapper", { mine: props.mine, other: !props.mine })}>
            {!props.mine && <div className={cnMessage("triangle-other")} />}

            <div className={cnMessage("actual", [cnMessage(props.mine ? "mine" : "other")])}>
                <div className={cnMessage("header")}>
                    <div className={cnMessage("sender-info")}>
                        <span className={cnMessage("sender-name")}>{props.senderName}</span>
                        <span>{props.time}</span>
                    </div>
                    {!props.mine && props.senderDescription && (
                        <div className={cnMessage("sender-description")}>
                            <span>{props.senderDescription}</span>
                        </div>
                    )}
                </div>
                <span>{props.message}</span>
            </div>

            {props.mine && <div className={cnMessage("triangle-mine")} />}
        </div>
    );
}

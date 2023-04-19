import { ReactNode } from "react";
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

const mineCnHelper = (isMine: any) => ({ mine: isMine, other: !isMine });

type withArrowProps = {
    children?: ReactNode;
    isMine: boolean;
};

const WithArrow = (props: withArrowProps) => (
    <>
        {!props.isMine && <div className={cnMessage({ triangle: "other" })} />}
        {props.children}
        {props.isMine && <div className={cnMessage({ triangle: "mine" })} />}
    </>
);

export default function ChatMessage(props: MessageProps) {
    return (
        <div className={cnMessage("wrapper", mineCnHelper(props.mine))}>
            <WithArrow isMine={props.mine}>
                <div className={cnMessage("actual", mineCnHelper(props.mine))}>
                    <div className={cnMessage("header")}>
                        <div className={cnMessage("header", { sender: "info" })}>
                            <span className={cnMessage("header", { sender: "name" })}>{props.senderName}</span>
                            <span>{props.time}</span>
                        </div>
                        {!props.mine && props.senderDescription && (
                            <div className={cnMessage("header", { sender: "description" })}>{props.senderDescription}</div>
                        )}
                    </div>
                    <span>{props.message}</span>
                </div>
            </WithArrow>
        </div>
    );
}

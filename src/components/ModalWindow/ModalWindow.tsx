import React, { ReactElement, ReactNode, useEffect } from "react";
import "./style.scss";
import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";

interface IWindowModalProps {
    isVisible: boolean;
    title?: string;
    icon?:string;
    footer?: ReactElement;
    onClose: Function;
    children?: ReactNode;
    closeOnClickOutside?:boolean
}

export default function ModalWindow({
    isVisible = false,
    title,
    icon=process.env.PUBLIC_URL +"/images/upload-icon.svg",
    footer,
    onClose,
    children,
    closeOnClickOutside=true
}: IWindowModalProps) {
    const keydownHandler = ({ key }: any) => {
        switch (key) {
            case "Escape":
                onClose();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => document.removeEventListener("keydown", keydownHandler);
    });

    const cnModalWindow = cn("ModalWindow");

    return !isVisible ? null : (
        <div className={cnModalWindow()} onClick={() => (closeOnClickOutside && onClose())}>
            <div className={cnModalWindow("dialog")} onClick={(e) => e.stopPropagation()}>
                {title && (
                    <div className={cnModalWindow("header")}>
                        <ReactSVG
                            src={icon}
                            className={cnModalWindow("header-icon")}
                        />
                        <span className={cnModalWindow("header-title")}>
                            {title}
                        </span>
                        <ReactSVG
                            src={process.env.PUBLIC_URL + "/images/close.svg"}
                            className={cnModalWindow("header-icon-close")}
                            onClick={()=>onClose()}
                        />
                    </div>
                )}
                <div className={cnModalWindow("body")}>
                    <div className={cnModalWindow("content")}>{children}</div>
                </div>
                {footer && <div className={cnModalWindow("footer")}>{footer}</div>}
            </div>
        </div>
    );
}

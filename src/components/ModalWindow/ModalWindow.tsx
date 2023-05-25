import React, { ReactElement, ReactNode, useEffect } from "react";
import "./style.scss";

interface IWindowModalProps {
    isVisible: boolean;
    title?: string;
   
    footer?: ReactElement;
    onClose: Function;
    children?: ReactNode;
}

export default function ModalWindow({
    isVisible = false,
    title,
    
    footer,
    onClose,
    children
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

    return !isVisible ? null : (
        <div className="modal" onClick={() => onClose()}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                {title && (
                    <div className="modal-header">
                        <h3 className="modal-title">{title}</h3>
                        <span className="modal-close" onClick={() => onClose()}>
                            &times;
                        </span>
                    </div>
                )}
                <div className="modal-body">
                    
                    <div className="modal-content">{children}</div>
                </div>
                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    );
}

import { cn } from "@bem-react/classname";
import "./style.scss";
import { ReactSVG } from "react-svg";
import { PropsWithChildren } from "react";

type Props = {
    img: string;
    onClick: () => void;
    isBan?: boolean;
    className?: string;
};

export default function LargeButton({
    img,
    onClick,
    children,
    isBan = false,
    className,
}: PropsWithChildren<Props>) {
    const CN = cn("LargeButton");

    const handleClick = () => {
        if (!isBan) {
            onClick();
        }
    };

    return (
        <div
            className={CN({ banned: isBan }) + ` ${className}`}
            onClick={handleClick}
        >
            <ReactSVG className={CN("image", { banned: isBan })} src={img} />
            <div className={CN("footer")}>{children}</div>
        </div>
    );
}

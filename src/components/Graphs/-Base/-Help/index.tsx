import { cn } from "@bem-react/classname";
import { useState, useRef, useEffect, ReactNode } from "react";

import "./style.scss";
import { getWindowWidth } from "../../../../tools/window";

const OFFSET = 10;

const cnGraphHelp = cn("graph-help");

const GraphHelp = ({
    content,
    color,
    relative: isRelative = false,
}: {
    content: ReactNode;
    color?: string;
    relative?: boolean;
}) => {
    const [isOpened, setIsOpened] = useState(false);

    const [leftPos, setLeftPos] = useState(0);
    const [topPos, setTopPos] = useState(0);
    const [helpWidth, setHelpWidth] = useState(0);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const helpRef = useRef<HTMLDivElement>(null);

    const handleMousePosition: React.MouseEventHandler<HTMLDivElement> = (
        e
    ) => {
        const windowWidth = getWindowWidth();
        if (windowWidth - OFFSET < e.clientX + helpWidth) {
            setLeftPos(windowWidth - helpWidth);
        } else {
            setLeftPos(e.clientX + OFFSET);
        }
        setTopPos(e.clientY + OFFSET);
    };
    const handleMousePositionRel: React.MouseEventHandler<HTMLDivElement> = (
        e
    ) => {
        if (wrapperRef.current) {
            const windowWidth = getWindowWidth();
            const { left, top } = wrapperRef.current.getBoundingClientRect();
            if (windowWidth - OFFSET < e.clientX + helpWidth) {
                setLeftPos(windowWidth - helpWidth - left);
            } else {
                setLeftPos(e.clientX - left + OFFSET);
            }
            setTopPos(e.clientY - top + OFFSET);
        }
    };

    useEffect(() => {
        if (helpRef.current) {
            setHelpWidth(helpRef.current.getBoundingClientRect().width);
        }
        // }, [helpRef.current]);
    }, []);

    return (
        <div
            onMouseMove={
                isRelative ? handleMousePositionRel : handleMousePosition
            }
            onMouseEnter={() => setIsOpened(true)}
            onMouseLeave={() => setIsOpened(false)}
            className={cnGraphHelp()}
            ref={wrapperRef}
        >
            {isOpened && (
                <div
                    style={{
                        top: `${topPos}px`,
                        left: `${leftPos}`,
                        border: `thin solid ${color}`,
                    }}
                    className={cnGraphHelp("content")}
                    ref={helpRef}
                >
                    {content}
                </div>
            )}
        </div>
    );
};
export default GraphHelp;

import { cn } from "@bem-react/classname";
import "./style.scss";

type Props = {
    result: number[];
    type?: string;
};

export default function VideoProgressPanel({ result, type = "big" }: Props) {
    const analyzeItem = {
        id: 0,
        criteria: [
            {
                title: "связность",
            },
            {
                title: "аргументированность",
            },
            {
                title: "ясность",
            },
            {
                title: "динамизм",
            },
            {
                title: "убедительность",
            },
            {
                title: "соблюдение коммуникативной нормы",
            },
        ],
    };
    const cnVideoPanel = cn("video-panel");

    return (
        <div
            className={cnVideoPanel("analyze-row")}
            style={
                {
                    "--g": type === "big" ? "1em" : "0",
                    "--w": type === "big" ? "1248px" : "748px",
                } as React.CSSProperties
            }
        >
            {result && analyzeItem.criteria.map((item, ind) => (
                <div key={ind} className={cnVideoPanel("analyze-row-item")}>
                    <div
                        className="pie animate"
                        style={
                            {
                                "--p": result[ind],
                                "--w-i": type === "big" ? "100px" : "60px",
                                "--b": type === "big" ? "15px" : "10px",
                                "--fs-v": type === "big" ? "16px" : "10px",
                                "--ln-v": type === "big" ? "20px" : "13px",
                            } as React.CSSProperties
                        }
                    >
                        {Math.floor(result[ind])}%<div className="pie-helper"></div>
                    </div>
                    <p
                        style={
                            {
                                "--fs-t": type === "big" ? "16px" : "9.3px",
                                "--ln-t": type === "big" ? "17px" : "11.4px",
                            } as React.CSSProperties
                        }
                    >
                        {item.title}
                    </p>
                </div>
            ))}
        </div>
    );
}

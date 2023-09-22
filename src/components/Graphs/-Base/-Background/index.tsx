import { cn } from "@bem-react/classname";

import "./style.scss";

const CN = cn("base-graph-background");

type Props = {
    sectionsVert?: number;
    sectionsHorz?: number;
    stats: string;
};

export default function BaseGraphBackground({
    sectionsVert = 1,
    sectionsHorz = 0,
    stats,
}: Props) {
    return (
        <div className={CN()}>
            {Array(sectionsVert - 1)
                .fill(null)
                .map((_, idx) => (
                    <div
                        className={CN(
                            stats !== "st" ? "section" : "section-stats",
                            { first: idx === 0 }
                        )}
                        key={idx}
                    >
                        {!!sectionsHorz && (
                            <>
                                <div className={CN("header")}></div>
                                {Array(sectionsHorz - 1)
                                    .fill(null)
                                    .map((el, idxEl) => (
                                        <div
                                            className={CN("subsection")}
                                            key={idxEl}
                                        />
                                    ))}
                            </>
                        )}
                    </div>
                ))}
        </div>
    );
}

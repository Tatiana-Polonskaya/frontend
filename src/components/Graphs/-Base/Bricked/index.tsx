import SecondBrick from "./-Brick";
import GraphMedian from "../-Median";
import GraphBase from "..";
import { _1SEC_PX, createXDescriptionFromSeconds } from "../helpers";
import { BrickedGraphItem } from "../../../../models/graph/bricked";

type Props = { items: BrickedGraphItem[] };

export default function BrickedGraph({ items }: Props) {
    const descriptionX = createXDescriptionFromSeconds(items.at(-1)!.endTime);

    return (
        <GraphBase descriptionX={descriptionX}>
            <GraphMedian top="50%" />
            {items.map((el, idx) => (
                <SecondBrick
                    id={idx}
                    key={idx}
                    width={`${
                        (el.endTime - el.startTime) * (_1SEC_PX + 0.05)
                    }px`}
                    top={el.top}
                    left={`${el.startTime * (_1SEC_PX + 0.05)}px`}
                    color={el.color}
                    text={el.text}
                    type={el.type}
                />
            ))}
        </GraphBase>
    );
}

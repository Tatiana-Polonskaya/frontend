import { useContext } from "react";
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
            <GraphMedian top="48%" />
            {items.map((el, idx) => (
                <SecondBrick
                    id={idx}
                    key={idx}
                    // разобраться вот тут
                    width={`${
                        // (el.endTime - el.startTime) * (_1SEC_PX + 0.05)
                        // здесь чёт кудато надо округлять
                        (el.endTime - el.startTime) * _1SEC_PX
                    }px`}
                    top={el.top}
                    // left={`${el.startTime * (_1SEC_PX + 0.05)}px`}
                    left={`${el.startTime * _1SEC_PX}px`}
                    color={el.color}
                    text={el.text}
                    type={el.type}
                    time={el.startTime}
                />
            ))}
        </GraphBase>
    );
}

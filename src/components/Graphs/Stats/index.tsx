import StatsLineGraph from "../-Base/StatsLine";
import GraphColor from "../../../models/graph/_colors";

import "./style.scss";
import { IStatisticItem } from "../../../models/diary";

type Props = { data: IStatisticItem[] };

const X = "value";
// const pX = "prev";

function createXDataDescriptionFromData(data: IStatisticItem[]) {
    return data.map((el) => el.date);
}

export default function StatsGraph({ data }: Props) {
    const restruction = (dataValue: IStatisticItem[]) => {
        const arr: number[] = [];
        for (let i = 0; i < dataValue.length; i++) {
            if (dataValue[i].value !== null) {
                const cur = (dataValue[i].value / 100) as number;
                arr.push(cur);
            } else {
                const cur = -0.001;
                arr.push(cur);
            }
        }
        return arr;
    };

    return (
        <>
            {restruction(data).length > 0 ? (
                <StatsLineGraph
                    items={restruction(data).map((x, ind) => ({
                        name: ind,
                        [X]: x,
                        // [pX]:
                        //     data[ind].value === null
                        //         ? -1
                        //         : (data[ind].value as number),
                        vv: -0.3,
                    }))}
                    colors={{ [X]: GraphColor.BLUE }}
                    descriptionX={createXDataDescriptionFromData(data)}
                    descriptionY={[0, 0.2, 0.4, 0.6, 0.8, 1]}
                    withMedian={false}
                    // поменять по времени, 7 дней
                    visible={restruction(data).length > 7 ? false : true}
                    // visible={true}
                />
            ) : undefined}
        </>
    );
}

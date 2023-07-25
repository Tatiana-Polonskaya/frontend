import MainLayout from "../../layouts/MainLayout";

import TimelineGraph from "../../components/Graphs/Timeline";

import { useEffect, useState } from "react";

import connectivityMockData from "./mocks/_connectivity";
import clarityMockData from "./mocks/_clarity";
import informativeMockData from "./mocks/_informative";
import emotionalityMockData from "./mocks/_emotionality";
import nonMonotonyMockData from "./mocks/_non_monotony";
import souseijiMockData from "./mocks/_souseiji";
import confidenceMockData from "./mocks/_confidence";
import ConnectivityGraph from "../../components/Graphs/Connectivity";
import ClarityGraph from "../../components/Graphs/Clarity";
import NonMonotonyGraph from "../../components/Graphs/NonMonotony";
import ConfidenceGraph from "../../components/Graphs/Confidence";
import { GraphContext } from "../../components/Graphs/-Base/helpers";
import {
    EmotionalityChannel,
    EmotionalityItem,
} from "../../models/graph/emotionality";
import EmotionalityGraph from "../../components/Graphs/Emotionality";
import { NonMonotonyType } from "../../models/graph/monotony";
import { useGetTotalByIdTestQuery } from "../../store/api/reportTest";
import { TotalType } from "../../models/graph/total";


export default function TestPage() {
    const [currentTime, setCurrentTime] = useState(0);

    const [emotionalityChannel, setEmotionalityChannel] = useState(
        EmotionalityChannel.VIDEO
    );

    const [emotions, setEmotions] = useState<EmotionalityItem[]>([
        EmotionalityItem.ANGER,
    ]);

    const [nonMonotonyType, setNonMonotonyType] =
        useState<NonMonotonyType | null>(null);


    const { data } = useGetTotalByIdTestQuery(
        "89dd1171-d9e9-4d65-9730-4a36596a0e84"
    );


    // const [dataTest, setDataTest] = useState<TotalType[]>();

    // useEffect(() => {
    //     if (data) {
    //         setDataTest(data))
    //     }
    // }, [data]);

    // console.log(data);
    // console.log(dataTest)

    return (
        <MainLayout>
            <p>
                <span>current time: {currentTime} secs</span>
                <br />
                <br />
            </p>
            {/* <TimelineGraph
                data={souseijiMockData}
                startTime="00:00"
                endTime="15:00"
            /> */}
            <br />
            <GraphContext.Provider value={{ currentTime, setCurrentTime }}>
                <div>
                    <span>Уверенность</span>
                    {/* <ConfidenceGraph data={confidenceMockData} average={30} /> */}
                </div>
                <div>
                    <span>немонотонность</span>
                    <br />
                    {[null, ...Object.values(NonMonotonyType)].map((ch) => (
                        <label key={String(ch)}>
                            <span>{ch ? ch : "all"}</span>
                            <input
                                type="radio"
                                onChange={() => setNonMonotonyType(ch)}
                                checked={ch === nonMonotonyType}
                            />
                            <br />
                        </label>
                    ))}
                    <NonMonotonyGraph
                        data={nonMonotonyMockData}
                        param={nonMonotonyType}
                        average={0}
                    />
                </div>
                <div>
                    <span>эмоциональность</span>
                    <br />
                    <br />
                    {Object.values(EmotionalityChannel).map((ch) => (
                        <label key={ch}>
                            <span>{ch}</span>
                            <input
                                type="radio"
                                onChange={(e) => setEmotionalityChannel(ch)}
                                checked={emotionalityChannel === ch}
                            />
                            <br />
                        </label>
                    ))}
                    <br />

                    {Object.values(EmotionalityItem).map((ch) => (
                        <label key={ch}>
                            <span>{ch}</span>
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setEmotions((prev) => {
                                        if (prev.includes(ch)) {
                                            return prev.length > 1
                                                ? prev.filter((el) => el !== ch)
                                                : prev;
                                        }
                                        return [...prev, ch];
                                    })
                                }
                                checked={emotions.includes(ch)}
                            />
                            <br />
                        </label>
                    ))}
                    <EmotionalityGraph
                        data={emotionalityMockData}
                        channel={emotionalityChannel}
                        emotions={Array.from(emotions)}
                    />
                </div>

                <div>
                    <span>информативность</span>
                </div>
                <div>
                    <span>связность</span>
                    <ConnectivityGraph items={connectivityMockData} />
                </div>
                <div>
                    <span>четкость</span>
                    <ClarityGraph data={clarityMockData} />
                </div>
                <div>
                </div>
            </GraphContext.Provider>
        </MainLayout>
    );
}

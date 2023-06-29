import React, { useEffect, useState } from "react";
import Dropdown from "../../Dropdown";
import InformativScale from "../../Graphs/Informative/InformativScale";

import { useGetConnectivityByIdQuery, useGetInformativeByIdQuery } from "../../../store/api/report";
import { InformativeJSON } from "../../../models/graph/informative";
import { UUID } from "crypto";
import InformativeGraph from "../../Graphs/Informative/InformativeGraph";
import SecondarySubsequence from "../../Analytics/-Block/Connectivity/Subsequence/Secondary";
import MainSubsequence from "../../Analytics/-Block/Connectivity/Subsequence/Main";
import { ConnectivityJSON } from "../../../models/graph/connectivity";
import { convertConnectivityDataLine } from "../../Analytics/helpers";

type Props = {
    idVideo: UUID;
};

// RENAME AFTER DELETING DUPLICATES
export default function ConnectivityBlockSecond(props: Props) {

    const title = "Последовательность";
    const subtitle = `Потеря логической связи в ...${"*"} высказываниях.`;

    const [connectivityData, setConnectivityData] = useState<ConnectivityJSON>();
    


    return (
        <>
            {connectivityData && (
                <Dropdown
                    title={title}
                    subtitle={subtitle}
                    visible={
                        <MainSubsequence
                        data={connectivityData.values.map((el) =>
                            convertConnectivityDataLine(el)
                        )}
                        startTime={connectivityData.values[0].time_start}
                        endTime={
                            connectivityData.values[
                                connectivityData.values.length - 1
                            ].time_end
                        }
                    />
                    }
                    invisible={
                        <SecondarySubsequence
                        data={connectivityData.values}
                        state={""}
                    />
                    }
                />
            )}
        </>
    );
}

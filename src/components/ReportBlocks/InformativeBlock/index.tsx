import { useEffect, useState } from "react";
import Dropdown from "../../Dropdown";
import InformativScale from "../../Graphs/Informative/InformativScale";

import { useGetInformativeByIdQuery } from "../../../store/api/report";
import { InformativeJSON } from "../../../models/graph/informative";
import { UUID } from "crypto";
import InformativeGraph from "../../Graphs/Informative/InformativeGraph";

type Props = {
    idVideo: UUID;
};

export default function InformativeBlock(props: Props) {
    const title = "Информативность";
    const subtitle = `Доля неречевых звуков и слов-паразитов превышает допустимый порог. 
    Не хватает фактов и деталей для подтверждения высказанных аргументов.`;

    const [informativeData, setInformativeData] = useState<InformativeJSON>();
    const InformativeDataFromBack = useGetInformativeByIdQuery(props.idVideo);

    useEffect(() => {
        if (InformativeDataFromBack && InformativeDataFromBack.data)
            setInformativeData(InformativeDataFromBack.data.data);
    }, [InformativeDataFromBack]);

    return (
        <>
            <Dropdown
                title={title}
                subtitle={subtitle}
                visible={
                    informativeData && (
                        <InformativScale
                            informative={informativeData.informative}
                            sounds={informativeData.sounds}
                            without_confirmation={informativeData.empty}
                            parasite={informativeData.parasite}
                        />
                    )
                }
                invisible={
                    informativeData && (
                        <InformativeGraph values={informativeData.values} />
                    )
                }
            />
        </>
    );
}

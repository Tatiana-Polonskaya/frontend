import React, { useEffect, useState } from "react";
import Dropdown from "../../Dropdown";
import UnityOfStylScale from "../../Graphs/unityOfStyle";
import UnityOfStyl from "../../Graphs/unityOfStyle/UnityOfStyl";
import { UnityOfStyleDataItem } from "../../../models/graph/unity_of_style";
import { useGetUnityOfStyleByIdQuery } from "../../../store/api/report";
import { UUID } from "crypto";

type Props = {
    idVideo: UUID;
};

export default function UnityOfStyleBlock(props: Props) {
    const [unityOfStyleData, setUnityOfStyleData] =
        useState<UnityOfStyleDataItem>();
    const title = "Единство стиля";
    const subtitle = `Ярко выражен публицестический стиль, но преобладание других превышает рекомендованное значение.`;

    const UnityOfStyleDataFromBack = useGetUnityOfStyleByIdQuery(props.idVideo);

    useEffect(() => {
        if (
            UnityOfStyleDataFromBack &&
            UnityOfStyleDataFromBack.data &&
            UnityOfStyleDataFromBack.data.data!.values
        )
            setUnityOfStyleData(UnityOfStyleDataFromBack.data.data!.values);
    }, [UnityOfStyleDataFromBack]);

    return (
        <>
            
        </>
    );
}

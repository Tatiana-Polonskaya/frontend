import { useEffect, useMemo, useRef, useState } from "react";
import AnalysisReport from "../../components/Report";
import MainLayout from "../../layouts/MainLayout";

import { useAppSelector } from "../../hooks/redux";

import "./style.scss";
import { cn } from "@bem-react/classname";
import { useGetVideoByIdQuery } from "../../store/api/apiWithDifAnswers";

// import { EventSourcePolyfill } from "event-source-polyfill";

// import {
//     EventSourceMessage,
//     fetchEventSource,
// } from "@microsoft/fetch-event-source";

// type MessageHandler = (data: any) => void;
// export const AlertFetchEventSource = (onEvent: MessageHandler) => {
//     const ctrl = new AbortController();
//     fetchEventSource("/api/support/sse-connection", {
//         signal: ctrl.signal,
//         headers: {
//             Authorization: `Bearer ${useAppSelector(
//                 (state) => state.user.accessToken
//             )}`,
//         },
//         async onopen(res) {
//             if (res.ok && res.status === 200) {
//                 console.log("Connection made ", res);
//             } else if (
//                 res.status >= 400 &&
//                 res.status < 500 &&
//                 res.status !== 429
//             ) {
//                 console.log("Client side error ", res);
//             }
//         },
//         onmessage(ev: any) {
//             const data = JSON.parse(ev.data);
//             onEvent(data);
//         },
//     }); // you had a typo here, missing ")"
// };

export default function LearningPage() {
    const cnLearning = cn("LearningPage");

    return (
        <MainLayout>
        </MainLayout>
    );
}

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

    const token: string | null = useAppSelector(
        (state) => state.user.accessToken
    );

    // AlertFetchEventSource((data) => {
    //     // handle event data, eg
    //     console.log(data);
    //     // or perhaps something like
    //     // this.setState(data);
    // });

    // const [isReady, setIsReady] = useState(false);

    // const [getMessages, resultMessages] = useLazyGetMessagesQuery();

    // const [sendRequest, sendResponse] = useSendMessageMutation();
    // const { isLoading, isSuccess, isError } = sendResponse;

    // const [someData, setSomeData] = useState<any>();

    // const URl = "/api/support/sse-connection";

    // useEffect(() => {
    //     if (token) {
    //         const ctrl = new AbortController();
    //         const fetchData = async () => {
    //             await fetchEventSource(URl, {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //                 signal: ctrl.signal,
    //                 async onopen(res) {
    //                     if (res.ok && res.status === 200) {
    //                         console.log("Connection made ", res);
    //                         let allmessage = await getMessages();
    //                         console.log(allmessage);
    //                     } else if (
    //                         res.status >= 400 &&
    //                         res.status < 500 &&
    //                         res.status !== 429
    //                     ) {
    //                         console.log("Client side error ", res);
    //                     }
    //                 },
    //                 async onmessage(event) {
    //                     console.log(event);
    //                     setSomeData(event)
    //                     // const parsedData = JSON.parse(event.data);
    //                     // console.log(parsedData);
    //                     // setData((data) => [...data, parsedData]);
    //                 },
    //                 onclose() {
    //                     console.log("Connection closed by the server");
    //                 },
    //                 onerror(err) {
    //                     console.log("There was an error from server", err);
    //                 },
    //             });
    //         };
    //         fetchData();
    //         return () => ctrl.abort();
    //     }
    // }, []);

    // useEffect(() => {
    //     if (token) {
    //         const sse = new EventSourcePolyfill("/api/support/sse-connection", {
    //             heartbeatTimeout: 600000000,
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             withCredentials: true,
    //         });

    //         sse.addEventListener("open", () => {
    //             console.log("SSE opened!");
    //         });

    //         sse.onmessage = (e) => {
    //             console.log("onmessage");
    //             console.log(e);
    //         };

    //         sse.addEventListener("ping", (e) => {
    //             console.log(e);
    //         });

    //         sse.addEventListener("message", (e) => {
    //             console.log("message");
    //             console.log(e.data);
    //             setSomeData(e.data);
    //             // const data = JSON.parse(e.data);
    //             // console.log(data);
    //         });

    //         sse.addEventListener("error", (e) => {
    //             console.error("Error: ", e);
    //         });

    //         return () => {
    //             sse.close();
    //         };
    //     }
    // }, [token]);


    


    return (
        <MainLayout>

        </MainLayout>
    );
}

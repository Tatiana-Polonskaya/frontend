import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";
import "./style.scss";
import VideoItem from "./VideoItem";
import Pagination from "../Pagination";
import { cn } from "@bem-react/classname";
import ModalWindow from "../ModalWindow/ModalWindow";
import {
    useGetMainVideoQuery,
    useLazyGetMainVideoQuery,
} from "../../store/api/userVideo";
import { IVideoFromBack } from "../../models/video";

import VideoModalContent from "./VideoModalContent";

export const ModalWindowContext = createContext({
    isModal: false,
    setModal: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

export default function VideoBlock() {
    /* --------------------------- GETTING VIDEOS ---------------------------*/
    const [currentVideos, setCurrentVideos] = useState<IVideoFromBack[]>([]);
    const [countAllVideos, setCountAllVideos] = useState(1);

    const [currentPage, setCurrentPage] = useState(0);
    const videosPerPage = 6;

    const [getCurrentMainVideos, currentMainVideos] =
        useLazyGetMainVideoQuery();
    const {isSuccess, isLoading} = currentMainVideos;

    useEffect(()=>{
        if(isLoading) console.log("isLoading")
    },[isLoading])

    const { data } = useGetMainVideoQuery({
        page: currentPage,
        limit: videosPerPage,
    });

    useEffect(() => {
        if (data && data?.data) {
            setCurrentVideos(data!.data!.videos);
            setCountAllVideos(data!.data!.total_videos);
        }
    }, [data]);

    useEffect(() => {
        if (currentPage && currentPage > 0) {
            const getVideos = async () => {

                const result = await getCurrentMainVideos({
                    page: currentPage,
                    limit: videosPerPage,
                });

                if (result.data && result.data!.data)
                    setCurrentVideos(result.data!.data!.videos);
            };
            getVideos();
        }
    }, [currentPage]);

    /* --------------------------- PAGGINATION ---------------------------*/

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = (maxPage: number) => {
        setCurrentPage((prev) => (prev < maxPage - 1 ? prev + 1 : prev));
    };

    const prevPage = () =>
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));

    /* --------------------------- MODAL WINDOW ---------------------------*/
    const [isModal, setModal] = useState(false);
    const [modalVideo, setModalVideo] = useState<IVideoFromBack>();

    /* --------------------------- OPEN MODAL ---------------------------*/

    const clickOnVideo = async (el: IVideoFromBack) => {
        setModalVideo(el);
        setModal(true);
    };

    /* --------------------------- CODE ---------------------------*/

    const cnVideos = cn("video-block");

    return (
        <div className={cnVideos()}>
            <div className={cnVideos("video-grid")}>
                {currentVideos.map((el) => (
                    <VideoItem
                        key={el.id}
                        item={el}
                        clickFunction={() => clickOnVideo(el)}
                    />
                ))}
            </div>

            <Pagination
                videosPerPage={videosPerPage}
                totalVideos={countAllVideos}
                paginate={paginate}
                funcNextPage={nextPage}
                funcPrevPage={prevPage}
                currentPage={currentPage + 1}
            />

            <ModalWindow isVisible={isModal} onClose={() => setModal(false)}>
                <ModalWindowContext.Provider value={{ isModal, setModal }}>
                    {modalVideo && (
                        <VideoModalContent modalVideo={modalVideo} />
                    )}
                </ModalWindowContext.Provider>
            </ModalWindow>
        </div>
    );
}

import { Dispatch, SetStateAction, createContext } from "react";

// provider for setting the current time in graphs and others elements accoding to the video element
interface VideoTimeContextProps {
    currentTime: number;
    setCurrentTime: Dispatch<SetStateAction<number>>;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    togglePlay: () => void;
}

export const VideoTimeContext = createContext<VideoTimeContextProps>({
    currentTime: 0,
    setCurrentTime: () => {},
    isPlaying: false,
    setIsPlaying: () => {},
    togglePlay: () => {},
});

interface TimeProviderProps {
    children: React.ReactNode; // указываем тип для пропса children
}

export const TimeProvider: React.FC<
    TimeProviderProps & VideoTimeContextProps
> = ({
    children,
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying,
    togglePlay,
}) => {
    // const [currentTime, setCurrentTime] = useState(0);
    // const [isPlaying, setIsPlaying] = useState(false);

    // const togglePlay = () => {
    //     setIsPlaying(!isPlaying);
    // };
    // const { currentTime, setCurrentTime, isPlaying, setIsPlaying, togglePlay } =
    //     useContext(VideoTimeContext);

    return (
        <VideoTimeContext.Provider
            value={{
                currentTime,
                setCurrentTime,
                isPlaying,
                setIsPlaying,
                togglePlay,
            }}
        >
            {children}
        </VideoTimeContext.Provider>
    );
};

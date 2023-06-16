import { cn } from "@bem-react/classname";
import "./style.scss";

import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { PreviewVideoContext } from "../Upload";
import InputHeader from "../ui-kit/InputHeader";
import { ForwardedInput } from "../ui-kit/Input";
import Button from "../ui-kit/Button";
import { VideoUploadContext } from "../RepetitionComponents/RepetitionStart";
import { useGetVideoQuery, useSendVideoMutation } from "../../store/api/userVideo";

export default function PreviewBlock() {
    const cnPreview = cn("cnPreview");

    const [isNameValid, setNameValid] = useState(true);
    const [name, setName] = useState("");
    const { currentFile, setCurrentFile } = useContext(VideoUploadContext);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const [videoSendRequest, videoSendResponse] = useSendVideoMutation();
    const { isLoading, isSuccess, isError } = videoSendResponse;

    

    const clickUpload = async ()=>{
        await videoSendRequest({
            title: "currentFile",
            duration: "string",
            description: "string",
            file: currentFile,
        }); 
    }

    useEffect(() => {
        if (isSuccess) {
            const data = videoSendResponse.data;
            if (data.success) {
                console.log(data)
            } else {
                alert(data.error?.msg);
            }
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            const error = videoSendResponse.error as Response;
            alert(`Error with status code ${error.status}`);
            console.log(videoSendResponse.error);
        }
    }, [isError]);

    return (
        <div className={cnPreview()}>
            <div className={cnPreview("row")}>
                <div className={cnPreview("col")}>
                    <div className={cnPreview("video-block")}>
                        <video width="500" height="300" controls>
                            <source src={URL.createObjectURL(currentFile)} />
                        </video>
                    </div>
                </div>

                <div className={cnPreview("col")}>
                    <div className={cnPreview("title")}>
                        <span className={cnPreview("title-videoname")}>
                            {currentFile.name}
                        </span>
                        <span className={cnPreview("title-characters")}>
                        1,2 Гб • 14 минут
                        </span>
                    </div>
                    <div className={cnPreview("input-block")}>
                        <label>
                            <div className={cnPreview("input-block-title")}>
                                <span className={cnPreview("input-block-title-gray-bold")}>Задайте название: </span>
                                <span className={cnPreview("input-block-title-gray")}>Не более 80 символов</span>
                            </div>
                            <ForwardedInput
                                className={cnPreview("input")}
                                required
                                placeholder="Название файла"
                                maxLength={80}
                                value={name}
                                invalid={!isNameValid}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={(e) =>
                                    setNameValid(e.target.checkValidity())
                                }
                                ref={nameInputRef}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className={cnPreview("row")}>
                <div className={cnPreview("col")}>
                    <div className={cnPreview("btn")}>
                        <div className={cnPreview("btn")}>
                            <Button className={cnPreview("btn-gray")}>
                                Перезаписать видео
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cnPreview("col")}>
                    <div className={cnPreview("btn")}>
                        <Button className={cnPreview("btn-blue")} onClick={clickUpload}>
                            Начать анализ репетиции
                        </Button>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

import { UUID } from "crypto";


export interface IVideoApiReq {
    title: string;
    duration: string;
    description: string;
    file: File;
};

export interface IVideoUser {
    videos: IVideoFromBack[];
}

export interface IVideoFromBack {
    user_id: UUID,
    title: number,
    description: string,
    upload_date: string,
    file_name: string,
    duration: string,
    id: UUID,
    channel_title: string,
    file_path: string
}

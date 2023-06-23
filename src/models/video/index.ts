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

export interface IVideoInfo {
    title: string,
    duration: string,
    description: string,
    id: UUID,
    user_id: UUID,
    channel_title: string,
    upload_date: string,
    file_name: string,
    file_path: string
}

export interface IVideoUploadItem {
    id: string,
    title: string,
    description: string
}

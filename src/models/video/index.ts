import { UUID } from "crypto";

export interface IVideoApiReq {
    title: string;
    duration: string;
    description: string;
    file: File;
}

export interface IVideoUser {
    videos: IVideoFromBack[];
    total_videos: number;
}

export interface IVideoFromBack {
    user_id: UUID;
    title: string;
    description: string;
    upload_date: string;
    file_name: string;
    duration: string;
    id: UUID;
    channel_title: string;
    file_path: string;
}

export interface IVideoInfo {
    title: string;
    duration: string;
    description: string;
    id: UUID;
    user_id: UUID;
    channel_title: string;
    upload_date: string;
    file_name: string;
    file_path: string;
}

export interface IVideoUserStatus {
    videos: IVideoStatus[];
    total_videos: number;
}
export interface IVideoStatus {
    title: string;
    duration: string;
    description: string;
    id: UUID;
    user_id: UUID;
    channel_title: string;
    upload_date: string;
    file_name: string;
    file_path: string;
    status_percent: string;
    status_video: string;
}

export interface IVideoUploadItem {
    id: string;
    title: string;
    description: string;
}

export interface IParamsForQueryUserVideo {
    page: number;
    limit: number;
    tutorial?: boolean;
    search?: string;
}

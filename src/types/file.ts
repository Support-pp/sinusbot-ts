export interface AudioFile {
    v: number;
    uuid: string;
    parent: string;
    type: string;
    filename: string;
    title: string;
}

export interface CreateAudioFile {
    url: string;
    title?: string;
    parent?: string;
}
export interface CreateAudioFileResponse {
    success: boolean;
    uuid: string;
}

export interface CreateFolder {
    name: string;
    parent?: string;
}

export interface CreateFolderReponse {
    success: boolean;
    uuid: string;
}


export interface DeleteFolderResponse {
    success: boolean;
}
export interface DeleteFileResponse {
    success: boolean;
}
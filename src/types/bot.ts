export interface BotResponse {
    id: string;
    allowedBackends: Backend[];
}

export enum Backend{
    ts3,
    discord
}

export interface Bot {
    id: string;
    alias?: any;
    spaceUsed: string;
    limitSpace: number;
    limitFiles: number;
    limitPlaylists: number;
    limitInstances: number;
    limitUsers: number;
    limitDownloadRate: number;
    limitDownloadSize: number;
    locked: number;
    deleted: number;
    disallowDownload: number;
    disallowStreaming: number;
    downloadedBytes: number;
    statHTTPRequests: number;
    statPlayCount: number;
    statCommandCount: number;
    allowedBackends: string[];
    disallowRegistration: boolean;
}

export interface System {
    codecs: string[];
    formats: string[];
}

export interface BotInfoResponse {
    bot: Bot;
    usageMemory: number;
    system: System;
}
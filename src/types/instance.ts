

export interface Privileges {
    //unknow at the moment
}

export interface Instance {
    backend: string;
    uuid: string;
    name: string;
    nick: string;
    running: boolean;
    playing: boolean;
    mainInstance: boolean;
    licenseId: string;
    serverHost: string;
    serverPort: number;
    privileges: Privileges;
}

export interface InstanceSettings {
    backend?: string;
    name?: string;
    nick?: string;
    mode?: number;
    serverHost?: string;
    serverPort?: number;
    serverPassword?: string;
    channelName?: string;
    channelPassword?: string;
    updateDescription?: boolean;
    announce?: boolean;
    announceString?: string;
    identity?: string;
    identityLevel?: number;
    enableDucking?: boolean;
    duckingVolume?: number;
    channelCommander?: boolean;
    stickToChannel?: any;
    ttsExternalURL?: string;
    ttsDefaultLocale?: string;
    ignoreChatServer?: boolean;
    ignoreChatPrivate?: boolean;
    ignoreChatChannel?: boolean;
    idleTrack?: string;
    startupTrack?: string;
    script?: any;
    licenseId?: any;
    fadeTime?: number;
    ttsVolume?: number;
    commandPrefix?: string;
}
export interface InstanceStartResponse {
    b?: string;
    success: boolean;
}

export interface CreateInstance {
    backend: string;
    nick: string;
}
export interface CreateInstanceResponse {
    success: boolean;
    uuid: string;
    error: string;
}

export interface ConnStatus {
    status: number;
    connectedTime: number;
    latency: number;
    packetLoss: number;
    packetLossS2C: number;
    packetLossC2S: number;
    bytesSent: number;
    bytesRecv: number;
    bandwidthSent: number;
    bandwidthRecv: number;
    channelId: string;
}

export interface InstanceStatus {
    v: string;
    currentTrack?: any;
    position: number;
    running: boolean;
    playing: boolean;
    playlist: string;
    playlistTrack: number;
    shuffle: boolean;
    repeat: boolean;
    volume: number;
    needsRestart: boolean;
    queueLen: number;
    queueVersion: number;
    modes: number;
    downloaded: number;
    serverUID: string;
    flags: number;
    muted: number;
    connStatus: ConnStatus;
    streamListeners: number;
    idleTrack: string;
    startupTrack: string;
}




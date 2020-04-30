export interface Login {
    username: string;
    botId?: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    botId: string;
    success: boolean;
}


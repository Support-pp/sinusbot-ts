import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getUserAgent } from './instrument';
import { httpErrorWithOriginal, requestErrorWithOriginal } from './error'
import {
    Login,
    BotIdResult,
    LoginResponse
}from "./index"


export class SinusBot {


    private url: string;
    private TOKEN: string;
    private API_VERSION: string;
    private axios: AxiosInstance;
    
    constructor(url: string, port: number, API_VERSION?: string){
        if (typeof url == undefined || typeof port == undefined){
            throw new Error('> Http API URL is required');
        }
        //Set API_VERSION default - v1
        if (typeof API_VERSION != 'string'){
            this.API_VERSION = "v1"
        }else{
            this.API_VERSION = API_VERSION;
        }

        this.url = `${url}:${port}/api/${this.API_VERSION}`;
        this.TOKEN = "";

        this.axios = axios.create({
            baseURL: url,
            maxRedirects: 0,
            proxy: false,
            headers: {
              'User-Agent': getUserAgent(),
              'Host': `${ this.url.split('/')[2].split(':')[0]}:${port}`
            },
          });
    }


    /***
     * Read more: https://www.sinusbot.com/api/#api-General-login
     * @description Most calls also require a valid authentication token that can be obtained by the login-call.
     * @param Login
     */
    public async login(cfg: Login) : Promise<LoginResponse>{
        if (cfg.botId == undefined){
            //botId unknow - call botId automatic
            cfg.botId = await (await this.getBotId()).defaultBotId;
        }
        try {
            const response = await this.axios.post(this.url + "/bot/login", cfg);
           const status = response.data as LoginResponse
            if (status.success){
                this.TOKEN = status.token;
            }
            return status;
          } catch (error) {
            // Wrap errors in this packages own error types (abstract the implementation details' types)
            if (error.response !== undefined) {
              throw httpErrorWithOriginal(error);
            } else if (error.request !== undefined) {
              throw requestErrorWithOriginal(error);
            } else {
              throw error;
            }
        }

    }
    /***
     * Read more: not in docu
     * @description Get the bot instance id. You need that for example login function
     * 
     */
    public async getBotId() : Promise<BotIdResult>{
        try {
            const response = await this.axios.get(this.url + "/botId");
            return response.data as BotIdResult;
          } catch (error) {
            // Wrap errors in this packages own error types (abstract the implementation details' types)
            if (error.response !== undefined) {
              throw httpErrorWithOriginal(error);
            } else if (error.request !== undefined) {
              throw requestErrorWithOriginal(error);
            } else {
              throw error;
            }
          }

    }


}
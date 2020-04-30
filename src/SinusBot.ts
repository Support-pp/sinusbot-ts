import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getUserAgent } from './instrument';
import { httpErrorWithOriginal, requestErrorWithOriginal } from './error'
import {
    Login,
    BotIdResult,
    LoginResponse,
    BotInfoResponse,
    Instance,
    InstanceStartResponse,
    InstanceSettings,
    InstanceStatus,
    CreateInstance,
    CreateInstanceResponse

}from "./index"
import { BotResponse } from './types/bot';
import { Settings } from 'http2';


export class SinusBot {


    private url: string;
    private TOKEN: string;
    private API_VERSION: string;
    private Port: number;
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
        this.Port = port;

        this.axios = axios.create({
            baseURL: url,
            maxRedirects: 0,
            proxy: false,
            headers: {
              'User-Agent': getUserAgent(),
              'Host': `${ this.url.split('/')[2].split(':')[0]}:${port}`,
              'Authorization': `Bearer ${this.TOKEN}`
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
                this.axios = axios.create({
                    headers: {
                      'Authorization': `Bearer ${this.TOKEN}`
                    },
                  });
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

    /***
     * Read more: not in docu 
     * - but I think this function should be use to check the authorization.
     * 
     * @description Get infos about the Bot. (allowedBackends, id)
     * @access token
     */
    public async getBot() : Promise<BotResponse>{
        try {
            const response = await this.axios.get(this.url + "/bot");
            return response.data as BotResponse;
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
     * - but I think this function should be use to check the authorization.
     * 
     * @description Get infos about the Bot. (allowedBackends, id)
     * @access token
     */
    public async getBotInfo() : Promise<BotInfoResponse>{
        try {
            const response = await this.axios.get(this.url + "/bot/info");
            return response.data as BotInfoResponse;
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
     * Read more: https://www.sinusbot.com/api/#api-Instances-getInstances
     * 
     * @description Get a array of instances
     * @access token
     */
    public async getInstances() : Promise<Instance[]>{
        try {
            const response = await this.axios.get(this.url + "/bot/instances");
            return response.data as Instance[];
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
     * Read more: https://www.sinusbot.com/api/#api-Instances-spawn
     * 
     * @description Start an instance by uid
     * @param uid
     * @access token
     */
    public async startInstance(uid: string) : Promise<InstanceStartResponse>{
        try {
            const response = await this.axios.post(this.url + `/bot/i/${uid}/spawn`);
            return response.data as InstanceStartResponse;
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
     * Read more: https://www.sinusbot.com/api/#api-Instances-respawn
     * 
     * @description reStart an instance by uid
     * @param uid
     * @access token
     */
    public async restartInstance(uid: string) : Promise<InstanceStartResponse>{
        try {
            const response = await this.axios.post(this.url + `/bot/i/${uid}/respawn`);
            return response.data as InstanceStartResponse;
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
     * Read more: https://www.sinusbot.com/api/#api-Instances-kill
     * 
     * @description stop an instance by uid
     * @param uid
     * @access token
     */
    public async stopInstance(uid: string) : Promise<InstanceStartResponse>{
        try {
            const response = await this.axios.post(this.url + `/bot/i/${uid}/kill`);
            return response.data as InstanceStartResponse;
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
     * Read more: https://www.sinusbot.com/api/#api-Instances-getSettings
     * 
     * @description get settings of an instance by uid
     * @param uid
     * @access token
     */
    public async getInstanceSettings(uid: string) : Promise<InstanceSettings>{
        try {
            const response = await this.axios.get(this.url + `/bot/i/${uid}/settings`);
            return response.data as InstanceSettings;
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
     * Read more: https://www.sinusbot.com/api/#api-Instances-getSettings
     * 
     * @description set or update settings of an instance by uid
     * @param uid
     * @param InstanceSettings
     * @access token
     */
    public async setinstanceSettings(uid: string, conf: InstanceSettings) : Promise<InstanceStartResponse>{
        try {
            const response = await this.axios.post(this.url + `/bot/i/${uid}/settings`, conf);
            return response.data as InstanceStartResponse;
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
     * Read more: https://www.sinusbot.com/api/#api-Instances-getStatus
     * 
     * @description get status of an instance by uid
     * @param uid
     * @access token
     */
    public async getInstanceStatus(uid: string) : Promise<InstanceStatus>{
        try {
            const response = await this.axios.get(this.url + `/bot/i/${uid}/status`);
            return response.data as InstanceStatus;
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
     * Read more: https://www.sinusbot.com/api/#api-Instances-createInstance
     * 
     * @description create a new instance
     * @param CreateInstance
     * @access token
     */
    public async createInstance(conf: CreateInstance) : Promise<CreateInstanceResponse>{
        try {
            const response = await this.axios.post(this.url + `/bot/instances`, conf);
            return response.data as CreateInstanceResponse;
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
     * Read more: https://www.sinusbot.com/api/#api-Instances-deleteInstance
     * 
     * @description remove a new instance
     * @param uid
     * @access token
     */
    public async deleteInstance(uid: string) : Promise<CreateInstanceResponse>{
        try {
            const response = await this.axios.delete(this.url + `/bot/instances/${uid}`);
            return response.data as CreateInstanceResponse;
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
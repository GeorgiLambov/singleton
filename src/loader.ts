/*
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: EPL-2.0
 */
import axios from 'axios';
import {basedLogger, Logger} from './logger';

export abstract class Loader {
    abstract getI18nResource(url: string, timeout: number): Promise<{ [key: string]: any }>;
}

class RestLoader implements Loader {

     /**
     * Get the i18n resource from VIP server in async mode.
     * By default, timeout time 3 sec.
     *
     * @param {string} url
     * @returns {*}
     * @memberof VIPRestLoader
     */
    private logger: Logger;
    constructor() {
        this.logger = basedLogger.create('RestLoader');
    }
    getI18nResource(url: string, timeout: number): Promise<{ [key: string]: any }> {
        return axios.get( url, { timeout: timeout} ).then( ( response: { [key: string]: any } ) => {
            const res = response.data;
            return res;
        }).catch( ( reason: any ) => {
            this.logger.error(reason.message);
        });
    }
}

export const defaultLoader = new RestLoader();
import { expect, APIRequestContext } from '@playwright/test';
import { handleError } from './error_handler';



export class Oxford {
    readonly reqContext: APIRequestContext;

    constructor (request: APIRequestContext) {
        this.reqContext = request;   
    }

    public async search (keyword: string, limit: number, status: number){
        let statusResponse: any
        let callResponse: any

        const response = await this.reqContext.get(`${process.env.OXFORD_API_BASE_URL}search/en-gb`, {
            headers: { 
                app_id: `${process.env.OXFORD_APP_ID}`,
                app_key: `${process.env.OXFORD_APP_KEY}`
            },
            params: {
                q: keyword ,
                limit: limit
            }
        });

        statusResponse = response.status()
        try {
            callResponse = await response.json();
        } catch (e) {
            callResponse = 'Bad Request';
        }

        try {
            expect(statusResponse, 'Expected status').toBe(status);
        } catch (e) {
            await handleError('Error in searching', statusResponse, typeof callResponse === 'object' ? JSON.stringify(callResponse) : callResponse);
        }

        return callResponse
    }

    public async get_entry (keyword: string, status: any){
        let statusResponse: any
        let callResponse: any

        const response = await this.reqContext.get(`${process.env.OXFORD_API_BASE_URL}words/en-gb`, {
            headers: { 
                app_id: `${process.env.OXFORD_APP_ID}`,
                app_key: `${process.env.OXFORD_APP_KEY}`
            },
            params: {
                q: keyword
            }
        });

        statusResponse = response.status()
        try {
            callResponse = await response.json();
        } catch (e) {
            callResponse = 'Bad Request';
        }

        try {
            expect(statusResponse, 'Expected status').toBe(status);
        } catch (e) {
            await handleError('Error in retrieving entry', statusResponse, typeof callResponse === 'object' ? JSON.stringify(callResponse) : callResponse);
        }

        return callResponse
    }
}
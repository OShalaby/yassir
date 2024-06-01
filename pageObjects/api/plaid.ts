import { expect, APIRequestContext } from '@playwright/test';
import { handleError } from './error_handler';



export class Plaid {
    readonly reqContext: APIRequestContext;

    constructor (request: APIRequestContext) {
        this.reqContext = request;   
    }

    public async get_public_token (products: any, status: any){
        let statusResponse: any
        let callResponse: any

        const response = await this.reqContext.post(`${process.env.PLAID_BASE_URL}sandbox/public_token/create`, {
            data: {
                client_id: `${process.env.PLAID_CLIENT_ID}`,
                secret: `${process.env.PLAID_SECRET_KEY}`,
                institution_id: "ins_20",
                initial_products: products,
                options: {
                    webhook: "https://www.genericwebhookurl.com/webhook"
                }
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
            await handleError('Error authentication & retrieving public access token', statusResponse, typeof callResponse === 'object' ? JSON.stringify(callResponse) : callResponse);
        }

        return callResponse
    }

    public async exchange_public_token (plaid_public_token: any, status: any){
        let statusResponse: any
        let callResponse: any

        const response = await this.reqContext.post(`${process.env.PLAID_BASE_URL}item/public_token/exchange`, {
            data: {
                client_id: `${process.env.PLAID_CLIENT_ID}`,
                secret: `${process.env.PLAID_SECRET_KEY}`,
                public_token: plaid_public_token
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
            await handleError('Error exchanging public token for access token', statusResponse, typeof callResponse === 'object' ? JSON.stringify(callResponse) : callResponse);
        }

        return callResponse
    }

    public async retrieve_account_balance (plaid_access_token: any, status: any){
        let statusResponse: any
        let callResponse: any

        const response = await this.reqContext.post(`${process.env.PLAID_BASE_URL}accounts/balance/get`, {
            data: {
                client_id: `${process.env.PLAID_CLIENT_ID}`,
                secret: `${process.env.PLAID_SECRET_KEY}`,
                access_token: plaid_access_token
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
            await handleError('Error retrieving accounts & balances', statusResponse, typeof callResponse === 'object' ? JSON.stringify(callResponse) : callResponse);
        }

        return callResponse
    }

    public async create_assets_report (plaid_access_token: any, status: any){
        let statusResponse: any
        let callResponse: any

        const response = await this.reqContext.post(`${process.env.PLAID_BASE_URL}asset_report/create`, {
            data: {
                client_id: `${process.env.PLAID_CLIENT_ID}`,
                secret: `${process.env.PLAID_SECRET_KEY}`,
                access_tokens: [plaid_access_token],
                days_requested: 30,
                options: {
                    client_report_id: "123",
                    webhook: "https://www.example.com/webhook",
                    user: {
                        client_user_id: "ABC123",
                        first_name: "Omar",
                        middle_name: "Khaled",
                        last_name: "Shalaby",
                        ssn: "111-22-1234",
                        phone_number: "1-415-867-5309",
                        email: "email@domain.com"
                    }
                }
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
            await handleError('Error creating assets report', statusResponse, typeof callResponse === 'object' ? JSON.stringify(callResponse) : callResponse);
        }

        return callResponse
    }

    public async get_assets_report (plaid_asset_report_token: any, status: any){
        let statusResponse: any
        let callResponse: any

        const response = await this.reqContext.post(`${process.env.PLAID_BASE_URL}asset_report/get`, {
            data: {
                client_id: `${process.env.PLAID_CLIENT_ID}`,
                secret: `${process.env.PLAID_SECRET_KEY}`,
                asset_report_token: plaid_asset_report_token
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
            await handleError('Error retrieving assets report', statusResponse, typeof callResponse === 'object' ? JSON.stringify(callResponse) : callResponse);
        }

        return callResponse
    }
    
}
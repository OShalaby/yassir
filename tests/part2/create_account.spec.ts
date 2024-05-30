import { test, expect } from '@playwright/test';
import { parseStringPromise } from 'xml2js';



test.describe.serial('Login to parabank & request a loan', () => {
    test.skip();
    
    let customerId, accountId;

    test('login & acquire customerId', async ({ request }) => {
        const response = await request.get(`${process.env.PARABANK_BASE_URL}services/bank/login/${process.env.PARABANK_USERNAME}/${process.env.PARABANK_PASSWORD}`, {});

        const status = response.status();
        const respBody = await response.text();
        console.log("🚀 ~ test ~ respBody:", respBody)
        const response2js = await parseStringPromise(respBody);
        customerId = response2js.customer.id[0]
        
        expect(status).toEqual(200);
    });

    test('acquire accountId using customerId', async ({ request }) => {
        const response = await request.get(`${process.env.PARABANK_BASE_URL}services/bank/customers/${customerId}/accounts`, {});

        const status = response.status();
        const respBody = await response.text();
        const response2js = await parseStringPromise(respBody);
        accountId = response2js.accounts.account[0].id[0]
        
        expect(status).toEqual(200);
    });

    test('apply for loan', async ({ request }) => {
        const response = await request.post(`${process.env.PARABANK_BASE_URL}services/bank/requestLoan`, {
            data: { 
                customerId: customerId,
                amount: 300,
                downPayment: 50,
                fromAccountId: accountId
            }
        });

        const status = response.status();
        const respBody = await response.text();
        console.log("🚀 ~ test ~ respBody:", respBody)
        // const response2js = await parseStringPromise(respBody);
        // console.log("🚀 ~ test ~ response2js:", response2js)
        
        expect(status).toEqual(200);
    });
});




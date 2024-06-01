import { test, expect } from '@playwright/test';
import { Plaid } from '@api/plaid';



test.describe.serial('Authenticate Plaid', () => {
    
    let plaid, account, plaid_public_token, plaid_access_token;
        
    test.beforeEach(async ({ request }) => {
        plaid = new Plaid(request);
    });

    test('create auth public token', async () => {
        const products = ["auth"];
        const response = await plaid.get_public_token(products, 200);
        plaid_public_token = response.public_token
    });

    test('exchange public token for access token', async () => {
        const response = await plaid.exchange_public_token(plaid_public_token, 200);
        plaid_access_token = response.access_token
    });

    test('retrieve gold account balance', async () => {
        const response = await plaid.retrieve_account_balance(plaid_access_token, 200);
        account = response.accounts.find(entry => entry.official_name.includes("Plaid Gold"));
        expect(account.balances.available).toEqual(100);
    });
});

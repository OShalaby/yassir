import { test, expect } from '@playwright/test';
import { Plaid } from '@api/plaid';



test.describe.serial('Plaid Report', () => {
    
    let plaid, plaid_public_token, plaid_access_token, plaid_asset_report_token;

    test.beforeEach(async ({ request }) => {
        plaid = new Plaid(request);
    });
    
    test('create assets public token', async () => {
        const products = ["assets"];
        const response = await plaid.get_public_token(products, 200);
        plaid_public_token = response.public_token
    });

    test('exchange public token for access token', async () => {
        const response = await plaid.exchange_public_token(plaid_public_token, 200);
        plaid_access_token = response.access_token
    });

    test('create assets report', async () => {
        const response = await plaid.create_assets_report(plaid_access_token, 200);
        plaid_asset_report_token = response.asset_report_token;
    });

    test('retrieve json asset report', async () => {
        await expect(async () => {
            const response = await plaid.get_assets_report(plaid_asset_report_token, 200);
            expect(response.report.user.last_name).toBe("Shalaby");
        }).toPass({
            intervals: [5000, 5000],
            timeout: 15000
        });
    });
});

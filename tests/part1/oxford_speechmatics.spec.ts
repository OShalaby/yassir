import { test, expect } from '@playwright/test';
import { Oxford } from '@api/oxford';
import { writeFile } from 'fs/promises'
import { Speechmatics } from '@api/speechmatics';



const fs = require('fs');

test.describe.serial('Search & Retrieve from Oxford & Transcribe from Speechmatics', () => {

    let oxford, speechmatics, keyword, fileUrl, filePath;

    test.beforeEach(async ({ request }) => {
        oxford = new Oxford(request);
        speechmatics = new Speechmatics;
        keyword = 'Animal'
    });

    test('Search Oxford Dictionary', async () => {
        const response = await oxford.search(keyword, 5, 200);
        expect(response.results.length).toEqual(5);
        expect(response.results[0].score).toBeGreaterThan(100);
    });

    test('Retrieve Oxford Dictionary Entry', async ({ request }) => {
        const response = await oxford.get_entry(keyword, 200)
        expect(response.metadata.schema).toContain('RetrieveEntry');

        fileUrl = response.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile
        
        try {
            filePath = 'voice.mp3';
            const download = await request.get(fileUrl);
            const fileBuffer = await download.body();
            await writeFile(filePath, fileBuffer);
    
            console.log('File downloaded successfully!');
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    });

    test(`Transcribe voice mp3 from Speechmatics`, async () => {
        const input = fs.readFileSync(filePath);
        await speechmatics.transcribe(input, keyword, 200)
    });
});

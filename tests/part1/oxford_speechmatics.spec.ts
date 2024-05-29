import { test, expect } from '@playwright/test';
import { writeFile } from 'fs/promises'


const fs = require('fs');

test.describe.serial('Search & Retrieve from Oxford & Transcribe from Speechmatics', () => {

    let fileUrl;

    test('Search Oxford Dictionary', async ({ request }) => {
        const searchResults = await request.get(`${process.env.OXFORD_API_BASE_URL}search/en-gb`, {
            headers: { 
                app_id: `${process.env.OXFORD_APP_ID}`,
                app_key: `${process.env.OXFORD_APP_KEY}`
            },
            params: {
                q: 'animal' ,
                limit: 5
            }
        });

        const response = await searchResults.json();
        const status = searchResults.status();
        
        expect(status).toEqual(200);
        expect(response.results.length).toEqual(5);
        expect(response.results[0].score).toBeGreaterThan(100);
    });

    test('Retrieve Oxford Dictionary Entry', async ({ request }) => {
        const searchResults = await request.get(`${process.env.OXFORD_API_BASE_URL}words/en-gb`, {
            headers: { 
                app_id: '6a258888',
                app_key: 'd0acaa6823d40f1d5726246e5f399da2'

            },
            params: {
                q: 'animal'
            }
        });

        const response = await searchResults.json();
        const status = searchResults.status();
        
        expect(status).toEqual(200);
        expect(response.metadata.schema).toContain('RetrieveEntry');
        
        fileUrl = response.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile
        
        try {
            const filePath = 'downloaded.mp3';
            const download = await request.get(fileUrl);
            const fileBuffer = await download.body();
            await writeFile(filePath, fileBuffer);
    
            console.log('File downloaded successfully!');
        } catch (error) {
            console.error('Error downloading file:', error);
        }
        
    });

    test(`Transcribe voice mp3 from Speechmatics`, async () => {
        const { Speechmatics } = require('speechmatics');
        
        const sm = new Speechmatics(process.env.SPEECHMATICS_API_KEY);
        const input = new Blob([
            fs.readFileSync('downloaded.mp3'),
        ]);

        await sm.batch
        .transcribe({
            input,
            transcription_config: { language: 'en' },
            format: 'text',
        })
        .then((transcriptText) => {
            expect(transcriptText).toContain('Animal')
        })
        .catch((error) => {
            console.log(error);
            process.exit(1);
        });
    });
});
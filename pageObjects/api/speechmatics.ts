import { expect } from '@playwright/test';



const fs = require('fs');

export class Speechmatics {
    public async transcribe (input: any, keyword: string){
        const { Speechmatics } = require('speechmatics');
        
        const sm = new Speechmatics(process.env.SPEECHMATICS_API_KEY);

        await sm.batch
        .transcribe({
            input: new Blob([input]),
            transcription_config: { language: 'en' },
            format: 'text',
        })
        .then((transcriptText) => {
            expect(transcriptText).toContain(keyword)
        })
        .catch((error) => {
            console.log(error);
            process.exit(1);
        });
    }
}
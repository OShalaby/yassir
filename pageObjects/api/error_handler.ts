export async function handleError(message: string, statusResponse: number, callResponse?: any): Promise<void> {
    const errorMessage =
        `${message}\n` +
        `Status: ${statusResponse}\n` +
        (statusResponse === 400 || statusResponse === 404 ? 'Message' : 'Error message') +
        `: ${callResponse?.message ?? callResponse ?? ''}`;
    throw new Error(errorMessage);
}
export function getTimestampFromString(timestampString: string): Date {
    const timestampNumber = Number(timestampString);
    if (isNaN(timestampNumber)) {
        throw new Error('Invalid timestamp string');
    }
    return new Date(timestampNumber);
}
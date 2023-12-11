export function createFileName(filename) {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${filename}-${timestamp}-${randomString}`;
}
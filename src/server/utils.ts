const crypto = require("crypto-js");
export function makeIdGenerator() {
    let lastId = 0;

    return (() => () => {
        lastId += 1;

        return lastId;
    })();
}

export function delayResponse<T>(input: Promise<T> | (() => Promise<T>), time = 500): Promise<T> {
    return new Promise<T>((resolve) => {
        setTimeout(resolve, time);
    }).then(() => (input instanceof Promise ? input : input()));
}

export function error<T>(message: string): Promise<T> {
    return Promise.reject<T>(new Error(message));
}

export function clone(data: any): any {
    return JSON.parse(JSON.stringify(data));
}

export function nameToSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/, "-").replace(/-+/, "-");
}
export function encrypted(date: string): string {
    return crypto.AES.encrypt(date, "Anc0n@autopart3s2021").toString();
}

export function decrypted(date: string): string {
    return crypto.AES.decrypt(date, "Anc0n@autopart3s2021").toString(crypto.enc.Utf8);
}

export function encryptedB64(date: string) {
    let encJson = crypto.AES.encrypt(JSON.stringify(date), "Anc0n@autopart3s2021").toString()
    let encData = crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(encJson))
    return encData;
}

export function decryptedB64(date: string) {
    let decData = crypto.enc.Base64.parse(date).toString(crypto.enc.Utf8)
    let bytes = crypto.AES.decrypt(decData, "Anc0n@autopart3s2021").toString(crypto.enc.Utf8)
    return JSON.parse(bytes)
}
// const urlEnv = process.env.URL_SERVER_FILES;
export const serverURLFiles = process.env.URL_SERVER_FILES;

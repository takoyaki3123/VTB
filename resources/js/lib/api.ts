/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const isLocal = document.location.hostname === '127.0.0.1' || document.location.hostname === 'localhost';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const request = axios.create({
    timeout: 120000,
});
// request.defaults.headers.post['Content-Type'] = 'application/json';
interface SettingResult {
    headers: {
        method: string;
        url: string;
        data: object;
    };
    domain: string;
    body: {
        body: Record<string, any>;
    };
}
const setting = (urlCode: string, data: object, newSetting?: object, method: string = 'post') => {
    return new Promise<SettingResult>((resolve) => {
        const header = { method: method, url: "/api/" + urlCode, data: data , ...newSetting};
        const bodyData = { body: {} };
        bodyData.body = data;
        const domain = isLocal ? "127.0.0.1" : "";
        resolve({ headers: header, "domain": domain, body: bodyData });
    })
}

const baseGetApi = (urlCode: string, newSetting: object, outside: boolean = false) => {
    return new Promise<uploadRes>((resolve, reject) => {
        setting(urlCode, {}, newSetting, 'get').then((res: SettingResult) => {
            axios
            request.get(outside ? urlCode : res.headers.url, res.headers).then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.response);
            });
        })
    })
}

const baseApi = (urlCode: string, data: object) => {
    return new Promise<uploadRes>((resolve, reject) => {
        setting(urlCode, data).then((res: SettingResult) => {
            request.post(res.headers.url, res.body, res.headers).then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err.response);
            });
        })
    })
}

export interface uploadRes {
    data: any
}
const uploadApi = (urlCode: string, data: object) => {
    return new Promise<uploadRes>((resolve, reject) => {
        setting(urlCode, data).then((res) => {

            const formData = new FormData();
            Object.keys(res.body.body).forEach((key) => {
                formData.append(key, res.body.body[key]);
            })
            for (const key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
            request.post(res.headers.url, formData, {
                headers:
                {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                // alert("upload success");
                resolve(res)
            })
            .catch((err) => {
                console.log('error api');
                reject(err);
            });
        })
    })
}

const isError = (res: { msg: string; }) => {
    return res.msg ? true : false;
}

async function getCsrfToken() {
    try {
        await axios.get('/sanctum/csrf-cookie');
        console.log('CSRF cookie set');
    } catch (error) {
        console.error('Error fetching CSRF cookie', error);
    }
}
getCsrfToken();
export {
    baseApi,
    baseGetApi,
    uploadApi,
    isError
}
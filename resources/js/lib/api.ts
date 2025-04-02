/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const isLocal = document.location.hostname === '127.0.0.1' || document.location.hostname === 'localhost';
const request = axios.create({
  timeout:120000,
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
const setting = (urlCode: string, data: object) => {
  console.log("setting");
  return new Promise<SettingResult>((resolve) => {
    const header = {method:"post", url:"/api/"+urlCode, data:data};
    const bodyData = {body:{}};
    bodyData.body = data;
    console.log("bodyData",bodyData);
    const domain = isLocal?"127.0.0.1":"";
    console.log("header",header);
    resolve({headers:header, "domain": domain,body:bodyData});
  })
}

const baseApi = (urlCode: string, data: object) => {
 return new Promise<uploadRes>((resolve,reject) => {
  setting(urlCode, data).then((res: SettingResult) => {
    console.log("api");
    request.post(res.headers.url,res.body).then((res) => {
        console.log("data",data);
        console.log(res);
      resolve(res)
    })
    .catch((err) => {
      console.log('error api');
      reject(err);
    });
  })
 })
}

export interface uploadRes {
    data: {
        [x: string|number]: any;
        msg: string
    }
}
const uploadApi = (urlCode: string,data: object) => {
 return new Promise<uploadRes>((resolve,reject) => {
  setting(urlCode, data).then((res) => {

    const formData = new FormData();
    Object.keys(res.body.body).forEach((key)=>{
      formData.append(key,res.body.body[key]);
    })
    for (const key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }
    request.post(res.headers.url,formData,{
      headers:
        {
          'Content-Type':'multipart/form-data'
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
  return res.msg?true:false;
}

export {
  baseApi,
  uploadApi,
  isError
}
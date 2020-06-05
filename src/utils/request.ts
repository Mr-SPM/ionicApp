// 默认导出防重复提交函数

import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from './urlPrefix';
/* 防止重复提交，利用axios的cancelToken */
let pending = new Set<string>(); // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识

console.log(BASE_URL);

function removePending(url?: string) {
  if (url) {
    pending.delete(url);
  }
}

/* 创建axios实例 */
export const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 请求超时时间
});

/* request拦截器 */
request.interceptors.request.use(
  (config) => {
    // 在这里可以统一修改请求头，例如 加入 用户 token 等操作
    //   if (store.getters.sessionId) {
    //     config.headers['X-SessionId'] = getSessionId(); // 让每个请求携带token--['X-Token']为自定义key
    //   }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

/* respone拦截器 */
request.interceptors.response.use(
  (response) => {
    // 移除队列中的该请求，注意这时候没有传第二个参数f
    removePending(response.config.url);
    // 获取返回数据，并处理。按自己业务需求修改。下面只是个demo
    const res = response.data;
    if (response.status !== 200) {
      //   if (res.code === 401) {
      //     if (location.hash === '#/') {
      //       return res;
      //     } else {
      //       location.href = '/#/';
      //     }
      //   }
      return Promise.reject('error');
    } else {
      return res;
    }
  },
  (error: any) => {
    // 异常处理
    console.log(error);
    pending = new Set<string>();
    //  if (error.message === '取消重复请求') {
    //      return Promise.reject(error);
    //  }
    return Promise.reject(error);
  }
);

// 默认导出请求函数
export default function requestUtil(
  url: string,
  config?: AxiosRequestConfig,
  noCancel?: boolean
) {
  if (noCancel) {
    return request.request({ ...config, url });
  }
  if (!pending.has(url)) {
    pending.add(url);
    return request.request({ ...config, url });
  } else {
    return Promise.reject(`${url}上一次请求并未结束！`);
  }
}

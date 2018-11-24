import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.interceptors.request.use(config => {
  // 显示loading
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.resolve(error.response);
});

function errorState(response) {
  // 隐藏loading
  console.log(response);
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response;
  // 如果不需要除了data之外的数据，可以直接 return response.data
  } else {
    Message.error('网络异常');
  }
}

function successState(res) {
  // 隐藏loading
  // 统一判断后端返回的错误码
  if (res.data.stringReturn && !res.data.stringReturn.success) {
    Message.error(res.data.stringReturn.message || '网络异常');
    console.log(res);
  } else if (res.data.WSListReturn && !res.data.WSListReturn.success) {
    Message.error(res.data.WSListReturn.message || '网络异常');
    console.log(res);
  }
}
const httpServer = (opts, data) => {
  // 公共参数
  let Public = {};
  let baseURL = process.env.BASE_API;
  // http默认配置
  let httpDefaultOpts = {
    method: opts.method,
    baseURL,
    url: opts.url,
    timeout: 10000,
    params: Object.assign(Public, data),
    data: qs.stringify(Object.assign(Public, data)),
    headers: opts.method === ' get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    } : {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };

  if (opts.method === 'get') {
    delete httpDefaultOpts.data;
  } else {
    delete httpDefaultOpts.params;
  }
  let promise = new Promise(function(resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res);
        resolve(res);
      }
    ).catch(
      (response) => {
        errorState(response);
        reject(response);
      }
    );
  });
  return promise;
};
export default httpServer;

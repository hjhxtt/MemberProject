// 1.引入axios
import axios from 'axios';

// 2.配置默认值
// dev
axios.defaults.baseURL = 'http://47.102.112.51';
// test
// axios.defaults.baseURL = 'http://47.101.57.167';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;

// 3.封装

export default function request(url, type = 'GET', data = {},headers = {}) {
  return new Promise((resolve, reject) => {
    //配置参数对象
    let option = {
      url,
      method: type,
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 400;
      },
      headers: headers
    };
    // 对get和post请求传递的数据进行区分
    if (type.toLowerCase() === 'get') {
      option.params = data;
    } else {
      option.data = data;
    }
    axios(option).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(err => {
      reject({
        msg: '网络异常'
      })
    })
  })

}
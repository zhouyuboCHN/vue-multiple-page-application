import axios from 'axios';
import config from '../../config'

let http = axios.create({
  // 前置
  baseURL: config.apiHost,
  // 设置headers
  headers:{
    'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
  },
  // 发送之前
  transformRequest:(data)=>{
    return data
  },
  // try catch之前
  transformResponse:(data)=>{
    return data
  }
})

export default http

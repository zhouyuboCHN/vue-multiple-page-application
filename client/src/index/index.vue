<template>
  <div id="app">
    <img src="./assets/index.jpg">
    <a href="./product.html" class="button">跳转页面</a>
    <h1 class="indexMessage">{{ text }}</h1>
    <h2 class="fa fa-folder">首页</h2>
  </div>
</template>

<script>
import { http } from '../../tools'

import '../../rootStatic/style/reset.scss'
import './index.scss'

export default {
  name: 'app',
  data () {
    return {
      text: '(≧∇≦)ﾉ'
    }
  },
  mounted() {
    http.post('api/user/smsCode',{
      mobile:'13067796226'
    })
    .then(response=>{
      console.log(response,'success')
    },response=>{
      console.log(response,'bad');
    }).catch(error=>{
      console.log(error,'error')
    })
  },
}
</script>


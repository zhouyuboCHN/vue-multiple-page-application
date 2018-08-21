<template>
  <div id="app">
    <img src="./assets/product.jpg">
    <a href="./index.html" class="button">跳转页面</a>
    <h1 class="productMessage">{{ text }}</h1>
    <h2 class="fa fa-folder">首页</h2>
  </div>
</template>

<script>
import '../../rootStatic/style/reset.scss'
import './product.scss'

export default {
  name: 'app',
  data () {
    return {
      text: '（づ￣3￣）づ╭❤～'
    }
  }
}
</script>

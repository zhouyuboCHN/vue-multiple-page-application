<template>
  <div id="header">
    <h1>{{text}}</h1>
  </div>
</template>

<script>
import { http } from '../../tools'

import '../../rootStatic/style/reset.scss'
import './header.scss'

export default {
  name: 'CHeader',
  data () {
    return {
      text: 'header'
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


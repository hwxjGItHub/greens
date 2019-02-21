<template>
    <div class="login-notice">
      可供登录的账号
      <div class="item" v-for="item in userList" :key="item._id">
        账号: {{item._id}}
        密码：{{item._password}}
      </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'LoginNotice',
    computed: mapState(['userList'])
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .login-notice
    .item
      margin-top: 5px
</style>

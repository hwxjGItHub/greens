<template>
    <div class="please-login">
      <div class="collect-content" v-if="$route.path === '/collect'">
        <div class="login-content">
          <div class="login-title">
            把美食和爱保存下来
          </div>
          <div class="login-text">
            没人生来就是好厨师，轻点收藏，将你最喜欢的菜谱保存下来，为你的下一顿私房红烧肉做好准备
          </div>
        </div>
        <div class="login-button">
          <div class="top" @click="showLogin(true)">
            手机号登录
          </div>
          <div class="bottom" @click="showNonsupport(true)">
            手机号注册
          </div>
        </div>
      </div>
      <div class="message-content" v-if="$route.path === '/message'">
        <div class="login-content">
          <div class="login-title">
            你有一个小信箱
          </div>
          <div class="login-text">
            美味调剂生活，订阅你最喜欢的栏目，将会在这里收到最新的高人气菜谱和美文
          </div>
        </div>
        <div class="login-button">
          <div class="top" @click="showLogin(true)">
            手机号登录
          </div>
          <div class="bottom" @click="showNonsupport(true)">
            手机号注册
          </div>
        </div>
      </div>
      <div class="person-content" v-if="$route.path === '/person'">
        <div class="login-content">
          <div class="login-title">
            开始准备好好吃饭
          </div>
          <div class="login-text">
            好好吃饭用心生活，比什么都幸福，保存你最喜欢的美食，分享你的三餐，关注厨房里的达人
          </div>
        </div>
        <div class="login-button">
          <div class="top" @click="showLogin(true)">
            手机号登录
          </div>
          <div class="bottom" @click="showNonsupport(true)">
            手机号注册
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import * as types from '../../store/mutations-types'
  import { mapMutations } from 'vuex'
  export default {
    name: 'PleaseLogin',
    methods: {
      ...mapMutations({
        showLogin: types.TOGGLE_LOGIN,
        showNonsupport: types.TOGGLE_TEMPORARY_NONSUPPORT
      })
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .please-login
    position: relative
    width: 100%
    height: 100%
    box-sizing: border-box
    .collect-content, .message-content, .person-content
      width: 100%
      height: 100%
      .login-content
        position: absolute
        left: 0
        right: 0
        text-align: center
        top: 35%
        margin: 0 20px
        .login-title
          font-size: 26px
        .login-text
          margin-top: 20px
          font-size: 12px
      .login-button
        font-size: 14px
        position: absolute
        left: 0
        right: 0
        top: 55%
        margin: 20px
        .top, .bottom
          padding: 5px 0
          text-align: center
          color: #fff
        .top
          background-color: #6fbd53
        .bottom
          background-color: #f96650
          margin-top: 13px
</style>

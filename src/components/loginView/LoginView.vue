<template>
    <div class="login">
      <div class="login-header">
        <mu-appbar color="#fff" style="width: 100%;" z-depth="0">
          <mu-button icon slot="left" @click="toggleLogin(false)">
            <mu-icon value="keyboard_arrow_left" color="#000"></mu-icon>
          </mu-button>
          <div class="title">
            登录
          </div>
          <mu-button slot="right" icon></mu-button>
        </mu-appbar>
      </div>
      <div class="login-table">
        <div class="user-id">
          <mu-text-field v-model="userId" class="input" full-width solo placeholder="手机号"></mu-text-field>
        </div>
        <div class="password">
          <mu-text-field v-model="password" class="input" full-width solo placeholder="登录密码"></mu-text-field>
        </div>
      </div>
      <div class="login-button">
        <div @click="loginClick" class="button" :class="{existValue: userId && password}">登录</div>
      </div>
      <div class="problem">
        <div class="left"></div>
        <div class="right">登录遇到问题？</div>
      </div>
      <div v-if="!nowUser.verification" class="verification">
        账号或密码错误!
      </div>
      <div class="login-notice">
        <login-notice></login-notice>
      </div>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import * as types from '../../store/mutations-types'
  import LoginNotice from '../loginNotice/LoginNotice'
  export default {
    name: 'LoginView',
    data() {
      return {
        userId: '',
        password: ''
      }
    },
    computed: mapState(['nowUser']),
    methods: {
      ...mapMutations({
        toggleLogin: types.TOGGLE_LOGIN,
        login: types.LOGIN
      }),
      loginClick() {
        if (this.userId && this.password) {
          this.login({userId: this.userId, password: this.password});
          this.toggleLogin(!this.nowUser.verification);
        }
      }
    },
    components: {
      LoginNotice
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .login
    .login-header
      height: 40px
      .mu-appbar
        height: 40px
        .title
          color: #000
          font-size: 16px
          text-align: center
          height: 40px
          line-height: 40px
    .login-table
      margin-top: 15px
      .user-id
        border-top: 1px solid rgba(7, 17, 27, .1)
        .input
          padding: 5px 15px
          min-height: 0
          font-size: 16px
      .password
        border-top: 1px solid rgba(7, 17, 27, .1)
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        .input
          padding: 5px 15px
          min-height: 0
          font-size: 16px
    .login-button
      padding: 15px
      box-sizing: border-box
      .button
        background-color: #c6c6bd
        color: #fff
        font-size: 16px
        line-height: 36px
        text-align: center
        &.existValue
          background-color: #f96650
    .problem
      display: flex
      justify-content: space-between
      padding: 0 15px
      font-size: 12px
    .verification
      padding: 15px
      color: #f96650
    .login-notice
      padding: 10px
</style>

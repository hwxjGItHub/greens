<template>
  <div class="person">
    <div class="please-login" v-if="!isLogin">
      <please-login></please-login>
    </div>
    <div class="confirm-exit" v-show="confirm && isLogin">
      <div class="confirm">
        <div class="confirm-title">
          您确定要退出当前账号吗？
        </div>
        <div class="button">
          <mu-button color="#f96650" @click="logoutClick">确定</mu-button>
          <mu-button @click="$emit('hideConfirm')" color="info" class="button-right">取消</mu-button>
        </div>
      </div>
    </div>
    <div v-if="isLogin">
      <div class="person-info">
        <div class="left">
          <h2 class="person-info-name">{{user.userInfo.name}}</h2>
          <div class="attention-fans">
            <div style="font-weight: 800;">
              {{user.userInfo.attention}}&nbsp;&nbsp;&nbsp;&nbsp;{{user.userInfo.fans}}
            </div>
            <div>
              关注 粉丝
            </div>
          </div>
          <div class="edit">
            编辑个人资料
          </div>
        </div>
        <div class="right">
          <div class="avatar">
            <img width="100%" :src="user.userInfo.avatar" alt="">
          </div>
        </div>
      </div>
      <div class="person-intro">
        {{user.userInfo.intro}}
      </div>
      <div class="line"></div>
      <div class="select">
        <mu-tabs class="header" :value.sync="active" color="#fff" indicator-color="#f96650" full-width>
          <mu-tab :ripple="false" class="tab">菜谱</mu-tab>
          <mu-tab :ripple="false" class="tab">作品</mu-tab>
        </mu-tabs>
        <div class="content" v-if="active === 0">
          <div class="create">创建菜谱的人是厨房里的天使</div>
          <div class="share" @click="$emit('showCreate')">开始创建第一套菜谱</div>
        </div>
        <div class="content" v-if="active === 1">
          <div class="create">记录美食，味道因回忆而美丽</div>
          <div class="share" @click="showNonsupport(true)">分享我的美食作品</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import PleaseLogin from '../pleaseLogin/PleaseLogin'
  import * as types from '../../store/mutations-types'
  export default {
    name: 'PersonView',
    data() {
      return {
        active: 0
      }
    },
    props: {
      confirm: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      ...mapState({
        isLogin: 'isLogin',
        user: 'nowUser'
      })
    },
    methods: {
      ...mapMutations({
        logout: types.LOGOUT,
        showNonsupport: types.TOGGLE_TEMPORARY_NONSUPPORT
      }),
      logoutClick() {
        this.logout();
        this.$emit('hideConfirm');
      }
    },
    components: {
      PleaseLogin
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .person
    width: 100%
    height: 100%
    .please-login
      width: 100%
      height: 100%
    .confirm-exit
      position: fixed
      top: 0
      left: 0
      bottom: 0
      width: 100%
      background-color: rgba(0, 0, 0, .3)
      z-index: 2000
      .confirm
        position: absolute
        top: 50%
        left: 50%
        transform: translateX(-50%) translateY(-50%)
        background-color: #fff
        padding: 10px
        border-radius: 3px
        min-width: 215px
        .confirm-title
          color: #f96650
          font-size: 16px
          margin-bottom: 5px
          padding: 5px 0
        .button
          .button-right
            float: right
    .person-info
      padding: 15px
      display: flex
      justify-content: space-between
      .left
        .attention-fans
          font-size: 12px
        .edit
          color: #f96650
          margin-top: 5px
      .right
        .avatar
          width: 100px
          height: 100px
          overflow: hidden
          border-radius: 50%
          margin: 18px 0
    .person-intro
      padding: 15px
      font-size: 16px
    .line
      height: 1px
      background-color: rgba(7, 17, 27, .1)
    .select
      .header
        background-color: #fff
        .tab
          color: #000
          &.mu-tab-active
            color: #f96650
      .content
        font-size: 16px
        .create
          text-align: center
          padding: 25px 0
          margin: 10px 0
        .share
          text-align: center
          color: #f96650
</style>

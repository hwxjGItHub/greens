<template>
    <div class="message">
      <div class="no-message" v-if="isLogin">
        <div class="no-message-content">
          <div class="title">
            等待着第一份信
          </div>
          <div class="desc">
            美味调剂生活，订阅你最喜欢的美食栏目，将会在这里收到最新的高人气菜谱和美文。
          </div>
          <div class="see-programa" @click="showNonsupport(true)">
            去看看值得订阅的栏目
          </div>
        </div>
      </div>
      <div class="please-login" v-if="!isLogin">
        <please-login></please-login>
      </div>
    </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import * as types from '../../store/mutations-types'
  import PleaseLogin from '../pleaseLogin/PleaseLogin'
  export default {
    name: 'MessageView',
    computed: {
      ...mapState({
        isLogin: 'isLogin'
      })
    },
    components: {
      PleaseLogin
    },
    methods: mapMutations({
      showNonsupport: types.TOGGLE_TEMPORARY_NONSUPPORT
    })
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .message
    width: 100%
    height: 100%
    .please-login
      width: 100%
      height: 100%
    .no-message
      position: absolute
      top: 0
      left: 0
      bottom: 0
      right: 0
      background-color: #fff
      .no-message-content
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
        .title
          font-size: 26px
          text-align: center
        .desc
          padding: 20px 20px
          text-align: center
        .see-programa
          text-align: center
          color: #fa6650
          font-size: 15px
</style>

<template>
    <div class="share">
        <div class="share-content">
          <div class="share-content-avatar" v-if="isLogin">
            <img width="100%" height="100%" :src="nowUser.userInfo.avatar" alt="">
          </div>
          <div class="share-content-title">
            分享的人是厨房里的天使
          </div>
          <div class="share-content-desc">
            <div class="left" @click="$emit('showCreate')">
              <div class="text">创建菜谱</div>
              <div class="first">
                <div class="icon" style="display: inline-block">
                  <mu-icon value="camera_alt" color="#fff"></mu-icon>
                </div>
              </div>
              <div class="second"></div>
              <div class="third"></div>
            </div>
            <div class="right" @click="showNonsupport(true)">
              <div class="text" >上传作品</div>
              <div class="first">
                <div class="icon" style="display: inline-block">
                  <mu-icon value="camera_alt" color="#fff"></mu-icon>
                </div>
              </div>
              <div class="second"></div>
              <div class="third"></div>
            </div>
          </div>
        </div>
      <div class="share-bottom">
        草稿箱
      </div>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import * as types from '../../store/mutations-types'
  export default {
    name: 'ShareView',
    computed: mapState(['nowUser', 'isLogin']),
    methods: mapMutations({
      showNonsupport: types.TOGGLE_TEMPORARY_NONSUPPORT
    })
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .share
    width: 100%
    height: 100%
    .share-content
      position: absolute
      top: 50%
      left: 50%
      transform: translateX(-50%) translateY(-50%)
      transition: all .5s
      .share-content-avatar
        width: 60px
        height: 60px
        border-radius: 50%
        overflow: hidden
        position: absolute
        left: 50%
        transform: translateX(-50%)
        top: -70px
      .share-content-title
        text-align: center
      .share-content-desc
        margin-top: 15px
        width: 220px
        .left, .right
          height: 140px
          width: 90px
          display: inline-block
          position: relative
          .text
            position: absolute
            bottom: -30px
            left: 50%
            transform: translateX(-50%)
            width: 100%
            text-align: center
        .left
          border: 1px solid rgb(158, 230, 252)
          border-bottom: 1px solid rgba(158, 230, 252, .3)
          .first
            height: 60px
            background-color: rgb(158, 230, 252)
            line-height: 72px
            text-align: center
          .second
            margin: 13px
            height: 30px
            background-color: rgb(158, 230, 252)
          .third
            margin: 0 13px
            height: 22px
            background-color: rgb(158, 230, 252)
        .right
          float: right
          border: 1px solid rgb(253, 233, 79)
          border-bottom: 1px solid rgba(253, 233, 79, .3)
          margin-left: 18px
          padding: 10px
          .first
            height: 70px
            background-color: rgb(253, 233, 79)
            text-align: center
            line-height: 84px
          .second
            width: 100%
            margin-top: 13px
            height: 13px
            background-color: rgb(253, 233, 79)
          .third
            margin-top: 8px
            width: 50px
            height: 13px
            background-color: rgb(253, 233, 79)
    .share-bottom
      position: absolute
      bottom: 0
      width: 100%
      left: 0
      height: 35px
      border-top: 1px solid rgba(7, 17, 27, .1)
      line-height: 35px
      text-align: center
</style>

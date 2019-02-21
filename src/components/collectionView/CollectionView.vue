<template>
  <div class="collection">
    <div class="collection-num" v-if="nowUser.userCollection.length && isLogin">
      您共有{{nowUser.userCollection.length}}条收藏!
      <div class="clear-collection" @click="confirm = true">
        清空
      </div>
    </div>
    <div class="confirm-clear" v-if="confirm">
      <div class="confirm">
        <div class="confirm-title">
          您确定要清空您的收藏吗?
        </div>
        <div class="button">
          <mu-button color="#f96650" @click="clearAll">确定</mu-button>
          <mu-button color="info" @click="confirm = false" class="button-right">取消</mu-button>
        </div>
      </div>
    </div>
    <div class="collection-content" v-if="nowUser.userCollection.length && isLogin" ref="collectionContent">
      <div>
        <div class="food-item" @click="goDesc(item)" v-for="item in nowUser.userCollection" :key="item.menuId" v-if="item.thumbnail">
          <div class="img">
            <img class="pic" :src="item.thumbnail" alt="">
          </div>
          <div class="desc">
            <div class="name">
              {{item.name}}
            </div>
            <div class="id">
              荣誉殿堂
            </div>
            <div class="details">
              分类:{{item.ctgTitles}}
            </div>
            <div class="remove-collect" @click.stop="removeCollect(item)">
              取消收藏
            </div>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="no-collection" v-show="!nowUser.userCollection.length && isLogin">
      <div class="no-collection-content">
        <div class="title">
          您还没有收藏
        </div>
        <div class="desc">
          美味调剂生活，收藏你最喜欢的食物，将会在这里看到您的收藏
        </div>
        <div class="go-home" @click="goHome">
          去看看值得收藏的食物
        </div>
      </div>
    </div>
    <div class="please-login-content" v-if="!isLogin">
      <please-login></please-login>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import * as types from '../../store/mutations-types'
  import PleaseLogin from '../pleaseLogin/PleaseLogin'
  import BScroll from 'better-scroll'

  export default {
    name: 'CollectionView',
    mounted() {
      this.$nextTick(() => {
        if (this.$refs.collectionContent) {
          if (this.collectScroll) {
            this.collectScroll.refresh()
          } else {
            this.collectScroll = new BScroll(this.$refs.collectionContent, {
              click: true
            })
          }
        }
      })
    },
    data() {
      return {
        confirm: false
      }
    },
    computed: {
      ...mapState(['nowUser', 'isLogin'])
    },
    methods: {
      ...mapMutations({
        toggleCollection: types.TOGGLE_COLLECTION,
        clear: types.CLEAR_COLLECTION,
        toggleFoodDesc: types.TOGGLE_FOOD_DESC
      }),
      removeCollect(i) {
        if (this.isLogin) {
          this.toggleCollection({id: i.menuId, toggle: false});
        } else {
          alert('请登录')
        }
      },
      goHome() {
        this.$router.push('/homePage');
      },
      clearAll() {
        this.clear();
        this.confirm = false;
      },
      goDesc(i) {
        this.toggleFoodDesc({ foodDesc: i, toggle: true })
      }
    },
    components: {
      PleaseLogin
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .collection
    width: 100%
    height: 100%
    overflow: hidden
    position: relative
    .collection-num
      text-align: center
      color: #f96650
      padding: 10px
      .clear-collection
        float: right
    .confirm-clear
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      background-color: rgba(0, 0, 0, .3)
      z-index: 1000
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
          text-align: center
          font-size: 16px
          margin-bottom: 5px
          padding: 5px 0
        .button
          .button-right
            float: right
    .collection-content
      position: absolute
      width: 100%
      top: 41px
      bottom: 0
      box-sizing: border-box
      overflow: hidden
      padding: 0 10px
      .food-item
        display: flex
        height: 90px
        position: relative
        padding: 8px 10px
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        .remove-collect
          position: absolute
          right: 10px
          top: 10px
          background-color: #e3e3de
          padding: 3px
          border-radius: 3px
        .img
          width: 85px
          overflow: hidden
          text-align: center
          line-height: 100px
          border-radius: 4px
          .pic
            min-width: 100%
            min-height: 100%
            max-height: 120%
            max-width: 120%
        .desc
          flex: 1
          padding: 5px 20px
          .name
            font-size: 16px
            font-weight: 800
          .id
            font-size: 12px
            color: #fff
            background-color: #f96650
            display: inline-block
            padding: 3px
            border-radius: 3px
            line-height: 12px
          .details
            font-size: 14px
    .no-collection
      position: absolute
      top: 0
      left: 0
      bottom: 0
      right: 0
      background-color: #fff
      .no-collection-content
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
        .go-home
          text-align: center
          color: #fa6650
          font-size: 15px
    .please-login-content
      width: 100%
      height: 100%
</style>

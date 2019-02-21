<template>
  <div id="app">
    <div class="top-nav">
      <top-nav @showConfirm="confirm = true" @toggleShare="share = !share" :share="share"></top-nav>
    </div>
    <div class="loading" v-if="loading">
      <mu-circular-progress color="#fa6650" class="demo-circular-progress" :size="36"></mu-circular-progress>
    </div>
    <div class="router-view" v-if="!loading">
      <router-view @showCreate="create = true" @hideConfirm="confirm = false" :confirm="confirm"></router-view>
    </div>
    <div class="tab-bar">
      <tab-bar></tab-bar>
    </div>
    <transition name="share">
      <div v-if="share" class="share-view">
        <share-view @showCreate="create = true"></share-view>
      </div>
    </transition>
    <transition name="food-desc">
      <div class="food-desc" v-if="nowFoodDesc.show">
        <food-desc></food-desc>
      </div>
    </transition>
    <transition name="login">
      <div class="login" v-if="!isLogin && showLogin">
        <login-view></login-view>
      </div>
    </transition>
    <transition name="create">
      <div class="create-view" v-if="create">
        <create-view @hideCreate="create = false"></create-view>
      </div>
    </transition>
    <transition name="search">
      <div class="search-view" v-if="searchView.show">
        <search-view></search-view>
      </div>
    </transition>
    <transition name="basket">
      <div class="food-basket" v-if="foodBasket.show">
        <food-basket></food-basket>
      </div>
    </transition>
    <transition name="nonsupport">
      <div class="temporary-nonsupport" v-if="nonsupport">
        <temporary-nonsupport></temporary-nonsupport>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TabBar from './components/tabBar/TabBar'
  import TopNav from './components/topNav/TopNav'
  import ShareView from './components/shareView/ShareView'
  import FoodDesc from './components/foodDesc/FoodDesc'
  import LoginView from './components/loginView/LoginView'
  import CreateView from './components/createView/CreateView'
  import SearchView from './components/searchView/SearchView'
  import FoodBasket from './components/foodBasket/FoodBasket'
  import TemporaryNonsupport from './components/temporaryNonsupport/TemporaryNonsupport'
  export default {
    name: 'App',
    data() {
      return {
        share: false,
        confirm: false,
        create: false
      }
    },
    computed: {
      ...mapState({
        allData: 'data',
        loading: 'isAjax',
        nowFoodDesc: 'nowFoodDesc',
        isLogin: 'isLogin',
        showLogin: state => state.nowUser.showLogin,
        searchView: 'searchView',
        foodBasket: 'foodBasket',
        nonsupport: 'nonsupport'
      })
    },
    components: {
      TabBar,
      TopNav,
      ShareView,
      FoodDesc,
      LoginView,
      CreateView,
      SearchView,
      FoodBasket,
      TemporaryNonsupport
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass">
  #app
    .loading
      position: fixed
      top: 0
      bottom: 0
      left: 0
      width: 100%
      z-index: 10
      .mu-circular-progress
        position: absolute
        top: 50%
        left: 50%
        transform: translateX(-50%) translateY(-50%)
    .top-nav
      position: fixed
      top: 0
      width: 100%
      left: 0
      z-index: 1
    .router-view
      position: fixed
      top: 40px
      left: 0
      width: 100%
      bottom: 56px
      z-index: 2
      background-color: #fff
    .tab-bar
      position: fixed
      left: 0
      width: 100%
      bottom: 0
      z-index: 1
      .van-tabbar-item--active
        color: #fa6650
    .share-view
      position: fixed
      top: 40px
      bottom: 0
      width: 100%
      left: 0
      background-color: #fff
      z-index: 500
      transition: all .5s
    .share-leave-to
      opacity: 0
    .share-enter-active
      transition: all .5s
      .share-content-avatar
        transition: all .5s
      .share-content-title
        transition: all .5s
      .share-content-desc
        .left, .right
          .text
            transition: all .5s
          .first, .second, .third
            transition: all .5s linear
    .share-enter
      .share-content-avatar
        transform: translateY(100px) translateX(-50%)
        opacity: 0
      .share-content-title
        transform: translateY(100px)
        opacity: 0
      .share-content-desc
        .left
          .text
            opacity: 0
          .first
            transform: scale(0)
          .second, .third
            height: 0
        .right
          .text
            opacity: 0
          .first
            transform: scale(0)
          .second, .third
            width: 0
    .food-desc
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      left: 0
      z-index: 1000
      background-color: #fff
      transition: all .5s
    .food-desc-enter, .food-desc-leave-to
      opacity: 0
    .login
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      left: 0
      background-color: #fff
      transition: all .5s
      z-index: 1000
    .login-enter
      opacity: 0
    .login-leave-to
      transform: translateY(100%)
      opacity: 0
    .create-view
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      left: 0
      background-color: #fff
      transition: all .5s
      z-index: 1000
    .create-enter, .create-leave-to
      opacity: 0
    .search-view
      position: fixed
      top: 40px
      bottom: 0
      background-color: #fff
      width: 100%
      left: 0
      z-index: 3
    .food-basket
      position: fixed
      top: 0
      bottom: 0
      left: 0
      width: 100%
      background-color: #fff
      z-index: 4
      transition: all .5s
    .basket-enter, .basket-leave-to
      transform: translateX(100%)
      opacity: 0
    .temporary-nonsupport
      position: fixed
      top: 0
      bottom: 0
      left: 0
      width: 100%
      background-color: #fff
      z-index: 1000
      transition: all .5s
    .nonsupport-enter, .nonsupport-leave-to
      opacity: 0
      transform: translateX(100%)
</style>

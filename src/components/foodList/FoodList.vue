<template>
  <div class="food-list" ref="foodList">
    <div>
      <div class="refresh" :class="{isRefresh}">
        <div ref="loosen" v-show="refresh >= 80" class="loosen">
          松开刷新
        </div>
        <mu-circular-progress :value="refresh" color="#fa6650" ref="refresh" class="demo-circular-progress"
                              :mode="isRefresh ? 'indeterminate': 'determinate'" :size="26">

          <div class="refresh-bar" ref="refreshBar"></div>
        </mu-circular-progress>
      </div>
      <div class="food-item" v-for="item in nowList" @click="goDesc(item)" :key="item.menuId" v-if="item.thumbnail">
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
          <div class="collect">
            <mu-icon @click.stop="collect(item, $event)" value="favorite_border"
                     :color="item.collection ? 'red' : '#9c9c97'"></mu-icon>
          </div>
        </div>
      </div>
      <div class="load-more" v-if="!isHome">
        <mu-circular-progress class="demo-circular-progress" color="#fa6650" :size="20"></mu-circular-progress>
        <span>正在加载</span>
      </div>
    </div>
    <div class="collect-success" v-show="success">
      <div class="collect-success-content">收藏成功</div>
      <div class="close">
        {{end}}秒后自动关闭
        <mu-icon value="close" @click="close" class="close-icon"></mu-icon>
      </div>
    </div>
    <transition name="top">
      <div class="to-top" v-show="toTop" @click="top">
        <mu-button fab color="#f96650">
          <mu-icon value="arrow_upward"></mu-icon>
        </mu-button>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  import * as types from '../../store/mutations-types'

  export default {
    name: 'FoodList',
    data() {
      return {
        isLoadMore: false,
        success: false,
        end: 2,
        toTop: false,
        refresh: 0,
        isRefresh: false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.refresh.$el.style.overflow = 'visible';
        if (this.$refs.foodList) {
          this.foodScroll = new BScroll(this.$refs.foodList, {
            click: true,
            probeType: 3,
            pullUpLoad: {
              threshold: 50
            },
            pullDownRefresh: {
              threshold: 80,
              stop: 20
            }
          });
          this.foodScroll.on('pullingUp', () => {
            this.getMoreFood(this.$axios)
              .then(() => {
                this.foodScroll.finishPullUp();
                this.$nextTick(() => {
                  this.foodScroll.refresh();
                })
              })
          });
          this.foodScroll.on('pullingDown', () => {
            this.isRefresh = true;
            this.foodScroll.scrollTo(0, 0);
            this.refreshNowFoodList({axios: this.$axios})
              .then(() => {
                this.foodScroll.finishPullDown();
                this.isRefresh = false;
                this.$nextTick(() => {
                  this.foodScroll.refresh();
                })
              })
          });
          this.foodScroll.on('scroll', ({y}) => {
            if (y <= -500 && !this.toTop) {
              this.toTop = true;
            } else if (y > -500 && this.toTop) {
              this.toTop = false;
            } else if (y >= -75) {
              this.$refs.refresh.$el.firstChild.firstChild.style.transition = 'none';
              this.$refs.refresh.$el.style.transform = `translateY(${-(y + 75 - 40) / 3}px) rotate(${y + 25}deg)`;
              if (y > 80) {
                y = 80
              }
              this.refresh = y
            }
          })
        }
      });
    },
    computed: {
      ...mapState({
        nowList: state => state.nowFoodList.data,
        isHome: 'isHome',
        isLogin: 'isLogin'
      })
    },
    methods: {
      ...mapActions(['getMoreFood', 'refreshNowFoodList']),
      ...mapMutations({
        toggleCollection: types.TOGGLE_COLLECTION,
        toggleFoodDesc: types.TOGGLE_FOOD_DESC
      }),
      collect(i) {
        if (this.isLogin) {
          if (i.collection) {
            this.toggleCollection({id: i.menuId, toggle: false});
          } else {
            this.toggleCollection({id: i.menuId, toggle: true});
            this.success = true;
            this.foodScroll.disable();
            this.time1 = setTimeout(() => {
              this.success = false;
              this.end = 2;
              this.foodScroll.enable()
            }, 2000);
            this.time2 = setTimeout(() => {
              this.end = 1
            }, 1000)
          }
        } else {
          this.$router.push('/collect')
        }
      },
      close() {
        this.success = false;
        clearTimeout(this.time1);
        clearTimeout(this.time2);
        this.time = null;
        this.end = 2;
        this.foodScroll.enable()
      },
      top() {
        this.foodScroll.scrollTo(0, 0, 2000);
        this.toTop = false;
      },
      goDesc(i) {
        this.toggleFoodDesc({foodDesc: i, toggle: true})
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .food-list
    padding: 0 10px 10px
    width: 100%
    height: 100%
    overflow: hidden
    position: relative
    .refresh
      width: 100%
      height: 75px
      position: absolute
      z-index: 100
      top: -50px
      left: 0
      text-align: center
      transform: translateY(30px)
      .loosen
        position: absolute
        bottom: 70px
        left: 0
        width: 100%
        text-align: center
        color: #f96650
      .mu-circular-progress
        position: relative
        border-radius: 50%
        &::after
          content: ""
          position: absolute
          top: 50%
          left: 50%
          width: 35px
          height: 35px
          transform: translateY(-50%) translateX(-50%)
          z-index: -1
          background-color: #fff
          border-radius: 50%
          box-shadow: .5px .5px .5px .5px #cbcbcb
      &.isRefresh
        transition: all .5s
        transform: translateY(100px)
    .food-item
      display: flex
      height: 80px
      margin-bottom: 8px
      position: relative
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .1)
      .collect
        position: absolute
        right: 10px
        top: 10px
      .img
        width: 140px
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
        & > div
          max-width: 150px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
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
    .load-more
      line-height: 25px
      text-align: center
      padding: 3px
    .collect-success
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      background-color: rgba(0, 0, 0, .3)
      z-index: 1000
      .collect-success-content
        position: absolute
        top: 50%
        left: 50%
        transform: translateX(-50%) translateY(-50%)
        text-align: center
        background-color: #f96650
        color: #fff
        font-size: 24px
        padding: 5px
        border-radius: 5px
      .close
        position: absolute
        top: 50%
        width: 100%
        text-align: center
        color: #fff
        transform: translateY(25px)
      .close-icon
        transform: translateY(7px)
    .to-top
      position: absolute
      right: 20px
      bottom: 20px
      transition: all .2s
    .top-enter, .top-leave-to
      transform: scale(0)
</style>

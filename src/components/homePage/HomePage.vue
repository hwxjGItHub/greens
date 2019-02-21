<template>
  <div class="home-page">
    <div class="tabs-content">
      <div class="tabs" ref="tabContent">
        <mu-tabs ref="tab" class="tab" @change="change" :value.sync="nowMenuTypeTbl.small" inverse
                 indicator-color="#f96650">
          <mu-tab class="item" ref="item0" :ripple="false" value="0">推荐</mu-tab>
          <mu-tab ref="item1" :value="item.categoryInfo.ctgId"
                  class="item" :ripple="false" v-for="item in MenuTypeTbl"
                  :key="item.categoryInfo.ctgId">{{item.categoryInfo.name}}
          </mu-tab>
        </mu-tabs>
      </div>
      <div class="more">
        <mu-icon value="menu" color="#9C9C97" @click="showAllFoods(true)"></mu-icon>
      </div>
    </div>
    <div v-if="isHome && !loading" class="recommend">
      <div class="recommend-list-content" ref="recommend">
        <div>
          <swiper-view v-if="recommendData.length >= 5" :recommendData="recommendData"></swiper-view>
          <div class="recommend-list" @click="showDesc(item)" v-for="(item, index) in recommendData" :key="index">
            <div class="img"><img :src="item.thumbnail" alt=""></div>
            <div class="title">
              {{item.name}}
              <div class="desc">
                分类:{{item.ctgTitles}}
              </div>
            </div>
          </div>
          <div class="no-more">没有更多啦</div>
        </div>
      </div>
    </div>
    <div class="loading-foods" v-show="loading">
      <mu-circular-progress color="#fa6650" class="demo-circular-progress" :size="24"></mu-circular-progress>
      <div>加载中</div>
    </div>
    <div class="food-list-content" v-show="!isHome">
      <food-list v-if="!loading"></food-list>
    </div>
    <div class="all-foods" v-if="toggleAllFoods">
      <all-foods @refreshScroll="refreshScroll"></all-foods>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import * as types from '../../store/mutations-types'

  import BScroll from 'better-scroll'
  import FoodList from '../foodList/FoodList'
  import AllFoods from '../allFoods/AllFoods'
  import SwiperView from '../swiperView/SwiperView'

  export default {
    name: 'HomePage',
    mounted() {
      this.setWidth()
        .then(() => {
          this.$nextTick(() => {
            if (this.$refs.tabContent) {
              if (this.tabScroll) {
                this.tabScroll.refresh()
              } else {
                this.tabScroll = new BScroll(this.$refs.tabContent, {
                  click: true,
                  scrollX: true,
                  bounce: false
                })
              }
            }
          });
        });
    },
    updated() {
      this.$nextTick(() => {
        if (this.isHome && !this.loading) {
          // if (this.recommendScroll) {
          //   this.recommendScroll.refresh();
          //   console.log('refresh');
          // } else {
          //   this.recommendScroll = new BScroll(this.$refs.recommend, {
          //     click: true
          //   });
          //   console.log('init');
          // }
          this.recommendScroll = new BScroll(this.$refs.recommend, {
            click: true,
            bounce: {
              top: false
            }
          });
        }
      })
    },
    computed: {
      ...mapState({
        MenuTypeTbl: state => {
          if (state.data.MenuTypeTbl.result) {
            return state.data.MenuTypeTbl.result.childs[state.nowMenuTypeTbl.big].childs
          }
          return []
        },
        loading: state => state.nowFoodList.isAjax,
        toggleAllFoods: 'toggleAllFoods',
        nowMenuTypeTbl: 'nowMenuTypeTbl',
        isHome: 'isHome',
        recommendData: state => state.data.recommendData
      })
    },
    methods: {
      ...mapActions(['getCorrespondingFood', 'changeRecommendData']),
      ...mapMutations({
        showAllFoods: types.TOGGLE_ALL_FOODS,
        toggleIsHome: types.TOGGLE_IS_HOME,
        goDesc: types.TOGGLE_FOOD_DESC
      }),
      showDesc(i) {
        this.goDesc({foodDesc: i, toggle: true})
      },
      setWidth() {
        return new Promise(resolve => {
          let w = 0;
          let item = [];
          if (this.$refs.item1) {
            item = [this.$refs.item0, ...this.$refs.item1];
          }
          item.forEach(i => {
            w += i.$el.offsetWidth
          });
          this.$refs.tab.$el.style.width = w + 'px';
          resolve()
        })
      },
      change(ctgId) {
        if (ctgId === '0') {
          this.toggleIsHome(true);
          this.changeRecommendData({axios: this.$axios, data: this.MenuTypeTbl});
        } else {
          this.getCorrespondingFood({axios: this.$axios, ctgId})
        }
      },
      refreshScroll(index) {
        this.$nextTick(() => {
          this.setWidth()
            .then(() => {
              this.tabScroll.refresh();
              if (index !== -1) {
                this.tabScroll.scrollToElement(this.$refs.item1[index].$el);
              } else {
                this.tabScroll.scrollTo(0, 0)
              }
            })
        })
      }
    },
    components: {
      FoodList,
      AllFoods,
      SwiperView
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .home-page
    .tabs-content
      display: flex
      height: 48px
      .tabs
        overflow: hidden
        .mu-tab
          min-width: 72px
          max-width: 500px
          font-size: 12px
        .mu-tab-active
          color: #4a4a4a
        .tab
          background-color: #fff
      .more
        width: 100px
        text-align: center
        line-height: 62px
    .recommend
      position: fixed
      bottom: 56px
      top: 88px
      left: 0
      width: 100%
      overflow: hidden
      background-color: #fcfcfc
      .recommend-list-content
        width: 100%
        height: 100%
        overflow: hidden
        margin-bottom: 40px
        position: relative
        .no-more
          height: 40px
          text-align: center
          width: 100%
          font-size: 12px
          line-height: 40px
          position: absolute
          bottom: -40px
        .recommend-list
          width: 50%
          display: inline-block
          padding: 0 10px
          margin-top: 20px
          .img
            width: 100%
            background-color: #fff
            border-top-left-radius: 4px
            border-top-right-radius: 4px
            overflow: hidden
            img
              width: 100%
          .title
            line-height: 20px
            padding-left: 4px
            margin-top: -4px
            background-color: #fff
            border-bottom-left-radius: 4px
            border-bottom-right-radius: 4px
            box-shadow: 1px 1px 1px 1px #cdcdcd
            .desc
              font-size: 12px
              color: #747474
    .food-list-content
      position: absolute
      top: 50px
      bottom: 0
      width: 100%
    .loading-foods
      text-align: center
      position: absolute
      top: 50%
      left: 50%
      transform: translateX(-50%) translateY(-50%)
    .all-foods
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      left: 0
      background-color: #fff
      z-index: 100
</style>

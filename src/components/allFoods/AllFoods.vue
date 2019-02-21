<template>
  <div class="all-foods">
    <div class="all-foods-header">
      <mu-appbar style="width: 100%;" color="primary" z-depth="0">
        <mu-button icon slot="left" flat :ripple="false" @click="closeAllFoods(false)">
          <mu-icon value="chevron_left"></mu-icon>
        </mu-button>
        <div class="title">
          菜谱分类
        </div>
        <mu-button icon slot="right" flat :ripple="false">
          <mu-icon value="aa"></mu-icon>
        </mu-button>
      </mu-appbar>
    </div>
    <div class="all-foods-content" ref="allFoodsContent">
      <div>
        <div class="item-content" v-for="(item, index) in allFoods" :key="item.categoryInfo.ctgId">
          <div class="item-title" @click="goHome(index)">{{item.categoryInfo.name}}</div>
          <div class="item" @click="go(i.categoryInfo.ctgId, index, num)" v-for="(i, num) in item.childs"
               :key="i.categoryInfo.ctgId">
            {{i.categoryInfo.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  import * as types from '../../store/mutations-types'
  import BScroll from 'better-scroll'

  export default {
    name: 'AllFoods',
    mounted() {
      this.$nextTick(() => {
        this.allFoodsScroll = new BScroll(this.$refs.allFoodsContent, {
          click: true
        })
      });
    },
    computed: {
      ...mapState({
        allFoods: state => state.data.MenuTypeTbl.result.childs
      })
    },
    methods: {
      ...mapMutations({
        closeAllFoods: types.TOGGLE_ALL_FOODS,
        goHomeMua: types.GO_HOME_PAGE,
        toggleIsHome: types.TOGGLE_IS_HOME
      }),
      ...mapActions(['goHomePage', 'changeRecommendData']),
      go(ctgId, bigId, index) {
        this.goHomePage({ctgId, axios: this.$axios, bigId});
        this.$emit('refreshScroll', index);
      },
      goHome(i) {
        this.changeRecommendData({axios: this.$axios, data: this.allFoods[i].childs})
        this.goHomeMua(i);
        this.toggleIsHome(true);
        this.$emit('refreshScroll', -1);
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .all-foods
    .all-foods-header
      .mu-appbar
        background-color: #fff
        color: #212121
        text-align: center
        .title
          font-size: 16px
    .all-foods-content
      position: absolute
      top: 56px
      bottom: 0
      width: 100%
      left: 0
      overflow: hidden
      .item-content
        padding: 5px
        .item-title
          font-size: 16px
          padding: 10px
        .item
          display: inline-block
          padding: 10px
          margin-right: 10px
          margin-top: 5px
          background-color: #f1f1f1
          border-radius: 4px
</style>

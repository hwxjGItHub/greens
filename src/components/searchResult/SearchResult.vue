<template>
  <div class="search-result-content">
    <div class="search-result-header">
      <mu-appbar color="#fff" style="width: 100%;" z-depth="0">
        <mu-button icon slot="left" @click="closeSearchResult(false)">
          <mu-icon value="keyboard_arrow_left" color="#000"></mu-icon>
        </mu-button>
        <div class="title">
          搜索结果
        </div>
        <mu-button slot="right" icon></mu-button>
      </mu-appbar>
    </div>
    <div class="search-result-list" ref="list">
      <div>
        <div v-if="item.thumbnail" @click="toggleFoodDesc({foodDesc: item, toggle: true})" v-for="item in food" :key="item.ctgId" class="search-result-item">
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
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import BScroll from 'better-scroll'
  import * as types from '../../store/mutations-types'
  export default {
    name: 'SearchResult',
    mounted() {
      this.$nextTick(() => {
        this.listScroll = new BScroll(this.$refs.list, {
          click: true,
          bounce: false
        })
      })
    },
    props: {
      food: Array,
      required: true
    },
    computed: {
      ...mapState(['isLogin'])
    },
    methods: {
      ...mapMutations({
        toggleCollection: types.TOGGLE_COLLECTION,
        toggleFoodDesc: types.TOGGLE_FOOD_DESC,
        closeSearchView: types.TOGGLE_SEARCH_VIEW,
        closeSearchResult: types.TOGGLE_SEARCH_RESULT,
        clearValue: types.CLEAR_SEARCH_VALUE
      }),
      collect(i) {
        if (this.isLogin) {
          if (i.collection) {
            this.toggleCollection({id: i.menuId, toggle: false});
          } else {
            this.toggleCollection({id: i.menuId, toggle: true});
          }
        } else {
          this.$router.push('/collect');
          this.closeSearchResult(false);
          this.closeSearchView(false);
          this.clearValue();
        }
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .search-result-content
    width: 100%
    height: 100%
    .search-result-header
      height: 40px
      .mu-appbar
        height: 40px
        .title
          color: #000
          font-size: 16px
          text-align: center
          height: 40px
          line-height: 40px
    .search-result-list
      padding: 10px
      margin-top: 5px
      position: absolute
      top: 40px
      bottom: 0
      width: 100%
      left: 0
      overflow: hidden
      .search-result-item
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
</style>

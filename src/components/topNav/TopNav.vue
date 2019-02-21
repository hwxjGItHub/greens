<template>
    <div class="top-bar">
      <mu-appbar z-depth="0" style="width: 100%;" color="primary">
        <mu-button style="transition: all .5s" :class="{active: share}" :ripple="false" icon slot="left">
          <mu-icon @click="$emit('toggleShare')" value="add" v-if="($route.path === '/homePage' || $route.path === '/person') && !searchView.show" color="#9C9C97"></mu-icon>
          <mu-icon @click="closeSearch()" value="keyboard_arrow_left" v-if="$route.path === '/homePage' && searchView.show" color="#9C9C97"></mu-icon>
        </mu-button>
        <div class="search" v-if="$route.path === '/homePage' && !share">
          <mu-text-field @input="input" @focus="search" :value="searchView.value" placeholder="搜索菜谱、食材" solo full-width>
            <mu-icon value="search" color="#9C9C97"></mu-icon>
          </mu-text-field>
        </div>
        <mu-button v-if="!share" :ripple="false" icon slot="right">
          <mu-icon value="shop" @click="showBasket(true)" color="#9C9C97" v-if="$route.path === '/homePage' && !searchView.show"></mu-icon>
          <mu-icon value="exit_to_app" @click="showConfirm" color="#9C9C97" v-if="$route.path === '/person'"></mu-icon>
          <div class="search-button" v-if="searchView.show && $route.path === '/homePage'" @click="searchClick">搜索</div>
        </mu-button>
        <div class="title" v-if="$route.path === '/collect'&& !share">收藏</div>
        <div class="title" v-if="$route.path === '/message'&& !share">信箱</div>
        <div class="title" v-if="$route.path === '/person'&& !share">我</div>
      </mu-appbar>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import * as types from '../../store/mutations-types'
  export default {
    name: 'TopNav',
    data() {
      return {
        inputVal: ''
      }
    },
    props: {
      share: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      ...mapState(['isLogin', 'searchView'])
    },
    methods: {
      ...mapMutations({
        showSearch: types.TOGGLE_SEARCH_VIEW,
        changeValue: types.CHANGE_SEARCH_VIEW_VALUE,
        changeHistory: types.CHANGE_SEARCH_HISTORY,
        showResult: types.TOGGLE_SEARCH_RESULT,
        clearSearchValue: types.CLEAR_SEARCH_VALUE,
        showBasket: types.IS_SHOW_BASKET
      }),
      showConfirm() {
        if (this.isLogin) {
          this.$emit('showConfirm')
        }
      },
      search() {
        if (this.searchView.show) {
          return;
        }
        this.showSearch(true)
      },
      input(v) {
        this.changeValue(v);
      },
      searchClick() {
        if (this.searchView.value) {
          this.changeHistory();
          this.showResult(true);
        }
      },
      closeSearch() {
        this.showSearch(false);
        this.clearSearchValue();
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .top-bar
    display: flex
    .mu-appbar
      background-color: #fff
      color: #5c5c56 !important
      height: 40px
      font-size: 12px !important
      .search
        height: 30px
        min-height: 30px
        padding: 0
        margin: 0
        background-color: #f2f2f0
        border-radius: 4px
        transform: translateX(-6px)
        .mu-input
          transform: translateY(-16px)
          padding-left: 30px
          font-size: 14px
          color: #5c5c56
          &.mu-input__focus
            color: #5c5c56
          .mu-icon
            position: absolute
            left: -24px
      .title
        text-align: center
        font-size: 16px
    .active
      transform: rotate(45deg)
    .search-button
      text-indent: -1em
      font-size: 16px
      white-space: nowrap
      color: #fa6650
</style>

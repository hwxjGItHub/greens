<template>
    <div class="search">
      <div class="search-list" v-if="searchView.value.trim()">
        <div v-for="item in searchViewData" class="search-item" :key="item.ctgId" @click="showDesc(item)">
          <div class="name">
            {{item.name}}
          </div>
          <div class="ctgTitles">
            {{item.ctgTitles}}
          </div>
        </div>
      </div>
      <div class="history" v-if="searchView.history.length">历史搜索</div>
      <div class="history-list">
        <div v-for="(item, index) in searchView.history" @click="historySearch(item)" class="history-item" :key="index">
          {{item}}
        </div>
      </div>
      <div class="search-result" v-if="searchView.showResult">
        <search-result :food="searchViewData"></search-result>
      </div>
    </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import * as types from '../../store/mutations-types'
  import SearchResult from '../searchResult/SearchResult'
  export default {
    name: 'SearchView',
    computed: {
      ...mapState(['searchView']),
      ...mapGetters(['searchViewData'])
    },
    methods: {
      ...mapMutations({
        goDesc: types.TOGGLE_FOOD_DESC,
        changeSearchValue: types.CHANGE_SEARCH_VIEW_VALUE,
        showResult: types.TOGGLE_SEARCH_RESULT
      }),
      showDesc(i) {
        this.goDesc({foodDesc: i, toggle: true})
      },
      historySearch(i) {
        this.changeSearchValue(i);
        this.showResult(true);
      }
    },
    components: {
      SearchResult
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .search
    width: 100%
    height: 100%
    .search-list
      position: fixed
      top: 40px
      bottom: 0
      width: 100%
      left: 0
      background-color: #fff
      .search-item
        display: flex
        justify-content: space-between
        line-height: 30px
        padding: 10px
        .name
          font-size: 17px
    .history
      padding: 7px
    .history-list
      .history-item
        display: inline-block
        background-color: #f5f5f5
        font-size: 16px
        padding: 5px 10px
        margin: 5px
        border-radius: 4px
    .search-result
      position: fixed
      top: 0
      bottom: 0
      left: 0
      width: 100%
      background-color: #fff
</style>

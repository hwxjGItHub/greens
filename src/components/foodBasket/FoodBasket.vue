<template>
  <div class="basket">
    <div class="basket-header">
      <mu-appbar color="#fff" style="width: 100%;" z-depth="0">
        <mu-button icon slot="left" @click="closeSelf(false)">
          <mu-icon value="keyboard_arrow_left" color="#000"></mu-icon>
        </mu-button>
        <div class="title">
          菜篮子
        </div>
        <mu-button slot="right" icon></mu-button>
      </mu-appbar>
    </div>
    <div class="empty-content" v-if="!this.foodBasket.data.length">
      <div class="title">
        再也不会忘记要买葱了
      </div>
      <div class="desc">
        将用料丢进菜篮子，每次去超市就不会忘记买需要的东西了
      </div>
    </div>
    <div class="basket-content" ref="basket">
      <div>
        <div class="basket-item" v-for="item in this.foodBasket.data" :key="item.menuId">
          <div class="basket-item-title" @click="goDesc({foodDesc: item, toggle: true})">
            <div class="left">
              {{item.name}}
            </div>
            <div class="right">
              <mu-icon value="keyboard_arrow_right" color="#000"></mu-icon>
            </div>
          </div>
          <div class="basket-item-content">
            {{item.recipe.ingredients | ingredients}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import * as types from '../../store/mutations-types'
  import BScroll from 'better-scroll'
  export default {
    name: 'FoodBasket',
    mounted() {
      this.$nextTick(() => {
        this.basketScroll = new BScroll(this.$refs.basket, {
          click: true,
          bounce: false
        })
      })
    },
    computed: {
      ...mapState(['foodBasket'])
    },
    methods: {
      ...mapMutations({
        closeSelf: types.IS_SHOW_BASKET,
        goDesc: types.TOGGLE_FOOD_DESC
      })
    },
    filters: {
      ingredients(i) {
        return JSON.parse(i)[0]
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .basket
    width: 100%
    height: 100%
    .basket-header
      height: 40px
      .mu-appbar
        height: 40px
        .title
          color: #000
          font-size: 16px
          text-align: center
          height: 40px
          line-height: 40px
    .empty-content
      margin-top: 120px
      .title
        font-size: 22px
        text-align: center
        letter-spacing: 1px
      .desc
        font-size: 12px
        text-align: center
        margin-top: 35px
    .basket-content
      position: absolute
      top: 40px
      bottom: 0
      left: 0
      width: 100%
      overflow: hidden
      .basket-item
        .basket-item-title
          display: flex
          justify-content: space-between
          padding: 10px
          font-size: 15px
        .basket-item-content
          padding: 0 15px
          font-size: 12px
          line-height: 25px
</style>

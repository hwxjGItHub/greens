<template>
  <div class="food-desc">
    <div class="food-desc-header" ref="header">
      <div class="food-desc-back" @click="closeFoodDesc({ toggle: false })">
        <mu-icon ref="backIcon" class="back-icon" value="keyboard_arrow_left"></mu-icon>
      </div>
      <div class="packet">
        <mu-icon @click="collectClick(nowFoodDesc.data.menuId)" ref="favoriteIcon" class="packet-icon"
                 :color="nowFoodDesc.data.collection ? '#f00' : '#fff'" value="favorite_border"></mu-icon>
        <mu-icon @click="goBasket" ref="packetIcon" class="packet-icon" value="shop"></mu-icon>
      </div>
    </div>
    <div class="food-desc-content" ref="foodDescContent">
      <div>
        <div class="food-img"><img width="100%" :src="nowFoodDesc.data.thumbnail" alt=""></div>
        <div class="food-desc-content-wrapper">
          <div class="food-desc-title">
            <div class="food-desc-title-text">
              {{nowFoodDesc.data.name}}
            </div>
            <div class="food-desc-title-class">
              {{nowFoodDesc.data.recipe.title}}
            </div>
            <div class="honor">
              荣誉殿堂
            </div>
          </div>
          <div class="line"></div>
          <div class="food-desc-content-detail">
            {{nowFoodDesc.data.recipe.sumary}}
          </div>
          <div class="food-desc-content-ingredients">
            <div class="food-desc-content-ingredients-title">
              <div class="left">
                用料
                <mu-icon class="food-desc-content-ingredients-title-icon" value="shopping_cart"></mu-icon>
              </div>
              <div class="right" @click="pushBasket(nowFoodDesc.data.menuId)">{{nowFoodDesc.data.inBasket ? '移除菜篮子' : '丢进菜篮子'}}</div>
            </div>
            <div class="food-desc-content-ingredients-list">
              {{ingredients}}
            </div>
          </div>
          <div class="food-desc-content-step">
            <div v-for="(item, index) in steps" :key="index" class="food-desc-content-step-item">
              <div class="food-desc-content-step-item-title">
                步骤{{index + 1}}
              </div>
              <div v-if="item.img" class="food-desc-content-step-item-img"><img width="100%" :src="item.img" alt="">
              </div>
              <div class="food-desc-content-step-item-detail">
                {{item.step | disposeStep}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import * as types from '../../store/mutations-types'
  import BScroll from 'better-scroll'

  export default {
    name: 'FoodDesc',
    mounted() {
      this.$nextTick(() => {
        if (this.$refs.foodDescContent) {
          this.foodDescScroll = new BScroll(this.$refs.foodDescContent, {
            click: true,
            probeType: 3,
            bounce: {
              top: false
            }
          });
          this.foodDescScroll.on('scroll', ({y}) => {
            let end = -180;
            let ratio = y / end;
            if (ratio >= 0) {
              if (ratio >= 0.85) {
                ratio = 1
              }
              if (this.$refs.header && this.$refs.backIcon && this.$refs.packetIcon && this.$refs.favoriteIcon) {
                this.$refs.header.style.backgroundColor = `rgba(255, 255, 255, ${ratio})`;
                let result = 255 - (255 * ratio);
                this.$refs.backIcon.style.color = `rgb(${result}, ${result}, ${result})`;
                this.$refs.packetIcon.style.color = `rgb(${result}, ${result}, ${result})`;
                if (!this.nowFoodDesc.data.collection) {
                  this.$refs.favoriteIcon.style.color = `rgb(${result}, ${result}, ${result})`;
                }
              }
            }
          })
        }
      });
    },
    computed: {
      ...mapState(['nowFoodDesc', 'isLogin', 'foodBasket']),
      ingredients() {
        return JSON.parse(this.nowFoodDesc.data.recipe.ingredients)[0]
      },
      steps() {
        return JSON.parse(this.nowFoodDesc.data.recipe.method)
      }
    },
    methods: {
      ...mapMutations({
        closeFoodDesc: types.TOGGLE_FOOD_DESC,
        collect: types.TOGGLE_COLLECTION,
        basket: types.TOGGLE_BASKET,
        showBasket: types.IS_SHOW_BASKET
      }),
      goBasket() {
        this.showBasket(true);
        this.closeFoodDesc({ toggle: false });
      },
      pushBasket(id) {
        if (this.nowFoodDesc.data.inBasket) {
          this.basket({id});
        } else {
          this.basket({id, toggle: true})
        }
      },
      collectClick(id) {
        if (this.isLogin) {
          if (this.nowFoodDesc.data.collection) {
            this.collect({id});
          } else {
            this.collect({id, toggle: true})
          }
        } else {
          this.closeFoodDesc({ toggle: false });
          this.$router.push('/collect')
        }
      }
    },
    filters: {
      disposeStep(str) {
        return str.slice(2, str.length)
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .food-desc
    width: 100%
    height: 100%
    .food-desc-header
      height: 40px
      position: absolute
      top: 0
      left: 0
      width: 100%
      background-color: rgba(255, 255, 255, 0)
      padding: 5px
      display: flex
      justify-content: space-between
      z-index: 1000
      .food-desc-back
        line-height: 30px
        .back-icon
          line-height: 30px
          color: #fff
      .packet
        line-height: 30px
        .packet-icon
          line-height: 29px
          font-size: 19px
          margin-right: 3px
          color: #fff
    .food-desc-content
      width: 100%
      height: 100%
      .food-img
        max-height: 400px
        overflow: hidden
      .food-desc-content-wrapper
        padding: 15px
        box-sizing: border-box
        .honor
          font-size: 12px
          color: #fff
          background-color: #f96650
          display: inline-block
          padding: 3px
          border-radius: 3px
          line-height: 12px
          font-weight: 200
      .food-desc-title
        font-size: 19px
        text-align: center
        font-weight: 600
        padding: 10px
        .food-desc-title-class
          font-size: 14px
          margin-top: 10px
          font-weight: 400
      .line
        height: 1px
        background-color: rgba(1, 17, 27, .1)
      .food-desc-content-detail
        margin-top: 10px
      .food-desc-content-ingredients
        margin-top: 20px
        .food-desc-content-ingredients-title
          display: flex
          justify-content: space-between
          .left
            font-size: 16px
            font-weight: 600
            .food-desc-content-ingredients-title-icon
              font-size: 17px
              transform: translateY(2px)
          .right
            color: #f96650
        .food-desc-content-ingredients-list
          margin-top: 20px
      .food-desc-content-step
        margin-top: 20px
        .food-desc-content-step-item
          .food-desc-content-step-item-title
            font-size: 15px
            font-weight: 600
          .food-desc-content-step-item-img
            width: 100%
            height: 200px
            overflow: hidden
            margin-top: 10px
          .food-desc-content-step-item-detail
            margin: 10px 0 20px
</style>

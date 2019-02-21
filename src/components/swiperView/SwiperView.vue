<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in swiperList" :key="index" @click="showDesc(item)">
        <div class="left">
          <div class="img">
            <img :src="item.thumbnail" alt="">
          </div>
          <div class="title">
            {{item.name}}
          </div>
        </div>
        <div class="right">
          {{item.recipe.sumary || '暂无简介'}}
        </div>
      </div>
    </div>
    <div class="swiper-pagination" ref="pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import { mapMutations } from 'vuex'
  import * as types from '../../store/mutations-types'

  export default {
    name: 'SwiperView',
    mounted() {
      this.createSwiper().then(() => {
        this.$refs.pagination.children[0].style.background = '#f96650';
        this.$refs.pagination.style.top = '178px';
        this.$refs.pagination.style.width = '90%';
        this.$refs.pagination.style.height = '2px';
        this.$refs.pagination.style.left = '5%';
        this.$refs.pagination.style.background = 'rgba(255, 255, 255, .4)';
      })
    },
    data() {
      return {
        swiperList: [
          this.recommendData[0],
          this.recommendData[1],
          this.recommendData[3],
          this.recommendData[4],
          this.recommendData[5]
        ]
      }
    },
    props: {
      recommendData: {
        type: Array,
        require: true
      }
    },
    methods: {
      ...mapMutations({
        goDesc: types.TOGGLE_FOOD_DESC
      }),
      createSwiper() {
        return new Promise(resolve => {
          this.$nextTick(() => {
            this.swiper = new Swiper('.swiper-container', {
              loop: true,
              pagination: {
                el: '.swiper-pagination',
                type: 'progressbar'
              },
              autoplay: {
                delay: 2000,
                stopOnLastSlide: false,
                disableOnInteraction: false
              }
            })
          });
          resolve()
        });
      },
      showDesc(i) {
        this.goDesc({foodDesc: i, toggle: true})
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .swiper-container
    height: 182px
    .swiper-wrapper
      width: 100%
      .swiper-slide
        width: 100%
        display: flex
        .left
          flex: 1
          .img
            margin: 10px 10px 0
            height: 65%
            overflow: hidden
            border-top-left-radius: 4px
            border-top-right-radius: 4px
            img
              height: 100%
              width: 100%
          .title
            margin: 0 10px
            padding: 10px 0
            font-size: 16px
            font-weight: 800
            text-align: center
            border-bottom-left-radius: 4px
            border-bottom-right-radius: 4px
            box-shadow: 0 0 1px 1px #cdcdcd
        .right
          flex: 1
          margin: 10px 10px 10px 0
          padding: 5px
          overflow: hidden
          background-color: #fff
          border-radius: 4px
          box-shadow: 1px 1px 1px 1px #cdcdcd
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 7
          -webkit-box-orient: vertical
          line-height: 22px
</style>

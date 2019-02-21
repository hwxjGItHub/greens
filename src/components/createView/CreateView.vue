<template>
  <div class="create">
    <div class="header">
      <div class="left" @click="$emit('hideCreate')">取消</div>
      <div class="middle">创建菜谱</div>
      <div @click="continueInput" class="right" :class="{continue: title !== ''}">
        {{createTitle ? '继续' : '保存'}}
      </div>
    </div>
    <transition name="title">
      <div class="input-title" v-if="createTitle">
        <div class="title">
          <input :class="{focus: title !== ''}" class="input" type="text" placeholder="写下你的菜谱名吧" v-model="title">
        </div>
        <div class="notice">
          <div class="notice-title">
            提示
          </div>
          <div class="first">1.好的标题是吸引厨友关注的第一步</div>
          <div class="second">2.在标题中描述菜谱的特点，会吸引更多人点击。如&lceil;不用捏的饭团&rfloor;、&lceil;不焯水不放油的红烧肉&rfloor;</div>
        </div>
      </div>
    </transition>
    <transition name="desc" v-if="!createTitle">
      <div class="desc" ref="desc">
        <div class="input-desc">
          <div class="cover">
            <div class="cover-text">
              +菜谱封面(或一分钟小视频)<br>
              诱人的封面图是吸引厨友的关键
            </div>
          </div>
          <div class="title">
            {{title}}
          </div>
          <div class="input-desc-content">
            <div class="share-story">
              <input type="text" placeholder="输入这道美食背后的故事">
            </div>
            <div class="ingredient">
              <div class="title">
                用料
              </div>
              <div class="small-title">
                猜你可能需要用到
              </div>
              <div class="select">
                <div class="button" @click="changeIngredientInput('米饭')">米饭</div>
                <div class="button" @click="changeIngredientInput('奶油')">奶油</div>
              </div>
            </div>
            <div class="input-ingredient">
              <div class="input-content" v-for="(i, index) in ingredientInput" :key="index">
                <div class="left">
                  <input placeholder="食材：如鸡蛋" type="text" v-model="i.value1">
                </div>
                <div class="right">
                  <input placeholder="用量：如一只" type="text" v-model="i.value2">
                </div>
              </div>
            </div>
            <div class="change-input-ingredient">
              <div class="add" @click.stop="changeIngredientInput('add')">增加一行</div>
              <div class="dec" @click.stop="changeIngredientInput('dec')">减少一行</div>
            </div>
            <div class="methods">
              做法
            </div>
            <div class="input-methods">
              <div class="input-content" v-for="(item ,index) in methodsInput" :key="index">
                <div class="title">
                  步骤{{index + 1}}
                </div>
                <div class="create-img">
                  <div class="create-img-text">
                    +步骤图(或15秒小视频)<br>
                    清晰的步骤图会让菜谱更受欢迎
                  </div>
                </div>
                <div class="create-methods-detail">
                  <textarea type="text" class="input" placeholder="添加步骤说明" v-model="item.detail"></textarea>
                </div>
              </div>
            </div>
            <div class="change-input-methods">
              <div class="left" @click="changeMethodsInput('add')">增加一步</div>
              <div class="right" @click="changeMethodsInput('dec')">减少一步</div>
            </div>
            <div class="send" @click="showNonsupport(true)">
              发布这个菜谱
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { mapMutations } from 'vuex'
  import * as types from '../../store/mutations-types'

  export default {
    name: 'CreateView',
    updated() {
      this.$nextTick(() => {
        if (this.$refs.desc) {
          if (this.descScroll) {
            this.descScroll.refresh()
          } else {
            this.descScroll = new BScroll(this.$refs.desc, {
              click: true,
              bounce: false
            })
          }
        }
      })
    },
    data() {
      return {
        title: '',
        createTitle: true,
        ingredientInput: [
          {
            value1: '',
            value2: ''
          },
          {
            value1: '',
            value2: ''
          }
        ],
        methodsInput: [
          {
            img: '',
            detail: ''
          },
          {
            img: '',
            detail: ''
          }
        ]
      }
    },
    methods: {
      ...mapMutations({
        showNonsupport: types.TOGGLE_TEMPORARY_NONSUPPORT
      }),
      continueInput() {
        if (!this.createTitle) {
          this.showNonsupport(true)
        }
        if (this.title !== '') {
          this.createTitle = false
        }
      },
      changeIngredientInput(val) {
        switch (val) {
          case 'add':
            this.ingredientInput.push({
              value1: '',
              value2: ''
            });
            break;
          case 'dec':
            if (this.ingredientInput.length <= 2) {
              break
            }
            this.ingredientInput.pop();
            break;
          case '米饭':
            this.ingredientInput.push({
              value1: val,
              value2: '碗'
            });
            break;
          case '奶油':
            this.ingredientInput.push({
              value1: val,
              value2: '克'
            });
            break
        }
      },
      changeMethodsInput(val) {
        if (val === 'add') {
          this.methodsInput.push({
            img: '',
            detail: ''
          });
        } else {
          if (this.methodsInput.length > 2) {
            this.methodsInput.pop();
          }
        }
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .create
    width: 100%
    height: 100%
    position: relative
    .header
      height: 40px
      display: flex
      justify-content: space-between
      text-align: center
      font-size: 16px
      line-height: 40px
      padding: 0 10px
      .left
        color: #fa6650
      .middle
        font-weight: 800
      .right
        &.continue
          color: #fa6650
    .title-leave-to
      transform: translateY(330px)
    .title-leave-active
      position: absolute
      z-index: 10
    .input-title
      transition: all .5s
      width: 100%
      background-color: #fff
      height: 100%
      .title
        text-align: center
        height: 60px
        margin-top: 10px
        .input
          border: none
          outline: none
          height: 90%
          width: 55%
          font-size: 24px
          font-weight: 800
          &.focus
            text-align: center
      .notice
        margin-top: 10px
        padding: 10px
        font-size: 12px
        width: 100%
        .notice-title
          display: inline-block
          border-bottom: 2px solid #fa6650
          font-size: 14px
        .first
          margin-top: 5px
        .first, .second
          line-height: 22px
          color: rgba(7, 17, 27, 0.47)
    .desc-enter
      transform: translateY(-330px)
    .desc
      position: absolute
      top: 40px
      bottom: 0
      width: 100%
      left: 0
      overflow: hidden
      transition: all .5s
      .input-desc
        transition: all .5s
        .cover
          height: 330px
          background-color: #efefed
          text-align: center
          position: relative
          .cover-text
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
            color: #a2a2a1
            font-size: 15px
        .title
          font-size: 24px
          text-align: center
          font-weight: 800
          line-height: 76px
        .input-desc-content
          .share-story
            text-align: center
            padding: 15px
            input
              outline: none
              border: none
              height: 90%
              width: 100%
          .ingredient
            padding: 15px
            .title
              text-align: left
              font-size: 18px
              line-height: 1
            .small-title
              font-size: 12px
              color: #a2a2a1
              padding: 10px 0
            .select
              .button
                display: inline-block
                margin-right: 5px
                background-color: #fafaf8
                border-radius: 2px
                padding: 4px
          .input-ingredient
            .input-content
              padding: 10px 0
              margin: 0 15px
              display: flex
              .left, .right
                flex: 1
                input
                  width: 100%
                  height: 100%
                  outline: none
                  border: none
              &:first-child
                border-top: 1px solid rgba(7, 17, 27, .1)
              &:last-child
                border-bottom: 1px solid rgba(7, 17, 27, .1)
          .change-input-ingredient
            display: flex
            justify-content: space-between
            padding: 15px
            color: #fa6650
          .methods
            font-size: 18px
            font-weight: 800
            padding: 15px
          .input-methods
            padding: 0 15px
            .input-content
              .title
                font-size: 14px
                font-weight: 800
                text-align: left
                line-height: 1
              .create-img
                text-align: center
                height: 300px
                background-color: #efefed
                position: relative
                color: #a2a2a1
                margin-top: 10px
                .create-img-text
                  position: absolute
                  width: 100%
                  top: 50%
                  transform: translateY(-50%)
              .create-methods-detail
                margin-top: 15px
                .input
                  width: 100%
                  border: none
                  outline: none
                  height: auto
                  min-height: 50px
                  resize: none
          .change-input-methods
            display: flex
            justify-content: space-between
            padding: 15px
            color: #fa6650
          .send
            width: 100%
            height: 55px
            background-color: #fa6650
            line-height: 55px
            text-align: center
            color: #fff
            font-size: 16px
            margin-top: 20px
</style>

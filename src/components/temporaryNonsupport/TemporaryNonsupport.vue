<template>
    <div class="temporary-nonsupport" @click="closeSelf(false)">
      <div class="title">
        抱歉,暂不支持!<br/>
        T _ T<br>
        <div class="close">
          点击任意位置关闭
        </div>
      </div>
    </div>
</template>

<script>
  import * as types from '../../store/mutations-types'
  import { mapMutations } from 'vuex'
  export default {
    name: 'temporaryNonsupport',
    methods: mapMutations({
      closeSelf: types.TOGGLE_TEMPORARY_NONSUPPORT
    })
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .temporary-nonsupport
    width: 100%
    height: 100%
    .title
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
      text-align: center
      color: #fa6650
      font-size: 18px
      .close
        margin-top: 10px
        font-size: 16px
</style>

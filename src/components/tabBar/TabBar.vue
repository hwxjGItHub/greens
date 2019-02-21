<template>
  <div class="tab-bar">
    <mu-bottom-nav :value="$route.path">
      <mu-bottom-nav-item value="/homePage" class="tab-item" :ripple="false" title="下厨房" to="/homePage" icon="home"></mu-bottom-nav-item>
      <!--<mu-bottom-nav-item value="/market" class="tab-item" :ripple="false" title="市集" to="/market" icon="store"></mu-bottom-nav-item>-->
      <mu-bottom-nav-item value="/collect" class="tab-item" :ripple="false" title="收藏" to="/collect" icon="favorite_border"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="/message" class="tab-item" :ripple="false" title="信箱" to="/message" icon="email"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="/person" class="tab-item" :ripple="false" title="我" to="/person" icon="person"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
  export default {
    name: 'TabBar'
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .tab-bar
    .tab-item
      min-width: 0
    & *
      animation: none !important
      transition: none !important
    .mu-bottom-item-active
      color: #fa6650
      font-size: 12px !important
      .mu-bottom-item-wrapper
        .mu-bottom-item-text
          font-size: 12px !important
</style>

<style lang="stylus">
#app
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  overflow hidden
  cursor default
  font-family Trebuchet MS, Helvetica, sans-serif, "宋体", "黑体", "微软雅黑"
  .player-control
    position fixed
    bottom 0
    height 50px
    width 100%
    z-index 10
</style>

<template>
  <div id="app">

    <!-- 顶部窗口边框 -->
    <div class="tab-bar">
      <tab-bar></tab-bar>
    </div>

    <!-- 中间部分 -->
    <div class="content" oncopy="return false" oncut="return false">
      <v-content></v-content>
    </div>

    <!-- 底部播放器控制区 -->
    <div class="player-control">
      <player-control></player-control>  
    </div>    
  </div>
</template>

<script>
  import TabBar from '@/components/tab-bar/tab-bar'
  import VContent from '@/components/content/content'
  import PlayerControl from '@/components/player-control/player-control'
  
  export default {
    components: {
      TabBar,
      VContent,
      PlayerControl
    }
  }
</script>

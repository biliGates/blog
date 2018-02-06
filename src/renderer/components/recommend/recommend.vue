<style lang="stylus" scoped>
  .recommend
    height 100%
    position relative
    .header
      padding-top 10px
      margin 0 30px
      line-height 40px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .menu-list
        display flex
        max-width 600px
        margin 0 auto
        .menu-item
          flex 1
          div
            text-align center
            color #888
            font-family "黑体"
            width 100px
            transition color .3s
            margin 0 auto
            &:hover
              color #f14545
            &.router-link-active
              color #f14545
              position relative
              &::before
                content ''
                transition all .5s
                position absolute
                bottom 0
                left 30px
                right 30px
                border-bottom 1px solid #f14545
                transform scaleY(2)
    .content
      position absolute
      top 70px
      left 30px
      right 10px
      bottom 0
      overflow hidden
</style>

<template>
  <div class="recommend">
    <div class="header">
      <ul class="menu-list">
        <li class="menu-item">
          <router-link to="my-radio-station" tag="div">电台</router-link>
        </li>
        <li class="menu-item">
          <router-link to="singers" tag="div">歌手</router-link>
        </li>
        <li class="menu-item">
          <router-link to="top" tag="div">排行榜</router-link>
        </li>
        <li class="menu-item">
          <router-link to="new-disc" tag="div">新碟上架</router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        scrollBarWidth: 10
      }
    },
    methods: {
      scrollRefresh () {
      }
    },
    components: {
    }
  }
</script>

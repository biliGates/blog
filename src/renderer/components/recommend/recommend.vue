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
      .slideLeft-enter
        transform translate3d(100%, 0, 0)
      .slideLeft-leave-to
        transform translate3d(-100%, 0, 0)
        opacity 0
      .slideLeft-enter-active
        transition all 1s
      .slideLeft-leave-active
        transition all .6s
      .slideRight-enter
        transform translate3d(-100%, 0, 0)
      .slideRight-leave-to
        transform translate3d(100%, 0, 0)
        opacity 0
      .slideRight-enter-active
        transition all 1s
      .slideRight-leave-active
        transition all .6s
        
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
        <transition :name="transitionName">
          <router-view class="recommend-wrapper"></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  const ROUTER_LINK = ['/recommend/my-radio-station', '/recommend/singers', '/recommend/top', '/recommend/new-disc']
  export default {
    data () {
      return {
        transitionName: 'slideLeft'
      }
    },
    created () {
      this.prevLink = 0
    },
    methods: {
      animation () {
        let routerLink = this.$route.path
        for (let i = 0; i < ROUTER_LINK.length; i++) {
          if (ROUTER_LINK[i] === routerLink) {
            this.transitionName = this.prevLink - i < 0 ? 'slideLeft' : 'slideRight'
            this.prevLink = i
          }
        }
      }
    },
    watch: {
      $route () {
        this.animation()
      }
    }
  }
</script>

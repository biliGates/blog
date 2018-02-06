<style lang="stylus" scoped>
  .content
    position absolute
    display flex
    width 100%
    top 50px
    bottom 50px
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    .menu
      flex 0 0 200px
      border-right 1px solid rgba(7, 17, 27, 0.1)
      position relative
      height 100%
      font-family "黑体"
      overflow hidden
      margin-bottom 50px
      .menu-wrapper
        width 200px
        .menu-title
          padding 12px 10px 12px 10px
          font-size 12px
          color #89898a
        .list-item
          line-height 34px
          font-size 14px
          color #777
          font-weight 700
          transition color .1s
          i
            margin-right 4px
            
          &:hover
            color #222
            background #e8e8e8
          div
            padding-left 30px
            transition all .2s
          .router-link-active
            position relative
            color #555
            background #d9d9d9
            &::before
              position absolute
              content: ''
              height 34px
              left 0
              border-left 2px solid rgb(220, 45, 45)
    .router 
      flex 1
      position relative
</style>

<template>
  <div class="content">

    <div class="menu">
      <ul class="menu-wrapper">
        <li>
          <h2 class="menu-title">推荐</h2>
          <ul>
            <li class="list-item">
              <router-link tag="div" to="/recommend"><i class="icon-music_1"></i>发现音乐</router-link>
            </li>
          </ul>
        </li>
        <li>
          <h2 class="menu-title">我的音乐</h2>
          <ul>
            <li class="list-item">
              <router-link tag="div" to="/my-favorite"><i class="icon-star"></i>我的收藏</router-link>
            </li>
          </ul>
        </li> 
      </ul>  
    </div>  

    <div class="router">
      <keep-alive>
        <router-view class="router-view"></router-view>
      </keep-alive>
    </div>

  </div>  
</template>

<script>
  export default {
    components: {
    },
    methods: {
      togglePage () {
        console.log('toggle page')
      }
    }
  }
</script>

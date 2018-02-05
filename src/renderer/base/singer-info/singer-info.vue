<style lang="stylus" scoped>
  .singer-info
    width 100%
    margin-top 10px
    .info
      height 200px
      font-size 0
      padding-bottom 30px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .avatar
        float left
        width 200px
        width 200px
        .img
          border-radius 4px
          width 200px
      .desc
        float left
        padding 10px 0 0 40px
        width 300px
        height 200px
        .name
          font-size 20px
          color #777
          span
            font-weight 700
          .singer 
            vertical-align top
            display inline-block
            font-size 16px
            line-height 20px
            padding 0 4px
            color #fff
            font-weight 500
            margin-right 8px
            background #f14545
            text-align center
        .other-info
          margin-top 30px
          font-size 14px
          p
            color #888
            margin-top 4px
            .type
              display inline-block
              line-height 18px
              font-weight 500
            .amount
              font-weight 600
    .intro
      padding 30px 0 0 0
      position relative
      .tag
        position absolute
        background #f14545
        text-align center
        padding 2px 4px
        span
          font-size 16px
          line-height 20px
          color #fff
        .icon
          display inline-block
          background green
          width 20px
          height 20px
          margin-left 4px
    .intro
      .text 
        color #777
        font-size 14px
        line-height 20px
        padding 40px 30px 0 0
    .songs
      margin 30px 20px 0 0
      border-top 1px solid rgba(7, 17, 27, 0.1)
</style>

<template>
  <scroll ref="scroll">
    <div class="singer-info" v-if="singerInfo !== null && singerSongList !== null">
      <close-button class="close-button" @close="back"></close-button>
      <div class="info">
        <div class="avatar">
          <img class="img" :src="singerInfo.avatar_big" alt="">
        </div>
        <div class="desc">
          <h2 class="name">
            <span class="singer">{{singerInfo.country}}</span>
            <span>{{singerInfo.name}}</span>
          </h2>
          <div class="other-info">
            <p class="song-amount">
              <span class="type">歌曲数:</span>
              <span class="amount">{{singerSongList.songnums}}</span>
            </p>
            <p class="album-amount">
              <span class="type">专辑数:</span>
              <span class="amount">{{singerInfo.albums_total}}</span>
            </p>
            <p class="mv-amount">
              <span class="type">MV数:</span>
              <span class="amount">{{singerInfo.mv_total}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="intro">
        <div class="tag">
          <span>歌手简介</span>
        </div>
        <p class="text"  v-html="_createIntro(singerInfo.intro)"></p>
      </div>
      <div class="songs">
        <div class="song-list" v-if="singerSongList !== null">
          <song-list :songList="singerSongList.songlist"></song-list>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import {getSingerInfo, getSingerSongList} from '@/api/singer-info'
  import {ERR_OK} from '@/api/config'
  import {collatingText} from '@/common/js/utils'
  import SongList from '@/base/song-list/song-list'
  import CloseButton from '@/base/close-button/close-button'
  import Scroll from '@/base/scroll/scroll'

  export default {
    data () {
      return {
        singerInfo: null,
        singerSongList: null
      }
    },
    props: {
      singerId: {
        type: String,
        require: true
      }
    },
    created () {
      this.$nextTick(() => {
        this._getSingerInfo()
      })
    },
    updated () {
      this.$refs.scroll.refresh()
    },
    methods: {
      back () {
        this.$emit('back')
      },
      _getSingerInfo () {
        getSingerInfo(this.singerId).then((res) => {
          this.singerInfo = res
        })
        getSingerSongList(this.singerId, 100).then((res) => {
          if (res.error_code === ERR_OK) {
            this.singerSongList = res
          }
        })
      },
      _createIntro (text) {
        return collatingText(text)
      }
    },
    components: {
      SongList,
      CloseButton,
      Scroll
    }
  }
</script>

<style lang="stylus" scoped>
  .search-result 
    padding 30px 40px 0 40px
    .close-button
      top 34px
      line-height 40px
    .keywords
      padding-bottom 40px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .tips
        font-size 13px
        font-weight 600
        color #777
        .query
          font-size 13px
          color rgb(220, 45, 45)
    .singer-or-album
      padding 20px 0
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .text
        margin-bottom 5px
        font-size 12px
        color #999
        font-weight 600
      .info

        height 60px
        width 200px
        box-shadow 0 0 2px rgba(7, 17, 27, 0.1)
        padding 4px
        border 1px solid rgba(7, 17, 27, 0.1)
        box-sizing border-box
        background #e6e6e6
        .img
          width 50px
          height 50px
        .name
          vertical-align top
          margin 8px
          font-size 14px
          font-weight 600
          color #777
          line-height 20px
          display inline-block
          width 120px
          word-break break-all
</style>

<template>
  <scroll ref="scroll">
    <div class="search-result">
      <close-button class="close-button" @close="close"></close-button>

      <div class="keywords">
        <p class="tips">搜索<span class="query"> "{{searchResult.query}}" </span>的结果是:</p>
      </div>

      <div class="singer-or-album" v-if="singer || album">
        <div class="text">最佳匹配</div>
        <div class="info" v-if="singer">
          <img class="img" :src="singer.avatar.big || singer.avatar.small" alt="">
          <h2 class="name">歌手：{{singer.name}}</h2>
        </div>
        <div class="info" v-if="album">
          <img class="img" :src="album.pic_big" alt="">
          <h2 class="name">专辑：{{album.title}}</h2>
        </div>
      </div>

      <div class="song-list" v-if="songList">
        <song-list :songList="songList"></song-list>
      </div>
    </div>
  </scroll>
</template>

<script>
  import CloseButton from '@/base/close-button/close-button'
  import SongList from '@/base/song-list/song-list'
  import Scroll from '@/base/scroll/scroll'

  export default {
    data () {
      return {
        singer: null,
        album: null,
        songList: null
      }
    },
    props: {
      searchResult: {
        type: Object,
        require: true
      }
    },
    created () {
      console.log(this.searchResult)
      this._analysisSerchResult()
    },
    updated () {
      this.$refs.scroll.refreshTop()
      this.$refs.scroll.refresh()
    },
    methods: {
      // 关闭搜索结果窗口
      close () {
        this.$emit('close')
      },
      _analysisSerchResult () {
        this.singer = this.searchResult.artist
        this.album = this.searchResult.album
        this.songList = this.searchResult.song_list
        console.log(this.singer)
        console.log(this.album)
      }
    },
    components: {
      CloseButton,
      SongList,
      Scroll
    },
    watch: {
      searchResult () {
        this._analysisSerchResult()
      }
    }
  }
</script>

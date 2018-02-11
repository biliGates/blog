<style lang="stylus" scoped>
  .result
    transform translate3d(0, 0, 0)
    &.result-enter-active, &.result-leave-active
      transition transform .8s, opacity .5s
    &.result-leave-to, &.result-enter
      transform translate3d(-100%, 0, 0)
      opacity 0
    .search-result 
      padding 30px 40px 0 40px
      &.hide
        display none
      .close-button
        top 34px
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
            max-width 115px
            word-break break-all  
      .not-result
        font-size 13px
        font-weight 600
        line-height 30px
        color #666
</style>

<template>
  <transition name="result">
    <scroll class="result" ref="scroll">
      <div class="search-result">

        <div class="keywords">
          <p class="tips">搜索<span class="query"> "{{$route.params.keyword}}" </span>的结果是:</p>
        </div>

        <div class="singer-or-album" v-if="singer || album">
          <div class="text">最佳匹配</div>
          <div class="info" v-if="singer">
            <img class="img" :src="singer.avatar.big || singer.avatar.small" alt="">
            <h2 class="name">歌手：{{singer.name}}</h2>
          </div>
          <div class="info" v-if="album">
            <img class="img" :src="album.pic_big || album.pic_s500" alt="">
            <h2 class="name">专辑：{{album.title}}</h2>
          </div>
        </div>

        <div v-if="songList">
          <song-list :getSong="getSong" @onClick="showPlayer" :songList="songList"></song-list>
        </div>
        <div v-else class="not-result">没有匹配的结果 :)</div>
        <close-button class="close-button" @close="close"></close-button>
      </div>
    </scroll>
  </transition>
</template>

<script>
  import CloseButton from '@/base/close-button/close-button'
  import SongList from '@/base/song-list/song-list'
  import Scroll from '@/base/scroll/scroll'
  import {search} from '@/api/search'
  import {getSong} from '@/api/song'
  import {mapMutations} from 'vuex'
  import {ERR_OK} from '@/api/config'

  export default {
    data () {
      return {
        singer: null,
        album: null,
        songList: null,
        searchHistory: [],
        getSong: function (songId, fn) {
          return getSong(songId).then((res) => {
            if (res.error_code === ERR_OK) {
              fn(res.songinfo)
            }
          })
        }
      }
    },
    created () {
      this._search()
    },
    updated () {
      this.$refs.scroll.refresh()
    },
    methods: {
      // 关闭搜索结果窗口
      close () {
        this.$router.go(-1)
      },
      showPlayer () {
        this.TOGGLE_PLAYER(true)
      },
      _search () {
        let keyword = this.$route.params.keyword
        search(keyword).then((res) => {
          this.singer = res.artist
          this.album = res.album
          this.songList = res.song_list
        })
      },
      ...mapMutations([
        'TOGGLE_PLAYER'
      ])
    },
    computed: {
      updata () {
        return this.$route.params.keyword
      }
    },
    watch: {
      updata () {
        this._search()
      }
    },
    components: {
      CloseButton,
      SongList,
      Scroll
    }
  }
</script>

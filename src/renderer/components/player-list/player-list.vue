<style lang="stylus" scoped>
  .player-list
    position fixed
    bottom 51px
    right 0
    height 480px
    width 400px
    box-shadow 0px 0px 10px rgba(7, 17, 27, 0.1)
    background #f1f1f1
    z-index 200
    overflow hidden
    transform scale(1)
    transform-origin 85% 106%
    &.list-enter, &.list-leave-to
      transform scale(0)
      opacity 0
    &.list-enter-to, &.list-leave-active
      transition all .6s
    .header
      width 100%
      .player-list-type
        padding-top 10px
        background rgba(180, 180, 180, .1)
        .types
          width 200px
          margin 0 auto
          padding-bottom 10px
          display flex
          line-height 22px
          text-align center
          .now-player-list, .history-player-list
            background rgb(124, 125, 133)
            box-shadow 0 0 4px rgba(7, 17, 27, 0.1)
            flex 1
            color #f1f1f1
            font-size 13px
            font-weight 600
            &.active
              background #f1f1f1
              color #555
          .now-player-list
            border-radius 5px 0 0 5px
          .history-player-list
            border-radius 0 5px 5px 0
        .operation
          box-shadow 0 0 2px rgba(7, 17, 27, 0.1)
          height 30px
          display flex
          padding 10px
          box-sizing border-box
          line-height 15px
          background #f1f1f1
          color #999
          font-size 13px
          .song-amount, .favorite, .delect
            font-weight 600
          .song-amount
            flex 1
          .favorite, .delect
            text-align right
            margin-right 8px
            transition all .5s
            &:hover
              color #555
          .delect
            padding-left 8px
            height 15px
            border-left 1px solid rgba(7, 17, 27, 0.1)
        .icon-close-
          padding 4px
          position absolute
          top 8px
          right 10px
          &:before
            color #555
    .content
      height 400px
    .song-item
      padding 10px 10px 10px 0
      .song-list
        font-size 13px
        height 30px
        display flex
        transition background .4s
        &:nth-child(odd)
          background rgba(180, 180, 180, .1)
        &:hover
          background rgba(7, 17, 27, 0.1)
          .song
            .playing-icon
              .icon-pause-
                display none
                opacity 0
              .icon-close-
                display block
                opacity 1
                &:hover 
                  transform scale(1.5)
        .song
          display flex
          width 100%
          .playing-icon
            width 30px
            .icon-pause-, .icon-close-
              transition all .4s
            .icon-pause-
              opacity 1
              &:before
                color #999
                margin-left 10px
                line-height 31px
            .icon-close-
              display none
              opacity 0
              &:before
                line-height 30px
                font-size 10px
                color #f14545
                margin-left 11px
          .song-name, .author
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          .song-name
            max-width 180px
            line-height 30px
            margin-right 6px
            font-weight 600
            color rgb(135, 135, 135)
            font-family "宋体", Tahoma
          .icon
            margin 9px 2px
            line-height 6px
            height 6px
            padding 1px
            text-align center
            color rgb(220, 45, 45)
            font-size 8px
            font-family Arial
            border 1px solid rgb(220, 45, 45)
            text-shadow 0 0 1px rgba(220, 45, 45, 0.5) 
            box-shadow 0 0 1px rgba(220, 45, 45, 0.7)
          .author
            text-align right
            position absolute
            max-width 100px
            right 20px
            font-size 12px
            color #777
            font-family "微软雅黑"
            line-height 30px
    .no-songs
        line-height 30px
        font-size 12px
        color #666
        text-align center
</style>

<template>
  <transition name="list">
    <div class="player-list">
      <div class="header">
        <div class="player-list-type">
          <div class="types">
            <div class="now-player-list" 
                 :class="{'active': songListType === 0}"
                 @click="showSongList"
            >播放列表</div>
            <div class="history-player-list" 
                 :class="{'active': songListType === 1}"
                 @click="showHistorySongList"
            >历史记录</div>
          </div>
          <div class="operation">
            <div class="song-amount">总{{(songList && songList.length) || 0}}首</div>
            <div class="favorite" v-show="songList.length" @click="favoriteAll">
              <i class="icon-star"></i>收藏全部</div>
            <div class="delect" v-show="songList.length" @click="_delectAllSongs">清空</div>
          </div>
          <i class="icon-close-" @click="close"></i>
        </div>
      </div>
      <div class="content">
        <scroll ref="scroll">
          <ul class="song-item" v-if="songList.length">
            <li class="song-list" 
                v-for="song in songList"
                @click="play(song)"
            >
                <div class="song">
                  <div class="playing-icon">
                    <i class="icon-close-" @click.stop="_delectSong(song.song_id)"></i>
                    <i :class="{'icon-pause-' : playingIcon === song.song_id && playing}"></i>
                  </div>
                  <div class="song-name">{{song.title}}</div>
                  <div class="icon" v-for="icon in _icon(song.biaoshi)">{{icon}}</div>
                  <div class="author">{{song.author}}</div>
                </div>
                <div></div>
            </li>
          </ul>
          <div class="no-songs" v-else>没有歌曲</div>
        </scroll>
      </div>
    </div>  
  </transition>
</template>

<script>
  import Scroll from '@/base/scroll/scroll'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import {icons} from '@/common/js/utils'
  import {SONG_LIST_TYPE} from '@/common/js/vuex.config'

  export default {
    updated () {
      this.$refs.scroll.refresh()
    },
    methods: {
      close () {
        this.$emit('close')
      },
      play (song) {
        this.playingSong(song)
      },
      favoriteAll () {
        let list = this.songListType === SONG_LIST_TYPE.current ? this.songList : this.historySongList
        this.setFavoriteSongList(list)
      },
      showSongList () {
        this.songListType !== SONG_LIST_TYPE.current &&
          this.SET_SONG_LIST_TYPE(SONG_LIST_TYPE.current)
        this.$refs.scroll.topTo(0)
      },
      showHistorySongList () {
        this.songListType !== SONG_LIST_TYPE.history &&
          this.SET_SONG_LIST_TYPE(SONG_LIST_TYPE.history)
        this.$refs.scroll.topTo(0)
      },
      _delectAllSongs () {
        this.delectAllSongs()
      },
      _delectSong (songId) {
        this.delectSong(songId)
      },
      _icon (text) {
        return icons(text)
      },
      ...mapMutations([
        'SET_SONG_LIST_TYPE'
      ]),
      ...mapActions([
        'playingSong',
        'delectSong',
        'setFavoriteSongList',
        'delectAllSongs'
      ])
    },
    computed: {
      ...mapGetters([
        'songList',
        'playingSongId',
        'historySongList',
        'songListType',
        'playing'
      ]),
      playingIcon () {
        return this.playingSongId
      }
    },
    components: {
      Scroll
    }
  }
</script>

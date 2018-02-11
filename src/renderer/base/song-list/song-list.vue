<style lang="stylus" scoped>
  .song-list
    margin-bottom 34px
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    .song-list-header, .song
      display flex
      height 34px
      width 100%
      line-height 34px
      .count
        flex 0 0 40px
      .song-name
        flex 2
      .singer
        flex 2
      .album-name
        flex 2
      .operation, .player-all
        flex 0 90px
    .song-list-header
      background rgba(200, 200, 200, 0.1)
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .song-name, .singer, .album-name, .player-all
        border-left 1px solid rgba(7, 17, 27, 0.1)
        box-sizing border-box
        font-weight 700
        padding-left 5px
        color #777
        transition all .4s
        &:hover
          background #d1d1d1
        &:active
          box-shadow 0 0 4px rgba(7, 17, 27, 0.1)
      .player-all
        padding 0
        text-align center
        i
          font-size 12px
          margin-left 4px
    .song
      transition all .2s
      color #888
      &:nth-child(odd)
        background rgba(200, 200, 200, 0.1)
      &:hover
        background #d1d1d1
        .operation
          i
            color #eee
      .count
        &.playing
          .sort-num
            display none  
          .icon
            margin 6px 0 0 6px  
            display block
            height 15px 
            width 15px
            background url("./player.gif") no-repeat 0 0 / 15px 15px
        .sort-num
          font-size 14px
          margin-left 6px
          color #888
      .singer, .album-name
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        padding-left 5px
        font-size 13px
        font-weight 600
      .song-name
        display flex
        padding-left 5px
        font-size 13px
        font-weight 600
        width 100%
        overflow hidden
        .name
          font-weight 600
          max-width 70%
          margin-right 4px
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
        .icon
          margin 12px 2px
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
      .operation
        .wrapper
          display flex
          width 60px
          margin 0 auto
          i 
            flex 1
            width 20px
            height 34px
            line-height 34px
            color #ccc
            text-shadow 0 0 2px rgba(7, 17, 27, 0.1)
            transition all .3s
            text-align center
            &.icon-star
              &:hover
                color rgb(220, 45, 45)
            &.icon-pause-, &.icon-play
              font-size 18px
              &:hover
                &:before
                  color #444
            &.icon-pause-
              &:before
                color #ccc
                font-weight 700
            &.icon-play
              &:before
                margin-left 1px
</style>
<style lang="stylus">
em
  font-style normal
  color rgb(200, 20, 20)
  font-weight 600
</style>

<template>
  <div class="song-list">
    <!-- 表格头 -->
    <div class="song-list-header" v-if="needTabBar">
      <span class="count"></span>
      <div class="song-name">歌曲名</div>
      <div class="singer">歌手</div>
      <div class="album-name">专辑</div>
      <div class="player-all" @click="playerAll">全部播放<i class="icon-list"></i></div>
    </div>
    <!-- 歌曲部分 -->
    <div class="song"v-for="(song, index) in songList" @click="playSong(song)">
      <!-- 序号 -->
      <div class="count" :class="{'playing': playIconCls === song.song_id && playing}">
        <div class="sort-num">{{_toTwo(index)}}</div>
        <i class="icon"></i>
      </div>
      <!-- 歌曲、歌手、专辑名 -->
      <div class="song-name">
        <div class="name" v-html="song.title"></div>
        <div class="icon" v-for="icon in _icons(song.biaoshi)">{{icon}}</div>
      </div>
      <div class="singer" v-html="song.author"></div>
      <div class="album-name" v-html="song.album_title"></div>
      <!-- 操作按纽 -->
      <div class="operation">
        <div class="wrapper">
          <i :class="playIconCls === song.song_id && playing ? 'icon-pause-' : 'icon-play'"
          ></i>
          <i v-show="needTabBar" class="icon-star" @click="favorite(song, index)"></i>
        </div>
      </div>
    </div>  

  </div>
</template>

<script>
  import {toTwo, icons} from '@/common/js/utils'
  import {mapActions, mapMutations, mapGetters} from 'vuex'

  export default {
    data () {
      return {
        playSong: false,
        play: false
      }
    },
    props: {
      songList: {
        type: Array,
        require: true
      },
      getSong: {
        typs: Function,
        default: null
      },
      needTabBar: {
        type: Boolean,
        default: true
      }
    },
    updated () {
      this.$emit('updateEnd')
    },
    methods: {
      playerAll () {
        this.radioStationMode && this.SET_RADIO_STATION_MODE(false)
        if (this.getSong) {
          let songList = []
          this.songList.forEach((song, index) => {
            this.getSong(song.song_id, (res) => {
              songList.push(res)
              if (songList.length === this.songList.length) {
                this.setSongList(songList)
              } else if (index === this.songList.length) {
                this.setSongList(songList)
              }
            })
          })
        } else {
          this.setSongList(this.songList)
        }
      },
      playSong (song) {
        this.radioStationMode && this.SET_RADIO_STATION_MODE(false)
        if (!this.getSong) {
          this.playingSong(song)
        } else {
          // 从搜索界面过来的 song 歌曲信息太少，利用传递过来的方法获取更多数据，并提交action
          this.getSong(song.song_id, this.playingSong)
          this.$emit('onClick')
        }
        this.PLAYING(true)
      },
      favorite (song, index) {
      },
      _icons (text) {
        return icons(text)
      },
      _toTwo (num) {
        return toTwo(num)
      },
      ...mapActions({
        playingSong: 'playingSong',
        setSongList: 'songList'
      }),
      ...mapMutations([
        'PLAYING',
        'SET_RADIO_STATION_MODE'
      ])
    },
    computed: {
      ...mapGetters([
        'playingSongId',
        'radioStationMode',
        'playing'
      ]),
      playIconCls () {
        return this.playingSongId
      }
    }
  }
</script>

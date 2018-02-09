<style lang="stylus" scoped>
  .player-control
    display flex
    position relative
    .music-control, .progress-control, .volume-control, .other-control
      display flex
    .music-control
      flex 0 0 200px
      div
        flex 1
        i 
          display block 
          width 30px
          height 30px
          margin 10px auto
          border-radius 50%
          line-height 30px
          font-size 18px
          text-align center
          border 1px solid rgba(7, 17, 27, 0.1)
          box-shadow 0 0 3px rgba(7, 17, 27, 0.1)
          background rgb(220, 45, 45)
          color #f1f1f1
          transition all .3s
          &:hover
            box-shadow 0 0 50px rgba(7, 17, 27, 0.2) inset
          &.icon-pause-, &.icon-play-
            height 34px
            width 34px
            margin 8px auto
            line-height 34px
            font-size 22px
            font-weight 700
           &.icon-play
            &:before
              margin-left 5px
              font-size 20px
    .progress-control
      flex 1
      .progress-wrapper
        width 90%
        margin 15px 0 0 5%

    .volume-control
      flex 0 0 170px
      margin-right -20px
      .volume
        line-height 50px
        margin 3px -16px 0 0
      .progress-wrapper
        margin 15px 0 0 20px
        width 110px
    .other-control
      flex 0 0 120px
      .play-mode, .music-list
        i 
          line-height 50px
      .play-mode
        width 40px
        text-align center
        .icon-sequence-m-
          font-size 20px
      .music-list
        position relative
        margin-left 6px
        width 80px
        .icon-list-
          position relative
          z-index -1
        .music-amount
          position absolute
          text-align center
          top 17px
          left 17px
          width 26px
          padding-right 5px
          line-height 16px
          font-size 11px
          z-index -1
          border-radius 0 8px 8px 0
          background rgba(7, 17, 27, 0.2)
          box-shadow 0 0 4px rgba(7, 17, 27, 0.1)
          color #444
</style>

<template>
  <div class="player-control">

    <div class="audio">
      <audio ref="audio" 
             :src="songUrl" 
             :loop="loop"
             @ended="ended"
             @canplay="canplay"
             autoplay
      ></audio>
    </div>

    <mini-player :timer="playTime" :songLrc="songLrc" :songInfo="songInfo"></mini-player>

    <div class="music-control">
      <div class="prev" @click="prevSong"><i class="icon-previous"></i></div>
      <div class="toggle" @click="_togglePlay"><i :class="playIconCls"></i></div>
      <div class="next" @click="nextSong"><i class="icon-next"></i></div>
    </div>

    <div class="progress-control">
      <div class="progress-wrapper">
        <progress-bar @moveEnd="progressMoveEnd" 
                      @progressOnClick="progressMoveStart"
                      :needTimer="true" 
                      :progressBarTo="progressBarTo"
                      :playTime="playTime"
                      :allTime="allTime"
        ></progress-bar>
      </div>
    </div>

    <div class="volume-control">
      <div class="volume"><i :class="volumeIcon"></i></div>
      <div class="progress-wrapper">
        <progress-bar @moveEnd="volumeProgressMoveEnd"
                      :hideBall="true"
                      :progressBarTo="vol" 
        ></progress-bar>
      </div>
    </div>

    <div class="other-control">
      <div class="play-mode" @click="togglePlayMode"><i :class="playModeIconCls"></i></div>
      <div class="music-list" ref="musicList" @click.stop.self="togglePlayList">
        <i class="icon-list-"></i>
        <div class="music-amount">{{songAmount}}</div>
        <player-list @close="showPlayList = false" v-show="showPlayList"></player-list>
      </div>
    </div>

  </div>  
</template>

<script>
  import ProgressBar from '@/base/progress-bar/progress-bar'
  import MiniPlayer from '@/components/mini-player/mini-player'
  import PlayerList from '@/components/player-list/player-list'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import {PLAY_MODE} from '@/common/js/vuex.config'
  import {getSong, getLrc} from '@/api/song'
  import {ERR_OK} from '@/api/config'

  export default {
    data () {
      return {
        progressBarTo: 0,
        vol: 10,
        song: this.$store.state.playSong,
        songInfo: null,
        songUrl: null,
        songLrc: null,
        showPlayList: false,
        playTime: 0,
        allTime: 0
      }
    },
    created () {
      // 外部点击时隐藏播放列表
      document.addEventListener('click', this.hidePlayList, false)
    },
    mounted () {
      this.$nextTick(() => {
        this.volume()
      })
    },
    methods: {
      // 向子组件传递当前时间
      currentTime () {
        let audio = this.$refs.audio
        this.allTime = audio.duration
        let autoPlay = () => {
          this.playTime = audio.currentTime
          // 拖动进度条时不计算
          if (!this.progressOnMove) {
            this.progressBarTo = this.playTime / this.allTime * 100
          }
        }
        clearInterval(this.timer1)
        this.timer1 = setInterval(autoPlay, 300)
      },
      // 切换播放暂停
      togglePlay () {
        let audio = this.$refs.audio
        if (this.canPlay) {
          audio.paused ? audio.play() : audio.pause()
        }
      },
      prev () {
        this.prevSong()
      },
      next () {
        this.nextSong()
      },
      canplay () {
        this.canPlay = true
        this.currentTime()
      },
      ended () {
        this.canPlay = false
        this.next()
      },
      // 调整音量
      volume () {
        this.$refs.audio.volume = this.vol / 100
      },
      // 当鼠标点下时，让进度条不能移动
      progressMoveStart () {
        this.progressOnMove = true
      },
      // 响应子组件的滚动条拖动事件调整进度
      progressMoveEnd (movePercentage) {
        if (this.canPlay) {
          let audio = this.$refs.audio
          let duration = audio.duration
          this.progressOnMove = false
          audio.currentTime = movePercentage / 100 * duration
        }
      },
      // 响应子组件的滚动条拖动事件调整声音
      volumeProgressMoveEnd (movePercentage) {
        this.vol = movePercentage
        this.volume()
      },
      // 外部点击时隐藏播放列表方法
      hidePlayList (e) {
        this.showPlayList = this.$refs.musicList.contains(e.target)
      },
      // icon 点击时切换列表状态
      togglePlayList () {
        this.showPlayList = !this.showPlayList
      },
      togglePlayMode () {
        this.setPlayMode()
      },
      _hidePlayer () {
        this.TOGGLE_SHOW_PLAYRE(false)
      },
      _togglePlay () {
        this.PLAYING()
      },
      // 获取音乐
      _getSong () {
        getSong(this.playingSongId).then((res) => {
          if (res.error_code === ERR_OK) {
            this.songUrl = res.bitrate.show_link
            this.songInfo = res.songinfo
          }
        })
      },
      _getLrc () {
        getLrc(this.playingSongId).then((res) => {
          this.songLrc = res
        })
      },
      ...mapMutations([
        'TOGGLE_SHOW_PLAYER',
        'PLAYING'
      ]),
      ...mapActions([
        'prevSong',
        'nextSong',
        'setPlayMode'
      ])
    },
    computed: {
      // 根据音量调整图标
      volumeIcon () {
        let vol = this.vol
        return {
          'icon-volume-mute': vol <= 0,
          'icon-volume-low': vol <= 30 && vol > 0,
          'icon-volume-medium': vol <= 70 && vol > 30,
          'icon-volume-high': vol <= 100 && vol > 70
        }
      },
      loop () {
        return this.playMode === PLAY_MODE.loop
      },
      ...mapGetters([
        'songAmount',
        'songList',
        'showPlayer',
        'playingSongId',
        'playing',
        'playingSong',
        'playMode'
      ]),
      playModeIconCls () {
        let mode = this.playMode
        return {
          'icon-loop-m-': mode === PLAY_MODE.loop,
          'icon-random-m-': mode === PLAY_MODE.random,
          'icon-sequence-m-': mode === PLAY_MODE.sequence
        }
      },
      playIconCls () {
        return this.playing ? 'icon-pause-' : 'icon-play'
      }
    },
    watch: {
      playingSong () {
        this._getSong()
        this._getLrc()
      },
      playing () {
        this.togglePlay()
      }
    },
    components: {
      ProgressBar,
      MiniPlayer,
      PlayerList
    }
  }
</script>

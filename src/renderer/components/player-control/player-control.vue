<style lang="stylus" scoped>
  .player-control
    display flex
    position relative
    z-index 200
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
          background rgb(220, 45, 45)
          color #f1f1f1
          &.icon-pause-
            height 34px
            width 34px
            margin 8px auto
            line-height 34px
            font-size 22px
            font-weight 700

    .progress-control
      flex 1
      .progress-wrapper
        width 90%
        margin 20px 0 0 5%

    .volume-control
      flex 0 0 170px
      margin-right -20px
      .volume
        line-height 50px
        margin-top 1px
        margin-right -16px
      .progress-wrapper
        margin 20px 0 0 20px
        width 110px

    .other-control
      flex 0 0 120px
      .play-mode, .music-list
        i 
          line-height 50px
      .play-mode
        width 40px
        text-align center
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
      <audio ref="audio" :src="songUrl" autoplay></audio>
    </div>

    <mini-player :timer="time" :songLrc="songLrc" :songInfo="song"></mini-player>

    <div class="music-control">
      <div class="prev"><i class="icon-previous"></i></div>
      <div class="toggle" @click="_togglePlay"><i class="icon-pause-"></i></div>
      <div class="next"><i class="icon-next"></i></div>
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
      <div class="play-mode"><i class="icon-single-m-"></i></div>
      <div class="music-list" ref="musicList" @click.stop.self="togglePlayerList">
        <i class="icon-list-"></i>
        <div class="music-amount">{{$songAmount}}</div>
        <player-list @close="showPlayerList = false" class="test" v-show="showPlayerList"></player-list>
      </div>
    </div>

  </div>  
</template>

<script>
  import ProgressBar from '@/base/progress-bar/progress-bar'
  import MiniPlayer from '@/components/mini-player/mini-player'
  import PlayerList from '@/components/player-list/player-list'
  import {getSong, getLrc} from '@/api/song'
  import {ERR_OK} from '@/api/config'
  import {getTime} from '@/common/js/utils'

  export default {
    data () {
      return {
        progressBarTo: 0,
        vol: 0,
        song: this.$store.state.playSong,
        showPlayerList: false,
        songList: null,
        songUrl: null,
        songLrc: null,
        time: 0,
        playTime: '00:00',
        allTime: '00:00'
      }
    },
    created () {
      // 外部点击时隐藏播放列表
      document.addEventListener('click', this.hidePlayerList, false)
    },
    mounted () {
      this.$nextTick(() => {
        this.volume()
      })
    },
    methods: {
      // 控制播放进度条
      currentTime () {
        let audio = this.$refs.audio
        let duration = audio.duration
        this.allTime = getTime(duration)
        let autoPlay = () => {
          let currentTime = audio.currentTime
          if (currentTime > audio.currentTime) {
            return
          }
          this.time = currentTime
          this.playTime = getTime(currentTime)
          // 拖动进度条时不计算
          if (this.progressOnMove !== true) {
            this.progressBarTo = currentTime / duration * 100
          }
        }
        clearInterval(this.timer)
        this.timer = setInterval(autoPlay, 300)
      },
      // 切换播放暂停
      togglePlay () {
        let audio = this.$refs.audio
        if (this.canPlay) {
          audio.paused ? audio.play() : audio.pause()
        }
      },
      prev () {
      },
      next () {
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
      // 外部点击时隐藏方法
      hidePlayerList (e) {
        this.showPlayerList = this.$refs.musicList.contains(e.target)
      },
      // icon 点击时切换列表状态
      togglePlayerList () {
        this.showPlayerList = !this.showPlayerList
      },
      _togglePlay () {
        this.$store.commit('TOGGLE_PLAY')
      },
      // 当audio canplay 时开始调用计时
      _canPlay () {
        this.$refs.audio.addEventListener('canplay', () => {
          this.canPlay = true
          this.currentTime()
        })
        this.$refs.audio.addEventListener('ended', () => {
          this.canPlay = false
        })
      },
      // 获取音乐
      _getSong () {
        getSong(this.song.song_id).then((res) => {
          if (res.error_code === ERR_OK) {
            this.songUrl = res.bitrate.show_link
            this._canPlay()
          }
        })
      },
      _getLrc () {
        getLrc(this.song.song_id).then((res) => {
          this.songLrc = res
        })
      }
    },
    components: {
      ProgressBar,
      MiniPlayer,
      PlayerList
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
      $songAmount () {
        return (this.$store.state.playerList && this.$store.state.playerList.length) || 0
      },
      // 利用 计算属性 watch 到store里的数据
      $storeSong () {
        return this.$store.state.playSong
      },
      $storePlay () {
        return this.$store.state.togglePlay
      }
    },
    watch: {
      // store 里的当前播放音乐变动时 重新获取歌曲
      $storeSong () {
        this.song = this.$store.state.playSong
        this._getLrc()
        this._getSong()
      },
      // store 的播放状态改变时，切换播放状态
      $storePlay () {
        this.togglePlay()
      }
    }
  }
</script>
